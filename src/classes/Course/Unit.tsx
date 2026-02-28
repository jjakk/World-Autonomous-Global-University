import type { Reading } from "./Reading";

export interface Unit {
    name: string;
    reading: Reading[];
    unlocked: boolean;
    // lecture: string;
    // assignmentQuestions: string[];
    // quizQuestions: string[];
};