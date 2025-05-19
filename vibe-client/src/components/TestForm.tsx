import { useState } from "react";
import { useCreateTest } from "../hooks/useCreateTest";

// THIS IS A TEST COMPONENT

const TestForm = () => {
  const createTest = useCreateTest(); // Get create test method from hook
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [errorGroup, setErrorGroup] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Array for containing errors
    const errors: string[] = [];

    // Validate inputs (should maybe be moved to another file?)
    if (!name.trim()) {
      errors.push("Name is required");
    }

    if (!role.trim()) {
      errors.push("Role is required");
    }

    // Set the validation errors (either with errors or empty) so they display in the UI
    setErrorGroup(errors);

    // Stop submission if there are errors
    if (errors.length > 0) return;

    try {
      // Create the new test data (which returns the new data, if we need it)
      const newTestData = await createTest({ name, role });
      console.log(newTestData);

      // Reset states containing the input values
      setName("");
      setRole("");

      // Clear errors on success
      setErrorGroup([]);

      // Tell the user is was succesfull
      alert("User created!");
    } catch (err) {
      // Set error inside error state
      errors.push("Failed to create user. System error");
      setErrorGroup(errors);

      console.log("client error", err);
    }
  };

  return (
    <>
      <section>
        {errorGroup.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
      </section>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
        <button type="submit">Add User</button>
      </form>
    </>
  );
};

export default TestForm;
