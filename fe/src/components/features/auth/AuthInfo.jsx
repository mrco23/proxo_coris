const AuthInfo = () => {
  return (
    <div className="relative hidden w-full items-center justify-center overflow-hidden rounded-xl bg-(--primary) p-6 lg:flex">
      {/* vector for background */}
      <img
        src="/images/auth-vector.png"
        alt="vector"
        className="absolute top-0 left-0 z-0 h-full w-full object-cover"
      />
      <div className="z-10 space-y-8 pb-50">
        <div className="flex items-center justify-center">
          <picture className="flex items-center justify-center rounded-lg bg-white p-2">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-[55px] w-[55px]"
            />
          </picture>
        </div>
        <h1 className="text-center text-4xl leading-14 font-semibold text-white text-shadow-lg">
          Platform Torang Bersih untuk Sulawesi Utara yang Lebih Bersih
        </h1>
        <p className="text-center text-xl leading-8 text-white">
          Bergabunglah dengan ribuan warga, komunitas, dan bank sampah. ciptakan
          lingkungan yang lebih sehat dari genggaman Anda.
        </p>
      </div>

      {/* map image sulut */}
      <img
        src="/images/maps-sulut.png"
        alt="map"
        className="absolute right-[-10px] bottom-0 z-4 h-1/3 w-3/4 rounded-2xl object-cover"
      />
    </div>
  );
};

export default AuthInfo;
