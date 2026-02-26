import React from "react";

const PetaPage = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white pt-24 transition-colors duration-200">
      <div className="w-full flex-1 overflow-hidden">
        <img src="/images/maps-sulut.png" alt="" className="w-full" />
      </div>
      <div className="w-full">
        <div className="flex w-full items-center justify-center p-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 Lasalle Vibers. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetaPage;
