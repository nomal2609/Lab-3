require("dotenv").config();
// Global configurations object contains Application Level variables such as:
// client secrets, passwords, connection strings, and misc flags
const configurations = {
  ConnectionStrings: {
    MongoDB: "mongodb+srv://nomal:nomalnoma26@cluster0.q9wve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  },
  Authentication: {
    Google: {
      ClientId: "592165333746-gubuc9kv5niupg4gl4519j2nl3tgev9m.apps.googleusercontent.com",
      ClientSecret: "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",
      CallbackUrl: "http://localhost:3000/auth/google/callback"
    },
  },
};
module.exports = configurations;
