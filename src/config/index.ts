export default {
  // Database
  DB_NAME: process.env.MONGO_INITDB_DATABASE,
  DB_USER: process.env.MONGO_USERNAME,
  DB_PASSWORD: process.env.MONGO_PASSWORD,
  DB_HOST: process.env.MONGO_HOST || "127.0.0.1",
  DB_PORT: process.env.MONGO_PORT || "27017",

  // Logger
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || "info",
  LOGGER_DESTINATION: process.env.LOGGER_DESTINATION || 1 // Defaults to STDOUT destination
};
