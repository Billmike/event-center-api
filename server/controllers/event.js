import Moment from 'moment';
import { extendMoment } from 'moment-range';
import timeDifference from 'timediff';
import db from '../models';
import mailer from './mailer';
import serverError from '../errorHandler/serverError';
import validateAddEvent from '../validators/validateAddEvent';

const { Event, Center, User } = db;

/**
 * A class controller for handling events actions
 */
class Events {
  /**
   * Adds an event to the database
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The event object
   */
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
      const duration = timeDifference(
        request.body.startTime,
        request.body.endTime
      );

      const convertStartTime = new Date(request.body.startTime)
        .toLocaleTimeString('en-US', { hour12: false });
      const convertEndTime = new Date(request.body.endTime)
        .toLocaleTimeString('en-US', { hour12: false });

      const eventDuration =
      `${duration.hours}hour(s), ${duration.minutes}minutes`;

      return Event.findAll({
        where: {
          date: request.body.date,
          venue: foundCenter.dataValues.id
        }
      }).then((foundEvent) => {
        for (let index = 0; index < foundEvent.length; index += 1) {
          const event = foundEvent[index];
          if ((convertStartTime >= event.dataValues.startTime
            && convertStartTime <= event.dataValues.endTime) ||
        (convertEndTime <= event.dataValues.endTime
          && convertEndTime >= event.dataValues.startTime)) {
            return response.status(409).json({
              message:
              `Sorry, you cannot book an event at this
 time because there will be an event
 holding between ${event.dataValues.startTime} and ${event.dataValues.endTime}.`
            });
          }
        }

        return Event.create({
          name: request.body.name,
          image: request.body.image,
          date: request.body.date,
          startTime: request.body.startTime,
          endTime: request.body.endTime,
          duration: eventDuration,
          organizer: request.userDetails.id,
          venue: foundCenter.dataValues.id
        }).then((event) => {
          return response.status(201).json({
            message: 'Event created successfully.',
            eventDetails: {
              name: event.name,
              image: event.image,
              date: event.date,
              startTime: event.startTime,
              endTime: event.endTime,
              duration: event.duration,
              venue: foundCenter.dataValues.name
            }
          });
        });
      });
    }).catch((err) => {
      return response.status(500).json({
        message: serverError
      });
    });
  }

  /**
   * Fetch all the events in the database
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The event object
   */
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

  /**
   * Edit the event in the database
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The event object
   */
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
        const duration = timeDifference(
          request.body.startTime,
          request.body.endTime
        );
        const eventDuration =
      `${duration.hours}hour(s), ${duration.minutes}minutes`;
        const convertStartTime = new Date(request.body.startTime)
          .toLocaleTimeString('en-US', { hour12: false });
        const convertEndTime = new Date(request.body.endTime)
          .toLocaleTimeString('en-US', { hour12: false });

        Center.findOne({
          where: {
            name: request.body.venue
          }
        }).then((foundCenter) => {
          if (!foundCenter) {
            return response.status(400).json({
              message: 'Center not found'
            });
          }

          Event.findAll({
            where: {
              date: request.body.date,
              venue: foundCenter.dataValues.id
            }
          }).then((foundEvent) => {
            for (let index = 0; index < foundEvent.length; index += 1) {
              const event = foundEvent[index];
              if ((convertStartTime >= event.startTime
                && convertStartTime <= event.endTime) ||
            (convertEndTime <= event.endTime
              && convertEndTime >= event.startTime)) {
                return response.status(409).json({
                  message:
                  `Sorry, you cannot book an event at this
 time because there will be an event
 holding between ${event.dataValues.startTime} and ${event.dataValues.endTime}.`
                });
              }
            }
            return event.update({
              name: request.body.name || event.name,
              image: request.body.image || event.image,
              date: request.body.date || event.date,
              duration: eventDuration || event.duration,
              startTime: request.body.startTime || event.startTime,
              endTime: request.body.endTime || event.endTime,
              venue: foundCenter.dataValues.id || event.venue
            }).then((updatedEvent) => {
              return response.status(201).json({
                message: 'Event modified successfully.',
                eventDetails: {
                  name: updatedEvent.name,
                  image: updatedEvent.image,
                  date: updatedEvent.date,
                  duration: updatedEvent.duration,
                  startTime: updatedEvent.startTime,
                  endTime: updatedEvent.endTime,
                  venue: foundCenter.dataValues.name,
                  organizer: updatedEvent.organizer
                }
              });
            });
          });
        });
      }).catch((err) => {
        return response.status(500).json({
          message: serverError
        });
      });
  }

  /**
   * Delete the event in the database
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The event object
   */
  static deleteEvent(request, response) {
    Event.findById(request.params.eventId)
      .then((event) => {
        if (!event) {
          return response.status(404).json({
            message: 'No event found.'
          });
        }
        if (event.organizer != request.userDetails.id
          && request.userDetails.username !== 'adminuser') {
          return response.status(401).json({
            message: 'You do not have the privilege to modify this resource'
          });
        }
        User.findById(event.organizer)
          .then((foundUser) => {
            return event.destroy().then(() => {
              const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: foundUser.dataValues.email,
                subject: 'Your event has been cancelled'
              };
              response.status(200).json({
                message: 'Event successfully deleted.',
                eventDetails: event
              });
              mailer.sendMail(mailOptions, (err) => {
                if (err) {
                  return err;
                }
              });
            });
          });
      }).catch(() => {
        return response.status(500).json({
          message: serverError
        });
      });
  }

  /**
   * Fetch events for a particular center in the database
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The event object
   */
  static getCenterEvents(request, response) {
    Event.findAll({
      where: {
        venue: request.params.venueId
      }
    }).then((centerEvents) => {
      if (centerEvents.length === 0) {
        return response.status(200).json({
          message: 'No events yet for this center.'
        });
      }
      return response.status(200).json({
        message: `${centerEvents.length} upcoming events in this center`,
        upcomingEvents: centerEvents
      });
    }).catch(() => {
      return response.status(500).json({
        message: serverError
      });
    });
  }
}

export default Events;
