import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, RefreshCw, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { COMPANY_INFO } from '../data';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I am MRL Assistant, your AI Relocation Specialist for Mumbai & Maharashtra. 🚛\n\nHow can I help you today? You can ask me for instant moving cost estimates, packing tips for fragile items, or intercity route details!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    setTimeout(() => {
      let replyText = `Thank you for contacting MRL Packers & Movers! For shifting in Mumbai (Kandivali, Borivali, Andheri, Powai, Thane, Navi Mumbai, etc.), average prices range from ₹4,999 to ₹11,999 including 3-layer bubble packaging, dismantling, transport, loading/unloading, and reassembly with 0% hidden charges.`;
      
      const lower = prompt.toLowerCase();
      if (lower.includes('2bhk') || lower.includes('cost') || lower.includes('price')) {
        replyText = `Our 2BHK Household Relocation package starts at ₹7,999 (Discounted 10% OFF rate). It includes 4 professional crew members, 3-layer bubble packaging, closed 17ft container vehicle, and free transit insurance up to ₹1,50,000!`;
      } else if (lower.includes('tv') || lower.includes('glass') || lower.includes('pack')) {
        replyText = `We pack fragile glassware and TVs using air-bubble wrap, edge cushion protectors, double-wall corrugated boxes, and optional wooden crating for 100% scratch-free safety during transit.`;
      } else if (lower.includes('pune') || lower.includes('route') || lower.includes('intercity')) {
        replyText = `For Mumbai to Pune intercity relocations, we provide same-day pickup and delivery with 24/7 live GPS fleet tracking and toll allowances included.`;
      }

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 600);
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[85vh] max-h-[680px] bg-slate-900 border border-slate-800 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-red-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '6s' }} />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>MRL AI Relocation Assistant</span>
                <span className="text-3xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30 font-bold">
                  Live AI
                </span>
              </h3>
              <p className="text-xs text-slate-400">Instant moving estimates & packing guidance</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-red-600 text-white font-semibold rounded-br-none'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none whitespace-pre-line'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-3xs block mt-2 text-right ${
                    msg.sender === 'user' ? 'text-red-100 font-bold' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center flex-shrink-0 mt-1 shadow">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs py-2">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                <RefreshCw className="w-4 h-4 text-red-400 animate-spin" />
                <span>AI Assistant is calculating relocation charges...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-slate-500 font-semibold whitespace-nowrap text-3xs uppercase">Suggestions:</span>
          <button
            onClick={() => handleQuickPrompt('What is the average cost for 2BHK shifting in Mumbai?')}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white whitespace-nowrap border border-slate-700 text-2xs"
          >
            💡 2BHK Mumbai Price?
          </button>
          <button
            onClick={() => handleQuickPrompt('How do you safely pack a 55-inch OLED TV and glass dining table?')}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white whitespace-nowrap border border-slate-700 text-2xs"
          >
            📺 TV & Glass Packing Tips
          </button>
          <button
            onClick={() => handleQuickPrompt('What are the intercity charges from Mumbai to Pune?')}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white whitespace-nowrap border border-slate-700 text-2xs"
          >
            🛣️ Mumbai to Pune Rates
          </button>
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about prices, packing tips, or routes..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputPrompt.trim()}
            className="p-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-800 text-white font-bold transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenQuoteModal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors border border-slate-700"
          >
            <span>Book Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
