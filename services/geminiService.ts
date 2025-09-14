
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are 'Suraksha', a friendly and helpful AI assistant for tourists in India. Your name means 'Safety'. 
Your primary goal is to ensure tourist safety and provide immediate assistance.
Key functions:
1.  **Safety First**: Prioritize safety advice. If a user seems distressed or mentions an emergency, immediately suggest clicking the SOS button and contacting local authorities (Police: 112).
2.  **Multilingual Translator**: If asked for help in another language, respond fluently in that language to assist them.
3.  **Local Guide**: Provide accurate information about heritage sites, markets, hotels, and local customs.
4.  **Calm & Clear**: Always respond calmly, clearly, and reassuringly.
5.  **Concise**: Keep your answers helpful but concise.
`;

let chat: Chat | null = null;

export const startChat = (): Chat => {
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
    });
    return chat;
}

export const getChatResponseStream = async (message: string) => {
    if (!chat) {
        startChat();
    }
    if(chat){
         return chat.sendMessageStream({ message });
    }
    throw new Error("Chat not initialized");
};
