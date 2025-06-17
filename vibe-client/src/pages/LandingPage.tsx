import LoginForm from "../components/LoginForm";

const Landing = () => {
  return (
    <main className="px-5 py-10 md:px-10 flex justify-center relative flex-1">
      <img src="landing.jpg" alt="" className="hidden md:block md:absolute md:top-0 md:bottom-0 md:w-full md:h-full md:overflow-hidden" />
      <img src="landing_mobile.jpg" alt="" className="md:hidden absolute top-0 bottom-0 w-full h-full overflow-hidden" />
      <div className=" w-full z-1 flex flex-col gap-6 xs:grid xs:grid-cols-2 xs:grid-rows-1 xs:gap-1 lg:grid-cols-3">
        <h1 className="text-2xl md:text-4xl my-2 font-light font-display flex flex-col h-fit gap-1 xs:col-start-1 xs:row-1 xs:self-center lg:col-span-2">
          Welcome to <span className="text-5xl italic md:text-6xl lg:text-9xl font-bold">vibeVault</span>
        </h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default Landing;
