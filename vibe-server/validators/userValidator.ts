export function validateFirstName(first_name: string): string[] {
  const errors: string[] = [];
  const MAX_NAME_LENGTH = 55;

  if (typeof first_name !== "string" || !first_name.trim()) {
    errors.push("First name is required and must be a string");
  } else if (first_name.length > MAX_NAME_LENGTH) {
    errors.push("First name can be max " + MAX_NAME_LENGTH + " characters");
  }

  return errors;
}

export function validateLastName(last_name: string): string[] {
  const errors: string[] = [];
  const MAX_LAST_NAME_LENGTH = 120;

  if (typeof last_name !== "string" || !last_name.trim()) {
    errors.push("Last name is required and must be a string");
  } else if (last_name.length > MAX_LAST_NAME_LENGTH) {
    errors.push("Last name can be max " + MAX_LAST_NAME_LENGTH + " characters");
  }

  return errors;
}

export function validateEmail(email: string): string[] {
  const errors: string[] = [];
  const MAX_EMAIL_LENGTH = 255;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  } else if (email.length > MAX_EMAIL_LENGTH) {
    errors.push("Email can be max " + MAX_EMAIL_LENGTH + " characters");
  }

  return errors;
}

export function validatePassword(password: string): string[] {
  const errors: string[] = [];
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 255;

  if (password.length < MIN_PASSWORD_LENGTH) errors.push("Password must be at least " + MIN_PASSWORD_LENGTH + " characters");
  if (password.length > MAX_PASSWORD_LENGTH) errors.push("Password can be max " + MAX_PASSWORD_LENGTH + " characters");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Password must contain a lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Password must contain a number");
  if (!/[^A-Za-z0-9]/.test(password)) errors.push("Password must contain a special character");

  return errors;
}
