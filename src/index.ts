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
import Context from './types/context';
import { verifyJwt } from './utils/jwt';
import { User } from './schema/user.schema';
import authChecker from './utils/authChecker';
import cors from 'cors';

const bootstrap = async () => {
  // Load environment variables
  dotenv.config();

  // Build the schema
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  // Init express
  const app = express();
  app.use(cookieParser());

  const corsConfig = {
    credentials: true,
    origin: 'http://localhost:3000',
  };
  app.use(cors(corsConfig));

  // Create the apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      const context = ctx;
      if (ctx.req.cookies.accessToken) {
        const user = verifyJwt<User>(ctx.req.cookies.accessToken);
        context.user = user;
      }

      return context;
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
  server.applyMiddleware({ app, cors: false });

  // App.listen on express server
  app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
  });

  // Connect to db
  connectToMongo();
};

bootstrap();
