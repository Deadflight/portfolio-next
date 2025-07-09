function validateEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Critical environment variable ${name} is missing.`);
  }
  return value;
}

export const getEnvs = {
  EMAIL_SENDER_API_KEY: validateEnvVar("EMAIL_SENDER_API_KEY"),
  EMAIL_SENDER_FROM_EMAIL: validateEnvVar("EMAIL_SENDER_FROM_EMAIL"),
  EMAIL_SENDER_TO_EMAIL: validateEnvVar("EMAIL_SENDER_TO_EMAIL"),
};
