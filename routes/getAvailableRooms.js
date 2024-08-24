const express = require('express');
const router = express.Router();
const Room = require('../models/roomcollection'); 
const Booking = require('../models/bookingcollection'); 

// Route to get available rooms
router.get('/', async (req, res) => {
  const { arrivaldate, departuredate } = req.query;

  // Validate query parameters
  if (!arrivaldate || !departuredate) {
    return res.status(400).json({ error: 'Arrival date and departure date are required' });
  }

  try {
    // Call the function to find available rooms
    const availableRooms = await findAvailableRooms(arrivaldate, departuredate);
    res.json(availableRooms);
    console.log(availableRooms);
  } catch (error) {
    console.error('Error fetching available rooms:', error);
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

// Function to find available rooms
const findAvailableRooms = async (userArrivalDate, userDepartureDate) => {
  try {
    // Generate array of dates between arrival and departure
    const userDates = getDatesBetween(userArrivalDate, userDepartureDate);

    // Find rooms that are not booked during the requested date range
    const availableRooms = await Room.aggregate([
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
          isAvailable: {
            $not: {
              $anyElementTrue: {
                $map: {
                  input: '$bookings',
                  as: 'booking',
                  in: {
                    $and: [
                      { $eq: ['$$booking.statusofBooking', 'Approved'] }, // Only consider if status is 'Approved'
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
        }
      },
      {
        $match: {
          isAvailable: true // Rooms that are not booked on any date within the requested range
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

    return availableRooms;
  } catch (error) {
    console.error('Error finding available rooms:', error);
    throw error;
  }
};

module.exports = router;
