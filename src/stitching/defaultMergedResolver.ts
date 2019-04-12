import { GraphQLError, GraphQLFieldResolver, responsePathAsArray } from 'graphql';
import { locatedError } from 'graphql/error';
import { getErrorsFromParent, annotateWithChildrenErrors } from './errors';
import { getResponseKeyFromInfo } from './getResponseKeyFromInfo';

// Resolver that knows how to:
// a) handle aliases for proxied schemas
// b) handle errors from proxied schemas
const defaultMergedResolver: GraphQLFieldResolver<any, any> = (parent, args, context, info) => {
  if (!parent) {
    return null;
  }

  const responseKey = getResponseKeyFromInfo(info);
  const errorResult = getErrorsFromParent(parent, responseKey);

  if (errorResult.kind === 'OWN') {
    throw locatedError(
      errorResult.error.originalError ||
      new GraphQLError(
        errorResult.error.message,
        null,
        null,
        null,
        null,
        null,
        errorResult.error.extensions,
      ),
      info.fieldNodes,
      responsePathAsArray(info.path),
    );
  }

  let result = parent[responseKey];

  // subscription result mapping
  if (!result && parent.data && parent.data[responseKey]) {
    result = parent.data[responseKey];
  }

  if (errorResult.errors) {
    result = annotateWithChildrenErrors(result, errorResult.errors);
  }
  return result;
};

export default defaultMergedResolver;
