import { ApolloServer, gql } from "apollo-server";

//SDL
const typeDefs = gql`
    type User {
    id: ID
    username: String
    }

    type Tweet {
    id: ID
    text: String
    author: User
    }

    type Query{
        allTweets: [Tweet]
        tweet(id:ID): Tweet
    }
`;

// GET /text
// GET /hello
// 사용자가 Request하고싶어하는건 뭐든 Query type에 있어야한다. 

const server = new ApolloServer({typeDefs});

server.listen()
.then(({url})=>{
    console.log(`Running on ${url}`);
});