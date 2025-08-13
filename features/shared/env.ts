import * as dotenv from "dotenv";
import * as path from "path";

export const setupEnvironment = (): void => {
    const env = process.env.ENV ?? "production";
    const envFile = `.env.${env}`;

    console.log("envFile", envFile);
    // Load environment-specific variables for optional configs
    dotenv.config({
        path: path.resolve(process.cwd(), envFile),
    });
};

export const getEnvironmentConfig = () => {
    return {
        baseUrl: process.env.BASE_URL ?? "https://app.rudderstack.com",
        headless: process.env.HEADLESS ?? true,
        slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
        timeout: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 30000,
    };
};
