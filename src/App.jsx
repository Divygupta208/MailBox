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
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <>
        {/* <ParticleLoader /> */}
        <ToastContainer />
        <Routes>
          {!isLoggedIn && <Route path="/" element=<LoginForm /> />}

          <Route path="/:id/Home" element={<Layout />}>
            <Route
              path=""
              element={isLoggedIn ? <HomePage /> : <Navigate to={"/"} />}
            />
            <Route path="compose" element={<ComposeMailForm />} />
            <Route path="sent" element={<SentMails />} />
            <Route path="inbox" element={<ReceivedMails />}>
              <Route path="readmail" element={<ReadMessage />} />
            </Route>
          </Route>
        </Routes>
      </>
    </>
  );
}

export default App;
