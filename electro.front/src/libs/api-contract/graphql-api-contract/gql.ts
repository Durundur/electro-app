/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\t\t\t\tquery ProductPageProduct($id: UUID!) {\n\t\t\t\t\tproduct(id: $id) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tprice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t}\n\t\t\t\t\t\tphotos\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tgroup {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tsubCategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tstockQuantity\n\t\t\t\t\t\taverageOpinionRating\n\t\t\t\t\t\topinionCount\n\t\t\t\t\t\tpromotion {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tproductId\n\t\t\t\t\t\t\tstartDate\n\t\t\t\t\t\t\tendDate\n\t\t\t\t\t\t\tpromotionalPrice {\n\t\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tisActive\n\t\t\t\t\t\t\tisValid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t\tisPrimary\n\t\t\t\t\t\t\tattributeDefinition {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.ProductPageProductDocument,
    "\n\t\t\t\tquery ProductPageOpinions($productId: UUID!, $page: Int!, $pageSize: Int!, $rating: Int) {\n\t\t\t\t\tproductOpinions(productId: $productId, page: $page, pageSize: $pageSize, rating: $rating) {\n\t\t\t\t\t\titems {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tcontent\n\t\t\t\t\t\t\trating\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\tauthorDisplayName\n\t\t\t\t\t\t\tuserReaction\n\t\t\t\t\t\t\tlikesCount\n\t\t\t\t\t\t\tdislikesCount\n\t\t\t\t\t\t}\n\t\t\t\t\t\tpage\n\t\t\t\t\t\tpageSize\n\t\t\t\t\t\ttotalPages\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.ProductPageOpinionsDocument,
    "\n\t\t\t\tquery ProductPageOpinionsStats($productId: UUID!) {\n\t\t\t\t\tproductOpinionsStats(productId: $productId) {\n\t\t\t\t\t\trating\n\t\t\t\t\t\tcount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.ProductPageOpinionsStatsDocument,
    "\n\t\t\t\tmutation ProductPageCreateOpinionReaction($input: CreateOpinionReactionInput!) {\n\t\t\t\t\tcreateOpinionReaction(input: $input) {\n\t\t\t\t\t\tuserReaction\n\t\t\t\t\t\tlikesCount\n\t\t\t\t\t\tdislikesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.ProductPageCreateOpinionReactionDocument,
    "\n\t\t\t\tmutation ProductPageCreateOpinion($input: CreateOpinionInput!) {\n\t\t\t\t\tcreateOpinion(input: $input) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\trating\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\tauthorDisplayName\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.ProductPageCreateOpinionDocument,
    "\n\t\t\t\tquery ProductPageSimilarProducts($productId: UUID!, $limit: Int) {\n\t\t\t\t\tsimilarProducts(productId: $productId, limit: $limit) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t}\n\t\t\t\t\t\tphotos\n\t\t\t\t\t\tpromotion {\n\t\t\t\t\t\t\tpromotionalPrice {\n\t\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.ProductPageSimilarProductsDocument,
};
const documents: Documents = {
    "\n\t\t\t\tquery ProductPageProduct($id: UUID!) {\n\t\t\t\t\tproduct(id: $id) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tprice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t}\n\t\t\t\t\t\tphotos\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tgroup {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tsubCategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tstockQuantity\n\t\t\t\t\t\taverageOpinionRating\n\t\t\t\t\t\topinionCount\n\t\t\t\t\t\tpromotion {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tproductId\n\t\t\t\t\t\t\tstartDate\n\t\t\t\t\t\t\tendDate\n\t\t\t\t\t\t\tpromotionalPrice {\n\t\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tisActive\n\t\t\t\t\t\t\tisValid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t\tisPrimary\n\t\t\t\t\t\t\tattributeDefinition {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": types.ProductPageProductDocument,
    "\n\t\t\t\tquery ProductPageOpinions($productId: UUID!, $page: Int!, $pageSize: Int!, $rating: Int) {\n\t\t\t\t\tproductOpinions(productId: $productId, page: $page, pageSize: $pageSize, rating: $rating) {\n\t\t\t\t\t\titems {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tcontent\n\t\t\t\t\t\t\trating\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\tauthorDisplayName\n\t\t\t\t\t\t\tuserReaction\n\t\t\t\t\t\t\tlikesCount\n\t\t\t\t\t\t\tdislikesCount\n\t\t\t\t\t\t}\n\t\t\t\t\t\tpage\n\t\t\t\t\t\tpageSize\n\t\t\t\t\t\ttotalPages\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": types.ProductPageOpinionsDocument,
    "\n\t\t\t\tquery ProductPageOpinionsStats($productId: UUID!) {\n\t\t\t\t\tproductOpinionsStats(productId: $productId) {\n\t\t\t\t\t\trating\n\t\t\t\t\t\tcount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": types.ProductPageOpinionsStatsDocument,
    "\n\t\t\t\tmutation ProductPageCreateOpinionReaction($input: CreateOpinionReactionInput!) {\n\t\t\t\t\tcreateOpinionReaction(input: $input) {\n\t\t\t\t\t\tuserReaction\n\t\t\t\t\t\tlikesCount\n\t\t\t\t\t\tdislikesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": types.ProductPageCreateOpinionReactionDocument,
    "\n\t\t\t\tmutation ProductPageCreateOpinion($input: CreateOpinionInput!) {\n\t\t\t\t\tcreateOpinion(input: $input) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\trating\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\tauthorDisplayName\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": types.ProductPageCreateOpinionDocument,
    "\n\t\t\t\tquery ProductPageSimilarProducts($productId: UUID!, $limit: Int) {\n\t\t\t\t\tsimilarProducts(productId: $productId, limit: $limit) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t}\n\t\t\t\t\t\tphotos\n\t\t\t\t\t\tpromotion {\n\t\t\t\t\t\t\tpromotionalPrice {\n\t\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": types.ProductPageSimilarProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tquery ProductPageProduct($id: UUID!) {\n\t\t\t\t\tproduct(id: $id) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tprice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t}\n\t\t\t\t\t\tphotos\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tgroup {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tsubCategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tstockQuantity\n\t\t\t\t\t\taverageOpinionRating\n\t\t\t\t\t\topinionCount\n\t\t\t\t\t\tpromotion {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tproductId\n\t\t\t\t\t\t\tstartDate\n\t\t\t\t\t\t\tendDate\n\t\t\t\t\t\t\tpromotionalPrice {\n\t\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tisActive\n\t\t\t\t\t\t\tisValid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t\tisPrimary\n\t\t\t\t\t\t\tattributeDefinition {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\ttype\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"): typeof import('./graphql').ProductPageProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tquery ProductPageOpinions($productId: UUID!, $page: Int!, $pageSize: Int!, $rating: Int) {\n\t\t\t\t\tproductOpinions(productId: $productId, page: $page, pageSize: $pageSize, rating: $rating) {\n\t\t\t\t\t\titems {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tcontent\n\t\t\t\t\t\t\trating\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\tauthorDisplayName\n\t\t\t\t\t\t\tuserReaction\n\t\t\t\t\t\t\tlikesCount\n\t\t\t\t\t\t\tdislikesCount\n\t\t\t\t\t\t}\n\t\t\t\t\t\tpage\n\t\t\t\t\t\tpageSize\n\t\t\t\t\t\ttotalPages\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"): typeof import('./graphql').ProductPageOpinionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tquery ProductPageOpinionsStats($productId: UUID!) {\n\t\t\t\t\tproductOpinionsStats(productId: $productId) {\n\t\t\t\t\t\trating\n\t\t\t\t\t\tcount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"): typeof import('./graphql').ProductPageOpinionsStatsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tmutation ProductPageCreateOpinionReaction($input: CreateOpinionReactionInput!) {\n\t\t\t\t\tcreateOpinionReaction(input: $input) {\n\t\t\t\t\t\tuserReaction\n\t\t\t\t\t\tlikesCount\n\t\t\t\t\t\tdislikesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"): typeof import('./graphql').ProductPageCreateOpinionReactionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tmutation ProductPageCreateOpinion($input: CreateOpinionInput!) {\n\t\t\t\t\tcreateOpinion(input: $input) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\trating\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\tauthorDisplayName\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"): typeof import('./graphql').ProductPageCreateOpinionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tquery ProductPageSimilarProducts($productId: UUID!, $limit: Int) {\n\t\t\t\t\tsimilarProducts(productId: $productId, limit: $limit) {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t}\n\t\t\t\t\t\tphotos\n\t\t\t\t\t\tpromotion {\n\t\t\t\t\t\t\tpromotionalPrice {\n\t\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\t\tcurrency\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"): typeof import('./graphql').ProductPageSimilarProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
