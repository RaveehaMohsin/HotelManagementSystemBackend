const express = require('express');
const router = express.Router();
const Room = require('../models/roomcollection'); 
const Booking = require('../models/bookingcollection'); 

// Route to get unavailable rooms
router.get('/', async (req, res) => {
    const { arrivaldate, departuredate } = req.query;
  
    // Validate query parameters
    if (!arrivaldate || !departuredate) {
      return res.status(400).json({ error: 'Arrival date and departure date are required' });
    }
  
    try {
      // Call the function to find unavailable rooms
      const unavailableRooms = await findUnavailableRooms(arrivaldate, departuredate);
      res.json(unavailableRooms);
      console.log(unavailableRooms);
    } catch (error) {
      console.error('Error fetching unavailable rooms:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// Function to get all dates between arrival and departure
const getDatesBetween = (arrivalDate, departureDate) => {
  const dates = [];
  const startDate = new Date(arrivalDate);
  const endDate = new Date(departureDate);

  while (startDate <= endDate) {
    dates.push(startDate.toISOString().split('T')[0]);
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
};

// Function to find unavailable rooms
const findUnavailableRooms = async (userArrivalDate, userDepartureDate) => {
  try {
    // Generate array of dates between arrival and departure
    const userDates = getDatesBetween(userArrivalDate, userDepartureDate);

    // Find rooms that are booked during the requested date range with specific statuses
    const unavailableRooms = await Room.aggregate([
      {
        $lookup: {
          from: 'Booking', // The name of the bookings collection
          localField: 'roomNo',
          foreignField: 'roomNo',
          as: 'bookings'
        }
      },
      {
        $addFields: {
          isUnavailable: {
            $anyElementTrue: {
              $map: {
                input: '$bookings',
                as: 'booking',
                in: {
                  $and: [
                    {
                      $in: ['$$booking.statusofBooking', ['Approved']]
                    },
                    {
                      $anyElementTrue: {
                        $map: {
                          input: userDates,
                          as: 'date',
                          in: {
                            $and: [
                              { $lte: ['$$date', { $substr: ['$$booking.departureDate', 0, 10] }] }, // Date is on or before booking departure
                              { $gte: ['$$date', { $substr: ['$$booking.arrivalDate', 0, 10] }] } // Date is on or after booking arrival
                            ]
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      {
        $match: {
          isUnavailable: true // Rooms that are booked on any date within the requested range with specific statuses
        }
      },
      {
        $project: {
          _id: 0,
          roomNo: 1,
          roomType: 1,
          roomPricePerDay: 1,
          roomImage: 1,
          roomDescription: 1,
          availabilityStatus: 1,
          roomServantName: 1,
          servantContact: 1
        }
      }
    ]);

    return unavailableRooms;
  } catch (error) {
    console.error('Error finding unavailable rooms:', error);
    throw error;
  }
};

module.exports = router;