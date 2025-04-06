import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header : React.FC<HeaderProps> = ({children}) => {
  return (
    <div className="bg-transparent">
      <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      {children}
    </div>
  )
}

export default Header