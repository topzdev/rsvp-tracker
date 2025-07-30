/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const EventsController = () => import('#controllers/events_controller')

// Events routes
router
  .group(() => {
    router
      .group(() => {
        router.post('', [EventsController, 'store'])
        router.get('/:id', [EventsController, 'show'])
        router.put('/:id', [EventsController, 'update'])
        router.delete('/:id', [EventsController, 'destroy'])
        router.put('/:id/increase', [EventsController, 'increaseMaxCount'])
        router.get('/user', [EventsController, 'userEvents'])
      })
      .prefix('events')
      .use(middleware.auth())
    router.get('/events', [EventsController, 'index'])
  })
  .prefix('api')
