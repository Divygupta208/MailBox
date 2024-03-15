import { Link, useParams } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import ParticleLoader from "./Particles";
import { useSelector } from "react-redux";

const Navbar = () => {
  const controls = useAnimation();
  const userMail = useSelector((state) => state.user.email);
  useEffect(() => {
    controls.start({ y: 0, opacity: 1, transition: { duration: 0.5 } });
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
        className="bg-[#dddddd] dark:bg-white h-[8vh] w-full  justify-start "
      >
        <ul className="flex justify-evenly p-6">
          <img
            className="ml-[-20rem] w-10  mb-[1rem]"
            src="/ezgif-1-51173bd78e.gif"
          />
          <span className="ml-[-85rem] absolute">
            <motion.span
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, staggerChildren: true }}
              className="absolute top-0 left-0 text-xl font-bold font-custom "
            >
              go
            </motion.span>
            <motion.span
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-0 left-0 ml-6 text-xl font-bold font-custom"
            >
              mail
            </motion.span>
          </span>

          <motion.li whileHover={{ scale: 1.1 }}>
            <Link
              className="text-white dark:text-black dark:font-medium"
              to={""}
            >
              Home
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link
              className="text-white dark:text-black dark:font-medium"
              to={"/inbox"}
            >
              Inbox
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
    </>
  );
};

export default Navbar;
