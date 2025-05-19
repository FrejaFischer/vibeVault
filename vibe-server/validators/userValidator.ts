export function validateFirstName(first_name: string): string[] {
  const errors: string[] = [];

  if (typeof first_name !== "string" || !first_name.trim()) {
    errors.push("First name is required and must be a string");
  }

  return errors;
}

export function validateLastName(last_name: string): string[] {
  const errors: string[] = [];

  if (typeof last_name !== "string" || !last_name.trim()) {
    errors.push("Last name is required and must be a string");
  }

  return errors;
}

export function validateEmail(email: string): string[] {
  const errors: string[] = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required");
  }

  if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  return errors;
}

export function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 8) errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Password must contain a lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Password must contain a number");
  if (!/[^A-Za-z0-9]/.test(password)) errors.push("Password must contain a special character");

  return errors;
}
