import AppStorage from "./AppStorage";
import type { User } from "./User";

export default class AppAuth {
    static isAuthenticated(): boolean {
        const user: User | null = AppStorage.getUser();
        if(user) {
            try {
                return (
                    typeof user.apiKey === "string" &&
                    typeof user.major === "string" &&
                    typeof user.model === "string"
                )
            }
            catch (error) {
                console.error("Error parsing user data:", error);
                return false;
            }
        }
        return false;
    }
}