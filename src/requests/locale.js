import gql from 'graphql-tag'

export const GET_LANGUAGES = gql`query ($orderBy: [OrderByClause!]) {
        languages(orderBy: $orderBy) {
            id
            name
            code
        }
      }`