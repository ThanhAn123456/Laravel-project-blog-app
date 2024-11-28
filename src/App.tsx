import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SignIn from "pages/auth/signIn/SignIn";
import SignUp from "pages/auth/signUp/SignUp";
import { Provider } from "react-redux";
import { store } from "store";

function App() {
  return (
    <Provider store={store}>
      <SignUp></SignUp>
    </Provider>
  );
}

export default App;
