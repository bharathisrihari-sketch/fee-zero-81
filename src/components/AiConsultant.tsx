import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, Bot, User, Loader2, Lightbulb, ShieldCheck, Terminal, HelpCircle } from 'lucide-react';

export const AiConsultant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "Hello! I am your AI Android Distribution Specialist. Ask me anything about publishing Android APKs for free without paying Google Play's $25 fee, keystore signing, Amazon Appstore submission, F-Droid recipes, or direct sideloading!"
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sampleQuestions = [
    "How do I sign my release APK using terminal keytool?",
    "Can I publish a closed-source app on Amazon Appstore for free?",
    "How does F-Droid auto-build apps from my GitHub repository?",
    "How do I convert my website into an Android APK for $0?",
    "What is the easiest way to push auto-updates to direct APK downloads?"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    // Add user message
    const updatedMessages = [...messages, { sender: 'user' as const, text: query }];
    setMessages(updatedMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Initialize Gemini Client
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
      
      let aiResponseText = '';

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = "You are an expert Android Developer and Distribution Strategist specializing in helping developers deploy Android apps without paying Google Play Store's $25 fee. Provide clear, technical, step-by-step answers with code snippets when appropriate (e.g. keytool, Gradle, Kotlin, F-Droid metadata, PWA). Keep responses friendly, structured, concise, and accurate.";
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${query}` }] }
          ]
        });

        aiResponseText = response.text || "I apologize, I couldn't generate a response. Please try again.";
      } else {
        // High quality fallback answers if API key is not present in local dev
        aiResponseText = getFallbackResponse(query);
      }

      setMessages([...updatedMessages, { sender: 'ai', text: aiResponseText }]);
    } catch (err: any) {
      console.error("Gemini API error:", err);
      // Use intelligent offline response fallback
      const fallbackText = getFallbackResponse(query);
      setMessages([...updatedMessages, { sender: 'ai', text: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes('sign') || lower.includes('keystore') || lower.includes('keytool')) {
      return `To build and sign a release APK for free:
1. Run \`keytool -genkey -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias mykey\`
2. Place \`release.jks\` in your \`android/app/\` folder.
3. Configure \`android/app/build.gradle.kts\` with a \`signingConfigs\` block referencing your keystore.
4. Run \`./gradlew assembleRelease\` to produce your signed \`app-release.apk\` ready for Amazon, F-Droid, or direct download!`;
    } else if (lower.includes('amazon')) {
      return `Yes! The Amazon Appstore developer account is 100% FREE ($0 fee). You can publish both closed-source and commercial apps. Amazon reaches millions of Fire Tablets, Fire TV sticks, and Windows 11 Android Subsystem users!`;
    } else if (lower.includes('f-droid') || lower.includes('fdroid')) {
      return `F-Droid requires your app to be open source (MIT, Apache 2.0, GPL, etc.). You submit a YAML metadata recipe pointing to your GitHub tag. F-Droid's build servers automatically clone your repo, compile the APK from source, sign it with F-Droid keys, and publish it to the F-Droid client!`;
    } else if (lower.includes('update') || lower.includes('autoupdate')) {
      return `For non-Play Store APKs, you can implement a simple 20-line HTTP request in Kotlin that queries the GitHub API (\`https://api.github.com/repos/USER/REPO/releases/latest\`). If the \`tag_name\` is newer than your app's \`versionName\`, display a dialog with a direct download button!`;
    }
    return `To deploy your Android app for $0 without Google Play's $25 fee, you have 4 main options:
1. **Amazon Appstore**: Free developer account, reaches Fire OS & Android devices.
2. **Samsung Galaxy Store**: Free Seller Office registration for Samsung Galaxy users.
3. **F-Droid**: Free open-source store that builds directly from GitHub.
4. **GitHub Releases / Web Landing Page**: Host the signed APK directly with an in-app auto-update checker.`;
  };

  return (
    <div id="ai-assistant-section" className="max-w-5xl mx-auto my-8 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Android Distribution Assistant</h2>
            <p className="text-xs text-slate-400">Powered by Gemini AI • Instant answers for keystores, Gradle, stores, & sideloading.</p>
          </div>
        </div>

        {/* Sample Question Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Suggested Questions</span>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 px-3 py-1.5 rounded-xl transition-all text-left"
              >
                💡 {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 min-h-[300px] max-h-[450px] overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 font-sans rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-emerald-400 p-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Android distribution query...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask AI anything about publishing Android APKs without $25 Play Console fee..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-emerald-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
