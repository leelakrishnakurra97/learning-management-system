import React, { useState, useRef, useEffect } from "react";
import { tutorAPI } from "../services/api";
import { useLmsStore } from "../store/index";
import {
  Send,
  Sparkles,
  Trash2,
  Brain,
  MessageSquare,
  BookOpen,
  AlertCircle,
  ArrowLeft,
  Paperclip,
  FileText,
  X,
} from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
  attachment?: {
    name: string;
    type: string;
    data?: string;
  } | null;
}

export const AITutor: React.FC = () => {
  const { setView } = useLmsStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<{ name: string; type: string; data: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachment({
        name: file.name,
        type: file.type || "application/octet-stream",
        data: reader.result as string,
      });
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read the file.");
    };
    reader.readAsDataURL(file);
    
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() && !attachment) return;

    const userMessage: Message = {
      role: "user",
      text: textToSend,
      attachment: attachment ? { ...attachment } : null
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setAttachment(null);
    setIsLoading(true);
    setError(null);

    const apiHistory = messages.map(msg => ({
      role: msg.role,
      text: msg.text,
      attachment: msg.attachment
    }));

    let usingFallback = false;
    try {
      // Pass both the current question and conversational history to the API
      const response = await tutorAPI.askQuestion(textToSend, apiHistory, attachment);
      const modelMessage: Message = { role: "model", text: response.answer };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.warn("Backend AI Tutor unavailable, using client fallback:", err);
      usingFallback = true;
      setTimeout(() => {
        const textLower = textToSend.toLowerCase();
        let reply = "";
        
        if (textLower.includes("inertia")) {
          reply = `**Inertia** is the *tendency of an object to keep doing what it’s already doing*.\n\nThink of it as a kind of “weighty stubbornness” that resists changes in motion.\n\n### 1. The Physics Story\nNewton’s First Law (the Law of Inertia) says:\n> An object will stay at rest *or* keep moving in a straight line with constant speed unless a net external force acts on it.\n\n- **At rest** → it won’t start moving on its own.\n- **In motion** → it won’t speed up, slow down, or change direction unless something pushes or pulls on it.\n\n### 2. Relation to Mass\nInertia is tied directly to an object’s mass. A heavier object has *more* inertia because it has *more* mass to resist changes in motion.`;
        } else if (textLower.includes("set") || textLower.includes("union") || textLower.includes("intersection") || textLower.includes("subset")) {
          reply = `### Sets & Mathematical Relations\n\nIn mathematics, a **set** is a well-defined collection of distinct objects. Under the Class 9 Samacheer Kalvi syllabus, we focus on several key set operations:\n\n1. **Union ($A \\cup B$):** The set containing all elements that belong to A, B, or both.\n2. **Intersection ($A \\cap B$):** The set containing only the elements common to both A and B.\n3. **Difference ($A - B$):** The set of elements that belong to A but not to B.\n4. **Symmetric Difference ($A \\Delta B$):** Defined as $(A - B) \\cup (B - A)$, containing elements in either A or B, but not both.\n5. **Complement ($A'$):** Elements in the Universal set $U$ that are not in $A$.`;
        } else if (textLower.includes("force") || textLower.includes("newton")) {
          reply = `### Newton's Laws of Motion\n\n1. **First Law (Inertia):** An object remains in its state of rest or uniform motion unless acted upon by an external net force.\n2. **Second Law ($F = ma$):** The rate of change of momentum of an object is proportional to the applied force and takes place in the direction of the force.\n3. **Third Law:** For every action, there is an equal and opposite reaction. If object A exerts a force on object B, B exerts an equal force in the opposite direction on A.`;
        } else if (textLower.includes("screw gauge") || textLower.includes("pitch") || textLower.includes("least count")) {
          reply = `### Screw Gauge Measurements\n\nA **screw gauge** is an instrument used to measure dimensions up to $0.01\\text{ mm}$ (or $0.001\\text{ cm}$), such as the thickness of a wire or thin sheet.\n\n- **Pitch:** The distance moved by the spindle per rotation of the head.\n  $$\\text{Pitch} = \\frac{\\text{Distance on Pitch Scale}}{\\text{Number of Rotations}}$$\n- **Least Count (LC):** The smallest distance that can be measured by the instrument.\n  $$\\text{Least Count} = \\frac{\\text{Pitch}}{\\text{Total divisions on Head Scale}}$$\n- **Formula for Total Reading (TR):** \n  $$\\text{TR} = \\text{PSR (Pitch Scale Reading)} + (\\text{HSC} \\times \\text{LC}) \\pm \\text{Zero Correction}$$`;
        } else if (textLower.includes("hi") || textLower.includes("hello") || textLower.includes("hey")) {
          reply = `Hello! I am your **Nexora Learning AI Tutor**. \n\nHow can I help you master your Samacheer Kalvi syllabus today? I can explain core concepts in Mathematics, Physics, Chemistry, and Biology. \n\nFeel free to ask me questions like: \n- *What is inertia?*\n- *Explain Union and Intersection of sets.*\n- *How does a screw gauge work?*`;
        } else {
          reply = `That is a very interesting academic question!\n\nTo analyze this under the Samacheer Kalvi syllabus:\n1. **Focus on Core Concepts:** Break down the main terms and mathematical/physical rules that govern this topic.\n2. **Verify Definitions:** Always start from the fundamental equations or definitions before deriving complex applications.\n3. **Practice Problems:** Try solving related questions in your workbook to solidify your understanding.\n\n*(Note: I am running in local offline mode since the server is unreachable. You can ask me about **Inertia**, **Sets**, **Newton's Laws**, or **Screw Gauges** for specialized offline explanations!)*`;
        }

        const modelMessage: Message = { role: "model", text: reply };
        setMessages((prev) => [...prev, modelMessage]);
        setIsLoading(false);
      }, 800);
    } finally {
      if (!usingFallback) {
        setIsLoading(false);
      }
    }
  };

  const handleClear = () => {
    setMessages([]);
    setAttachment(null);
    setError(null);
  };

