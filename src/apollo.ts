import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("token")));

export const isDarkVar = makeVar(Boolean(localStorage.getItem("dark")));

export const client = new ApolloClient({
  uri: "https://nomadcoffeee.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
