const prod = "production" === process.env.NODE_ENV;

module.exports = {
  "process.env.NEXT_PUBLIC_API_URL": prod
    ? "https://web-production-e64c.up.railway.app"
    : "http://localhost:8000",
};
