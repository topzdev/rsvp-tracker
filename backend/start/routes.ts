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
    // grouping /events routes with auth middleware
    router
      .group(() => {
        router.get('user', [EventsController, 'userEvents'])
        router.get(':id', [EventsController, 'show'])
        router.post('', [EventsController, 'store'])
        router.put(':id', [EventsController, 'update'])
        router.delete(':id', [EventsController, 'destroy'])
        router.put(':id/increase', [EventsController, 'increaseGuestCount'])
      })
      .prefix('events')
      .use(middleware.auth())
    router.get('events', [EventsController, 'index'])
  })
  .prefix('api')
