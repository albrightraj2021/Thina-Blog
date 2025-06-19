import { motion } from "framer-motion";
import logoWoText from "../assets/logoWoText.svg";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-24 h-24">
        <motion.img
          src={logoWoText}
          alt="logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute top-0 left-0 w-full h-full border-2 border-blue-500 rounded-full`}
            style={{ opacity: 0.3 - index * 0.1 }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 - index * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
