import { navigationLinks } from "@/utils/content"

const Navbar = () => {
  return (
    <nav className="bg-transparent text-slate-300 m-auto flex max-w-[90rem] justify-between px-22 mb-5 py-2 text-lg/8 font-light">
        <a href="#" className="flex items-center gap-x-3 font-mono">
            Round Ace
        </a>

        <ul className="flex items-center gap-x-8">
          {navigationLinks.map((link) => (
            <li key={link.id}>
              <a className="hover:text-white transition-all" href={link.href}>{link.link}</a>
            </li>
          ))}
        </ul>

        <div className=" flex items-center gap-x-3">
          <button className= "text-slate-300 hover:text-white transition-all cursor-pointer px-2 py-1 font-mono">Login</button>
          <button className="text-slate-300 hover:text-white transition-all cursor-pointer px-2 py-1 font-mono">Get Started</button>
        </div>
    </nav>
  )
}

export default Navbar