
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '../types';
import { getChatResponseStream } from '../services/geminiService';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { Spinner } from './icons/Spinner';
import type { GenerateContentResponse } from '@google/genai';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial', text: "Hello! I'm Suraksha, your AI safety assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { id: crypto.randomUUID(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessageId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);
    
    try {
        const stream = await getChatResponseStream(input);
        let currentText = '';
        for await (const chunk of stream) {
            currentText += chunk.text;
            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: currentText } : msg
            ));
        }
    } catch (error) {
        console.error("Error with Gemini API:", error);
        setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: 'Sorry, I am having trouble connecting. Please try again.' } : msg
            ));
    } finally {
        setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-brand-primary text-white flex items-center space-x-3 rounded-t-xl">
        <ChatBubbleLeftRightIcon className="h-6 w-6"/>
        <h2 className="text-lg font-bold">AI Assistant "Suraksha"</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-sm xl:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-secondary text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {isLoading && msg.sender === 'ai' && msg.text === '' && <Spinner/>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-200 rounded-b-xl">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for help or translation..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="p-3 bg-brand-primary text-white rounded-lg disabled:bg-gray-400 hover:bg-opacity-90 transition-colors">
            <PaperAirplaneIcon className="h-5 w-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
