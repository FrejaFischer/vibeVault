import SignupForm from "../components/SignupForm";
import VinylsGraphic from "../components/VinylsGraphic";

const SignupPage = () => {
  return (
    <>
      <title>vibeVault - Signup</title>
      <main className="md:flex md:gap-10 md:mx-20 md:justify-center">
        <SignupForm />
        <VinylsGraphic styling=" hidden md:block md:self-center" />
      </main>
    </>
  );
};

export default SignupPage;
