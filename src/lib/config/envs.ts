function validateEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Critical environment variable ${name} is missing.`);
  }
  return value;
}

export const getEnvs = () => {
  return {
    EMAIL_SENDER_API_KEY: validateEnvVar("EMAIL_SENDER_API_KEY"),
    EMAIL_SENDER_FROM_EMAIL: validateEnvVar("EMAIL_SENDER_FROM_EMAIL"),
    EMAIL_SENDER_TO_EMAIL: validateEnvVar("EMAIL_SENDER_TO_EMAIL"),
    NEXT_PUBLIC_BASE_URL: validateEnvVar("NEXT_PUBLIC_BASE_URL"),
    RESEND_API_KEY: validateEnvVar("RESEND_API_KEY"),
    NEXT_PUBLIC_ANALYTICS_ID: validateEnvVar("NEXT_PUBLIC_ANALYTICS_ID"),
  };
};
