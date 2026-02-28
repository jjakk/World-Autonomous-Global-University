import AppStorage from "./AppStorage";
import type Course from "./Course";
import type { User } from "./User";

export default class AppAuth {
    static isAuthenticated(): boolean {
        const user: User | null = AppStorage.getUser();
        const courses: Course[] | null = AppStorage.getCourses();
        return !!user && !!courses;
    }
}