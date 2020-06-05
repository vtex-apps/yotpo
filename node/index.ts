import { Service } from '@vtex/api'
import { queries as yotpoQueries } from './resolvers/yotpo'

export default new Service({
  graphql: {
    resolvers: {
      Query: {
        ...yotpoQueries,
      },
    },
  },
})
