import { GoogleGenAI } from "@google/genai";
import AppStorage from "./AppStorage";
import { coursesSchema, coursesSchema_JSON } from "../zodTypes";
import type Course from "./Course";

export default class ChatAgent {
    private static model = "gemini-2.5-flash";
    private ai: GoogleGenAI;

    constructor(apiKey: string) {
        if(!apiKey) {
            throw new Error("API key is required to initialize ChatAgent");
        }
        this.ai = new GoogleGenAI({ apiKey });
    }

    private static onFailedRequest(error: any) {
        if(error?.status === 429) {
            console.log("Rate limit hit. Marking in storage.");
            AppStorage.markRateLimitHit();
        }
    }

    static async testKey(key: string): Promise<boolean> {
        try {
            const testAI = new GoogleGenAI({ apiKey: key });
            const response = await testAI.models.generateContent({
                model: ChatAgent.model,
                contents: "Test",
            });
            return !!response.text;
        }
        catch (error) {
            ChatAgent.onFailedRequest(error);
            return false;
        }
    }
    async createCourses(major: string): Promise<Course[]> {
        const prompt = `Create a 4 year curriculum for a university student majoring in ${major}. Include core courses, electives, and a brief description of each course.`;
        const response = await this.ai.models.generateContent({
            model: ChatAgent.model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: coursesSchema_JSON,
            }
        });

        if(!response.text) {
            throw new Error("No response from AI");
        }
        const courses: Course[] = coursesSchema.parse(JSON.parse(response.text))
            .map((c: Course, i: number) =>
                ({ ...c, unlocked: i === 0, progress: 0 })
        );
        return courses;
    }
};