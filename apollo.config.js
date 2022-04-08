module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagname: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "https://nomadcoffeee.herokuapp.com/graphql",
    },
  },
};
