import { Request, Response, RequestHandler } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../startup/data-source";
import { validatePassword, validateFirstName, validateLastName, validateEmail } from "../validators/userValidator";
import { hashPassword } from "../utils/hashPassword";

// Get the User Entity (table)
const userRepo = AppDataSource.getRepository(User);

// POST a new user
export const postUser: RequestHandler = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body || {};

  const validationErrors = [];

  // Check if body contains required values
  if (!first_name) validationErrors.push("First name is required");
  if (!last_name) validationErrors.push("Last name is required");
  if (!email) validationErrors.push("Email is required");
  if (!password) validationErrors.push("Password is required");
  // Return if something is missing
  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
    return;
  }

  // Validate data
  const firstNameErrors = validateFirstName(first_name);
  if (firstNameErrors.length > 0) {
    validationErrors.push(...firstNameErrors);
  }

  const lastNameErrors = validateLastName(last_name);
  if (lastNameErrors.length > 0) {
    validationErrors.push(...lastNameErrors);
  }

  const emailErrors = validateEmail(email);
  if (emailErrors.length > 0) {
    validationErrors.push(...emailErrors);
  }

  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    validationErrors.push(...passwordErrors);
  }

  // Check if there is any validation errors
  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
    return;
  }

  // Hash the password
  let hashedPassword = password.trim();
  hashedPassword = await hashPassword(password);

  // Trim data
  const firstName = first_name.trim();
  const lastName = last_name.trim();
  const emailAddress = email.trim();

  // Create the user
  const newUser = userRepo.create({ first_name: firstName, last_name: lastName, email: emailAddress, password: hashedPassword });

  try {
    // Insert new user
    await userRepo.save(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Could not insert user", error: error });
  }
};