interface Token {
  type: "text" | "bold" | "italic" | "code" | "math";
  content: string;
}

interface Block {
  type: "paragraph" | "heading" | "list" | "blockquote" | "table" | "codeblock" | "hr";
  level?: number;
  ordered?: boolean;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  code?: string;
  language?: string;
  text?: string;
}

const renderInline = (text: string): React.ReactNode[] => {
  let tokens: Token[] = [{ type: "text", content: text }];

  // 1. Tokenize Math: \( ... \) or $ ... $
  const tokenizeMath = (input: Token[]): Token[] => {
    const output: Token[] = [];
    input.forEach((tok) => {
      if (tok.type !== "text") {
        output.push(tok);
        return;
      }
      const regex = /\\\\\((.*?)\\\\\)|\\\((.*?)\\\)/g;
      let lastIndex = 0;
      let match;
      const str = tok.content;
      while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          output.push({ type: "text", content: str.substring(lastIndex, match.index) });
        }
        const mathContent = match[1] || match[2];
        output.push({ type: "math", content: mathContent });
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < str.length) {
        output.push({ type: "text", content: str.substring(lastIndex) });
      }
    });
    return output;
  };

  // 2. Tokenize Code: `...`
  const tokenizeCode = (input: Token[]): Token[] => {
    const output: Token[] = [];
    input.forEach((tok) => {
      if (tok.type !== "text") {
        output.push(tok);
        return;
      }
      const regex = /`(.*?)`/g;
      let lastIndex = 0;
      let match;
      const str = tok.content;
      while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          output.push({ type: "text", content: str.substring(lastIndex, match.index) });
        }
        output.push({ type: "code", content: match[1] });
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < str.length) {
        output.push({ type: "text", content: str.substring(lastIndex) });
      }
    });
    return output;
  };

  // 3. Tokenize Bold: **...**
  const tokenizeBold = (input: Token[]): Token[] => {
    const output: Token[] = [];
    input.forEach((tok) => {
      if (tok.type !== "text") {
        output.push(tok);
        return;
      }
      const regex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;
      const str = tok.content;
      while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          output.push({ type: "text", content: str.substring(lastIndex, match.index) });
        }
        output.push({ type: "bold", content: match[1] });
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < str.length) {
        output.push({ type: "text", content: str.substring(lastIndex) });
      }
    });
    return output;
  };

  // 4. Tokenize Italics: *...*
  const tokenizeItalics = (input: Token[]): Token[] => {
    const output: Token[] = [];
    input.forEach((tok) => {
      if (tok.type !== "text") {
        output.push(tok);
        return;
      }
      const regex = /\*(.*?)\*/g;
      let lastIndex = 0;
      let match;
      const str = tok.content;
      while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          output.push({ type: "text", content: str.substring(lastIndex, match.index) });
        }
        output.push({ type: "italic", content: match[1] });
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < str.length) {
        output.push({ type: "text", content: str.substring(lastIndex) });
      }
    });
    return output;
  };

  tokens = tokenizeMath(tokens);
  tokens = tokenizeCode(tokens);
  tokens = tokenizeBold(tokens);
  tokens = tokenizeItalics(tokens);

  return tokens.map((tok, idx) => {
    switch (tok.type) {
      case "bold":
        return <strong key={idx} className="font-extrabold text-slate-900 dark:text-white">{tok.content}</strong>;
      case "italic":
        return <em key={idx} className="italic text-slate-800 dark:text-slate-200">{tok.content}</em>;
      case "code":
        return (
          <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-855 border border-slate-200 dark:border-white/10 font-mono text-[11px] text-brand-violet dark:text-brand-violet-light font-semibold">
            {tok.content}
          </code>
        );
      case "math":
        return (
          <span key={idx} className="font-serif italic font-bold text-brand-royal dark:text-blue-300 bg-slate-50 dark:bg-slate-900/50 px-1 py-0.5 rounded border border-slate-150 dark:border-white/5 mx-0.5">
            {tok.content}
          </span>
        );
      default:
        return <React.Fragment key={idx}>{tok.content}</React.Fragment>;
    }
  });
};

