import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

// @ts-ignore
declare var yotpoTrackConversionData: any

declare global {
  interface Window {
    loading: any
  }
}

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:orderPlaced': {
      yotpoTrackConversionData = {
        orderId: e.data.transactionId,
        orderAmount: e.data.transactionTotal,
        orderCurrency: e.data.transactionCurrency,
      }

      break
    }
    default: {
      return
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
