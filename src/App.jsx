import { Navigate, Route, Routes, redirect } from "react-router-dom";
import Layout from "./Pages/Layout";
import Form from "./component/LoginForm";
import LoginForm from "./component/LoginForm";
import Particles from "./component/Particles";
import ParticleLoader from "./component/Particles";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <>
        <ParticleLoader />

        <Routes>
          <Route path="/" element=<Layout />>
            <Route path="" element=<LoginForm /> />
            <Route path="Home" element=<HomePage /> />
          </Route>
        </Routes>
      </>
    </>
  );
}

export default App;
