import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import ParticleLoader from "./Particles";

const Navbar = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ y: 0, opacity: 1, transition: { duration: 0.5 } });
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
      className="bg-black dark:bg-white h-[8vh] w-full justify-start z-50 "
    >
      <ul className="flex justify-evenly p-6">
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link
            className="text-white dark:text-black dark:font-medium"
            to={`/Home`}
          >
            Home
          </Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link
            className="text-white dark:text-black dark:font-medium"
            to={"/products"}
          >
            Products
          </Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link
            className="text-white dark:text-black dark:font-medium"
            to={`/aboutus`}
          >
            About Us
          </Link>
        </motion.li>
      </ul>
    </motion.div>
  );
};

export default Navbar;
