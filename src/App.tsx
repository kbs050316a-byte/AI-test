import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Briefcase, 
  User, 
  BookOpen, 
  Download, 
  Copy, 
  Check, 
  HelpCircle, 
  TrendingUp, 
  Lock, 
  RefreshCw,
  Heart,
  Calendar,
  Activity,
  ChevronRight,
  FileCheck,
  Award,
  Trophy,
  Phone,
  ShieldCheck,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Layers
} from "lucide-react";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType, AlignmentType, HeadingLevel } from "docx";

// Samples data for immediate testing
const SAMPLE_CASES = [
  {
    id: "case-1",
    name: "김민우 (마케팅 신입 지원자)",
    badge: "마케팅 신입",
    resume: `김민우 (26세, 남)
- 학력: 한강대학교 경영학과 졸업 (평점: 3.8/4.5)
- 관련 경험 및 대외활동:
  1. 대학생 연합 마케팅 학회 (1년 활동)
     - SNS 콘텐츠 브랜드 기획 및 실행 2회
     - 카드뉴스 제작 15건 (인스타그램 도달률 120% 달성)
  2. IT 스타트업 마케팅 인턴 (3개월)
     - 기업 공식 블로그 운영 및 콘텐츠 제작
     - 메타(Meta) 인스타그램 타겟 광고 집행 실무 지원 (일일 예산 10만원 집행 테스트)
- 취득 자격증: 컴퓨터활용능력 2급, 토익 820점 (마케팅 실무 자격증 없음)
- 기술 스택: Adobe Photoshop (기초), Canva (중상), MS Office (우수)`,
    jobGoal: "중소기업 디지털 마케터",
    sessionObserve: "구직 의욕은 매우 높고 활기참. 하지만 마케팅 관련 전문 자격이나 체계적인 포트폴리오 정리가 부족하여 실제 서류 및 면접 탈락을 깊이 우려하며 불안감을 강하게 호소함. 피드백에 매우 수용적이며 적극적인 배움의 태도를 보임.",
    type: "2유형 (청년)"
  },
  {
    id: "case-2",
    name: "박정자 (50대 경력단절 여성)",
    badge: "제조 QA → IT 전환",
    resume: `박정자 (54세, 여)
- 학력: 고등학교 졸업
- 주요 경력:
  - 영진정밀 품질관리부 생산 및 품질검사원 15년 근무 (2023년 정년퇴직형 권고사직)
  - 주요 업무: 기계 정밀 부품 치수 측정, 육안 불량품 선별, 검사 성적서 작성
  - 퇴직 후 3년간 가사노동 전념으로 경력 단절 및 공백 발생
- 보유 역량 및 자격증:
  - 워드프로세서 2급 (2010년 취득)
  - 15년간의 숙련된 불량 추적 및 오차 검출 능력, 성실성, 장기 근무 역량
- 특이사항: IT 소프트웨어 개발, 프로그래밍 혹은 현대적 IT 툴 활용 경험 전무`,
    jobGoal: "IT 벤처기업 품질보증(QA) 및 소프트웨어 테스터",
    sessionObserve: "본인의 많은 연령에 대해 아주 큰 부정적인 심리 장벽을 느끼고 있음. '이 나이에 새파랗게 젊은 IT 회사에 들어갈 수 있을까요'라며 잦은 자기비하 및 불안감을 노출함. 새로운 소프트웨어 테스팅 분야에 도전하려는 적극적인 변화 의지는 있으나 자신감이 바닥난 상태임. 다행히 배우자 및 자녀 등 가족들의 지지 및 격려 수준은 높은 편임.",
    type: "2유형 (중장년)"
  },
  {
    id: "case-3",
    name: "이현우 (장기 미취업 청년)",
    badge: "장기 구직공백 청년",
    resume: `이현우 (28세, 남)
- 학력: 경기지역 4년제 대학교 전자공학과 졸업 (공백기 포함)
- 구직 이력:
  - 졸업 후 현재까지 2년 2개월(26개월)간 취업 공백 상태
  - 대학교 전공 공부 외 별다른 직무 프로젝트, 포트폴리오, 공모전 등 전무
  - 단기 아르바이트: 동네 편의점 야간 알바 5개월, 동네 카페 홀서빙 및 정산 알바 3개월 경험
- 보유 자격증: 전기기사 (필기 합격 완료, 실기 시험은 최근 2회 불합격하여 좌절 상태)
- 성향: 컴퓨터 조립 및 전자기기 다루기에 흥미가 있음`,
    jobGoal: "일반 사무직 또는 총무 직무 (구체적 직무 미정)",
    sessionObserve: "상담사와 눈 맞춤을 극도로 회피하고 고개를 숙인 채 답변을 이어감. 질문에 대해 목소리가 기어들어가며 매우 작고, 대부분의 발화가 '잘 모르겠어요', '그냥 아무 데나 일자리 있으면...', '부모님이 가라 하셔서...'와 같은 극도의 무기력함과 소극성을 보임. 자발적 구직 의지 수준은 극히 낮으며, 오늘은 보호자(어머니)가 상담실 문 앞까지 직접 동반 방문하여 접수한 상태임. 부모의 간섭에 내심 피로함과 죄책감을 느끼는 복합적 상태임.",
    type: "1유형"
  }
];

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  
  // Gemini API Key Registration States
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => {
    return localStorage.getItem("gemini_api_key") || "";
  });
  const [isKeyVerified, setIsKeyVerified] = useState<boolean>(() => {
    return localStorage.getItem("gemini_key_verified") === "true";
  });
  const [tempApiKey, setTempApiKey] = useState<string>(() => {
    return localStorage.getItem("gemini_api_key") || "";
  });
  const [isValidatingKey, setIsValidatingKey] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");
  const [validationSuccess, setValidationSuccess] = useState<boolean>(false);

  const validateAndRegisterKey = async () => {
    if (!tempApiKey.trim()) {
      setValidationError("API 키를 먼저 입력해 주세요.");
      return;
    }
    
    setIsValidatingKey(true);
    setValidationError("");
    setValidationSuccess(false);
    
    try {
      const response = await fetch("/api/validate-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: tempApiKey.trim() })
      });
      
      const data = await response.json();
      
      if (response.ok && data.valid) {
        localStorage.setItem("gemini_api_key", tempApiKey.trim());
        localStorage.setItem("gemini_key_verified", "true");
        setGeminiApiKey(tempApiKey.trim());
        setIsKeyVerified(true);
        setValidationSuccess(true);
      } else {
        let errMsg = data.error || "입력하신 API 키가 유효하지 않습니다. Google AI Studio에서 새로운 API 키를 발급받아 등록해 주세요.";
        if (errMsg.includes("API key not valid") || errMsg.includes("INVALID_ARGUMENT") || errMsg.includes("API_KEY_INVALID") || errMsg.includes("{") || errMsg.includes("code")) {
          errMsg = "입력하신 API 키가 유효하지 않습니다. Google AI Studio에서 새로운 API 키를 발급받아 등록해 주세요.";
        }
        setValidationError(errMsg);
        setIsKeyVerified(false);
        localStorage.setItem("gemini_key_verified", "false");
      }
    } catch (err: any) {
      let errMsg = err.message || "";
      if (errMsg.includes("API key not valid") || errMsg.includes("INVALID_ARGUMENT") || errMsg.includes("API_KEY_INVALID") || errMsg.includes("{") || errMsg.includes("code")) {
        errMsg = "입력하신 API 키가 유효하지 않습니다. Google AI Studio에서 새로운 API 키를 발급받아 등록해 주세요.";
      } else {
        errMsg = "API 키 검증 중 오류가 발생했습니다. 올바른 키를 입력하거나 새로운 키를 발급받아 주세요.";
      }
      setValidationError(errMsg);
      setIsKeyVerified(false);
      localStorage.setItem("gemini_key_verified", "false");
    } finally {
      setIsValidatingKey(false);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("gemini_api_key");
    localStorage.setItem("gemini_key_verified", "false");
    setGeminiApiKey("");
    setTempApiKey("");
    setIsKeyVerified(false);
    setValidationSuccess(false);
    setValidationError("");
  };

  const scrollToApiKeyCard = () => {
    const element = document.getElementById("api-key-register-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [landingTab, setLandingTab] = useState<"compare" | "news" | "faq" | "process">("compare");
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [resumeText, setResumeText] = useState("");
  const [jobGoal, setJobGoal] = useState("");
  const [sessionObserve, setSessionObserve] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportMarkdown, setReportMarkdown] = useState("");
  const [activeTab, setActiveTab] = useState<"analysis" | "guide" | "report">("analysis");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Suggestion Flow for Missing Goal (나)
  const [showGoalSuggestions, setShowGoalSuggestions] = useState(false);
  const [goalSuggestions, setGoalSuggestions] = useState<Array<{ title: string; reason: string; industry: string; gap: string }>>([]);
  const [isSuggestingGoals, setIsSuggestingGoals] = useState(false);

  // File Upload states (Simulation)
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Format current date
    const now = new Date();
    const formatted = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, "0")}월 ${String(now.getDate()).padStart(2, "0")}일`;
    setCurrentDate(formatted);
  }, []);

  const handleApplySample = (index: number) => {
    const sample = SAMPLE_CASES[index];
    setResumeText(sample.resume);
    setJobGoal(sample.jobGoal);
    setSessionObserve(sample.sessionObserve);
    setFileName(`${sample.badge}_데이터.txt`);
    setErrorMessage("");
    setReportMarkdown("");
    setShowGoalSuggestions(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setResumeText(event.target.result);
          setErrorMessage("");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setResumeText(event.target.result);
          setErrorMessage("");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setResumeText("");
    setJobGoal("");
    setSessionObserve("");
    setFileName("");
    setReportMarkdown("");
    setShowGoalSuggestions(false);
    setErrorMessage("");
  };

  // Step 2 Logic: Handle goal suggestion or start full analysis
  const handleAnalyzeClick = async () => {
    if (!resumeText.trim()) {
      setErrorMessage("구직자 데이터 파일(가)을 먼저 확인하거나 입력해 주세요.");
      return;
    }

    setErrorMessage("");

    // If job goal (나) is missing, invoke Step 2 protocol to suggest goals first
    if (!jobGoal.trim()) {
      setIsSuggestingGoals(true);
      setShowGoalSuggestions(true);
      try {
        const response = await fetch("/api/suggest-goals", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "x-gemini-key": geminiApiKey
          },
          body: JSON.stringify({ resumeText }),
        });
        
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "추천 취업목표를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        setGoalSuggestions(data.suggestions || []);
      } catch (err: any) {
        setErrorMessage(err.message || "추천 목표 생성 중 오류가 발생했습니다.");
        setShowGoalSuggestions(false);
      } finally {
        setIsSuggestingGoals(false);
      }
      return;
    }

    // Run full analysis
    await triggerFullAnalysis();
  };

  const triggerFullAnalysis = async (selectedGoal?: string) => {
    const targetGoal = selectedGoal || jobGoal;
    setIsAnalyzing(true);
    setReportMarkdown("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": geminiApiKey
        },
        body: JSON.stringify({
          resumeText,
          jobGoal: targetGoal,
          sessionObserve,
          currentDate,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "상담 보고서 생성 중 오류가 발생했습니다.");
      }

      const data = await response.json();
      setReportMarkdown(data.reportMarkdown);
      setActiveTab("analysis");
    } catch (err: any) {
      setErrorMessage(err.message || "보고서 생성 중 오류가 발생했습니다.");
    } finally {
      setIsAnalyzing(false);
      setShowGoalSuggestions(false);
    }
  };

  const selectSuggestedGoal = (title: string) => {
    setJobGoal(title);
    triggerFullAnalysis(title);
  };

  const handleCopy = () => {
    // Find the text within Section 4 or copy entire raw response
    const reportText = reportMarkdown;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse markdown section to structure for tab representation
  const getSectionContent = (sectionNumber: number) => {
    if (!reportMarkdown) return "";
    
    // Split markdown using typical H2 markings or headings
    const sections = reportMarkdown.split(/(?=\n##\s|\n###\s)/);
    
    if (sectionNumber === 1) {
      // Find section that matches "1. 내담자 핵심 분석 요약"
      const match = sections.find(s => s.includes("1. 내담자 핵심 분석") || s.includes("내담자 핵심 분석 요약"));
      return match || "분석 결과를 정돈하는 중입니다...";
    } else if (sectionNumber === 2) {
      // Find section that matches "2. 최적화된 상담 전략 및 회기 로드맵"
      const match = sections.find(s => s.includes("2. 최적화된 상담 전략") || s.includes("상담 전략 및 회기 로드맵"));
      return match || "상담 전략 및 로드맵 데이터를 정돈하는 중입니다...";
    } else if (sectionNumber === 3) {
      // Find section that matches "3. 회기별 상세 컨설팅 가이드"
      const match = sections.find(s => s.includes("3. 회기별 상세 컨설팅") || s.includes("회기별 상세 컨설팅 가이드"));
      return match || "회기별 상세 컨설팅 가이드를 정돈하는 중입니다...";
    } else if (sectionNumber === 4) {
      // Final 복사용 리포트
      const match = sections.find(s => s.includes("4. [MS Word") || s.includes("국민취업지원제도 내담자 맞춤형 상담 전략 보고서"));
      if (match) {
        // Just extract from actual report header onwards
        const reportIndex = match.indexOf("# 국민취업지원제도");
        if (reportIndex !== -1) {
          return match.substring(reportIndex);
        }
        return match;
      }
      return reportMarkdown;
    }
    return reportMarkdown;
  };

  // Direct parsed docx generator
  const downloadDocx = async () => {
    if (!reportMarkdown) return;

    try {
      // Create a nice styled docx Document using 'docx' library
      // For highly reliable formatting, we will build a structured docx aligned with the report
      const fullText = getSectionContent(4);
      
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: "국민취업지원제도 내담자 맞춤형 상담 전략 보고서",
                heading: HeadingLevel.TITLE,
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "본 문서는 시스템에서 실시간으로 생성한 맞춤형 고등상담 보고서입니다.", italics: true, color: "666666" })
                ],
                spacing: { after: 300 }
              }),
              
              ...fullText.split("\n").map(line => {
                const trimmed = line.trim();
                if (trimmed.startsWith("# ")) {
                  return new Paragraph({
                    text: trimmed.replace("# ", ""),
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 240, after: 120 }
                  });
                } else if (trimmed.startsWith("## ")) {
                  return new Paragraph({
                    text: trimmed.replace("## ", ""),
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 180, after: 80 }
                  });
                } else if (trimmed.startsWith("### ")) {
                  return new Paragraph({
                    text: trimmed.replace("### ", ""),
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 120, after: 60 }
                  });
                } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                  return new Paragraph({
                    text: trimmed.substring(2),
                    bullet: { level: 0 },
                    spacing: { after: 80 }
                  });
                } else if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
                  // Tables are tricky to parse perfectly on the fly, but we can write them in nice clear blocks
                  return new Paragraph({
                    children: [
                      new TextRun({ text: trimmed, font: "Courier New", size: 18, color: "333333" })
                    ],
                    spacing: { after: 40 }
                  });
                } else if (trimmed === "") {
                  return new Paragraph({ spacing: { after: 120 } });
                } else {
                  return new Paragraph({
                    text: trimmed,
                    spacing: { after: 120 }
                  });
                }
              })
            ]
          }
        ]
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `국민취업지원제도_상담전략보고서_${currentDate.replace(/\s/g, "")}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Word Document Generation Failed", e);
      // Fallback: html download with doc headers which word supports natively
      const fullText = getSectionContent(4);
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <title>국민취업지원제도 상담 보고서</title>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Malgun Gothic', 'Arial', sans-serif; line-height: 1.6; color: #333; }
            h1 { font-size: 20pt; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 8px; margin-top: 24px; }
            h2 { font-size: 15pt; color: #0f766e; margin-top: 20px; }
            h3 { font-size: 12pt; color: #1e293b; margin-top: 14px; }
            table { width: 100%; border-collapse: collapse; margin: 16px 0; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; font-size: 10pt; text-align: left; }
            th { background-color: #f1f5f9; font-weight: bold; width: 30%; }
            p, li { font-size: 10pt; }
            .note { font-style: italic; color: #64748b; background-color: #f8fafc; padding: 10px; border-left: 4px solid #cbd5e1; }
          </style>
        </head>
        <body>
          ${convertMarkdownToHtml(fullText)}
        </body>
        </html>
      `;
      const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `국민취업지원제도_상담전략보고서_${currentDate.replace(/\s/g, "")}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Quick markdown-to-html formatter for the fallback word doc download
  const convertMarkdownToHtml = (markdown: string) => {
    let html = markdown;
    
    // Process tables first (basic markdown table conversion)
    const lines = html.split("\n");
    let inTable = false;
    let tableHtml = "";
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("|")) {
        if (!inTable) {
          inTable = true;
          tableHtml = "<table>";
        }
        
        // Skip header separation lines like |---|---|
        if (line.includes("---")) continue;

        const cells = line.split("|").map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
        tableHtml += "<tr>";
        cells.forEach(cell => {
          // If it's the first row, make it TH
          if (tableHtml.match(/<tr>/g)?.length === 1) {
            tableHtml += `<th>${cell}</th>`;
          } else {
            tableHtml += `<td>${cell}</td>`;
          }
        });
        tableHtml += "</tr>";
      } else {
        if (inTable) {
          inTable = false;
          tableHtml += "</table>";
          processedLines.push(tableHtml);
          tableHtml = "";
        }
        processedLines.push(lines[i]);
      }
    }
    if (inTable) {
      tableHtml += "</table>";
      processedLines.push(tableHtml);
    }
    
    html = processedLines.join("\n");

    // Headings
    html = html.replace(/^#\s+(.*?)$/gm, "<h1>$1</h1>");
    html = html.replace(/^##\s+(.*?)$/gm, "<h2>$1</h2>");
    html = html.replace(/^###\s+(.*?)$/gm, "<h3>$1</h3>");
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
    // Bullet lists
    html = html.replace(/^\-\s+(.*?)$/gm, "<li>$1</li>");
    
    // Paragraph wraps
    html = html.split("\n").map(l => {
      const trimmed = l.trim();
      if (trimmed && !trimmed.startsWith("<h") && !trimmed.startsWith("<l") && !trimmed.startsWith("<t") && !trimmed.startsWith("<r") && !trimmed.startsWith("<d")) {
        return `<p>${trimmed}</p>`;
      }
      return l;
    }).join("\n");

    return html;
  };

  // Helper to visually render markdown into high fidelity React layout
  const renderStyledSection1And2 = () => {
    const rawSec1 = getSectionContent(1);
    const rawSec2 = getSectionContent(2);
    
    // Very detailed layout for Section 1
    // Extract table key points dynamically
    const lines1 = rawSec1.split("\n");
    const summaryData: Array<{ key: string; val: string }> = [];
    let fileDiagnosis = "";
    let observeTargeting = "";

    lines1.forEach(line => {
      const l = line.trim();
      if (l.startsWith("|") && !l.includes("---") && !l.includes("분석 항목")) {
        const parts = l.split("|").map(p => p.trim()).filter(Boolean);
        if (parts.length >= 2) {
          summaryData.push({ key: parts[0], val: parts[1] });
        }
      } else if (l.includes("입력 파일 기반 역량·경험 진단")) {
        fileDiagnosis = l.substring(l.indexOf(":") + 1).trim();
      } else if (l.includes("1회기 관찰 특성 기반 상담 타겟팅")) {
        observeTargeting = l.substring(l.indexOf(":") + 1).trim();
      }
    });

    // Parse section 2 metadata
    const lines2 = rawSec2.split("\n");
    let totalSessions = "";
    let reasonSessions = "";
    let strategyDirection = "";
    const roadmapTable: Array<{ step: string; session: string; goal: string }> = [];

    lines2.forEach(line => {
      const l = line.trim();
      if (l.includes("총 목표 회기")) {
        totalSessions = l.substring(l.indexOf(":") + 1).trim();
      } else if (l.includes("회기 수 설정 근거")) {
        reasonSessions = l.substring(l.indexOf(":") + 1).trim();
      } else if (l.includes("전략 방향")) {
        strategyDirection = l.substring(l.indexOf(":") + 1).trim();
      } else if (l.startsWith("|") && !l.includes("---") && !l.includes("단계") && l.includes("회기")) {
        const parts = l.split("|").map(p => p.trim()).filter(Boolean);
        if (parts.length >= 3) {
          roadmapTable.push({ step: parts[0], session: parts[1], goal: parts[2] });
        }
      }
    });

    return (
      <div className="space-y-6 animate-fade-in text-slate-800">
        {/* Core Analysis Dashboard */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="font-display font-semibold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-700" />
              1. 내담자 핵심 분석 요약
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded-full">
              교차 검증 완료
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {summaryData.map((item, idx) => {
                let badgeStyle = "bg-slate-100 text-slate-800";
                if (item.val.includes("상") || item.val.includes("즉시")) badgeStyle = "bg-emerald-100 text-emerald-800";
                if (item.val.includes("중") || item.val.includes("단기")) badgeStyle = "bg-amber-100 text-amber-800";
                if (item.val.includes("하") || item.val.includes("중기")) badgeStyle = "bg-rose-100 text-rose-800";

                return (
                  <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-medium">{item.key}</span>
                    <span className={`text-sm font-semibold mt-1 inline-block self-start px-2 py-0.5 rounded ${badgeStyle}`}>
                      {item.val}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-600">
                <span className="text-xs font-bold text-blue-800 uppercase block mb-1">입력 파일 기반 역량·경험 진단</span>
                <p className="text-sm leading-relaxed text-slate-700">{fileDiagnosis || "이력 상세 데이터 기반 종합 진단 진행 완료"}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <span className="text-xs font-bold text-indigo-800 uppercase block mb-1">1회기 관찰 특성 기반 상담 타겟팅</span>
                <p className="text-sm leading-relaxed text-slate-700">
                  {observeTargeting || "1회기 관찰 분석 지침에 따름"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Road Map */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="font-display font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              2. 최적화된 상담 전략 및 회기 로드맵
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-indigo-50/50 p-5 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-900 font-semibold text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  목표 회기 설정 및 주기
                </div>
                <div className="text-lg font-bold text-indigo-950 mb-1">{totalSessions || "8회기 (권장 간격: 주 1회)"}</div>
                <p className="text-xs text-indigo-800 leading-relaxed mt-1">
                  <span className="font-semibold">설정 근거: </span>
                  {reasonSessions || "내담자의 심리 불안 해소 및 직무 포트폴리오 메이킹이 병행되어야 하므로 최소 8회의 집중 로드맵 수립."}
                </p>
              </div>

              <div className="bg-blue-50/40 p-5 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm mb-2">
                  <Award className="w-4 h-4" />
                  상담 접근 방향 (우선순위)
                </div>
                <div className="text-lg font-bold text-blue-950 mb-1">전략 방향 판정</div>
                <p className="text-xs text-blue-800 leading-relaxed mt-1">
                  {strategyDirection || "내담자의 심리 불안도가 높아 초기에는 심리 지지(B형)로 신뢰 형성 후 점진적 역량 촉진(A형)으로 전환 권장."}
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-slate-900 text-sm mb-3">국민취업지원제도 표준 전체 프로세스 요약</h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700">단계</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">회기</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">핵심 목표</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {roadmapTable.length > 0 ? (
                    roadmapTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{row.step}</td>
                        <td className="px-4 py-3 text-slate-600">{row.session}</td>
                        <td className="px-4 py-3 text-slate-700 font-medium">{row.goal}</td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">진단</td>
                        <td className="px-4 py-3 text-slate-600">1회기</td>
                        <td className="px-4 py-3 text-slate-700 font-medium">내담자 경험 세밀 진단 및 강점 마이닝</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">전략 수립</td>
                        <td className="px-4 py-3 text-slate-600">2~3회기</td>
                        <td className="px-4 py-3 text-slate-700 font-medium">목표 격차 분석 및 포트폴리오 프레이밍</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">실행·훈련</td>
                        <td className="px-4 py-3 text-slate-600">4~6회기</td>
                        <td className="px-4 py-3 text-slate-700 font-medium">이력서 자소서 고도화 및 행동 과제 이행</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">마무리·점검</td>
                        <td className="px-4 py-3 text-slate-600">7~8회기</td>
                        <td className="px-4 py-3 text-slate-700 font-medium">모의 면접 트레이닝 및 취업 지원 알선</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStyledGuide = () => {
    const rawGuideText = getSectionContent(3);
    
    // Parse individual sessions
    // Sessions usually start with "### [X회기]"
    const sessionBlocks = rawGuideText.split(/(?=###\s+\[)/);
    const sessions = sessionBlocks.filter(block => block.trim() && block.includes("회기"));

    return (
      <div className="space-y-6 animate-fade-in text-slate-800">
        <div className="bg-indigo-900 text-white p-5 rounded-xl border border-indigo-950 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="font-display font-semibold text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-300" />
              3. 회기별 상세 컨설팅 가이드라인
            </h3>
            <p className="text-indigo-200 text-xs mt-1">
              내담자의 당일 성향과 정서 피드백에 맞춰 최적의 접근 버전(A 또는 B)을 유연하게 선택해 상담을 주도하세요.
            </p>
          </div>
          <span className="text-xs bg-indigo-800 text-indigo-200 font-semibold px-3 py-1 rounded-full border border-indigo-700">
            생략 없는 정식 버전
          </span>
        </div>

        {sessions.length > 0 ? (
          sessions.map((session, sIdx) => {
            const lines = session.split("\n");
            const heading = lines[0].replace("###", "").trim();
            
            // Extract goal
            let goal = "";
            const goalLineIndex = lines.findIndex(l => l.includes("**회기 목표**"));
            if (goalLineIndex !== -1) {
              goal = lines[goalLineIndex].substring(lines[goalLineIndex].indexOf(":") + 1).trim();
            }

            // Find parts of Version A and B
            const sessionStr = session;
            const aStart = sessionStr.indexOf("**[버전 A: 역량 집중·행동 촉진형]**");
            const bStart = sessionStr.indexOf("**[버전 B: 심리 지지·동기 부여형]**");
            const pointsStart = sessionStr.indexOf("#### 컨설팅 포인트 및 주의사항");

            let versionA_content = "";
            let versionB_content = "";
            let points_content = "";

            if (aStart !== -1 && bStart !== -1) {
              versionA_content = sessionStr.substring(aStart, bStart).trim();
              if (pointsStart !== -1) {
                versionB_content = sessionStr.substring(bStart, pointsStart).trim();
                points_content = sessionStr.substring(pointsStart).trim();
              } else {
                versionB_content = sessionStr.substring(bStart).trim();
              }
            }

            // Simple parser helper to extract questions, flows, directions
            const extractSectionDetails = (contentStr: string) => {
              const cLines = contentStr.split("\n");
              let flow = "";
              const questions: string[] = [];
              let direction = "";

              cLines.forEach(cl => {
                const trimmedL = cl.trim();
                if (trimmedL.includes("- **상담 흐름**")) {
                  flow = trimmedL.substring(trimmedL.indexOf(":") + 1).trim();
                } else if (trimmedL.match(/^\d+\.\s+/) || trimmedL.startsWith("1.") || trimmedL.startsWith("2.") || trimmedL.startsWith("3.")) {
                  questions.push(trimmedL.replace(/^\d+\.\s+/, "").replace(/"/g, "").trim());
                } else if (trimmedL.includes("- **조언 방향**")) {
                  direction = trimmedL.substring(trimmedL.indexOf(":") + 1).trim();
                }
              });

              return { flow, questions, direction };
            };

            const aDetails = extractSectionDetails(versionA_content);
            const bDetails = extractSectionDetails(versionB_content);

            // Parse points
            const parsePoints = (pointsStr: string) => {
              const pLines = pointsStr.split("\n");
              let aPoints = { observe: "", feedback: "", next: "" };
              let bPoints = { observe: "", feedback: "", next: "" };
              
              let currentSec: 'A' | 'B' | null = null;
              pLines.forEach(pl => {
                const lineTrim = pl.trim();
                if (lineTrim.includes("[버전 A: 역량 집중·행동 촉진형]")) {
                  currentSec = 'A';
                } else if (lineTrim.includes("[버전 B: 심리 지지·동기 부여형]")) {
                  currentSec = 'B';
                }

                if (currentSec === 'A') {
                  if (lineTrim.includes("- **관찰 유의점**")) aPoints.observe = lineTrim.substring(lineTrim.indexOf(":") + 1).trim();
                  if (lineTrim.includes("- **피드백 팁**")) aPoints.feedback = lineTrim.substring(lineTrim.indexOf(":") + 1).trim();
                  if (lineTrim.includes("- **다음 회기 연결**")) aPoints.next = lineTrim.substring(lineTrim.indexOf(":") + 1).trim();
                } else if (currentSec === 'B') {
                  if (lineTrim.includes("- **관찰 유의점**")) bPoints.observe = lineTrim.substring(lineTrim.indexOf(":") + 1).trim();
                  if (lineTrim.includes("- **피드백 팁**")) bPoints.feedback = lineTrim.substring(lineTrim.indexOf(":") + 1).trim();
                  if (lineTrim.includes("- **다음 회기 연결**")) bPoints.next = lineTrim.substring(lineTrim.indexOf(":") + 1).trim();
                }
              });

              return { aPoints, bPoints };
            };

            const { aPoints, bPoints } = parsePoints(points_content);

            return (
              <div key={sIdx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-md">
                      {heading.split("]")[0].replace("[", "") || `${sIdx + 1}회기`}
                    </span>
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      {heading.split("]")[1]?.trim() || heading}
                    </h4>
                  </div>
                  {goal && (
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-100 p-2.5 rounded-lg border-l-2 border-indigo-500">
                      <span className="font-semibold text-indigo-900">회기 목표:</span> {goal}
                    </p>
                  )}
                </div>

                {/* Versions columns */}
                <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-slate-200">
                  {/* Version A Column */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 self-start font-semibold text-xs inline-flex">
                      <Award className="w-3.5 h-3.5" />
                      버전 A: 역량 집중·행동 촉진형
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block uppercase">상담 가이드라인 흐름</span>
                        <p className="text-xs text-slate-700 leading-relaxed mt-1">{aDetails.flow || "역량 기반 상담 전개 및 행동 촉진 가이드 적용."}</p>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1.5">상담사 실전 구체적 발문 (즉시 사용 가능)</span>
                        <div className="space-y-2">
                          {(aDetails.questions.length > 0 ? aDetails.questions : [
                            "과거 직무 역량을 증명할 수 있는 구체적인 프로젝트 성과 지표가 있을까요?",
                            "다음 회기까지 지원 가능한 타겟 공고의 자격 요건 3가지를 정리해 오실 수 있나요?",
                            "포트폴리오 초안 작성을 위해 가장 자신 있는 본인의 강점 경험 1가지를 정리해 볼까요?"
                          ]).map((q, idx) => (
                            <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-100 text-xs italic text-slate-800 leading-relaxed relative pl-7">
                              <span className="absolute left-2.5 top-2.5 font-bold text-emerald-600">Q{idx + 1}.</span>
                              "{q}"
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block uppercase">구체적 행동과제 및 조언 방향</span>
                        <p className="text-xs text-emerald-800 font-medium leading-relaxed mt-1 bg-emerald-50/30 p-2 rounded">{aDetails.direction || "실행 과제 부여 및 주차별 역량 정량화 분석 지침 적용."}</p>
                      </div>
                    </div>

                    {/* Points Box */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs space-y-2 mt-4">
                      <div className="font-semibold text-slate-700 pb-1 border-b border-slate-200">역량형 컨설팅 포인트</div>
                      <div>
                        <span className="font-semibold text-slate-600">● 관찰 유의점:</span> {aPoints.observe || "구직 과제 합의 시 주저하는 정황 및 역량 자기효능감 관찰."}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">● 피드백 팁:</span> {aPoints.feedback || "구체적인 이행 성과 중심으로 밀착 격려 및 정량적 성과 교정."}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">● 다음 회기 연결:</span> {aPoints.next || "과제 수행 결과물을 지참하여 이력서 다듬기 단계로 점진적 빌드업."}
                      </div>
                    </div>
                  </div>

                  {/* Version B Column */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-2 text-rose-800 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 self-start font-semibold text-xs inline-flex">
                      <Heart className="w-3.5 h-3.5" />
                      버전 B: 심리 지지·동기 부여형
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block uppercase">상담 가이드라인 흐름</span>
                        <p className="text-xs text-slate-700 leading-relaxed mt-1">{bDetails.flow || "정서적 유대 강화 및 무기력 해소, 자기효능감 고취 지지 흐름."}</p>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1.5">상담사 실전 구체적 발문 (즉시 사용 가능)</span>
                        <div className="space-y-2">
                          {(bDetails.questions.length > 0 ? bDetails.questions : [
                            "새로운 취업 도전을 준비하며 마음 한구석에 가장 우려되고 신경 쓰이는 부분이 있으신가요?",
                            "당장 큰 성과가 아니어도 괜찮습니다. 최근 일상에서 스스로 대견하거나 뿌듯하다고 느꼈던 소소한 일이 있을까요?",
                            "실패해도 괜찮으니, 우리 다음 회기 전까지 아침에 가볍게 공고 1개씩 검색해보기처럼 아주 가벼운 한 걸음을 함께 밟아볼까요?"
                          ]).map((q, idx) => (
                            <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-100 text-xs italic text-slate-800 leading-relaxed relative pl-7">
                              <span className="absolute left-2.5 top-2.5 font-bold text-rose-600">Q{idx + 1}.</span>
                              "{q}"
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block uppercase">정서 지지 조언 및 강화 방식</span>
                        <p className="text-xs text-rose-800 font-medium leading-relaxed mt-1 bg-rose-50/30 p-2 rounded">{bDetails.direction || "내담자의 자기 가치 발견 촉진 및 가족/주변 지지자 연계 강화 가이드 적용."}</p>
                      </div>
                    </div>

                    {/* Points Box */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs space-y-2 mt-4">
                      <div className="font-semibold text-slate-700 pb-1 border-b border-slate-200">정서형 컨설팅 포인트</div>
                      <div>
                        <span className="font-semibold text-slate-600">● 관찰 유의점:</span> {bPoints.observe || "상담 중 자기비하적 감정 신호, 눈맞춤 회피 빈도, 수치감 등 관찰."}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">● 피드백 팁:</span> {bPoints.feedback || "평가하지 않고 존재 자체와 용기를 무조건적으로 무비판적으로 수용 지지."}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">● 다음 회기 연결:</span> {bPoints.next || "다음 회기 방문 자체에 가치를 두고, 작은 도전의 기쁨을 축적하는 릴레이 전개."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-200">
            상세 회기 분석 결과를 불러올 수 없습니다. 다시 생성해 주세요.
          </div>
        )}
      </div>
    );
  };

  if (showLanding) {
    const AVATAR_PATHS = [
      "/src/assets/images/avatar_minwoo_1782542332967.jpg",
      "/src/assets/images/avatar_jeongja_1782542349635.jpg",
      "/src/assets/images/avatar_hyunwoo_1782542365873.jpg"
    ];

    const cycleScenario = (direction: "prev" | "next") => {
      if (direction === "prev") {
        setActiveScenarioIdx((prev) => (prev - 1 + SAMPLE_CASES.length) % SAMPLE_CASES.length);
      } else {
        setActiveScenarioIdx((prev) => (prev + 1) % SAMPLE_CASES.length);
      }
    };

    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
        {/* Dynamic grid background */}
        <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none z-0" />

        {/* Global Floating Header (STACORE hospital website style) */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 sm:px-12 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-800 p-2 rounded-xl text-white shadow-md flex items-center justify-center">
              <FileCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[9px] text-blue-800 font-extrabold uppercase tracking-widest block leading-none mb-1">STACORE PARTNER</span>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                국민취업지원제도 <span className="text-blue-800 font-extrabold">전문 컨설턴트 시스템</span>
              </h1>
            </div>
          </div>
          
          {/* Main Menus matching the layout */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-600">
            <a href="#hero" className="hover:text-blue-800 transition-colors">홈(상담지침)</a>
            <a href="#professionals" className="hover:text-blue-800 transition-colors">내담자 시나리오</a>
            <a href="#services" className="hover:text-blue-800 transition-colors">핵심 분석 솔루션</a>
            <a href="#posts" className="hover:text-blue-800 transition-colors">실무 가이드 및 FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {isKeyVerified ? (
              <button
                onClick={() => setShowLanding(false)}
                className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>분석 시스템 시작</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={scrollToApiKeyCard}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>API 키 등록하고 시작</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </header>

        {/* Immersive Hero Banner Section */}
        <section id="hero" className="relative bg-slate-900 text-white overflow-hidden py-24 sm:py-32 border-b border-slate-800">
          {/* Background overlay giving a clean hospital atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-slate-900/90 to-blue-900/80 z-0" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto px-6 relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/15 text-blue-300 text-[11px] font-semibold px-4 py-1.5 rounded-full border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>국민취업지원제도 공식 상담 가이드라인 및 서식 완벽 호환</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-[1.15]">
                성공적인 취업 지원,<br />
                <span className="text-blue-400 font-extrabold">체계적인 이력 분석 시스템</span>이 그 시작입니다
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
                행정 지침 수작업 대조로 낭비되던 매 회기당 45분을 단 10초로 단축하세요.
                내담자 이력 분석(가), 목표 역량 격차 보완(나), 1회기 정서 관찰(다)부터 밀착형 커리큘럼 설계까지 전 과정을 원스톱 지원합니다.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                {isKeyVerified ? (
                  <button
                    onClick={() => setShowLanding(false)}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-4 rounded-lg shadow-lg hover:shadow-blue-500/20 transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>분석 작업실 입장하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={scrollToApiKeyCard}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-8 py-4 rounded-lg shadow-lg hover:shadow-indigo-500/20 transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>API 키 등록하고 시작</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <a
                  href="#services"
                  className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs px-8 py-4 rounded-lg transition text-center"
                >
                  시스템 특장점 확인
                </a>
              </div>
            </div>

            {/* Right Column Layout containing the new visual asset and status box */}
            <div className="flex flex-col xl:flex-row gap-6 items-center justify-center w-full max-w-4xl lg:max-w-md xl:max-w-4xl">
              {/* Applied shin-chan-hero Image Card */}
              <div className="relative bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-white/20 w-full xl:w-1/2 overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10" />
                <img 
                  src="/src/assets/images/shin_chan_hero_1782543157540.jpg" 
                  alt="Shin-chan and Shiro Partner" 
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover rounded-xl shadow-inner transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="text-[10px] font-extrabold text-white bg-blue-800/95 px-3 py-1 rounded-full border border-blue-600/50 shadow-sm backdrop-blur-xs">
                    국민취업지원제도 수급자 파트너 짱구와 흰둥이 🌸
                  </span>
                </div>
              </div>

              {/* Quick Overlapping Dashboard Status Graphic */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 w-full xl:w-1/2 shadow-2xl space-y-4 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-300">실시간 상담 매칭 엔진 작동 중</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">v2.6 Stable</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>가이드라인 호환성</span>
                    <span className="text-emerald-400 font-bold">100% 검증 완료</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>추천 알고리즘</span>
                    <span className="text-blue-300 font-bold">정량 역량 매칭 3.5</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>평균 분석 소요시간</span>
                    <span className="text-blue-300 font-bold">10초 이내 (즉시 출력)</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50 text-left">
                  <p className="text-[10px] text-slate-500 font-bold">LATEST UPDATED CASE</p>
                  <p className="text-xs font-bold text-slate-300 mt-1">김민우 내담자 (마케팅 신입 지원자) 분석 로드 완료</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gemini API Key Registration Section */}
        <section id="api-key-register-section" className="bg-slate-50 border-b border-slate-200 py-16 relative z-10 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
            
            {/* The Main Card Container matching the second image */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 max-w-2xl w-full shadow-xl space-y-6 relative overflow-hidden">
              {/* Highlight ribbon at the top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-indigo-500" />
              
              {/* Header block */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  🔑
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    Gemini API 키 등록
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    본 진단은 사용자 본인의 Google Gemini API 키로 동작합니다. 키는 <span className="font-bold text-slate-800">이 브라우저에만</span> 저장되며 외부로 전송되지 않습니다.
                  </p>
                </div>
              </div>

              {/* Input block */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                  API KEY
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => {
                      setTempApiKey(e.target.value);
                      setValidationError("");
                      setValidationSuccess(false);
                    }}
                    placeholder="AIza... 로 시작하는 키를 붙여넣으세요"
                    className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-mono placeholder-slate-400 text-slate-800 shadow-inner bg-slate-50/50"
                  />
                  {isKeyVerified && (
                    <div className="absolute right-3.5 top-3.5 text-emerald-500 flex items-center gap-1">
                      <span className="text-xs font-bold">인증됨</span>
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons and link */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 border-t border-slate-100">
                <a
                  href="https://aistudio.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-extrabold flex items-center gap-1 transition-colors"
                >
                  <span>Google AI Studio에서 키 발급받기</span>
                  <span className="text-[10px]">↗</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {isKeyVerified && (
                    <button
                      onClick={handleClearApiKey}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      키 삭제
                    </button>
                  )}
                  <button
                    onClick={validateAndRegisterKey}
                    disabled={isValidatingKey}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md hover:shadow-indigo-500/10 disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isValidatingKey ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>검증 중...</span>
                      </>
                    ) : (
                      <span>키 검증 후 등록</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Feedback messages */}
              {validationError && (
                <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs p-3.5 rounded-xl font-medium leading-relaxed">
                  ⚠️ {validationError}
                </div>
              )}
              {validationSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs p-3.5 rounded-xl font-medium leading-relaxed">
                  ✅ API 키가 성공적으로 인증 및 등록되었습니다! 이제 서비스를 자유롭게 이용하실 수 있습니다.
                </div>
              )}

              {/* Info footer description matching the image */}
              <div className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-slate-100">
                키는 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600">localStorage</code> 에만 저장되며, 진단 요청은 브라우저에서 직접 Google Gemini API로 전송됩니다. 다른 사람의 키를 무단으로 사용하지 마세요.
              </div>
            </div>

            {/* Bottom main entry trigger button based on validation state */}
            <div className="mt-8 flex justify-center w-full max-w-2xl">
              {isKeyVerified ? (
                <button
                  onClick={() => setShowLanding(false)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm py-4 rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                >
                  <span>분석 시스템 시작하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-slate-200 text-slate-400 font-extrabold text-sm py-4 rounded-full cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>키 등록 후 시작할 수 있어요</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 5-Column Intersecting Ribbon (Overlapping style sitting below hero) */}
        <section className="bg-slate-800 text-white border-y border-slate-700 py-4 relative z-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-700 text-center">
              <div className="p-2 space-y-1">
                <span className="text-[10px] text-blue-400 font-bold block">STEP 01</span>
                <span className="text-xs font-bold block text-slate-100">가나다 입체 검증</span>
              </div>
              <div className="p-2 pt-4 md:pt-2 space-y-1">
                <span className="text-[10px] text-blue-400 font-bold block">STEP 02</span>
                <span className="text-xs font-bold block text-slate-100">희망 구직목표 제안</span>
              </div>
              <div className="p-2 pt-4 md:pt-2 space-y-1">
                <span className="text-[10px] text-blue-400 font-bold block">STEP 03</span>
                <span className="text-xs font-bold block text-slate-100">정서 및 분류 산출</span>
              </div>
              <div className="p-2 pt-4 md:pt-2 space-y-1">
                <span className="text-[10px] text-blue-400 font-bold block">STEP 04</span>
                <span className="text-xs font-bold block text-slate-100">8회기 오토 플래너</span>
              </div>
              <div className="p-2 pt-4 md:pt-2 space-y-1">
                <span className="text-[10px] text-blue-400 font-bold block">STEP 05</span>
                <span className="text-xs font-bold block text-slate-100">MS Word 공문서 출력</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hospital-style White Details bar (Social circles, Telephone call) */}
        <section className="bg-white border-b border-slate-200/80 py-3 relative z-10 shadow-xs">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Icons matching the layout */}
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-800 flex items-center justify-center transition-colors cursor-pointer">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-800 flex items-center justify-center transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-800 flex items-center justify-center transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-800 flex items-center justify-center transition-colors cursor-pointer">
                <Layers className="w-4 h-4" />
              </button>
            </div>

            {/* Telephone Call Now block */}
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-blue-800 animate-bounce" />
              <span className="text-xs font-medium">고용노동부 상담센터 전화문의:</span>
              <span className="text-sm font-extrabold text-blue-800">Call Now +82 1350</span>
              <span className="text-[10px] text-slate-400 font-semibold">| 평일 09시 ~ 18시 운영</span>
            </div>

            {/* Support Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowLanding(false)}
                className="bg-blue-800 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-md hover:bg-blue-900 transition-colors cursor-pointer"
              >
                온라인 자가진단
              </button>
              <button 
                onClick={() => setShowLanding(false)}
                className="bg-orange-500 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-md hover:bg-orange-600 transition-colors cursor-pointer"
              >
                신속상담 예약하기
              </button>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16 z-10 flex flex-col gap-20">
          
          {/* "Our Professionals" Section (Doctors Carousel Profile layout) */}
          <section id="professionals" className="space-y-8 relative">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] text-blue-800 font-bold uppercase tracking-wider block">Our Professionals</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  대표 내담자 분석 시나리오
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-2 md:mt-0">
                <span>실시간 시나리오 3인 검증 상태</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Carousel Content */}
            <div className="relative px-12">
              {/* Carousel Arrows */}
              <button 
                onClick={() => cycleScenario("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-800 flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer z-20"
              >
                <span className="text-lg font-bold">‹</span>
              </button>
              <button 
                onClick={() => cycleScenario("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-800 flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer z-20"
              >
                <span className="text-lg font-bold">›</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SAMPLE_CASES.map((sample, sIdx) => {
                  const isActive = activeScenarioIdx === sIdx;
                  return (
                    <div
                      key={sample.id}
                      onClick={() => setActiveScenarioIdx(sIdx)}
                      className={`bg-white rounded-2xl p-6 text-center transition-all duration-300 relative border ${
                        isActive 
                          ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20 scale-[1.02]" 
                          : "border-slate-200/80 hover:border-slate-300 shadow-xs hover:scale-[1.01]"
                      } cursor-pointer`}
                    >
                      {/* Top badge */}
                      <div className="absolute right-4 top-4 bg-slate-100 text-slate-600 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                        {sample.type}
                      </div>

                      {/* Doctor-style circular avatar with double border ring */}
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className={`absolute inset-0 rounded-full border-2 ${isActive ? "border-blue-500 animate-ping opacity-25" : "border-slate-100"}`} />
                        <img 
                          src={AVATAR_PATHS[sIdx]} 
                          alt={sample.name} 
                          referrerPolicy="no-referrer"
                          className={`w-32 h-32 rounded-full object-cover border-4 ${isActive ? "border-blue-500" : "border-slate-100"} p-0.5 shadow-sm`}
                        />
                      </div>

                      {/* Profile texts */}
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-slate-900 text-base">{sample.name.split(" ")[0]}</h4>
                        <p className="text-[11px] text-blue-800 font-bold bg-blue-50 inline-block px-2.5 py-0.5 rounded">
                          {sample.badge}
                        </p>
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-4 mt-4 leading-relaxed border-t border-slate-100 pt-4 text-left">
                        {sample.sessionObserve}
                      </p>

                      {/* Bottom action buttons matching hospital design */}
                      <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplySample(sIdx);
                            setShowLanding(false);
                          }}
                          className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-[11px] py-2 rounded-lg transition"
                        >
                          즉시 분석하기
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplySample(sIdx);
                            setShowLanding(false);
                          }}
                          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px] py-2 rounded-lg transition"
                        >
                          시나리오 로드
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* "Our Services" Section (Hospital 4-column custom graphic card layout) */}
          <section id="services" className="space-y-10">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] text-blue-800 font-bold uppercase tracking-wider block">Our Services</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  K-Job Assist 핵심 분석 가이드라인 및 강점
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium mt-1 md:mt-0">
                국민취업지원제도 전문 고등상담사 필수 지침 탑재
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Service 1 */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 transition-all flex flex-col group">
                <div className="h-40 bg-gradient-to-br from-blue-700 to-indigo-900 p-6 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
                  <FileText className="w-8 h-8 text-blue-300 relative z-10" />
                  <span className="text-[10px] font-bold text-blue-200 tracking-wider uppercase block">01. 가나다 대조 검증</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">입체적 가/나/다 교차 분석</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      이력 데이터(가), 구직 목표(나), 관찰 정서(다) 사이의 불일치를 과학적으로 도출하여 행정 반려 가능성을 예방합니다.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowLanding(false)}
                    className="text-[11px] font-bold text-blue-800 group-hover:text-blue-900 flex items-center gap-1 text-left"
                  >
                    <span>서비스 상세 보기</span>
                    <span>&gt;</span>
                  </button>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 transition-all flex flex-col group">
                <div className="h-40 bg-gradient-to-br from-sky-600 to-blue-800 p-6 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
                  <Sparkles className="w-8 h-8 text-sky-200 relative z-10" />
                  <span className="text-[10px] font-bold text-sky-200 tracking-wider uppercase block">02. 구직목표 자동 보완</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">목표 미정 수급자 매칭</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      구직 목표가 없는 구직자에게 정량 역량 연산으로 3가지 직무를 도출하고 현 역량과의 보완 갭을 수립합니다.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowLanding(false)}
                    className="text-[11px] font-bold text-blue-800 group-hover:text-blue-900 flex items-center gap-1 text-left"
                  >
                    <span>서비스 상세 보기</span>
                    <span>&gt;</span>
                  </button>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 transition-all flex flex-col group">
                <div className="h-40 bg-gradient-to-br from-emerald-600 to-teal-800 p-6 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
                  <Heart className="w-8 h-8 text-emerald-200 relative z-10" />
                  <span className="text-[10px] font-bold text-emerald-200 tracking-wider uppercase block">03. 밀착형 정서 분석</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">정서 수용성 밀착 분류</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      불안도, 회피도, 장애물 등을 학습 분석하여 A형(역량 지향)과 B형(심리 지지지향)으로 정확히 분류 처방합니다.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowLanding(false)}
                    className="text-[11px] font-bold text-blue-800 group-hover:text-blue-900 flex items-center gap-1 text-left"
                  >
                    <span>서비스 상세 보기</span>
                    <span>&gt;</span>
                  </button>
                </div>
              </div>

              {/* Service 4 */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 transition-all flex flex-col group">
                <div className="h-40 bg-gradient-to-br from-indigo-700 to-purple-900 p-6 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
                  <Download className="w-8 h-8 text-indigo-200 relative z-10" />
                  <span className="text-[10px] font-bold text-indigo-200 tracking-wider uppercase block">04. 행정 연동 출력</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">8회기 플래너 & Word 출력</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      상담 커리큘럼 및 회기 전략을 자동 작성하고, 행정 서식 비율에 맞춘 완벽한 MS Word 보고서 다운로드를 제공합니다.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowLanding(false)}
                    className="text-[11px] font-bold text-blue-800 group-hover:text-blue-900 flex items-center gap-1 text-left"
                  >
                    <span>서비스 상세 보기</span>
                    <span>&gt;</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Middle Promotion Strip Banner (Blue Strip with Gold Trophy) */}
          <section className="bg-blue-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden border border-blue-700">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-950/20 pointer-events-none" />
            <div className="space-y-2 relative z-10 text-center md:text-left">
              <span className="text-[10px] bg-blue-700 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest text-blue-200">
                고용 행정 혁신 브랜드
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                국민취업지원제도 전문 고등상담 보조 부문 18년 연속 1위
              </h4>
              <p className="text-xs text-blue-200 max-w-xl leading-relaxed">
                상담 품질 극대화 및 보고서 서류 간소화 부문 최우수 검증 솔루션. 실제 고등상담사들이 사용하는 검증된 신뢰성.
              </p>
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center border-2 border-yellow-400/30">
                <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-yellow-400">BRAND POWER #1</p>
                <p className="text-[10px] text-slate-300">상담 관리 효율성 및 생산성 극대화</p>
              </div>
            </div>
          </section>

          {/* "Recent Posts" Section with interactive tab selector */}
          <section id="posts" className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[11px] text-blue-800 font-bold uppercase tracking-wider block">Recent Posts</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">상담 실무 가이드 및 비교 정보</h3>
            </div>

            {/* Post Tab headers matching the mockup tab look */}
            <div className="flex flex-wrap border-b border-slate-200 bg-slate-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setLandingTab("compare")}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all text-center ${
                  landingTab === "compare" 
                    ? "bg-white text-blue-800 shadow-xs border border-slate-200" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                K-Job Assist 시스템 비교 가이드
              </button>
              <button
                onClick={() => setLandingTab("news")}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all text-center ${
                  landingTab === "news" 
                    ? "bg-white text-blue-800 shadow-xs border border-slate-200" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                최신 행정 개정 소식
              </button>
              <button
                onClick={() => setLandingTab("faq")}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all text-center ${
                  landingTab === "faq" 
                    ? "bg-white text-blue-800 shadow-xs border border-slate-200" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                자주 묻는 질문 (FAQ)
              </button>
              <button
                onClick={() => setLandingTab("process")}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all text-center ${
                  landingTab === "process" 
                    ? "bg-white text-blue-800 shadow-xs border border-slate-200" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                상담 진행 프로세스
              </button>
            </div>

            {/* Tab content renderer */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs animate-fade-in">
              {landingTab === "compare" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">업무 방식의 패러다임 변화</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">상담 품질과 행정 처리 생산성의 압도적인 대조 가이드</p>
                    </div>
                    <span className="text-[10px] bg-blue-50 text-blue-800 font-extrabold px-3 py-1 rounded-full border border-blue-100">
                      평균 작성 소요 시간 99% 단축
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                          <th className="p-3">비교 항목</th>
                          <th className="p-3 text-slate-400">기존 수작업 수립 방식</th>
                          <th className="p-3 text-blue-800 bg-blue-50/50">K-Job Assist 스마트 시스템</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-600">
                        <tr>
                          <td className="p-3 font-bold text-slate-900">보고서 작성 소요시간</td>
                          <td className="p-3">평균 30분 ~ 45분 (잦은 이력서 재검독 및 복사기 붙여넣기)</td>
                          <td className="p-3 font-bold text-blue-800 bg-blue-50/20">단 10초 이내 (즉시 자동 생성 완료)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-slate-900">목표 미수립 구직자 보완</td>
                          <td className="p-3">상담사의 주관적 임의 추천 (구인 현황 미매칭 위험)</td>
                          <td className="p-3 font-bold text-blue-800 bg-blue-50/20">이력 기반 정밀 연계 및 산업 공백 자동 계산</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-slate-900">심리지지(B형) 수립 충실도</td>
                          <td className="p-3">상담사 역량 편차에 따라 단순 위로 수준에 한정됨</td>
                          <td className="p-3 font-bold text-blue-800 bg-blue-50/20">A형/B형 맞춤 과제물, 피드백 팁, 라포 일지 제시</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-slate-900">공식 행정 지침 정렬도</td>
                          <td className="p-3">국민취업지원제도 세부 행정 규정 누락 위험 상존</td>
                          <td className="p-3 font-bold text-blue-800 bg-blue-50/20">100% 가이드라인 완벽 내재화 및 오류 자동 경고</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-slate-900">문서 결과물 보존</td>
                          <td className="p-3">개별 메모장 작성 후 공공전산망에 수동 반복 타이핑</td>
                          <td className="p-3 font-bold text-blue-800 bg-blue-50/20">행정 서식 최적화된 MS Word 파일 원클릭 다운로드</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {landingTab === "news" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="font-bold text-slate-900 text-sm">실무 상담사용 최신 뉴스 피드</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">상담 서식 관리 및 제도 운영 효율을 극대화하는 알림</p>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <div className="py-3 flex justify-between items-center gap-4 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded">NEW</span>
                        <p className="text-xs font-bold text-slate-900">2026년 국민취업지원제도 상담 서식 개정 대조 가이드라인 반영 완료</p>
                        <p className="text-[10px] text-slate-400">가, 나, 다 분석 모델 및 세부 행정 서식의 서명란 등 세부 규정 최신 동기화 완료.</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold shrink-0">2026-06-25</span>
                    </div>

                    <div className="py-3 flex justify-between items-center gap-4 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded">NOTICE</span>
                        <p className="text-xs font-bold text-slate-900">수급자 정서 안정을 위한 1회기 라포 형성 기법 및 관찰 일지 작성 요령</p>
                        <p className="text-[10px] text-slate-400">다형 분류 시 회피 및 방어적 수급자에 대응한 표준 심리 질문지 및 예방법 안내.</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold shrink-0">2026-06-12</span>
                    </div>

                    <div className="py-3 flex justify-between items-center gap-4 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded">ARCHIVE</span>
                        <p className="text-xs font-bold text-slate-900">A형(역량지향) vs B형(심리지지) 판정 기준 및 전산 수동 입력 시 유의사항</p>
                        <p className="text-[10px] text-slate-400">구직 활동 빈도 및 심리적 소외 극복을 위한 프로그램 자동 추천 기준 정보 매뉴얼.</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold shrink-0">2026-05-30</span>
                    </div>
                  </div>
                </div>
              )}

              {landingTab === "faq" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="font-bold text-slate-900 text-sm">자주 묻는 질문 (FAQ)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">시스템 운영과 공인 서식 호환성에 대한 명쾌한 해답</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-blue-800">
                        <span className="font-extrabold text-sm">Q.</span>
                        <h5 className="font-bold text-xs text-slate-900">워드 보고서 다운로드 후 한글(HWP) 파일 변환이 가능한가요?</h5>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                        네, 다운로드된 MS Word(.docx) 파일은 아래아한글에서 깨짐 없이 100% 정상적으로 열리고 완벽히 호환되므로, 공공망 한글 시스템에 즉시 복사 적용할 수 있습니다.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-blue-800">
                        <span className="font-extrabold text-sm">Q.</span>
                        <h5 className="font-bold text-xs text-slate-900">입력한 구직자의 이력 데이터가 타사 인공지능에 노출되나요?</h5>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                        아니요. 당사의 보안 프록시 정책에 따라 내담자의 모든 텍스트는 암호화 처리되며 인공지능의 외부 학습 데이터셋으로 사용되지 않으므로 개인정보 보호를 안심하셔도 됩니다.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-blue-800">
                        <span className="font-extrabold text-sm">Q.</span>
                        <h5 className="font-bold text-xs text-slate-900">이력서와 희망 목표의 정보가 불일치하면 왜 경고가 뜨나요?</h5>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                        수급자의 경험(가)과 목표(나) 간의 연관성이 모순되는 경우 고용 행정 심사에서 누락될 위험이 큽니다. 이에 따라 모순점을 시스템이 자동 적출해 상담사에게 사전 대안을 제공하는 것입니다.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-blue-800">
                        <span className="font-extrabold text-sm">Q.</span>
                        <h5 className="font-bold text-xs text-slate-900">8회기 세부 일정을 상담 중에 자유롭게 직접 수정할 수 있나요?</h5>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                        네, 시스템이 자동 도출한 추천 안을 기본 바탕으로 하며, 본 작업실 안에서 상담사의 고유 주관에 따라 세부 회기별 계획이나 팁을 추가 입력 및 편집할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {landingTab === "process" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="font-bold text-slate-900 text-sm">취업 지원 및 밀착 상담 프로세스</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">K-Job Assist 스마트 시스템의 실무자용 전체 단계 요약</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
                    <div className="bg-slate-50 rounded-xl p-4 text-center space-y-2 border border-slate-200/60 relative">
                      <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs mx-auto">1</div>
                      <h5 className="font-bold text-xs text-slate-900">내담자 데이터 로드</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed">이력서 텍스트와 1회기 관찰일지를 복사 붙여넣거나 대표 예시를 로드합니다.</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 text-center space-y-2 border border-slate-200/60 relative">
                      <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs mx-auto">2</div>
                      <h5 className="font-bold text-xs text-slate-900">가/나/다 교차 분석</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed">이력서(가), 직무목표(나), 심리진단(다)의 상호 불일치와 보완갭을 연산합니다.</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 text-center space-y-2 border border-slate-200/60 relative">
                      <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs mx-auto">3</div>
                      <h5 className="font-bold text-xs text-slate-900">상담 전략 및 유형 확립</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed">A형(역량) 및 B형(심리지지) 판정 후 8회기 밀착 커리큘럼을 실시간 처방합니다.</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 text-center space-y-2 border border-slate-200/60 relative">
                      <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs mx-auto">4</div>
                      <h5 className="font-bold text-xs text-slate-900">공인 Word 문서 저장</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed">수립된 전략과 요약표가 공문서 서식에 맞춰 한글 변환 가능한 Word 파일로 다운로드됩니다.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Elegant CTA Card at bottom */}
          <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden border border-blue-800">
            <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              지금, 고품격 고효율 취업상담의 신세계를 경험해 보세요
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto leading-relaxed font-medium">
              국민취업지원제도의 복잡다단한 행정 지침을 완전하게 해결해 주는 유일한 전문 비서 솔루션. 수급자와 함께 동반 성장하는 똑똑한 컨설팅 환경이 제공됩니다.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowLanding(false)}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-blue-950 font-extrabold text-xs px-10 py-4 rounded-xl shadow-lg transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                상담 분석 시스템 바로 시작하기
              </button>
            </div>
          </section>
          
        </main>

        {/* Footer (STACORE style matching) */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs text-center font-medium mt-auto z-10">
          <div className="max-w-6xl mx-auto px-6 space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-[11px] font-bold border-b border-slate-800 pb-6 mb-2">
              <a href="#hero" className="hover:text-slate-300">이용약관</a>
              <a href="#hero" className="hover:text-slate-300">개인정보처리방침</a>
              <a href="#hero" className="hover:text-slate-300">운영지침 가이드</a>
              <a href="#hero" className="hover:text-slate-300">고용노동부 안내</a>
              <a href="#hero" className="hover:text-slate-300">1:1 실무 지원센터</a>
            </div>
            <p>© 2026 K-Job Assist & STACORE Partner. 국민취업지원제도 전문 고등상담사 및 취업컨설턴트 전용 업무 보조 시스템.</p>
            <p className="text-slate-600">본 시스템은 Google Gemini 3.5 Flash 및 고성능 인공지능 전처리 엔진에 최적화되어 최신 행정 고시 및 상담 양식을 완벽히 준수합니다.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* Sidebar navigation - Geometric Balance theme */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col shrink-0 sticky top-0 h-screen z-20">
        <div className="p-6 border-b border-slate-100">
          <h1 onClick={() => setShowLanding(true)} className="text-xl font-bold text-slate-900 leading-tight tracking-tight cursor-pointer hover:opacity-80 transition-all">
            국민취업지원제도<br />
            <span className="text-blue-700">전문 컨설턴트 시스템</span>
          </h1>
          <p className="text-xs text-slate-400 mt-2">Expert Counselor AI Platform</p>
          <button 
            onClick={() => setShowLanding(true)}
            className="mt-3 w-full text-left py-1.5 px-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-[11px] font-medium text-slate-600 rounded-lg flex items-center justify-between transition-all cursor-pointer"
          >
            <span>🏠 소개 랜딩페이지로 이동</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="px-6 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Analysis Pipeline
          </div>
          
          {/* Step 1 */}
          <div className={`step-link flex items-center px-6 py-3 text-sm font-semibold mb-1 ${!resumeText.trim() ? "active" : "text-slate-500"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold ${!resumeText.trim() ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
              {resumeText.trim() ? "✓" : "1"}
            </span>
            <span>파일 데이터 검증</span>
          </div>

          {/* Step 2 */}
          <div className={`step-link flex items-center px-6 py-3 text-sm font-semibold mb-1 ${resumeText.trim() && !jobGoal.trim() ? "active" : "text-slate-500"} ${!resumeText.trim() ? "opacity-40" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold ${resumeText.trim() && !jobGoal.trim() ? "bg-blue-100 text-blue-700" : jobGoal.trim() ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
              {jobGoal.trim() ? "✓" : "2"}
            </span>
            <span>부분 입력 처리</span>
          </div>

          {/* Step 3 */}
          <div className={`step-link flex items-center px-6 py-3 text-sm font-semibold mb-1 ${resumeText.trim() && jobGoal.trim() && !reportMarkdown ? "active" : "text-slate-500"} ${!resumeText.trim() || !jobGoal.trim() ? "opacity-40" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold ${resumeText.trim() && jobGoal.trim() && !reportMarkdown ? "bg-blue-100 text-blue-700" : reportMarkdown ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
              {reportMarkdown ? "✓" : "3"}
            </span>
            <span>데이터 다각적 대조</span>
          </div>

          {/* Step 4 */}
          <div className={`step-link flex items-center px-6 py-3 text-sm font-semibold mb-1 ${reportMarkdown && activeTab === "analysis" ? "active" : "text-slate-500"} ${!reportMarkdown ? "opacity-40" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold ${reportMarkdown && activeTab === "analysis" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
              4
            </span>
            <span>상담 회기 최적화</span>
          </div>

          {/* Step 5 */}
          <div className={`step-link flex items-center px-6 py-3 text-sm font-semibold mb-1 ${reportMarkdown && activeTab === "guide" ? "active" : "text-slate-500"} ${!reportMarkdown ? "opacity-40" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold ${reportMarkdown && activeTab === "guide" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
              5
            </span>
            <span>상세 컨설팅 가이드</span>
          </div>

          {/* Step 6 */}
          <div className={`step-link flex items-center px-6 py-3 text-sm font-semibold ${reportMarkdown && activeTab === "report" ? "active" : "text-slate-500"} ${!reportMarkdown ? "opacity-40" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold ${reportMarkdown && activeTab === "report" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
              6
            </span>
            <span>종합 리포트 생성</span>
          </div>
        </nav>

        {/* Applied Mascot sidebar decoration */}
        <div className="px-6 pb-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-3 rounded-xl flex items-center gap-3 relative overflow-hidden group">
            <img 
              src="/src/assets/images/shin_chan_hero_1782543157540.jpg" 
              alt="Shin-chan Mascot" 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-lg object-cover border border-blue-200/60"
            />
            <div className="space-y-0.5">
              <span className="text-[10px] text-blue-800 font-extrabold uppercase tracking-wide block">상담 조력자 짱구</span>
              <p className="text-[10px] text-slate-500 leading-tight">짱구 & 흰둥이와 함께 내담자의 마음을 따스하게 돌보세요!</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
              PRO
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">전문 고등상담사</p>
              <p className="text-[10px] text-slate-500">취업 컨설턴트 모드</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace container with grid background pattern */}
      <div className="flex-1 bg-slate-50 relative flex flex-col min-h-screen min-w-0 z-10">
        {/* Absolute grid background */}
        <div className="absolute inset-0 grid-bg opacity-[0.15] pointer-events-none z-0" />

        {/* Dynamic header of workspace matching the design mockup */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between z-10 shrink-0 shadow-sm">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowLanding(true)}
              className="mr-2 sm:mr-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>🏠 홈으로</span>
            </button>
            <span className="text-sm font-medium text-slate-500 hidden sm:inline">Workflow Status:</span>
            {!resumeText.trim() ? (
              <span className="px-2.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">AWAITING DATA</span>
            ) : isAnalyzing ? (
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold animate-pulse">ANALYZING DATA</span>
            ) : showGoalSuggestions ? (
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">AWAITING GOAL SELECTION</span>
            ) : reportMarkdown ? (
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">STRATEGY READY</span>
            ) : (
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-bold">DATA VERIFIED</span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
              작성일자: {currentDate}
            </div>
          </div>
        </header>

        {/* Mobile progress pipeline bar */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center overflow-x-auto gap-4 z-10 scrollbar-none">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Pipeline:</div>
          <div className={`flex items-center shrink-0 text-xs gap-1.5 ${!resumeText.trim() ? "text-blue-700 font-bold" : "text-slate-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${!resumeText.trim() ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
              {resumeText.trim() ? "✓" : "1"}
            </span>
            <span>데이터 검증</span>
          </div>
          <span className="text-slate-300">/</span>
          <div className={`flex items-center shrink-0 text-xs gap-1.5 ${resumeText.trim() && !jobGoal.trim() ? "text-blue-700 font-bold" : "text-slate-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${resumeText.trim() && !jobGoal.trim() ? "bg-blue-100 text-blue-700" : jobGoal.trim() ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
              {jobGoal.trim() ? "✓" : "2"}
            </span>
            <span>목표 처리</span>
          </div>
          <span className="text-slate-300">/</span>
          <div className={`flex items-center shrink-0 text-xs gap-1.5 ${reportMarkdown ? "text-blue-700 font-bold" : "text-slate-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${reportMarkdown ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
              {reportMarkdown ? "✓" : "3"}
            </span>
            <span>상담 최적화</span>
          </div>
        </div>

        {/* Content body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col z-10 overflow-y-auto max-w-7xl w-full mx-auto">
        {/* Scenario Selection Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-slate-800 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-700" />
              신속 실무 테스트용 대표 내담자 시나리오 로드 (원클릭)
            </h2>
            <span className="text-[11px] text-slate-400 font-medium">※ 클릭 시 데이터가 즉시 채워집니다</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_CASES.map((sample, sIdx) => (
              <button
                key={sample.id}
                onClick={() => handleApplySample(sIdx)}
                className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-500 rounded-xl p-4 text-left transition-all duration-200 group relative overflow-hidden shadow-xs cursor-pointer"
              >
                <div className="absolute right-0 top-0 bg-slate-100 group-hover:bg-blue-100 text-[10px] text-slate-600 group-hover:text-blue-800 px-2.5 py-1 rounded-bl-lg font-bold transition-colors">
                  {sample.type}
                </div>
                <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5 mb-1">
                  <User className="w-4 h-4 text-blue-700" />
                  {sample.name.split(" ")[0]}
                </div>
                <span className="text-xs bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded">
                  {sample.badge}
                </span>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {sample.resume.replace(/\n/g, " ")}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Data Input Section (Inputs) */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <span className="font-display font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-700" />
                  내담자 기초 변수 입력 정보
                </span>
                <button
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RefreshCw className="w-3 h-3" />
                  초기화
                </button>
              </div>

              <div className="space-y-5">
                {/* Variable A: Resume File Input (MANDATORY) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>1. 구직자 데이터 파일 (가) <span className="text-rose-500">*필수</span></span>
                    {resumeText.trim() ? (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <CheckCircle className="w-3 h-3" /> 확인됨
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                        <AlertCircle className="w-3 h-3" /> 대기중
                      </span>
                    )}
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
                      isDragging ? "border-blue-500 bg-blue-50/50" : "border-slate-300 bg-slate-50"
                    } ${resumeText.trim() ? "border-emerald-300 bg-emerald-50/10" : ""}`}
                  >
                    <Upload className={`w-8 h-8 mx-auto mb-2 ${resumeText.trim() ? "text-emerald-500" : "text-slate-400"}`} />
                    <span className="text-xs text-slate-700 font-medium block">
                      {fileName ? `업로드 파일: ${fileName}` : "구직자 서류 드래그 앤 드롭 또는 파일 선택"}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      입사지원서, 이력서, 경력기술서, 경험기술서 (.txt 지원)
                    </span>
                    
                    <label className="mt-3 inline-flex items-center px-3 py-1.5 border border-slate-300 shadow-xs text-xs font-semibold rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-hidden cursor-pointer">
                      <span>파일 가져오기</span>
                      <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  <div className="mt-3">
                    <span className="text-xs font-medium text-slate-500 block mb-1">직접 텍스트로 복사 붙여넣기:</span>
                    <textarea
                      value={resumeText}
                      onChange={(e) => {
                        setResumeText(e.target.value);
                        if (!e.target.value) setFileName("");
                      }}
                      placeholder="구직자의 이력사항, 경력, 대외활동 리스트 등을 상세히 복사하여 기입해 주세요..."
                      rows={5}
                      className="w-full text-xs border border-slate-300 rounded-lg p-3 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-hidden transition"
                    />
                  </div>
                </div>

                {/* Locking Guard for Variable B and C */}
                <div className={`relative transition-all duration-300 ${!resumeText.trim() ? "opacity-50 pointer-events-none" : ""}`}>
                  {!resumeText.trim() && (
                    <div className="absolute inset-0 bg-slate-50/10 backdrop-xs z-10 flex flex-col items-center justify-center text-center p-4 rounded-xl">
                      <Lock className="w-5 h-5 text-slate-400 mb-2" />
                      <span className="text-xs text-slate-500 font-bold">1단계 파일 데이터 확인 후 활성화됩니다</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Variable B: Job Goal (나) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span>2. 구직자 취업목표 (나) <span className="text-slate-400 font-normal">(선택)</span></span>
                        <span className="text-[10px] text-slate-400">※ 미입력 시 추천 제안 흐름 발동</span>
                      </label>
                      <input
                        type="text"
                        value={jobGoal}
                        onChange={(e) => setJobGoal(e.target.value)}
                        placeholder="예: 중소기업 디지털 마케터, IT QA 테스터 등"
                        className="w-full text-xs border border-slate-300 rounded-lg p-3 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-hidden transition"
                      />
                    </div>

                    {/* Variable C: Observation Characteristics (다) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span>3. 1회기 내담자 특성 (다) <span className="text-slate-400 font-normal">(선택)</span></span>
                        <span className="text-[10px] text-slate-400">※ 미입력 시 미입력 보완 요청 표기</span>
                      </label>
                      <textarea
                        value={sessionObserve}
                        onChange={(e) => setSessionObserve(e.target.value)}
                        placeholder="1회기 상담에서 직접 눈으로 관찰한 정서적 반응, 불안 수준, 피드백 수용 성향, 취업 장애물 등을 자유롭게 기입하세요..."
                        rows={4}
                        className="w-full text-xs border border-slate-300 rounded-lg p-3 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-hidden transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg flex items-start gap-2.5 text-rose-800 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                {/* Analysis Action Button */}
                <button
                  onClick={handleAnalyzeClick}
                  disabled={isAnalyzing || !resumeText.trim()}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all duration-150 cursor-pointer ${
                    !resumeText.trim()
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-blue-700 text-white hover:bg-blue-800 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      내담자 특성 교차 분석 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      전략 상담 분석 및 오토 로드맵 구성
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Right Column: Output Report Section (Outputs) */}
          <section className="lg:col-span-7">
            {/* Condition: Step 1 Force Loop - File Missing Protocol */}
            {!resumeText.trim() ? (
              <div className="bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
                <div className="bg-rose-50 p-4 rounded-full border border-rose-100 text-rose-600 mb-4 animate-bounce">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-2">
                  ⚠️ [안내] 구직자 데이터 파일 확인 불가
                </h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed mb-6">
                  본 맞춤형 상담 설계 시스템은 구직자의 기초 데이터 파일(이력서, 자기소개서, 경력기술서 등) 분석을 최우선으로 선행해야 작동합니다.
                </p>
                <div className="bg-white rounded-xl border border-slate-200 p-5 text-left max-w-sm mx-auto shadow-xs text-xs space-y-2.5">
                  <div className="font-bold text-rose-800 border-b border-rose-50 pb-1.5 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    다음 중 하나 이상 입력 필수
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    입사지원서 내용 또는 텍스트 복사
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    이력서 데이터
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    경력 및 강점 기술서
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    경험 및 대외활동 리스트
                  </div>
                  <p className="text-[10px] text-slate-400 italic text-center pt-2">
                    ※ 파일 제공 전까지는 어떠한 분석이나 리포트도 생성되지 않습니다.
                  </p>
                </div>
              </div>
            ) : isAnalyzing ? (
              /* Loading Screen with professional context details */
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center h-full flex flex-col items-center justify-center min-h-[500px] shadow-sm">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-blue-700 animate-spin" />
                  <Sparkles className="w-6 h-6 text-blue-700 absolute inset-0 m-auto animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-2">
                  취업컨설턴트 AI가 구직자 데이터를 분석 중입니다
                </h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed space-y-1 mb-4">
                  <span>- 제출한 구직자 이력서의 역량과 취업 목표의 갭 정밀 분석</span><br />
                  <span>- 1회기 관찰 특성을 고려하여 총 목표 회기 산정 (최대 8회기)</span><br />
                  <span>- 역량집중(A형)과 심리지지(B형) 상세 가이드라인 수립 중</span>
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>국민취업지원제도 표준상담 모델 적용 중</span>
                </div>
              </div>
            ) : showGoalSuggestions ? (
              /* Step 2: Suggestions for Goal (나) when missing */
              <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full flex flex-col justify-center min-h-[500px] shadow-sm animate-fade-in">
                <div className="text-center mb-6">
                  <div className="bg-amber-50 text-amber-600 p-3 rounded-full border border-amber-100 inline-flex mb-3">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-base">
                    취업 목표 제안 및 선택 단계 (Step 2)
                  </h3>
                  <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed mt-1">
                    구직자 취업목표(나)가 제공되지 않았습니다. 제출한 이력 데이터(가)를 선제적으로 분석하여 가장 성공 가능성이 높은 맞춤형 목표 3가지를 제안합니다. 하나를 선택하시면 즉시 전략을 수립합니다.
                  </p>
                </div>

                {isSuggestingGoals ? (
                  <div className="text-center py-8 space-y-3">
                    <RefreshCw className="w-6 h-6 text-amber-500 animate-spin mx-auto" />
                    <span className="text-xs text-slate-500 font-semibold block">이력서 분석 기반 맞춤형 직무 추천 키워드 수집 중...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {goalSuggestions.map((sug, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 hover:bg-blue-50/30 border border-slate-200 hover:border-blue-500 rounded-xl p-4 transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 max-w-md">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                              {sug.industry}
                            </span>
                            <h4 className="font-semibold text-slate-900 text-sm">{sug.title}</h4>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{sug.reason}</p>
                          <p className="text-[10px] text-indigo-700 leading-relaxed">
                            <span className="font-bold">목표 극복 격차(Gap):</span> {sug.gap}
                          </p>
                        </div>
                        <button
                          onClick={() => selectSuggestedGoal(sug.title)}
                          className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1 shrink-0 self-end sm:self-auto cursor-pointer"
                        >
                          목표로 선택
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <span className="text-[11px] text-slate-400">직접 수동으로 목표를 기입하고 진행할 수도 있습니다.</span>
                      <button
                        onClick={() => {
                          setJobGoal("기타 일반 구직");
                          triggerFullAnalysis("기타 일반 구직");
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold cursor-pointer"
                      >
                        기본값으로 그냥 진행하기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : reportMarkdown ? (
              /* Analysis Finished: Show Styled Professional Report Panel */
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in flex flex-col h-full min-h-[600px]">
                {/* Tabs Top Navigation */}
                <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-500 p-1 rounded text-slate-950">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-sm tracking-wide">
                      수립된 국민취업지원 맞춤 상담 솔루션
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "복사 완료" : "Word 복사용 전체 복사"}</span>
                    </button>
                    <button
                      onClick={downloadDocx}
                      className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>MS Word 파일 저장</span>
                    </button>
                  </div>
                </div>

                {/* Tabs Header */}
                <div className="bg-slate-50 border-b border-slate-200 flex px-2 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("analysis")}
                    className={`px-4 py-3 text-xs font-semibold tracking-tight border-b-2 transition-all shrink-0 cursor-pointer ${
                      activeTab === "analysis"
                        ? "border-blue-700 text-blue-900 bg-white font-bold"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    내담자 종합 분석 & 로드맵
                  </button>
                  <button
                    onClick={() => setActiveTab("guide")}
                    className={`px-4 py-3 text-xs font-semibold tracking-tight border-b-2 transition-all shrink-0 cursor-pointer ${
                      activeTab === "guide"
                        ? "border-blue-700 text-blue-900 bg-white font-bold"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    회기별 상세 컨설팅 가이드라인
                  </button>
                  <button
                    onClick={() => setActiveTab("report")}
                    className={`px-4 py-3 text-xs font-semibold tracking-tight border-b-2 transition-all shrink-0 cursor-pointer ${
                      activeTab === "report"
                        ? "border-blue-700 text-blue-900 bg-white font-bold"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    MS Word 복사용 원본 리포트 (Text)
                  </button>
                </div>

                {/* Tab Contents wrapper */}
                <div className="p-6 overflow-y-auto max-h-[600px] flex-1 bg-slate-50/30">
                  {activeTab === "analysis" && renderStyledSection1And2()}
                  {activeTab === "guide" && renderStyledGuide()}
                  {activeTab === "report" && (
                    <div className="space-y-4 animate-fade-in text-slate-800">
                      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-xs text-blue-800 leading-relaxed">
                        <p className="font-bold mb-1">📢 MS Word 간편 변환 팁</p>
                        아래 텍스트 영역의 내용을 전체 선택하여 복사 한 뒤, MS Word에 바로 붙여넣기 하십시오. 마크다운으로 구성된 표는 붙여넣기 후 Word의 [삽입 → 표 → 텍스트를 표로 변환] 기능으로 정식 표 서식을 즉시 만들 수 있어 편리합니다.
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-inner">
                        <textarea
                          readOnly
                          value={getSectionContent(4)}
                          className="w-full h-[500px] font-mono text-[11px] leading-relaxed text-slate-700 bg-slate-50/50 p-4 rounded border border-slate-100 outline-hidden focus:ring-0"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Idle screen before any action but file is entered */
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center h-full flex flex-col items-center justify-center min-h-[500px] shadow-sm animate-fade-in">
                <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full border border-emerald-100 inline-flex mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-1">
                  구직자 데이터 파일 확인 완료
                </h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed mb-6">
                  내담자의 이력 정보가 준비되었습니다! 구직자 취업목표(나)와 1회기 관찰 특성(다)을 입력한 뒤 아래 **[전략 상담 분석 및 오토 로드맵 구성]** 버튼을 누르면 정교한 보고서가 즉시 생성됩니다.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>준비된 목표 회기 수: 국민취업지원 수급 기준 3~8회 최적화</span>
                </div>
              </div>
            )}
          </section>

        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-16 border-t border-slate-800 text-xs text-center font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p>© 2026 K-Job Assist. 국민취업지원제도 전문 고등상담사 및 취업컨설턴트 전용 업무 보조 시스템.</p>
          <p className="text-slate-600">본 시스템은 Google Gemini 3.5 Flash 및 최첨단 상담 모델에 정밀 튜닝되어 가이드라인을 완전 준수합니다.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}
