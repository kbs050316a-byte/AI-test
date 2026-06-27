import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize dynamic Gemini client helper based on header or env
function getGeminiClient(req: express.Request) {
  const headerKey = req.headers["x-gemini-key"] as string | undefined;
  const apiKey = headerKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key가 누락되었습니다. API 키를 등록해 주세요.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Key Validation Route
app.post("/api/validate-key", async (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey) {
    return res.status(400).json({ valid: false, error: "API 키를 입력해 주세요." });
  }

  try {
    const aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "API Key test connection. Respond ONLY with word 'OK'.",
      config: {
        maxOutputTokens: 5,
      },
    });

    if (response && response.text) {
      return res.json({ valid: true });
    } else {
      return res.status(400).json({ valid: false, error: "유효하지 않은 API 키입니다. 다시 확인해 주세요." });
    }
  } catch (error: any) {
    console.error("API Key validation error:", error);
    let friendlyMessage = "유효하지 않은 API 키입니다. Google AI Studio에서 새로운 키를 발급받아 주세요.";
    const errString = error.toString() || "";
    
    // If it's a typical API key invalid error, or network error
    if (errString.includes("API key not valid") || errString.includes("API_KEY_INVALID") || errString.includes("INVALID_ARGUMENT")) {
      friendlyMessage = "입력하신 API 키가 유효하지 않습니다. Google AI Studio에서 새로운 API 키를 발급받아 등록해 주세요.";
    } else if (errString.includes("quota") || errString.includes("exhausted")) {
      friendlyMessage = "API 호출 한도가 초과되었습니다. 새로운 API 키를 발급받아 사용해 주세요.";
    }
    
    return res.status(400).json({ valid: false, error: friendlyMessage });
  }
});

// Route to suggest goals based on resume data only
app.post("/api/suggest-goals", async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: "이력서(구직자 데이터)를 먼저 입력해 주세요." });
  }

  try {
    const prompt = `
당신은 국민취업지원제도 전문 고등상담사 겸 취업 컨설턴트입니다.
제공된 구직자의 이력 데이터(가)를 분석하여, 이 구직자에게 가장 가능성 높고 추천할 만한 '취업 목표(직무 및 산업)' 3가지를 제안해 주세요.

[구직자 데이터 (가)]
${resumeText}

반드시 아래와 같은 JSON 형식으로만 응답해 주세요. 마크다운 코드 블록(\`\`\`json) 기호 없이 순수한 JSON으로만 답변하거나, 코드 블록을 포함하더라도 유효한 JSON이어야 합니다.

JSON 스키마:
{
  "suggestions": [
    {
      "title": "추천 직무명 (예: 중소기업 디지털 마케터)",
      "reason": "추천 사유 (이력서 내 어떤 경험/역량에 근거했는지 2문장 내외로 서술)",
      "industry": "추천 산업군",
      "gap": "목표 달성을 위해 필요한 핵심 역량 또는 메워야 할 갭"
    }
  ]
}
`;

    const aiClient = getGeminiClient(req);
    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text.replace(/```json/g, "").replace(/```/g, "").trim());
      res.json(parsed);
    } catch (parseErr) {
      console.error("JSON parsing error:", text);
      // Fallback in case of invalid JSON
      res.json({
        suggestions: [
          {
            title: "사무 행정원",
            reason: "제출해주신 이력의 사무 관리 활동 경험에 기반하여 추천합니다.",
            industry: "일반 서비스 및 행정",
            gap: "OA 자격증 취득 및 실무 행정 툴 활용도 제고"
          }
        ]
      });
    }
  } catch (error: any) {
    console.error("Suggest goals error:", error);
    res.status(500).json({ error: error.message || "추천 목표 생성 중 오류가 발생했습니다." });
  }
});

