const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const ENVIRONMENT = process.env.NODE_ENV;
console.log("ENVIRONMENT is", ENVIRONMENT);
let appName = "";
switch (ENVIRONMENT) {
  case "staging": {
    console.log("environment : ", ENVIRONMENT);
    if (fs.existsSync(path.join(process.cwd(), "/.env.staging"))) {
      dotenv.config({ path: ".env.staging" });
    } else {
      process.exit(1);
    }
    break;
  }
  case "local": {
    console.log("environment : ", ENVIRONMENT);
    if (fs.existsSync(path.join(process.cwd(), "/.env.local"))) {
      dotenv.config({ path: ".env.local" });
    } else {
      process.exit(1);
    }
    break;
  }
  default: {
    console.log("environment : ", ENVIRONMENT);
    if (fs.existsSync(path.join(process.cwd(), "/.env"))) {
      dotenv.config({ path: ".env" });
      appName = "";
    } else {
      process.exit(1);
    }
  }
}
const credentials = {
  DB_URL: "mongodb://localhost:27017/momdesk",
  DB_NAME: process.env.DB_NAME || "momdesk",
  appName: appName,
  SECRET_TOKEN: process.env.ACCESS_TOKEN_SECRET
};
module.exports = credentials;
