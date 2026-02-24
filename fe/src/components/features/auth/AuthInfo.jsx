const AuthInfo = () => {
  return (
    <div className="w-full bg-(--primary) rounded-xl items-center justify-center p-6 relative overflow-hidden hidden lg:flex">
      {/* vector for background */}
      <img
        src="images/auth-vector.avif"
        alt="vector"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-3"
      />
      <div className="pb-50 space-y-8 z-10">
        <div className="flex items-center justify-center">
          <picture className="flex items-center justify-center bg-white p-2 rounded-lg">
            <img
              src="images/logo.png"
              alt="logo"
              className="w-[55px] h-[55px]"
            />
          </picture>
        </div>
        <h1 className="text-4xl font-semibold text-white text-center leading-14 text-shadow-lg">
          Platform Torang Bersih untuk Sulawesi Utara yang Lebih Bersih
        </h1>
        <p className="text-white text-center text-xl leading-8">
          Bergabunglah dengan ribuan warga, komunitas, dan bank sampah. ciptakan
          lingkungan yang lebih sehat dari genggaman Anda.
        </p>
      </div>

      {/* map image sulut */}
      <img
        src="images/maps-sulut.png"
        alt="map"
        className="absolute bottom-0 right-[-10px] w-3/4 h-1/3 object-cover z-4 rounded-2xl"
      />
    </div>
  );
};

export default AuthInfo;
