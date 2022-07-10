import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { connectToMongo } from './util/mongo';

const bootstrap = async () => {
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

  // apply middleware to server
  server.applyMiddleware({ app });

  // app.listen on express server

  app.listen(4000, () => {
    console.log('App is listening on port 4000');
  });

  // connect to db
  connectToMongo();
};

bootstrap();
