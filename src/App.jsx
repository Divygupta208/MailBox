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

function App() {
  return (
    <>
      <>
        {/* <ParticleLoader /> */}

        <Routes>
          <Route path="/" element=<LoginForm /> />
          <Route path="/:id/Home" element={<Layout />}>
            <Route index element={<HomePage />} />
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
