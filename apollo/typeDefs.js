import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-micro";

const typeDefs = gql`
  scalar JSON
  scalar Date

  input PostInput {
    title: String!
    searchKeyword: String!
    slug: String!
    category: String!
  }

  input PostUpdate {
    title: String!
    searchKeyword: String!
    slug: String!
  }

  input ProductInput {
    title: String!
    productId: String!
    productColors: JSON
    price: JSON
    rating: Float
    thumbnail: JSON
    reviews: JSON
  }

  type Post {
    id: ID
    title: String
    searchKeyword: String
    slug: String
    category: String
    lastScrappedOn: Date
    products(
      sort: String
      limit: Int
      skip: Int
      where: JSON
    ): ProductsPagination
  }

  type Products {
    id: ID
    title: String
    productId: String
    productColors: JSON
    price: JSON
    rating: Float
    thumbnail: JSON
    reviews: JSON
    images: JSON
    features: JSON
    technicalDetails: JSON
    productInformation: JSON
  }

  type ProductsPagination {
    data: [Products]
    totalCount: String
  }

  type PostPagination {
    data: [Post]
    totalCount: String
  }

  type Query {
    hello: String
    getProducts(
      sort: String
      limit: Int
      skip: Int
      where: JSON
    ): ProductsPagination
    getPosts(sort: String, limit: Int, skip: Int, where: JSON): PostPagination
  }

  type Mutation {
    createPost(post: PostInput): Post
    createProduct(product: [ProductInput]): [Products]
    deletePost(id: ID!): String!
    updatePost(id: ID!, post: PostUpdate): Post
  }
`;

export default typeDefs;
