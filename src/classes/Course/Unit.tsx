import type { Reading } from "./Reading";

export interface Unit {
    name: string;
    readings: Reading[];
    unlocked: boolean;
    // lecture: string;
    // assignmentQuestions: string[];
    // quizQuestions: string[];
};