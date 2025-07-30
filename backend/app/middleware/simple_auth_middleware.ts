import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SimpleAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const username = ctx.request.header('authorization')
    console.log(username)

    if (!username) {
      return ctx.response.unauthorized({
        message: 'Unauthorized',
      })
    }

    ctx.username = username
    ctx.user = { username }

    await next()
  }
}
