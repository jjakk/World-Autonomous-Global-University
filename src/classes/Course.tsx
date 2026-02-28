// Represents a course receieved from the AI but not yet stored in the curriculum. This is used to track progress and unlocked status of courses.
export default interface Course {
    name: string;
    description: string;
    type: "core" | "elective";
    progress: number;
    unlocked: boolean;
};