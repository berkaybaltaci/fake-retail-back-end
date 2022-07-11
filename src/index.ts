import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { connectToMongo } from './utils/mongo';
import { resolvers } from './resolvers';

const bootstrap = async () => {
  // Load environment variables
  dotenv.config();

  // Build the schema
  const schema = await buildSchema({
    resolvers,
    // authChecker,
  });

  // Init express
  const app = express();
  app.use(cookieParser());

  // Create the apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx: any) => {
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground({
            settings: { 'request.credentials': 'include' },
          }),
    ],
  });

  await server.start();

  // Apply middleware to server
  server.applyMiddleware({ app });

  // App.listen on express server
  app.listen(4000, () => {
    console.log('App is listening on port 4000');
  });

  // Connect to db
  connectToMongo();
};

bootstrap();
