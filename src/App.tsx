import { ApolloProvider, useReactiveVar } from "@apollo/client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, isDarkVar, isLoggedInVar } from "./apollo";
import Home from "./screen/Home";
import Layout from "./screen/Layout";
import Login from "./screen/Login";
import SignUp from "./screen/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDark = useReactiveVar(isDarkVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                  path="/login"
                  element={
                    !isLoggedIn ? <Login /> : <Navigate to="/" replace />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    !isLoggedIn ? <SignUp /> : <Navigate to="/" replace />
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
