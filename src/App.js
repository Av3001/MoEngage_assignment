import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./components/pages/auth/LoginReg.js";
// import ResetPassword from "./components/pages/auth/ResetPassword.js";
// import SendPasswordResetEmail from "./components/pages/auth/SendPasswordResetEmail.js";
import Contact from "./components/pages/Contact.js";
import Dashboard from "./components/pages/Dashboard.js";
import Home from "./components/pages/Home.js";
import Layout from "./components/pages/Layout.js";
import Brewery from "./components/pages/Brewery.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            {/* <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} /> */}
            {/* <Route path="reset" element={<ResetPassword />} /> */}
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brewery" element={<Brewery />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
