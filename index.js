const { ApolloServer, gql } = require("apollo-server");
const GraphQLObjectType = require("graphql").GraphQLObjectType;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    highlights: [Highlight]
  }

  interface Highlight {
    value: String!
  }

  type Tip implements Highlight {
    value: String!
  }

  type Phrase implements Highlight {
    value: String!
    startIndex: Int!
    endIndex: Int!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    highlights: (root, args, context) => highlights
  },
  Highlight: {
    __resolveType(obj, context, info) {
      if (obj.startIndex) {
        return "Phrase";
      }
      return "Tip";
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const highlights = [
  {
    value: "Great buy"
  },
  {
    value: "What a wonderful find",
    startIndex: 10,
    endIndex: 20
  }
];

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
