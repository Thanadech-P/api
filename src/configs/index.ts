import * as dotenv from 'dotenv';
dotenv.config();
export const config = {
    jwt_secret_key: process.env.TOKEN_KEY
}