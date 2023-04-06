// Workaround dotenv dev dependency usage in production code
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

export const config = {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT || '8080'),
    db: process.env.DB,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
};
