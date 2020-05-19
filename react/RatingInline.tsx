import React, { FunctionComponent, useContext, useEffect } from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { ProductSummaryContext } from 'vtex.product-summary'
import { ProductContext } from 'vtex.product-context'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'
import styles from './styles.css'

declare var global: {
  __hostname__: string
  __pathname__: string
}

declare var yotpo: any

const RatingInline: FunctionComponent<BlockClass> = (props: any) => {
  const { blockClass } = props
  const { product }: ProductContext = useContext(ProductSummaryContext)
  const baseClassNames = generateBlockClass(
    styles.ratingInlineContainer,
    blockClass
  )

  useEffect(() => {
    if (typeof yotpo != 'undefined' && yotpo.initialized && product)
      setTimeout(function() {
        yotpo.refreshWidgets()
      }, 1000)
  }, [product])

  let useRefIdSetting = window?.yotpo?.useRefIdSetting
    ? JSON.parse(window.yotpo.useRefIdSetting)
    : null

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
      className={`${baseClassNames} center yotpo bottomLine`}
      data-product-id={
        useRefIdSetting?.useRefId ? product.productReference : product.productId
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
