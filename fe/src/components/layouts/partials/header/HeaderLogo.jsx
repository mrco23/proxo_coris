import { Link } from "react-router";

function HeaderLogo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-1.5">
      <picture>
        <img src="/images/logo.png" alt="logo" className="h-[55px] w-[55px]" />
      </picture>
      <p className="flex flex-col gap-0 text-[1.3rem] leading-none font-bold text-black">
        <span>TORANG</span>
        <span>BERSIH</span>
      </p>
    </Link>
  );
}

export default HeaderLogo;
