import React, { FunctionComponent, useContext, useEffect } from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { ProductContext } from 'vtex.product-context'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'
import styles from './styles.css'
import { useQuery } from 'react-apollo'
import Settings from './graphql/Settings.graphql'


declare var global: {
  __hostname__: string
  __pathname__: string
}

declare var yotpo: any

const Reviews: FunctionComponent<BlockClass> = props => {
  const { blockClass } = props
  const { product }: ProductContext = useContext(ProductContext)
  const { data } = useQuery(Settings)
  const baseClassNames = generateBlockClass(styles.reviewsContainer, blockClass)

  useEffect(() => {
    if (typeof yotpo != 'undefined' && yotpo.initialized) yotpo.refreshWidgets()
  }, [yotpo, product, data])

  let useRefIdSetting = data?.appSettings?.message ? JSON.parse(data.appSettings.message) : null

  if (!product) return null

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

  let price
  try {
    price = product.items[0].sellers[0].commertialOffer.Price
  } catch {
    price = undefined
  }

  let image
  try {
    image = product.items[0].images[0].imageUrl
  } catch {
    image = undefined
  }

  return (
    <div
      className={`${baseClassNames} yotpo yotpo-main-widget`}
      data-product-id={useRefIdSetting?.useRefId ? product.productReference : product.productId}
      data-price={price || ''}
      data-currency="USD"
      data-name={product.productName}
      data-url={encodeURI('https://' + host + '/' + product.linkText + '/p')}
      data-image-url={image ? encodeURI(image) : ''}
    ></div>
  )
}


export default Reviews
