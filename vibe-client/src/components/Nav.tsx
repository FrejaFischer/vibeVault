const Nav = () => {
  return (
    <header className="bg-primary flex justify-between p-3 lg:p-5">
      <a href="/" aria-label="Logo" className="text-xl font-display font-bold text-secondary lg:text-3xl">
        vibeVault
      </a>
      <ul className="flex gap-4 lg:gap-10">
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/signup">Signup</a>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
