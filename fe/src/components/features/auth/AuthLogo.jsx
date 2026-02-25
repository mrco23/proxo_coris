import { Link } from "react-router";

function AuthLogo() {
  return (
    <Link to="/" className="mb-0.5 flex shrink-0 items-center gap-2">
      <picture>
        <img src="/images/logo.png" alt="logo" className="h-[85px] w-[85px]" />
      </picture>
      <p className="flex flex-col gap-0 text-[2rem] leading-none font-bold text-black">
        <span>TORANG</span>
        <span>BERSIH</span>
      </p>
    </Link>
  );
}

export default AuthLogo;
