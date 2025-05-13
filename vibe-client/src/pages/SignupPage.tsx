import InputGroup from "../components/InputGroup";

const SignupPage = () => {
  return (
    <>
      <title>vibeVault - Signup</title>
      <main>
        <h1>Signup</h1>
        <InputGroup inputType="text" id="txtFirstName" inputName="firstName" labelText="First name" />
        <InputGroup inputType="text" id="txtLastName" inputName="lastName" labelText="Last name" />
        <InputGroup inputType="email" id="txtEmail" inputName="email" labelText="Email" />
        <InputGroup inputType="password" id="pwPassword" inputName="password" labelText="Password" />
        <InputGroup inputType="password" id="pwRepeat" inputName="repeatPassword" labelText="Repeat Password" />
      </main>
    </>
  );
};

export default SignupPage;
