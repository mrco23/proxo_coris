import { Link } from "react-router";

function AuthLogo() {
  return (
    <Link to="/" className="flex gap-2 items-center shrink-0">
      <picture>
        <img src="images/logo.png" alt="logo" className="w-[80px] h-[80px]" />
      </picture>
      <p className="flex flex-col gap-0 text-black font-bold text-[1.75rem] leading-none">
        <span>TORANG</span>
        <span>BERSIH</span>
      </p>
    </Link>
  );
}

export default AuthLogo;