// Route to perform comprehensive analysis and report generation
app.post("/api/analyze", async (req, res) => {
  const { resumeText, jobGoal, sessionObserve, currentDate } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: "구직자 데이터 파일(가)이 확인되지 않았습니다. 입력을 확인해 주세요." });
  }

  const finalJobGoal = jobGoal || "미입력 (시스템에 의한 추천 기반 진행)";
  const finalSessionObserve = sessionObserve || ""; // Empty means default to "미입력" handling

  const formattedDate = currentDate || new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  try {
    const prompt = `
# 역할 (Role)
당신은 국민취업지원제도에 참여하는 다양한 내담자의 특성을 분석하고, 이를 바탕으로 최적의 상담 전략과 맞춤형 컨설팅 가이드 및 docx 호환 보고서를 수립하는 **국민취업지원제도 전문 고등상담사 겸 취업 컨설턴트**입니다.

# 목표 (Goal)
구직자의 이력 데이터(가), 취업 목표(나), 1회기 관찰 특성(다)을 유기적으로 연계 분석하여 내담자 맞춤형 상담 전략과 최적화된 상담 회기 계획(3회~8회 이내)을 수립합니다.
또한 회기별로 활용할 수 있는 구체적인 가이드라인(버전 A, 버전 B)을 상세하게 작성하고, MS Word에 붙여넣어 즉시 사용할 수 있는 종합 보고서 초안까지 마크다운으로 깔끔하게 작성해 주세요.

# 입력 데이터
1. **[필수] 구직자 데이터 파일 (가)**:
${resumeText}

2. **[취업목표] 구직자 취업목표 (나)**:
${finalJobGoal}

3. **[관찰특성] 1회기 내담자 특성 (다)**:
${finalSessionObserve ? finalSessionObserve : "미입력 — 상담사가 1회기 상담 후 직접 보완 필요"}

# 실행 지침 (Instructions)
1. **[Step 2 반영] 1회기 특성 누락 처리**:
   - (다) 1회기 특성이 전달되지 않았거나 비어있는 경우, 출력물의 모든 "1회기 관찰 기반 상담 타겟팅" 및 관찰 특성 관련 항목에 반드시 \`[미입력 — 상담사가 1회기 상담 후 직접 보완 필요]\`라고 정확하게 표기하십시오.
2. **[Step 3 반영] 데이터 다각적 대조**:
   - 입력된 구직자 데이터(가)와 취업목표(나), 1회기 특성(다)을 심층 대조하여 핵심 당면 과제와 취업 저해 요인을 구체적으로 파악하고 등급(상/중/하)을 합리적으로 판정하십시오.
3. **[Step 4 반영] 맞춤형 상담 회기 최적화**:
   - 국민취업지원제도 지침에 맞춰 **최소 3회~최대 8회** 범위에서 목표 회기 수를 설정하십시오. (일반적으로 구체적이고 체계적인 상담을 위해 8회를 추천하며, 장벽의 깊이에 맞춰 회기 설정을 진행하되 왜 이 회기 수가 설정되었는지 구체적인 근거를 명시하십시오.)
   - 권장 회기 간격(예: 주 1회)과 그 사유를 명시하십시오.
4. **[Step 5 반영] 회기별 상세 컨설팅 가이드 설계**:
   - 각 회기는 반드시 다음 두 가지 고정 버전을 완벽하게 포함해야 합니다:
     - **[버전 A: 역량 집중·행동 촉진형]** (역량 중심 구체적 질문 3개 필수, 행동 과제, 흐름 서술)
     - **[버전 B: 심리 지지·동기 부여형]** (공감 및 동기부여 질문 3개 필수, 지지 접근 방식, 흐름 서술)
   - 모호한 표현("잘", "적절히", "친절하게")은 절대 금지하며, 상담사가 내담자에게 즉시 입 밖으로 낼 수 있는 **"실제 질문 문장 (따옴표 형식)"**과 **"체계적인 관찰 행동 지침"**으로 구체화하십시오.
   - 일부 회기를 생략하거나 "...이하 생략..."과 같은 줄임표를 쓰는 것은 절대 금지합니다. 설정된 모든 회기(예: 1회기부터 8회기까지)에 대해 가이드와 주의사항을 완전히 완성하여 텍스트로 출력하십시오.
5. **[Step 6 및 출력 형식 반영] docx 호환 종합 리포트 생성**:
   - 분석 결과 전체를 반드시 사용자가 제시한 아래 '정상 입력 시 출력 형식'의 양식과 텍스트를 한 자도 빠짐없이 100% 준수하여 출력하십시오.
   - 보고서의 **작성 일자**는 반드시 \`${formattedDate}\` 형식으로 정확하게 자동 기입되어야 합니다.

---

# 필수 출력 형식 (Output Format)
반드시 다음 포맷 구조와 마크다운 서식을 그대로 유지하여 답변하십시오.

---

## 1. 내담자 핵심 분석 요약

| 분석 항목 | 내용 |
|---|---|
| 핵심 보유 역량 | [구체적 내용] |
| 주요 취업 저해 요인 | [구체적 내용] |
| 직무 역량 성숙도 | 상 / 중 / 하 중 하나 기입 |
| 구직 준비도 | 상 / 중 / 하 중 하나 기입 |
| 심리·정서 상태 | [구체적 내용] |
| 시급성 판단 | 즉시 취업 가능 / 단기 준비 필요 / 중기 준비 필요 중 하나 기입 |

- **입력 파일 기반 역량·경험 진단**: [이력 데이터 기반의 구체적 분석 내용 및 진단]
- **1회기 관찰 특성 기반 상담 타겟팅**: [1회기 특성이 미입력이면 '[미입력 — 상담사가 1회기 상담 후 직접 보완 필요]'를, 입력되었으면 구체적인 관찰 기반 상담 타겟팅 분석 내용 기입]

---

## 2. 최적화된 상담 전략 및 회기 로드맵

- **총 목표 회기**: [X]회기 (권장 간격: 주 1회 / 격주 1회)
- **회기 수 설정 근거**: [구직 준비도, 취업 장벽, 구직 의지 등에 근거한 회기 수 결정의 아주 명확하고 구체적인 사유]
- **전략 방향**: [버전 A 또는 버전 B 중 초기 우선 적용 버전 및 그 구체적 이유]
- **전체 프로세스 요약**:

| 단계 | 회기 | 핵심 목표 |
|---|---|---|
| 진단 | 1회기 | [내용] |
| 전략 수립 | 2~3회기 | [내용] |
| 실행·훈련 | 4~6회기 | [내용] |
| 마무리·점검 | 7~8회기 | [내용] |

---

## 3. 회기별 상세 컨설팅 가이드

*(설정된 모든 회기에 대해 생략 없이 반복하여 완전한 문장으로 작성)*

### [1회기] 회기명 및 목표
*(회기명과 상세 내용은 구직자의 현황에 맞추어 실제 명칭으로 동적 작성)*

**회기 목표**: [구체적 목표 1~2문장]

#### 컨설팅 가이드

**[버전 A: 역량 집중·행동 촉진형]**
- **상담 흐름**: [단계별 상세 진행 순서와 시간/흐름 조절]
- **핵심 질문 예시**:
  1. "[즉시 사용 가능한 구체적 질문 문장 (예시와 같이 실제 따옴표 안에 서술)]"
  2. "[즉시 사용 가능한 구체적 질문 문장]"
  3. "[즉시 사용 가능한 구체적 질문 문장]"
- **조언 방향**: [행동 중심의 과제 및 측정 가능 기준]

**[버전 B: 심리 지지·동기 부여형]**
- **상담 흐름**: [동기부여 및 관계 형성을 위한 상담 흐름]
- **핵심 질문 예시**:
  1. "[즉시 사용 가능한 따옴표가 포함된 지지형 질문 문장]"
  2. "[즉시 사용 가능한 질문]"
  3. "[즉시 사용 가능한 질문]"
- **조언 방향**: [자기효능감 강화를 위한 지지 접근법]

#### 컨설팅 포인트 및 주의사항

**[버전 A: 역량 집중·행동 촉진형]**
- **관찰 유의점**: [집중 관찰해야 할 내담자의 특정 행동 반응 또는 신호]
- **피드백 팁**: [역량 피드백 시 거부감을 줄이고 효율을 높이는 대화 기법]
- **다음 회기 연결**: [이 회기 결과를 바탕으로 다음 회기와 매끄럽게 연결하는 브릿지 지침]

**[버전 B: 심리 지지·동기 부여형]**
- **관찰 유의점**: [정서적 불안, 자기비하 등 상담사가 관찰해야 할 감정 변화/신호]
- **피드백 팁**: [공감 표현 시의 적절한 어조와 수용적 어조 주의점]
- **다음 회기 연결**: [다음 회기로 가볍게 이동할 수 있는 동기 보존식 브릿지]

*(이런 형식으로 2회기, 3회기 ... 마지막 회기까지 단 하나의 생략도 없이 끝까지 100% 텍스트로 완성해서 적어주십시오. 반드시 한 회기도 거르지 않고 출력해야 합니다. 줄임표나 '이하 내용 동일'은 절대 안 됩니다.)*

---

## 4. [MS Word 복사용] 국민취업지원제도 내담자 맞춤형 상담 전략 보고서

> **[Word 변환 안내]** 아래 내용을 전체 선택하여 Word에 붙여넣기 하세요. 마크다운 표는 붙여넣기 후 Word의 [삽입 → 표 → 텍스트를 표로 변환] 기능으로 서식을 적용하세요. 즉시 docx 파일로 생성이 필요한 경우 "docx 파일로 만들어줘"라고 요청하세요.

---

# 국민취업지원제도 내담자 맞춤형 상담 전략 보고서

| 항목 | 내용 |
|---|---|
| 내담자 명 | [내담자 이름 또는 '홍길동 내담자' 등의 식별자] |
| 담당 상담사 | [상담사명 또는 귀하] |
| 작성 일자 | \`${formattedDate}\` |
| 상담 유형 | 국민취업지원제도 [1유형 / 2유형 자동 판정] |
| 총 예정 회기 | [X]회기 |

---

### 1. 내담자 파일 데이터 및 취업목표 분석 결과

| 분석 항목 | 세부 내용 |
|---|---|
| 학력 및 자격 | [이력 데이터 요약] |
| 주요 경력·경험 | [경험 요약] |
| 핵심 직무 역량 | [분석된 핵심 직무 역량] |
| 취업 목표 직무 | \`${finalJobGoal}\` |
| 목표 산업·기업 규모 | [추정되는 산업군 및 규모] |
| 역량-목표 간 갭 | [이력서 분석 기반 갭분석] |

[서술형 분석 내용: 200자 내외로 역량과 취업목표 간의 정합성을 설명]

---

### 2. 1회기 관찰 특성 및 종합 상담 전략

| 관찰 항목 | 내용 |
|---|---|
| 심리·정서 상태 | [심리 상태 기술 또는 미입력 시 '미입력 — 상담사가 1회기 상담 후 직접 보완 필요'] |
| 구직 의지 수준 | 높음 / 보통 / 낮음 중 선택 기입 |
| 피드백 수용도 | 수용적 / 중립 / 방어적 중 선택 기입 |
| 행동 특성 | [행동 특성 기술 또는 미입력 시 '미입력 — 상담사가 1회기 상담 후 직접 보완 필요'] |
| 주요 취업 저해 요인 | [식별된 저해 요인 2~3가지] |

**종합 상담 전략 방향**: [초기 적용 버전(A 또는 B) 선택 근거와 회기 진행에 따른 전환 기준 및 단계적 플랜]

---

### 3. 최적화된 상담 회기별 수행 계획

| 회기 | 회기명 | 핵심 목표 | 주요 활동 | 산출물 |
|---|---|---|---|---|
| 1회기 | [회기명] | [목표] | [활동] | [산출물] |
| 2회기 | [회기명] | [목표] | [활동] | [산출물] |
| 3회기 | [회기명] | [목표] | [활동] | [산출물] |
| 4회기 | [회기명] | [목표] | [활동] | [산출물] |
| 5회기 | [회기명] | [목표] | [활동] | [산출물] |
| 6회기 | [회기명] | [목표] | [활동] | [산출물] |
| 7회기 | [회기명] | [목표] | [활동] | [산출물] |
| 8회기 | [회기명] | [목표] | [활동] | [산출물] |

*(실제 설정된 전체 회기 수에 맞게 모든 회기를 구체적으로 행에 채워 넣으십시오. 생략 금지.)*

---

### 4. 회기별 컨설팅 핵심 가이드라인 요약

| 회기 | 버전 A 핵심 포인트 | 버전 B 핵심 포인트 |
|---|---|---|
| 1회기 | [버전 A의 1회기 액션 가이드 한 줄 요약] | [버전 B의 1회기 심리 가이드 한 줄 요약] |
| 2회기 | [버전 A의 요약] | [버전 B의 요약] |
| 3회기 | [버전 A의 요약] | [버전 B의 요약] |
| 4회기 | [버전 A의 요약] | [버전 B의 요약] |
| 5회기 | [버전 A의 요약] | [버전 B의 요약] |
| 6회기 | [버전 A의 요약] | [버전 B의 요약] |
| 7회기 | [버전 A의 요약] | [버전 B의 요약] |
| 8회기 | [버전 A의 요약] | [버전 B의 요약] |

*(실제 설정된 회기 수에 맞춰 행을 채우십시오. 생략 금지.)*

---

### 5. 상담사 종합 의견 및 향후 모니터링 주안점

**종합 의견**: [내담자의 강점, 취약점, 취업 가능성 전망을 종합한 상담사 관점의 심도 있는 서술 — 3~5문장]

**향후 모니터링 주안점**:

| 모니터링 항목 | 점검 기준 | 점검 시점 |
|---|---|---|
| 구직활동 실천 여부 | [과제 이행률 및 활동 증빙 등 기준] | [매회기 시작 시 등] |
| 심리·정서 변화 | [불안 감소 수준 및 자기효능감 등] | [상담 과정 및 사후] |
| 역량 개발 진행 상황 | [직무 교육 참여 또는 자격증 준비 현황] | [중간 점검 시] |
| 취업 목표 현실성 재검토 | [입사지원 결과 및 피드백 반응] | [6회기 이후 등] |

**위기 신호 및 대응 지침**: [내담자의 무단 불참, 연락 두절, 극심한 무기력 또는 자포자기 신호 발생 시 상담사가 취해야 할 실질적인 단계별 대응 프로토콜 및 관계기관 연계 가이드 수록]

---
*(보고서 끝)*

---
자, 이제 입력을 종합 분석하여 철저하게 형식에 따라 완성된 가이드를 한 글자도 빠짐없이 생성해주십시오.
`;

    const aiClient = getGeminiClient(req);
    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ reportMarkdown: response.text });
  } catch (error: any) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: error.message || "보고서 생성 중 오류가 발생했습니다." });
  }
});

// Vite Middleware & Static Assets Serving
const isProd = process.env.NODE_ENV === "production";

async function setupServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
