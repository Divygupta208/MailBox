import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { uiActions } from "../store/ui-slice";
import { userActions } from "../store/user-slice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const [name, setName] = useState();
  const [profile, setProfile] = useState();
  const nameRef = useRef();
  const imageRef = useRef();
  const open = useSelector((state) => state.ui.showProfile);
  const token = useSelector((state) => state.user.token);

  const userMail = useParams();
  const [checkProfile, setCheckProfile] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
          import.meta.env.VITE_API_KEY
        }`,

        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),

          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.users[0].emailVerfied) {
          localStorage.setItem("EmailVerfied", data.users[0].emailVerfied);
        }
        setName(data.users[0].displayName);
        dispatch(userActions.setUserName(data.users[0].displayName));
        setProfile(data.users[0].photoUrl);
      }
    };
    fetchUserData();
  }, [token]);

  const handleChangeUsername = async () => {
    console.log("User changed username");
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: nameRef.current.value,
          returnSecureToken: true,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      notify(data.error.message);
    }
  };

  const handleSetProfileImage = async () => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          photoUrl: imageRef.current.value,
          returnSecureToken: true,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      notify(data.error.message);
    }
  };

  const handleCloseProfile = () => {
    dispatch(uiActions.setShowProfile(false));
  };

  const handleLogout = () => {};

  const checkProfileHandler = () => {
    setCheckProfile(!checkProfile);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          drag
          dragElastic={0.1}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
          initial={{ opacity: 1, y: -300, x: 150, scale: 0 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 150, y: -300, scale: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 xl:mr-2 mr-20 mt-20 z-50 xl:w-96 w-60 h-[60vh] xl:p-4 p-1 bg-[#ffffff] shadow-xl border-2 border-black/10 rounded-lg"
        >
          <div className="flex items-center justify-end mb-4">
            <button
              className="text-gray-500 hover:text-gray-200 xl:px-3 px-1 bg-black rounded-full"
              onClick={handleCloseProfile}
            >
              X
            </button>
          </div>

          <img
            className="xl:w-20 xl:ml-[9rem] xl:h-20 w-16 h-16 ml-[5rem] rounded-full shadow-xl object-cover"
            src={`${profile}`}
          />
          <hr className="mt-3 mb-3"></hr>
          <div className="">
            <p className="text-gray-600 text-sm xl:text-md">
              <b>username</b>: {name ? name : username}
            </p>
            <p className="text-gray-600 text-sm xl:text-md">
              <b>Email</b>: {userMail.id}
            </p>
          </div>

          {checkProfile && (
            <>
              <div className="mt-4">
                <input
                  type="text"
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="New Username"
                  className="border rounded-md px-2 py-1 mb-2"
                />
                <button
                  onClick={handleChangeUsername}
                  className="bg-blue-500 text-white xl:px-4 px-1 text-md text-xs py-1 rounded-md mr-2"
                >
                  Change Username
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  ref={imageRef}
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  placeholder="New Profile Image URL"
                  className="border rounded-md px-2 py-1 mb-2"
                />
                <button
                  onClick={handleSetProfileImage}
                  className="bg-blue-500 text-white xl:px-4 px-1 text-md text-xs py-1 rounded-md mr-2"
                >
                  Set Profile Image
                </button>
              </div>
            </>
          )}

          <div className="flex absolute justify-between bottom-3 xl:gap-40 gap-2">
            <button
              className=" bg-red-500 text-white xl:px-4 px-2 py-1 rounded-md "
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              onClick={checkProfileHandler}
              className=" xl:p-2 p-1  bg-black text-white rounded-xl "
            >
              Check Profile
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;