const parseMarkdownBlocks = (text: string): Block[] => {
  const lines = text.split("\n");
  const blocks: Block[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Code blocks
    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      let code = "";
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code += lines[i] + "\n";
        i++;
      }
      blocks.push({ type: "codeblock", language, code: code.trim() });
      i++;
      continue;
    }

    // 2. Horizontal Rule
    if (trimmed === "---" || trimmed === "***") {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // 3. Headings
    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "heading", level: 1, text: trimmed.slice(2).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: trimmed.slice(3).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: trimmed.slice(4).trim() });
      i++;
      continue;
    }

    // 4. Blockquotes
    if (trimmed.startsWith(">")) {
      let blockquoteText = "";
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        const quoteLine = lines[i].trim();
        const content = quoteLine.slice(1).replace(/^\s/, "");
        blockquoteText += (blockquoteText ? "\n" : "") + content;
        i++;
      }
      blocks.push({ type: "blockquote", text: blockquoteText });
      continue;
    }

    // 5. Tables
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length > 0) {
        const headerCells = tableLines[0]
          .split("|")
          .map(c => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

        const rows: string[][] = [];
        for (let j = 1; j < tableLines.length; j++) {
          const rowLine = tableLines[j];
          const isDivisor = /^[|:\-\s]+$/.test(rowLine);
          if (isDivisor) continue;

          const cells = rowLine
            .split("|")
            .map(c => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
          rows.push(cells);
        }

        blocks.push({ type: "table", headers: headerCells, rows });
      }
      continue;
    }

    // 6. Lists
    const isUnordered = trimmed.startsWith("- ") || trimmed.startsWith("* ");
    const isOrdered = /^\d+\.\s+/.test(trimmed);
    if (isUnordered || isOrdered) {
      const items: string[] = [];
      const isCurrentOrdered = isOrdered;

      while (i < lines.length) {
        const listLine = lines[i].trim();
        const isLineUnordered = listLine.startsWith("- ") || listLine.startsWith("* ");
        const isLineOrdered = /^\d+\.\s+/.test(listLine);

        if (isCurrentOrdered && isLineOrdered) {
          items.push(listLine.replace(/^\d+\.\s+/, ""));
          i++;
        } else if (!isCurrentOrdered && isLineUnordered) {
          items.push(listLine.replace(/^[-*]\s+/, ""));
          i++;
        } else {
          break;
        }
      }

      blocks.push({ type: "list", ordered: isCurrentOrdered, items });
      continue;
    }

    // 7. Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // 8. Paragraph
    let paragraphText = "";
    while (i < lines.length) {
      const pLine = lines[i].trim();
      if (
        !pLine ||
        pLine.startsWith("```") ||
        pLine === "---" ||
        pLine === "***" ||
        pLine.startsWith("#") ||
        pLine.startsWith(">") ||
        (pLine.startsWith("|") && pLine.endsWith("|")) ||
        pLine.startsWith("- ") ||
        pLine.startsWith("* ") ||
        /^\d+\.\s+/.test(pLine)
      ) {
        break;
      }
      paragraphText += (paragraphText ? "\n" : "") + pLine;
      i++;
    }
    
    if (paragraphText) {
      blocks.push({ type: "paragraph", text: paragraphText });
    }
  }

  return blocks;
};

  const formatMessage = (text: string) => {
    const blocks = parseMarkdownBlocks(text);

    return blocks.map((block, idx) => {
      switch (block.type) {
        case "heading":
          if (block.level === 1) {
            return (
              <h2 key={idx} className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-4 mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">
                {renderInline(block.text || "")}
              </h2>
            );
          }
          if (block.level === 2) {
            return (
              <h3 key={idx} className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-3 mb-1.5">
                {renderInline(block.text || "")}
              </h3>
            );
          }
          return (
            <h4 key={idx} className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-350 mt-2.5 mb-1 uppercase tracking-wider">
              {renderInline(block.text || "")}
            </h4>
          );

        case "blockquote":
          return (
            <blockquote key={idx} className="border-l-4 border-brand-royal dark:border-blue-500 bg-slate-50 dark:bg-slate-900/50 pl-3.5 py-2 pr-2.5 my-3 italic text-slate-700 dark:text-slate-300 rounded-r-lg text-xs leading-relaxed">
              {renderInline(block.text || "")}
            </blockquote>
          );

        case "hr":
          return <hr key={idx} className="border-t border-slate-200 dark:border-slate-800 my-4" />;

        case "list":
          if (block.ordered) {
            return (
              <ol key={idx} className="list-decimal pl-5 my-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300 text-left">
                {block.items?.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );
          }
          return (
            <ul key={idx} className="list-disc pl-5 my-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300 text-left">
              {block.items?.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );

        case "table":
          return (
            <div key={idx} className="overflow-x-auto my-4 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60">
                  <tr>
                    {block.headers?.map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left font-bold text-slate-900 dark:text-white tracking-wider border-r border-slate-200 dark:border-slate-800 last:border-0">
                        {renderInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950/20">
                  {block.rows?.map((row, ri) => (
                    <tr key={ri} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 last:border-0 leading-normal text-left">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

        case "codeblock":
          return (
            <pre key={idx} className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto my-3 border border-white/5 shadow-inner leading-relaxed text-left">
              <code>{block.code}</code>
            </pre>
          );

        case "paragraph":
        default:
          return (
            <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3 last:mb-0 text-left">
              {renderInline(block.text || "")}
            </p>
          );
      }
    });
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 dark:bg-brand-navy-dark text-slate-800 dark:text-slate-100 overflow-hidden font-sans">
      {/* Premium Full-Page Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("student-dash")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-sm flex-shrink-0 border border-slate-200/50 dark:border-slate-750"
            title="Back to Student Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-royal flex items-center justify-center text-white shadow-md shadow-brand-royal/10 border border-white/10 flex-shrink-0">
              <Brain className="w-5.5 h-5.5" />
            </div>
            <div className="text-left flex flex-col justify-center">
              <h2 className="text-sm sm:text-base font-black font-display text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Nexora AI Tutor
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20 uppercase">
                  Active
                </span>
              </h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-500 font-medium">
                Comprehensive curriculum support
              </p>
            </div>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-rose-650 dark:text-rose-450 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all border border-rose-500/20 font-semibold"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        )}
      </header>

      {/* Main Chat Workspace */}
      <div className="flex-1 min-h-0 overflow-y-auto bg-slate-50/50 dark:bg-brand-navy-dark/95 p-6 flex flex-col">
        <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col justify-between">
          {messages.length === 0 ? (
            // Welcome / Quickstart suggestions
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
              <div className="max-w-md p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-brand-royal/5 dark:bg-brand-royal/10 border border-brand-royal/15 flex items-center justify-center text-brand-royal dark:text-blue-400">
                  <Brain className="w-8 h-8 animate-pulse" />
                </div>

                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    Ask your AI Study Buddy!
                  </h3>
                  <p className="text-xs text-slate-650 dark:text-slate-400 mt-2 leading-relaxed">
                    Need help with a math formula, a chemistry reaction, or
                    explaining complex concepts? Ask your AI Tutor below!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Chat history display
            <div className="space-y-6 pb-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-4 w-full ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm border ${
                      msg.role === "user"
                        ? "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-250 dark:border-slate-700"
                        : "bg-brand-royal border-brand-royal/20"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <span className="text-[10px] font-extrabold uppercase">Me</span>
                    ) : (
                      <Brain className="w-4.5 h-4.5" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 text-left relative shadow-sm border ${
                      msg.role === "user"
                        ? "bg-brand-royal/5 dark:bg-brand-royal/10 border-brand-royal/20 text-slate-850 dark:text-slate-205"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                    } overflow-hidden`}
                  >
                    {msg.attachment && (
                      <div className="mb-3">
                        {msg.attachment.type.startsWith("image/") ? (
                          <div className="relative group max-w-sm rounded-lg overflow-hidden border border-slate-200 dark:border-slate-850 bg-slate-100 dark:bg-slate-950">
                            <img
                              src={msg.attachment.data}
                              alt={msg.attachment.name}
                              className="max-h-60 object-contain w-full"
                            />
                            <div className="px-3 py-1.5 bg-black/60 text-white text-[10px] truncate">
                              {msg.attachment.name}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-slate-850 bg-white/50 dark:bg-slate-950/50 max-w-sm">
                            <FileText className="w-8 h-8 text-brand-royal dark:text-blue-400 shrink-0" />
                            <div className="min-w-0 flex-1 text-left">
                              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {msg.attachment.name}
                              </p>
                              <p className="text-[10px] text-slate-500 uppercase font-medium">
                                {msg.attachment.type.split("/")[1] || "document"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {formatMessage(msg.text)}
                  </div>
                </div>
              ))}

              {/* Loading / Typing indicator */}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-royal flex items-center justify-center text-white shrink-0 shadow border border-brand-royal/10 animate-pulse">
                    <Brain className="w-4.5 h-4.5" />
                  </div>
                  <div className="rounded-2xl px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1 shadow-sm">
                    <span
                      className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              )}

              {/* Error Message Box */}
              {error && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-450 rounded-xl flex items-start gap-2.5 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <span className="font-bold">Error:</span> {error}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Message Area */}
      <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-t border-slate-250 dark:border-slate-800 p-4">
        {attachment && (
          <div className="max-w-3xl w-full mx-auto mb-3 flex justify-start">
            <div className="relative flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/65 shadow-sm max-w-md min-w-[200px]">
              {attachment.type.startsWith("image/") ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
                  <img src={attachment.data} alt="Upload preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-brand-royal/10 dark:bg-brand-royal/20 border border-brand-royal/15 flex items-center justify-center text-brand-royal dark:text-blue-450 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
              )}
              
              <div className="min-w-0 flex-1 text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate pr-6">
                  {attachment.name}
                </p>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">
                  {attachment.type.split("/")[1] || "file"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="absolute top-2 right-2 p-1 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-all shadow-sm"
                title="Remove attachment"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="max-w-3xl w-full mx-auto flex items-center gap-3 p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-sm focus-within:border-brand-royal transition-all duration-300"
        >
          {/* File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,application/pdf,text/plain"
            className="hidden"
          />

          {/* Paperclip upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all shrink-0 hover:text-slate-900 dark:hover:text-white shadow-sm"
            title="Upload question (Image, PDF, TXT)"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder={
              isLoading
                ? "Tutor is thinking..."
                : "Type your question here..."
            }
            className="flex-1 py-3 px-2 bg-transparent text-xs text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none min-w-0"
          />

          <button
            type="submit"
            disabled={isLoading || (!inputValue.trim() && !attachment)}
            className="w-11 h-11 rounded-xl bg-brand-royal hover:bg-blue-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-lg shadow-brand-royal/10 hover:shadow-brand-royal/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[9px] text-slate-400 dark:text-slate-600 text-center mt-3">
          Nexora Learning AI Tutor is optimized for school syllabi. Verify important
          formulas before exams.
        </p>
      </div>
    </div>
  );
};
