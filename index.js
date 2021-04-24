const { ApolloServer,PubSub }=require('apollo-server');
const gql=require('graphql-tag');
const mongoose=require('mongoose');


const {MONGODB}=require('./config.js')
const typeDefs=require("./graphql/typeDefs");
const resolvers=require("./graphql/resolvers");

const pubsub =new PubSub();
const PORT = process.env.PORT || 5000;

const server= new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req,pubsub})
});

mongoose.connect(MONGODB,{useNewUrlParser:true})
.then(()=>{
    console.log('Mongo connected');
    return server.listen(PORT)
})
.then(res=>{
    console.log(`Server running at ${res.url}`);
}).catch(err=>console.log("Server Error===>"+err));