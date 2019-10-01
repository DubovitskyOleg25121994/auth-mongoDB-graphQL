const graphql = require("graphql");
const UserType = require("./user.type");
const userModel = require("../models/user.model");
const auth = require("../authentication/auth");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(root, args) {
        return userModel.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        activationToken: { type: GraphQLString }
      },
      resolve: async (root, args) => {
        return await auth.register(args);
      }
    },
    login: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (root, args) => {
        return await auth.login(args);
      }
    },
    activation: {
      type: UserType,
      args: {
        activationToken: { type: GraphQLString }
      },
      resolve: async (root, args) => {
        console.log("args", args);
        return await auth.activation(args);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
