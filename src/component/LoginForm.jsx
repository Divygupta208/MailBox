import React, { useRef, useState } from "react";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ParticleLoader from "./Particles";
import { userActions } from "../store/user-slice";

const LoginForm = () => {
  //   const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [login, setLogIn] = useState(false);
  const [sending, setSending] = useState(false);
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const notify = (text) => toast(text);
  const [confirmPass, setConfirmPass] = useState(true);
  const apiKey = import.meta.env.VITE_API_KEY;

  const loginHandler = () => {
    setLogIn(!login);
  };

  const validatePasswords = () => {
    if (!login) {
      const passwordValue = passwordRef.current.value;
      const confirmPasswordValue = confirmPasswordRef.current.value;

      if (passwordValue === confirmPasswordValue) {
        setConfirmPass(true);
      } else {
        setConfirmPass(false);
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    validatePasswords();

    setSending(true);

    if (login) {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("email", data.email);
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("isLoggedIn", true);
          dispatch(userActions.setToken(data.idToken));
          dispatch(userActions.setIsLoggedIn(true));
          dispatch(userActions.setEmail(data.email));
          navigate(`${data.email}/Home`);
          setSending(false);
          notify("successfully signed in");
        } else {
          const data = await response.json();
          setSending(false);
          notify(data.error.message);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      if (confirmPass) {
        try {
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
            {
              method: "POST",
              body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
                returnSecureToken: true,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            notify("Successfully signed up");
            const data = await response.json();
            setSending(false);
          } else {
            const data = await response.json();
            notify(data.error.message);
            setSending(false);
            throw new Error(data.error.message);
          }
        } catch (error) {
          setSending(false);
          console.log(error);
        }
      }
    }
  };

  //   const navigateToForgot = () => {
  //     navigate("/forgotpassword");
  //   };
  return (
    <>
      <ToastContainer />
      <Card>
        <form
          className="form-main flex flex-col backdrop-blur-sm bg-white/10 justify-self-center items-center "
          onSubmit={submitHandler}
        >
          {login ? (
            <h2 className="text-2xl text-white  mt-6">Log in</h2>
          ) : (
            <h2 className="text-2xl mt-6 text-white">Sign Up</h2>
          )}
          <div className="text-center">
            <input
              type="text"
              id="email"
              placeholder="email"
              className="bg-zinc-300 mt-[100px] rounded-xl h-10 w-64 p-5"
              ref={emailRef}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              className="bg-zinc-300 mt-4 rounded-xl h-10 w-64 p-5"
              ref={passwordRef}
              onChange={validatePasswords}
              required
              minLength={6}
            />
            {!login && (
              <input
                type="password"
                id="confirmpassword"
                placeholder="Confirm Password"
                className="bg-zinc-300 mt-4 rounded-xl h-10 w-64 p-5"
                ref={confirmPasswordRef}
                onChange={validatePasswords}
                required
                minLength={6}
              />
            )}
          </div>

          {!confirmPass && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}

          {sending ? (
            <span>loading...</span>
          ) : (
            <button className="dark:md:hover:bg-purple-950 bg-purple-600 mt-9 mb-4 rounded-2xl text-white p-4">
              {login ? "Log in" : "Sign up"}
            </button>
          )}
        </form>
        <div className="backdrop-blur-sm bg-white/10 text-center w-[100%] ">
          {!login && (
            <div className="relative mt-10 bg-green-200 border-black w-60 p-2 ms-[70px] rounded mb-7 text-green-700">
              already have an account?
              <> </>
              <button onClick={loginHandler} className="text-green-900">
                log in
              </button>
            </div>
          )}
          {login && (
            <button className="mx-auto text-red-600">Forgot password ?</button>
          )}
          {login && (
            <div className="relative mt-10 bg-green-200 border-black w-60 p-2 ms-[70px] rounded mb-7 text-green-700">
              Create An Acoount?
              <> </>
              <button onClick={loginHandler} className="text-green-900">
                sign up
              </button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default LoginForm;
