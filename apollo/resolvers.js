import Post from "apollo/models/Post.model";
import Product from "apollo/models/Product.model";
import GraphQLJSON from "graphql-type-json";
import { ApolloError } from "apollo-server-micro";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world";
    },
    getProducts: async (_, args) => {
      const { sort = "createdAt", limit = 20, skip = 0, where = {} } = args;
      return await Product.find(where)
        .skip(skip)
        .limit(limit)
        .sort({ [sort]: 1 });
    },
    getPosts: async (_, args) => {
      const { sort = "createdAt", limit = 20, skip = 0, where = {} } = args;
      return await Post.find(where)
        .skip(skip)
        .limit(limit)
        .sort({ [sort]: 1 });
    },
  },

  Post: {
    products: async (parent, args) => {
      const { sort = "createdAt", limit = 20, skip = 0, where = {} } = args;
      return await Product.find({ _id: { $in: parent.products }, ...where })
        .skip(skip)
        .limit(limit)
        .sort({ [sort]: 1 });
    },
  },

  JSON: GraphQLJSON,
  Date: dateScalar,

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const slugList = await Post.find({ slug: args.post.slug });
      if (slugList.length) return new ApolloError("Slug exists");
      const postCreated = await Post.insertMany(args.post);
      return postCreated[0];
    },

    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      const resp = await Post.findByIdAndDelete(id);
      return resp?.id || false;
    },

    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const posts = await Post.find({ slug: args.post.slug });
      for (const post of posts) {
        if (post.id !== id) {
          throw new Error("Slug exists");
        }
      }
      return await Post.findByIdAndUpdate(id, args.post, { new: true });
    },
  },
};

export default resolvers;
