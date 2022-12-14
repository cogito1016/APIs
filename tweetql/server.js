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

    type Mutation{
        postTweet(text:String, userId:ID):Tweet
        deleteTweet(id:ID):Boolean
    }
`;

//GraphQL은 Query or Mutation

// GET /api/v1/tweets
// GET /api/v1/tweet/:id
// 사용자가 Get하고싶어하는건 뭐든 Query type에 있어야한다. 

// Post Delete Put /api/v1/tweet
// 사용자가 Post Delete Put하고싶어하는건 뭐든 Mutation type에 있어야한다.

const server = new ApolloServer({typeDefs});

server.listen()
.then(({url})=>{
    console.log(`Running on ${url}`);
});