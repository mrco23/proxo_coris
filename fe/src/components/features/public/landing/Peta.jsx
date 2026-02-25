import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Peta = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="flex w-full justify-center px-4 py-10 md:px-6 md:py-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <HiOutlineLocationMarker className="text-3xl text-(--cyan)" />
            <h2 className="text-3xl font-bold tracking-tight">
              Jangkauan Kami
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-7 font-medium text-gray-500">
            Memantau dan mengelola persampahan di seluruh wilayah Sulawesi
            Utara, dari kota hingga kabupaten.
          </p>
        </div>

        {/* Peta */}
        <div className="w-full max-w-[1400px] overflow-hidden rounded-2xl shadow-[0px_4px_25px_5px_rgba(0,0,0,0.1)]">
          <img
            src="/images/maps-sulut.png"
            alt="Maps Sulut"
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Peta;
