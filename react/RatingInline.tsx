import React, { FunctionComponent, useContext, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { canUseDOM } from 'vtex.render-runtime'
import { ProductSummaryContext } from 'vtex.product-summary'
import { ProductContext } from 'vtex.product-context'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'
import styles from './styles.css'
import { refresh } from './utils'
import AppSettings from './graphql/AppSettings.graphql'

declare const global: {
  __hostname__: string
  __pathname__: string
}

declare const yotpo: any

const RatingInline: FunctionComponent<BlockClass> = ({ blockClass }: any) => {
  const { data } = useQuery(AppSettings)
  const { product }: ProductContext = useContext(ProductSummaryContext)
  const baseClassNames = generateBlockClass(
    styles.ratingInlineContainer,
    blockClass
  )

  useEffect(() => {
    if (typeof yotpo != 'undefined' && yotpo.initialized && product && data) {
      refresh()
    }
  }, [product, data])

  if (!product || !data) return null

  const getLocation = () =>
    canUseDOM
      ? {
          url: window.location.pathname + window.location.hash,
          pathName: window.location.pathname,
          host: window.location.hostname,
        }
      : {
          url: global.__pathname__,
          pathName: global.__pathname__,
          host: global.__hostname__,
        }

  const { host } = getLocation()
  const price = product.items[0]?.sellers[0]?.commertialOffer?.Price
  const image = product.items[0]?.images[0]?.imageUrl

  return (
    <div
      className={`${baseClassNames} center yotpo bottomLine`}
      data-product-id={
        data.appSettings?.useRefId
          ? product.productReference
          : product.productId
      }
      data-price={price || ''}
      data-currency="USD"
      data-name={product.productName}
      data-url={encodeURI('https://' + host + '/' + product.linkText + '/p')}
      data-image-url={image ? encodeURI(image) : ''}
    ></div>
  )
}

export default RatingInline
