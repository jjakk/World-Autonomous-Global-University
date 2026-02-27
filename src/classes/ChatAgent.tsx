import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default class ChatAgent {
    static ai = new GoogleGenAI({
        apiKey
    });
    static async ask(prompt: string){
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        })
        return response.text;
    }
    static async testKey(key: string): Promise<boolean> {
        try {
            const testAI = new GoogleGenAI({ apiKey: key });
            const response = await testAI.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Test",
            });
            return !!response.text;
        } catch (error) {
            console.error("API Key validation failed:", error);
            return false;
        }
    }
};