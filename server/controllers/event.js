import db from '../models';
import serverError from '../errorHandler/serverError';
import validateAddEvent from '../validators/validateAddEvent';

const { Event, Center } = db;

class Events {
  static addEvent(request, response) {
    const { errors, valid } = validateAddEvent(request.body);
    if (!valid) {
      return response.status(400).json(errors);
    }
    return Center.findOne({
      where: {
        name: request.body.venue
      }
    }).then((foundCenter) => {
      if (!foundCenter) {
        return response.status(400).json({
          message: 'No center found with this name.'
        });
      }
      Event.create({
        name: request.body.name,
        image: request.body.image,
        date: request.body.date,
        duration: request.body.duration,
        organizer: request.userDetails.id,
        venue: foundCenter.dataValues.id
      }).then((event) => {
        return response.status(201).json({
          message: 'Event created successfully.',
          eventDetails: {
            name: event.name,
            image: event.image,
            date: event.date,
            duration: event.duration,
            venue: foundCenter.dataValues.name
          }
        });
      });
    }).catch((err) => {
      return response.status(500).json({
        message: serverError
      });
    });
  }
  static getEvents(request, response) {
    return Event.findAndCountAll()
      .then((allEvents) => {
        const limit = 4;
        return Event.findAll({
          limit
        }).then((events) => {
          return response.status(200).json({
            message: 'Fetched events successfully.',
            eventDetails: events
          });
        });
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }
  static modifyEvent(request, response) {
    Event.findById(request.params.eventId)
      .then((event) => {
        if (!event) {
          return response.status(404).json({
            message: 'No event found.'
          });
        }
        if (event.organizer != request.userDetails.id) {
          return response.status(401).json({
            message: 'You do not have the privilege to modify this resource'
          });
        }
        return event.update({
          name: request.body.name || event.name,
          image: request.body.image || event.image,
          date: request.body.date || event.date,
          duration: request.body.duration || event.duration
        }).then((updatedEvent) => {
          return response.status(201).json({
            message: 'Event modified successfully.',
            eventDetails: updatedEvent
          });
        });
      }).catch((err) => {
        return response.status(500).json({
          message: serverError
        });
      });
  }
  static deleteEvent(request, response) {
    Event.findById(request.params.eventId)
      .then((event) => {
        if (!event) {
          return response.status(404).json({
            message: 'No event found.'
          });
        }
        if (event.organizer != request.userDetails.id) {
          return response.status(401).json({
            message: 'You do not have the privilege to modify this resource'
          });
        }
        return event.destroy().then(() => {
          response.status(200).json({
            message: 'Event successfully deleted.',
            eventDetails: event
          });
        });
      }).catch(() => {
        return response.status(500).json({
          message: serverError
        });
      });
  }
}

export default Events;
