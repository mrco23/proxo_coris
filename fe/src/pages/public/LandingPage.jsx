import Artikel from "../../components/features/public/landing/artikel/Artikel";
import Fitur from "../../components/features/public/landing/fitur/Fitur";
import Hero from "../../components/features/public/landing/Hero";
import Peta from "../../components/features/public/landing/Peta";
import Tujuan from "../../components/features/public/landing/tujuan/Tujuan";

function LandingPage() {
  return (
    <div className="relative w-full">
      {/* image vector background */}
      <img
        src="/images/landing-bg.png"
        alt="landing"
        className="absolute top-0 left-1/2 z-0 w-full -translate-x-1/2 object-cover"
      />
      <div className="relative z-10">
        <Hero />
        <Fitur />
        <Tujuan />
        <Peta />
        <Artikel />
      </div>
    </div>
  );
}

export default LandingPage;
