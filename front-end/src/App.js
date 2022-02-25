import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ForgetPassword from "./authentications/ForgetPassword";
import Login from "./authentications/Login";
import Register from "./authentications/Register";
import ResetPassword from "./authentications/ResetPassword";
import ChatProvider from "./contexts/ChatProvider";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="App">
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/chat" element={<ChatPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forget-password" element={<ForgetPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </ChatProvider>

    </div >
  );
}

export default App;
