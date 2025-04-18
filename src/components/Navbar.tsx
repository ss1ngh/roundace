import { navigationLinks } from "@/utils/content"
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <nav className="bg-transparent text-gray-200 m-auto flex max-w-[90rem] justify-between items-center px-4 py-1 text-lg/8 font-light">
      <a href="/" className="flex items-center gap-x-3 font-mono z-10">
        Round Ace
      </a>

      <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full px-6 py-2 
                     overflow-hidden bg-white/10 border border-white/10 backdrop-blur-lg
                     shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_2px_4px_0_rgb(255_255_255_/_0.05)]
                     transition-all">
        <ul className="flex items-center gap-x-8"> 
          {navigationLinks.map((link) => (
            <li key={link.id}>
              <a 
                onClick={(e) => handleNavClick(e, link.href)} 
                className="hover:text-white transition-all cursor-pointer"
                href={link.href}
              >
                {link.link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-3 z-10">
        {isLoaded && isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <button 
              onClick={() => navigate("/signin")}
              className="hover:text-white transition-all cursor-pointer px-2 py-1 font-mono"
            >
              Login
            </button>
            <button 
              onClick={() => navigate("/signup")}
              className="border border-white/20 hover:text-white bg-white/20 hover:border-white/10 
                            backdrop-blur-lg rounded-3xl px-3 py-1 flex items-center w-fit gap-x-2
                            font-mono transition-all"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
