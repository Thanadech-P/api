// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const config = {
  jwt_secret_key: process.env.TOKEN_KEY,
  cors_option: {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  },
};
