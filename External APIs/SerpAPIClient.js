import AbstractAPIClient from "../AbstractAPIClient";

class SerpAPIClient extends AbstractAPIClient {
    constructor() {
        super();
        this.baseURL = "https://serpapi.com/search";
        this.apiKey = process.env.SERP_API_KEY;
    }
    async suggestEvents() {
        try {
            const params = {
                engine: "google_events",
                q: `events+in+bournemouth`,
                api_key: this.apiKey
            }
        const url = `${this.baseURL}?${new URLSearchParams(params)}`
        const data = await this.fetchData(url)
        return data;
        } catch (error) {
            throw new Error(`Failed to find events for ${location}. Error: ${error.message}`)
        }
    }
}

export default SerpAPIClient;

