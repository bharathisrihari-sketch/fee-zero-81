import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, Sparkles, X, Send, Loader2, Minimize2, Maximize2, Copy, Check, RefreshCw, Terminal, ArrowUpRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}

export const GeminiChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'gemini',
      text: "👋 Hi! I'm Gemini, your AI Android Deployment & Store Consultant. Ask me anything about publishing Android apps without paying Google's $25 fee, signing release APKs, Amazon Appstore, F-Droid, or direct sideloading!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "How do I sign an APK without Android Studio?",
    "How to publish to Amazon Appstore for $0?",
    "How to add auto-updates to direct APK download?",
    "What is the $0 Play Store alternative for open source?"
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSubmit = textOverride || input;
    if (!textToSubmit.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
      let replyText = '';

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        
        // Build conversation history for multi-turn context
        const history = messages
          .filter(m => m.id !== 'welcome')
          .map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
          .join('\n');

        const systemPrompt = `You are an expert Google Gemini AI assistant built into the ZeroFee Android App Publisher tool. 
Your goal is to help developers publish, package, sign, and distribute Android apps for $0 WITHOUT paying Google Play Store's $25 fee.
Be direct, helpful, technically precise, and include code snippets or step-by-step commands (keytool, gradle, Kotlin, YAML) when relevant.`;

        const fullPrompt = `${systemPrompt}\n\nRecent Conversation:\n${history}\nUser: ${textToSubmit}\nAssistant:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }]
        });

        replyText = response.text || "I was unable to retrieve a response from Gemini AI. Please try asking again.";
      } else {
        replyText = getSmartOfflineReply(textToSubmit);
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gemini',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      const offlineMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gemini',
        text: getSmartOfflineReply(textToSubmit),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, offlineMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSmartOfflineReply = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('sign') || q.includes('keystore') || q.includes('keytool')) {
      return `Here is how to generate a release key and sign your APK via terminal:

1. Generate keystore:
\`keytool -genkey -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias mykey\`

2. Place \`release.jks\` in your \`android/app/\` directory.

3. Compile signed APK:
\`./gradlew assembleRelease\`

Output file: \`android/app/build/outputs/apk/release/app-release.apk\`!`;
    }

    if (q.includes('amazon')) {
      return `The Amazon Appstore is 100% FREE for developers ($0 registration fee). You can upload signed APKs directly to reach Fire Tablets, Fire TV sticks, and Android devices globally.`;
    }

    if (q.includes('f-droid') || q.includes('fdroid') || q.includes('open source')) {
      return `For open-source apps, F-Droid is the #1 choice. F-Droid builds your APK directly from your public GitHub/GitLab source code repository and serves updates automatically to users.`;
    }

    if (q.includes('update') || q.includes('auto')) {
      return `To auto-update direct APK downloads, query the GitHub Releases API (\`https://api.github.com/repos/USER/REPO/releases/latest\`) on app startup in Kotlin. If tag_name is newer, show a dialog with a direct download link!`;
    }

    return `You can deploy Android apps for $0 completely free using:
1. **Amazon Appstore** ($0 developer registration)
2. **Samsung Galaxy Store** (Free Seller Office)
3. **F-Droid** (Automated GitHub open source builds)
4. **GitHub Releases + Direct Web Landing Page** (0% middleman fees)`;
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Floating Chat Button when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center space-x-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 font-bold text-xs"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-ping" />
          </div>
          <span>Ask Gemini AI</span>
          <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div
          className={`bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'w-[90vw] sm:w-[650px] h-[80vh] max-h-[700px]'
              : 'w-[92vw] sm:w-[400px] h-[520px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-xs font-bold text-white tracking-tight">Gemini AI Specialist</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-400">Android Deployment & Store Advisor</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="bg-slate-950/80 px-3 py-2 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto scrollbar-none shrink-0">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                disabled={isLoading}
                className="text-[10px] whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 px-2.5 py-1 rounded-lg transition-all"
              >
                ⚡ {qp}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/40 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'gemini' && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="group relative max-w-[85%]">
                  <div
                    className={`p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Copy button for Gemini responses */}
                  {m.sender === 'gemini' && (
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 bg-slate-800 text-slate-300 hover:text-white p-1 rounded-md border border-slate-700 text-[10px] transition-all flex items-center gap-1"
                    >
                      {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}

                  <span className="text-[9px] text-slate-500 block mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-xs text-emerald-400 p-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span className="text-[11px]">Gemini is typing...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Gemini about $0 Android deployment..."
              className="flex-1 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
