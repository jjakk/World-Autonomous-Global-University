import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import AppStorage from "./AppStorage";
import { zodToJsonSchema } from "zod-to-json-schema";
import AppAuth from "./AppAuth";

// const ingredientSchema = z.object({
//   name: z.string().describe("Name of the ingredient."),
//   quantity: z.string().describe("Quantity of the ingredient, including units."),
// });

// const recipeSchema = z.object({
//   recipe_name: z.string().describe("The name of the recipe."),
//   prep_time_minutes: z.number().optional().describe("Optional time in minutes to prepare the recipe."),
//   ingredients: z.array(ingredientSchema),
//   instructions: z.array(z.string()),
// });

const courseSchema = z.object({
    course_name: z.string().describe("The name of the course."),
    description: z.string().describe("A brief description of the course."),
    type: z.enum(["core", "elective"]).describe("Whether the course is a core requirement or an elective.")
});

const curriculumSchema = z.object({
    major: z.string().describe("The name of the major."),
    courses: z.array(courseSchema).describe("A list of courses included in the curriculum.")
});

export default class ChatAgent {
    static model = "gemini-2.5-flash";
    static ai = AppAuth.isAuthenticated() ? new GoogleGenAI({
        apiKey: AppStorage.getUser()?.apiKey || "",
    }) : null;

    private static onFailedRequest(error: any) {
        if(error?.status === 429) {
            console.log("Rate limit hit. Marking in storage.");
            AppStorage.markRateLimitHit();
        }
    }

    static async ask(prompt: string){
        if(!this.ai) {
            throw new Error("AI not initialized. Please ensure you are authenticated and have a valid API key.");
        }
        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt,
            })
            return response.text;
        }
        catch (error) {
            this.onFailedRequest(error);
            throw error;
        }
    }
    static async testKey(key: string): Promise<boolean> {
        try {
            const testAI = new GoogleGenAI({ apiKey: key });
            const response = await testAI.models.generateContent({
                model: this.model,
                contents: "Test",
            });
            return !!response.text;
        }
        catch (error) {
            this.onFailedRequest(error);
            return false;
        }
    }
    // static async createCurriculum(major: string): Promise<z.infer<typeof curriculumSchema>> {
    //     const prompt = `Create a curriculum for a university major in ${major}. Include core courses, electives, and a brief description of each course. Format the response as JSON with the following structure: ${JSON.stringify(curriculumSchema)}`;
    //     console.log(prompt);
    //     throw Error("Curriculum generation not implemented yet");
    //     const response = await this.ai.models.generateContent({
    //         model: this.model,
    //         contents: prompt,
    //         config: {
    //             responseMimeType: "application/json",
    //             responseJsonSchema: zodToJsonSchema(curriculumSchema as any),
    //         }
    //     });

    //     console.log(response);
    //     if(!response.text) {
    //         throw new Error("No response from AI");
    //     }
    //     const curriculum = curriculumSchema.parse(JSON.parse(response.text));
    //     return curriculum;
    // }
};