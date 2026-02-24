import { Link } from "react-router";

function HeaderLogo() {
  return (
    <Link to="/" className="flex gap-2 items-center shrink-0">
      <picture>
        <img src="images/logo.png" alt="logo" className="w-[50px] h-[50px]" />
      </picture>
      <p className="flex flex-col gap-0 text-black font-bold text-[1.1rem] leading-none">
        <span>TORANG</span>
        <span>BERSIH</span>
      </p>
    </Link>
  );
}

export default HeaderLogo;
