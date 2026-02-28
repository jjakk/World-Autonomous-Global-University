// This class handles the storage and retrieval of user preferences and settings for the WAGU application. It uses the browser's localStorage API to persist data across sessions.

import type Course from "./Course";
import type { User } from "./User";

export default class AppStorage {
    // USER
    static saveUser(user: User) {
        localStorage.setItem("wagu_user", JSON.stringify(user));
    }
    static getUser(): User | null {
        const user = localStorage.getItem("wagu_user");
        return user ? JSON.parse(user) : null;
    }
    static updateUserApiKey(apiKey: string) {
        const user = this.getUser();
        if (user) {
            user.apiKey = apiKey;
            this.saveUser(user);
        }
    }
    static markRateLimitHit() {
        const user = this.getUser();
        if (user) {
            user.hitRateLimit = true;
            this.saveUser(user);
        }
    }
    // COURSES
    static saveCourses(courses: Course[]) {
        localStorage.setItem("wagu_courses", JSON.stringify(courses));
    }
    static getCourses(): Course[] | null {
        const courses: Course[] | null = JSON.parse(localStorage.getItem("wagu_courses") || "null");
        return courses ? courses : null;
    }
};