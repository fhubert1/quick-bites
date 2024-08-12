const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const seedData = require("./config/seedData");

const PORT = process.env.PORT || 3002;
// const NODE_ENV = process.env.NODE_ENV || 'dev';
// console.log("node env: " + NODE_ENV)

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

    // Serve up static assets
    app.use('/images', express.static(path.join(__dirname, '../client/src/assets/images')));
    app.use(express.static(path.join(__dirname, '../client/src/pages/Menu.jsx')));


    // app.use(authMiddleware);

    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));

    app.use(express.static('client'));

    // if (NODE_ENV === 'production') {
    //     console.log("path is production");
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once("open", async () => {
        console.log("Connected to MongoDB");

        await seedData();

        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });

// Call the async function to start the server
startApolloServer();
