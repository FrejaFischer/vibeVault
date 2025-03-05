const Landing = () => {
  return (
    <main>
      <h1 className="text-6xl font-light font-display flex flex-col">
        Welcome to <span className="text-8xl font-bold">vibeVault</span>
      </h1>
      <p className="text-2xl">
        <a href="/login" className="underline">
          Login
        </a>{" "}
        or{" "}
        <a href="/signup" className="underline">
          Signup
        </a>
      </p>
      <div className="relative w-[550px] h-[450px]">
        <svg width="310" height="310" viewBox="0 0 310 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary absolute bottom-0 right-0">
          <circle cx="155" cy="155" r="150" stroke="currentColor" stroke-width="5" />
          <circle cx="155" cy="155" r="135" fill="currentColor" />
          <circle cx="155" cy="155" r="120" fill="#fff" stroke="currentColor" stroke-width="3" />
          <circle cx="155" cy="155" r="105" fill="currentColor" />
          <circle cx="155" cy="155" r="90" fill="#fff" stroke="currentColor" stroke-width="3" />
          <circle cx="155" cy="155" r="75" fill="currentColor" />
          <circle cx="155" cy="155" r="60" fill="#fff" stroke="currentColor" stroke-width="3" />
          <circle cx="155" cy="155" r="30" fill="currentColor" />
          <circle cx="155" cy="155" r="5" fill="#fff" />
        </svg>
        <svg width="310" height="310" viewBox="0 0 310 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
          <circle cx="155" cy="155" r="150" stroke="currentColor" stroke-width="5" />
          <circle cx="155" cy="155" r="135" fill="currentColor" />
          <circle cx="155" cy="155" r="120" fill="#fff" stroke="currentColor" stroke-width="3" />
          <circle cx="155" cy="155" r="105" fill="currentColor" />
          <circle cx="155" cy="155" r="90" fill="#fff" stroke="currentColor" stroke-width="3" />
          <circle cx="155" cy="155" r="75" fill="currentColor" />
          <circle cx="155" cy="155" r="60" fill="#fff" stroke="currentColor" stroke-width="3" />
          <circle cx="155" cy="155" r="30" fill="currentColor" />
          <circle cx="155" cy="155" r="5" fill="#fff" />
        </svg>
      </div>
    </main>
  );
};

export default Landing;
