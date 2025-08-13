export interface RudderStackAccount {
    email: string;
    password: string;
    description?: string;
    organization: string;
    workspace: string;
    // RudderStack specific data
    dataPlaneUrl?: string;
    sources?: {
        httpSource?: {
            name: string;
            type: string;
            writeKey: string;
        };
    };
    destinations?: {
        webhook?: {
            name: string;
            type: string;
        };
    };
}
