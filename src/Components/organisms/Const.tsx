export const BASE_URL = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return "http://localhost:3000";
    case "development":
      return "http://localhost:3000";
    case "production":
      return "";
  }
}