import { Apps } from '@vtex/api'

declare var process: {
  env: {
    VTEX_APP_ID: string
  }
}

export const queries = {
  appSettings: async (_: any, __: any, ctx: any) => {
    const apps = new Apps(ctx.vtex)
    const appId = process.env.VTEX_APP_ID
    const settings = await apps.getAppSettings(appId)
    return settings
  },
}
