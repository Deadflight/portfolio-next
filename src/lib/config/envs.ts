export const getEnvs = () => {
  return {
    EMAIL_SENDER_API_KEY: validateEnvVar("EMAIL_SENDER_API_KEY"),
    EMAIL_SENDER_FROM_EMAIL: validateEnvVar("EMAIL_SENDER_FROM_EMAIL"),
    EMAIL_SENDER_TO_EMAIL: validateEnvVar("EMAIL_SENDER_TO_EMAIL"),
    CI: validateEnvVar("CI"),
    NODE_ENV: validateEnvVar("NODE_ENV"),
    NEXT_PUBLIC_BASE_URL: validateEnvVar("NEXT_PUBLIC_BASE_URL"),
    NEXT_PUBLIC_GA_ID: validateEnvVar("NEXT_PUBLIC_GA_ID"),
  };
};

function validateEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Critical environment variable ${name} is missing.`);
  }
  return value;
}
