import { Navigate, Route, Routes, redirect } from "react-router-dom";
import Layout from "./Pages/Layout";
import Form from "./component/LoginForm";
import LoginForm from "./component/LoginForm";
import Particles from "./component/Particles";
import ParticleLoader from "./component/Particles";
import HomePage from "./Pages/HomePage";
import ComposeMail from "./component/ComposeMail";
import ComposeMailForm from "./component/ComposeMail";
import SentMails from "./component/SentMails";
import ReceivedMails from "./component/ReceivedMails";
import ReadMessage from "./component/ReadMessage";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import UserProfile from "./component/UserProfile";
import { mailAction } from "./store/mails-slice";
import { useEffect } from "react";
import { useMailFetching } from "./hooks/useMailFetching";
import SpamMails from "./component/SpamMails";

function App() {
  const userMail = localStorage.getItem("email");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // useEffect(() => {
  const decodedMail = userMail.replace("@", "%40").replace(".", "%25");
  //   dispatch(mailAction.fetchReceivedMails(decodedMail));
  // }, []);

  const { mails, unreadCount } = useMailFetching(
    "https://mailbox-e16e0-default-rtdb.firebaseio.com",
    decodedMail,
    "received"
  );

  // // dispatch(mailAction.setReceivedMails(mails));
  dispatch(mailAction.setUnread(unreadCount));

  return (
    <>
      <>
        {/* <ParticleLoader /> */}

        <Routes>
          <Route path="/" element=<LoginForm /> />

          <Route path="/:id/Home" element={<Layout />}>
            <Route
              path=""
              element={isLoggedIn ? <HomePage /> : <Navigate to={"/"} />}
            />

            <Route
              path="sent"
              element={isLoggedIn ? <SentMails /> : <Navigate to={"/"} />}
            />
            <Route
              path="spam"
              element={isLoggedIn ? <SpamMails /> : <Navigate to={"/"} />}
            />
            <Route
              path="inbox"
              element={isLoggedIn ? <ReceivedMails /> : <Navigate to={"/"} />}
            >
              <Route path="readmail" element={<ReadMessage />} />
            </Route>
          </Route>
        </Routes>
      </>
    </>
  );
}

export default App;
