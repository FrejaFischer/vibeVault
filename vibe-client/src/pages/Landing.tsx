import VinylsGraphic from "../components/VinylsGraphic";

const Landing = () => {
  return (
    <main className="mx-5 my-10 md:my-10 flex justify-center">
      <div className="max-w-6xl flex flex-col gap-6 xs:grid xs:grid-cols-2 xs:grid-rows-2 xs:gap-1 sm:grid-cols-7 sm:gap-4 md:mx-12 lg:grid-cols-12 lg:gap-5">
        <h1 className="text-4xl font-light font-display flex flex-col h-fit gap-1 xs:col-start-1 xs:row-1 xs:self-end sm:col-span-3 lg:text-6xl lg:col-start-1 lg:col-span-5">
          Welcome to <span className="text-5xl lg:text-8xl font-bold">vibeVault</span>
        </h1>
        <p className="text-xl xs:col-start-1 xs:row-start-2 sm:col-span-3 md:text-2xl lg:col-start-1">
          <a href="/login" className="underline">
            Login
          </a>{" "}
          or{" "}
          <a href="/signup" className="underline">
            Signup test
          </a>
        </p>
        <VinylsGraphic styling="self-center xs:col-start-2 xs:row-span-2 sm:col-start-4 lg:col-start-7 lg:row-span-2" />
      </div>
    </main>
  );
};

export default Landing;
