import { GraphQLSchema, GraphQLField, ExecutionResult, GraphQLType, GraphQLFieldResolver, GraphQLResolveInfo, GraphQLIsTypeOfFn, GraphQLTypeResolver, GraphQLScalarType, DocumentNode } from 'graphql';
export interface IResolverValidationOptions {
    requireResolversForArgs?: boolean;
    requireResolversForNonScalar?: boolean;
    requireResolversForAllFields?: boolean;
    allowResolversNotInSchema?: boolean;
}
export interface IResolverOptions {
    resolve?: IFieldResolver<any, any>;
    subscribe?: IFieldResolver<any, any>;
    __resolveType?: GraphQLTypeResolver<any, any>;
    __isTypeOf?: GraphQLIsTypeOfFn<any, any>;
}
export declare type MergeInfo = {
    delegate: (type: 'query' | 'mutation' | 'subscription', fieldName: string, args: {
        [key: string]: any;
    }, context: {
        [key: string]: any;
    }, info: GraphQLResolveInfo) => any;
};
export declare type IFieldResolver<TSource, TContext> = (source: TSource, args: {
    [argument: string]: any;
}, context: TContext, info: GraphQLResolveInfo & {
    mergeInfo: MergeInfo;
}) => any;
export declare type ITypedef = (() => ITypedef[]) | string | DocumentNode;
export declare type ITypeDefinitions = ITypedef | ITypedef[];
export declare type IResolverObject = {
    [key: string]: IFieldResolver<any, any> | IResolverOptions;
};
export declare type IEnumResolver = {
    [key: string]: string | number;
};
export interface IResolvers {
    [key: string]: (() => any) | IResolverObject | GraphQLScalarType | IEnumResolver;
}
export interface ILogger {
    log: (message: string | Error) => void;
}
export interface IConnectorCls {
    new (context?: any): any;
}
export declare type IConnectorFn = (context?: any) => any;
export declare type IConnector = IConnectorCls | IConnectorFn;
export declare type IConnectors = {
    [key: string]: IConnector;
};
export interface IExecutableSchemaDefinition {
    typeDefs: ITypeDefinitions;
    resolvers?: IResolvers;
    connectors?: IConnectors;
    logger?: ILogger;
    allowUndefinedInResolve?: boolean;
    resolverValidationOptions?: IResolverValidationOptions;
    directiveResolvers?: IDirectiveResolvers<any, any>;
}
export declare type IFieldIteratorFn = (fieldDef: GraphQLField<any, any>, typeName: string, fieldName: string) => void;
export declare type NextResolverFn = () => Promise<any>;
export declare type DirectiveResolverFn<TSource, TContext> = (next: NextResolverFn, source: TSource, args: {
    [argName: string]: any;
}, context: TContext, info: GraphQLResolveInfo) => any;
export interface IDirectiveResolvers<TSource, TContext> {
    [directiveName: string]: DirectiveResolverFn<TSource, TContext>;
}
export declare type IMockFn = GraphQLFieldResolver<any, any>;
export declare type IMocks = {
    [key: string]: IMockFn;
};
export declare type IMockTypeFn = (type: GraphQLType, typeName?: string, fieldName?: string) => GraphQLFieldResolver<any, any>;
export interface IMockOptions {
    schema: GraphQLSchema;
    mocks?: IMocks;
    preserveResolvers?: boolean;
}
export interface IMockServer {
    query: (query: string, vars?: {
        [key: string]: any;
    }) => Promise<ExecutionResult>;
}
