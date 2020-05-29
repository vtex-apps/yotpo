import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { ProductContext } from 'vtex.product-context'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'
import styles from './styles.css'
import { refresh } from './utils'

declare const global: {
  __hostname__: string
  __pathname__: string
}

declare const yotpo: any

window.loading = new Promise(function(resolve) {
  setTimeout(function() {
    resolve()
  }, 1)
})

const Reviews: FunctionComponent<BlockClass> = ({ blockClass }: any) => {
  const { product }: ProductContext = useContext(ProductContext)
  const baseClassNames = generateBlockClass(styles.reviewsContainer, blockClass)
  const [useRefId, setUseRefId] = useState(null)

  useEffect(() => {
    if (
      typeof yotpo != 'undefined' &&
      yotpo.initialized &&
      product &&
      useRefId !== null
    ) {
      // setTimeout(function() {
      refresh()
    }
    // }, 1000)
  }, [product, useRefId])

  useEffect(() => {
    window.loading.then(() => {
      setUseRefId(
        window?.yotpoApp?.useRefIdSetting
          ? JSON.parse(window.yotpoApp.useRefIdSetting)
          : false
      )
    })
  }, [])

  if (!product || useRefId === null) return null

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
      data-product-id={useRefId ? product.productReference : product.productId}
      data-price={price || ''}
      data-currency="USD"
      data-name={product.productName}
      data-url={encodeURI('https://' + host + '/' + product.linkText + '/p')}
      data-image-url={image ? encodeURI(image) : ''}
    ></div>
  )
}

export default Reviews
