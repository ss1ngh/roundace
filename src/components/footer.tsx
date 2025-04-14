import { footerCols } from "../utils/content";
// import Logo from "../icons/Logo";

type FooterLink = string;

type FooterColumn = {
  id: number;
  category: string;
  links: FooterLink[];
};

export default function Footer(): JSX.Element {
  return (
    <>
      {/* ⚡ Glowy Centered Line */}
      <div className="relative mx-auto mt-10 h-[2px] w-8/12 bg-slate-700/60 rounded-full">
        <div className="absolute left-1/2 top-1/2 h-[6px] w-72 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-xl opacity-90" />
      </div>

      <footer className="bg-gradient-to-bottom">
        <div className="m-auto flex max-w-[90rem] justify-between px-24 py-20 max-xl:px-16 max-xl:py-24 max-lg:grid max-lg:gap-y-18 max-lg:px-8 max-md:px-6 max-sm:pb-16">
          <div>
            <a className="flex items-center gap-x-3 max-md:gap-x-2" href="#">
              {/* <Logo 
                className="stroke-slate-300 h-6" 
                alt="RoundAce Logo Icon" 
                width={5} 
              /> */}
              <p className="text-slate-300 text-xl font-bold tracking-tight max-md:text-lg/8 max-md:tracking-tighter">
                RoundAce
              </p>
            </a>
          </div>

          <div className="grid grid-cols-[repeat(4,max-content)] gap-x-24 max-xl:gap-x-18 max-lg:gap-x-24 max-md:grid-cols-2 max-md:gap-y-14">
            {footerCols.map((col: FooterColumn) => (
              <div key={col.id}>
                <p className="text-slate-300 mb-8 text-xl/loose font-semibold max-md:text-lg/8 max-md:tracking-tight">
                  {col.category}
                </p>
                <ul className="flex flex-col gap-y-4">
                  {col.links.map((link: FooterLink, i: number) => (
                    <li key={i} className="cursor-pointer">
                      <a
                        className="text-slate-300/70 hover:text-white transition-properties text-lg/8 font-light max-xl:text-base/loose"
                        href="#"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
