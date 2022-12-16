import { ApolloServer, gql } from "apollo-server";

const user = {id:1,username:"kim",firstname:"jaehyeong",lastname:"kim"};

let tweets = [
    {id:"1", text:"Hello WOrld", author:user},
    {id:"2", text:"Why", author:user},
    {id:"3", text:"what are youdoing", author:user},
    {id:"4", text:"war never war", author:user}
]

//SDL
const typeDefs = gql`
    type User {
    id: ID!
    username: String!
    firstname: String
    lastname: String!
    }

    type Tweet {
    id: ID!
    text: String!
    author: User
    }

    type Query{
        allTweets: [Tweet!]!
        tweet(id:ID!): Tweet
        ping: String!
    }

    type Mutation{
        postTweet(text:String!, userId:ID!):Tweet!
        deleteTweet(id:ID!):Boolean!
    }
`;

//GraphQL은 Query or Mutation

// GET /api/v1/tweets
// GET /api/v1/tweet/:id
// 사용자가 Get하고싶어하는건 뭐든 Query type에 있어야한다. 

// Post Delete Put /api/v1/tweet
// 사용자가 Post Delete Put하고싶어하는건 뭐든 Mutation type에 있어야한다.

const resolvers = {
    Query:{
        tweet(root, args){
            const id = args.id;
            const tweet  = tweets.find((tweet)=>tweet.id===parseInt(id));
            return tweet;
        },
        ping(){
            return "pong";
        },
        allTweets(){
            return tweets;
        }
    },
    Mutation:{
        postTweet(_, {text, userId}){
            const tweet = {id:tweets.length+1, text:text , author:null};
            tweets.push(tweet);
            return tweet;
        },
        deleteTweet(_, {id}){
            const isFind = tweets.find((tweet)=>tweet.id===id);
             
            if(!isFind){
                return false;
            }

            tweets = tweets.filter((tweet)=>tweet.id!==id);
            return true;
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen()
.then(({url})=>{
    console.log(`Running on ${url}`);
});