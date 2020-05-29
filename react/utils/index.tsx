import { debounce } from 'debounce'

declare const yotpo: any

function refreshWidgets() {
  yotpo.refreshWidgets()
}
export const refresh = debounce(refreshWidgets, 1000)
