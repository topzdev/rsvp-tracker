import '@adonisjs/core/http'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    username?: string
    user: {
      username: string
    }
  }
}
