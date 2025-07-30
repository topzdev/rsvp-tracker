/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const EventsController = () => import('#controllers/events_controller')

// Events routes
router
  .group(() => {
    router.post('/events', [EventsController, 'store'])
    router.get('/events', [EventsController, 'index'])
    router.post('/events/user', [EventsController, 'userEvents'])
    router.get('/events/:id', [EventsController, 'show'])
    router.put('/events/:id', [EventsController, 'update'])
    router.delete('/events/:id', [EventsController, 'destroy'])
    router.put('/events/:id/increase', [EventsController, 'increaseMaxCount'])
  })
  .prefix('api/')
