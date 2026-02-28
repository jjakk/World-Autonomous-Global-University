import z from "zod";
import type Course from "./classes/Course/Course";
import type { Unit } from "./classes/Course/Unit";
import type { Reading } from "./classes/Course/Reading";

export const readingSchema: z.ZodType<Reading> = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string().optional(),
});

export const readingSchema_JSON = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        content: { type: "string" }
    },
    required: ["title", "description"]
};

export const unitsSchema: z.ZodType<Unit[]> = z.array(z.object({
    name: z.string(),
    reading: z.array(z.object({
        title: z.string(),
        description: z.string(),
        content: z.string().optional(),
    })),
    unlocked: z.boolean().default(false)
}));

export const unitsSchema_JSON = {
    type: "array",
    items: {
        type: "object",
        properties: {
            name: { type: "string" },
            reading: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                    },
                    required: ["title", "description"]
                }
            }
        },
        required: ["name", "reading"]
    }
};

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