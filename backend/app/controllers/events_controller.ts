// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Event from '../models/event.js'

export default class EventsController {
  /*
    Get all events from the database
  */
  public async index({ response }: HttpContext) {
    const events = await Event.all()
    return response.json(events)
  }

  /*
    Get all events for a user from the database
  */
  public async userEvents({ response, user }: HttpContext) {
    const events = await Event.query().where('username', user.username)
    return response.json(events)
  }

  /*
    Add event to the database
  */
  public async store({ request, response, user }: HttpContext) {
    const { name, date, time, location, maxGuest, description } = request.body()

    const event = await Event.create({
      name,
      date,
      time,
      location,
      maxGuest,
      username: user.username,
      description,
    })

    return response.json(event)
  }

  /*
    Get an event by id
  */
  public async show({ request, response, user }: HttpContext) {
    const { id } = request.params()
    const event = await Event.query()
      .where({
        id,
        username: user.username,
      })
      .first()

    if (!event) {
      return response.status(404).json({ error: 'Event not found' })
    }

    return response.json(event)
  }

  /*
    Edit an event in the database
  */
  public async update({ request, response, user }: HttpContext) {
    const { name, date, time, location, maxGuest, description } = request.body()
    const { id } = request.params()
    const event = await Event.query()
      .where({
        id,
        username: user.username,
      })
      .first()

    if (!event) {
      return response.status(404).json({ error: 'Event not found' })
    }

    event.name = name
    event.date = date
    event.time = time
    event.location = location
    event.maxGuest = maxGuest
    event.description = description
    await event.save()
    return response.json(event)
  }

  /*
    Delete an event from the database
  */
  public async destroy({ request, response, user }: HttpContext) {
    const { id } = request.params()
    const event = await Event.query()
      .where({
        id,
        username: user.username,
      })
      .first()

    if (!event) {
      return response.status(404).json({ error: 'Event not found' })
    }

    await event.delete()
    return response.status(200).json({ message: 'Event deleted' })
  }

  /*
    Increase the guest count of an event
  */
  public async rsvp({ request, response, user }: HttpContext) {
    const { id } = request.params()
    const event = await Event.query()
      .where({
        id,
      })
      .first()

    if (!event) {
      return response.status(404).json({ error: 'Event not found' })
    }

    if (event.guestCount >= event.maxGuest) {
      return response.status(400).json({ error: 'Event is full' })
    }

    event.guestCount++
    await event.save()
    return event
  }
}
