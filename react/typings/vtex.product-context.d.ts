declare module 'vtex.product-context' {
  import { Context } from 'react'

  export interface ProductContext {
    product: Product
  }

  export interface Product {
    productId: string
    productName: string
    items: any
    sku: any
    linkText: string
  }

  export const ProductContext = Context
}
