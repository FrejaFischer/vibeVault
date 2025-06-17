// CORS middleware - Checks list of allowed origins from env
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
const environment = process.env.RTE ?? "prod";

/**
 * Handling CORS options - allowed origins & acceptence of credentials
 */
export const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin && environment !== "prod") {
      return callback(null, true); // allow tools like Postman in dev or test environment
    }
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS_NOT_ALLOWED"));
    }
  },
  credentials: true, // Accepts cookies being sent along the request
};
