import z from "zod";
import type Course from "./classes/Course";

export const coursesSchema: z.ZodType<Course[]> = z.array(z.object({
    name: z.string(),
    description: z.string(),
    type: z.enum(["core", "elective"]),
    progress: z.number().default(0),
    unlocked: z.boolean().default(false),
})); 

export const coursesSchema_JSON = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "name": { "type": "string" },
            "description": { "type": "string" },
            "type": { "type": "string", "enum": ["core", "elective"] }
        },
        "required": ["name", "description", "type"]
    }
};
