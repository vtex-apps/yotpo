import React, { FunctionComponent, useContext, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { canUseDOM } from 'vtex.render-runtime'
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

const Reviews: FunctionComponent<BlockClass> = ({ blockClass }: any) => {
  const { data } = useQuery(AppSettings, { ssr: true })
  const { product }: ProductContext = useContext(ProductContext)
  const baseClassNames = generateBlockClass(styles.reviewsContainer, blockClass)

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
      className={`${baseClassNames} yotpo yotpo-main-widget`}
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

export default Reviews
