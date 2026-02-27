// This class handles the storage and retrieval of user preferences and settings for the WAGU application. It uses the browser's localStorage API to persist data across sessions.

export default class AppStorage {
    static saveApiKey(key: string) {
        localStorage.setItem("wagu_api_key", key);
    }
    
    static getApiKey(): string | null {
        return localStorage.getItem("wagu_api_key");
    }

    static saveMajor(major: string) {
        localStorage.setItem("wagu_major", major);
    }
    
    static getMajor(): string | null {
        return localStorage.getItem("wagu_major");
    }
    
    static saveModel(model: string) {
        localStorage.setItem("wagu_model", model);
    }
    
    static getModel(): string | null {
        return localStorage.getItem("wagu_model");
    }
}