export class User {
    apiKey: string;
    major: string
    model: string;
    hitRateLimit: boolean;
    
    constructor(apiKey: string, major: string, model: string) {
        this.apiKey = apiKey;
        this.major = major;
        this.model = model;
        this.hitRateLimit = false;
    }
};