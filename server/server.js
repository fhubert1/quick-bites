const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const seedData = require("./config/seedData");

const PORT = process.env.PORT || 3002;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});
// app.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
    
    await server.start();
  
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
  
   // app.use(authMiddleware);

    app.use('/graphql', expressMiddleware(server, {
         context: authMiddleware
     }));

     app.use(express.static('client'));

    db.once("open", async() => {
        console.log("Connected to MongoDB");

        await seedData();

        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};
  
// Call the async function to start the server
startApolloServer();
