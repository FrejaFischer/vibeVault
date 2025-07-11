import { useState } from "react";
import { useCreateUser } from "../hooks/useCreateUser";
import InputGroup from "./InputGroup";
import Button from "./Button";
import { validateEmail, validateFirstName, validateLastName, validatePassword, validateRepeatPassword } from "../validation/userValidation";
import { Link, useNavigate } from "react-router";
import { AxiosError } from "axios";

const SignupForm = () => {
  const createUser = useCreateUser(); // Create user hook
  const navigate = useNavigate(); // To redirect after creating a user

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  }); // State to handle input values

  const [errors, setErrors] = useState<Record<string, string[]>>({}); // Object State for storing errors (The keys are strings. The values are arrays of strings)
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles onChange events for all inputs
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle submitting of the form
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string[]> = {}; // Temporary object where we collect validation errors

    const { firstName, lastName, email, password, repeatPassword } = formData;

    // Validate all inputs
    const firstNameErrors = validateFirstName(firstName);
    if (firstNameErrors.length) newErrors.firstName = firstNameErrors;

    const lastNameErrors = validateLastName(lastName);
    if (lastNameErrors.length) newErrors.lastName = lastNameErrors;

    const emailErrors = validateEmail(email);
    if (emailErrors.length) newErrors.email = emailErrors;

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length) newErrors.password = passwordErrors;

    const passwordRepeatErrors = validateRepeatPassword(password, repeatPassword);
    if (passwordRepeatErrors.length) newErrors.repeatPassword = passwordRepeatErrors;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Gets an array of the keys in newErrors - Checks if at least one field had an error

    try {
      await createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      // Reset states
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
      });

      setErrors({});

      // redirect to login / landingpage
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      // Check what kind of error
      if (error.response?.status === 400) {
        if ("message" in error.response.data && error.response?.data?.message === "Email already in use") {
          setErrorMessage("Failed to create user. Email is already in use.");
        } else {
          setErrorMessage("Failed to create user. Please check all infomation is given correctly.");
        }
      } else {
        setErrorMessage("Failed to create user. System error - Please contact customer service");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center justify-center bg-white p-2 my-2 border-2 px-6 border-black rounded-2xl">
        <h2 className="uppercase font-black">Signup today</h2>
        <InputGroup inputType="text" id="txtFirstName" inputName="firstName" labelText="First name" value={formData.firstName} onChange={handleChange} errors={errors.firstName} />
        <InputGroup inputType="text" id="txtLastName" inputName="lastName" labelText="Last name" value={formData.lastName} onChange={handleChange} errors={errors.lastName} />
        <InputGroup inputType="email" id="txtEmail" inputName="email" labelText="Email" value={formData.email} onChange={handleChange} errors={errors.email} />
        <InputGroup inputType="password" id="pwPassword" inputName="password" labelText="Password" value={formData.password} onChange={handleChange} errors={errors.password} />
        <InputGroup inputType="password" id="pwRepeat" inputName="repeatPassword" labelText="Repeat Password" value={formData.repeatPassword} onChange={handleChange} errors={errors.repeatPassword} />
        <Button type="submit" text="SIGNUP" />
        {errorMessage.length > 0 ? (
          <div className="error-messages">
            <p className="text-negative-brand-400">{errorMessage}</p>
          </div>
        ) : (
          ""
        )}
        <p>
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignupForm;
