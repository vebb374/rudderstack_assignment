import * as dotenv from 'dotenv';
import * as path from 'path';

export const setupEnvironment = () => {
  const env = process.env.ENV || 'staging';
  const envFile = `.env.${env}`;
  
  dotenv.config({
    path: path.resolve(process.cwd(), envFile),
  });
};
