import { Navigate, Route, Routes, redirect } from "react-router-dom";
import Layout from "./Pages/Layout";
import Form from "./component/LoginForm";
import LoginForm from "./component/LoginForm";
import Particles from "./component/Particles";
import ParticleLoader from "./component/Particles";
import HomePage from "./Pages/HomePage";
import ComposeMail from "./component/ComposeMail";
import ComposeMailForm from "./component/ComposeMail";

function App() {
  return (
    <>
      <>
        {/* <ParticleLoader /> */}

        <Routes>
          <Route path="/" element=<LoginForm /> />
          <Route path="/Home" element=<Layout />>
            <Route path="" element=<HomePage /> />
            <Route path="compose" element=<ComposeMailForm /> />
          </Route>
        </Routes>
      </>
    </>
  );
}

export default App;
