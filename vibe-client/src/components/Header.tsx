import { NavLink } from "react-router";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="bg-neutral-brand-900 text-neutral-brand-150 flex justify-between items-center p-2 md:px-8 md:py-3">
      <NavLink to="/">
        {/* der skal laves logik som gør at man ender på / eller /entries afhængigt af om man er logget ind */}
        <img src="vibevault-logo.svg" alt="vibe Vault logo" className="h-9 pb-0.5 md:h-10" />
      </NavLink>
      <nav className="flex items-center">
        <ul className="flex space-x-9">{children}</ul>
      </nav>
    </header>
  );
};

export default Header;
