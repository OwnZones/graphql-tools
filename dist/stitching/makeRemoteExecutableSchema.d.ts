import { ApolloLink } from 'apollo-link';
import { GraphQLSchema, ExecutionResult, GraphQLResolveInfo } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';
export declare type ResolverFn = (rootValue?: any, args?: any, context?: any, info?: GraphQLResolveInfo) => AsyncIterator<any>;
export declare type Fetcher = (operation: FetcherOperation) => Promise<ExecutionResult>;
export declare type FetcherOperation = {
    query: string;
    operationName?: string;
    variables?: {
        [key: string]: any;
    };
    context?: {
        [key: string]: any;
    };
};
export default function makeRemoteExecutableSchema({schema, link, fetcher, createPubSub}: {
    schema: GraphQLSchema | string;
    link?: ApolloLink;
    fetcher?: Fetcher;
    createPubSub?: () => PubSubEngine;
}): GraphQLSchema;
