const CarEntries = require('../models/carEntriesSchema');
const Car = require('../models/carSchema');
const Parking = require('../models/parkingSchema');

const convertDateInSQLFormat = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addEntry = async (req, res) => {
  const { vehicleNo } = req.body;
  const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    const [car] = await Car.findByVehicleNo(vehicleNo);

    if (!car.length) {
      return res.status(404).json({ message: 'Car is not registered' });
    }
    const { id } = car[0];

    const [entries] = await CarEntries.fetchByDay(id, vehicleNo, convertDateInSQLFormat());

    if (entries.length) {
      entries.map((entry) => {
        if (!entry.exitTime) {
          throw new Error('Car last entry is missing exit time');
        }
      })
    }

    const [parkingSpace] = await Parking.fetch();
    if (!parkingSpace.length) {
      return res.status(404).json({ message: 'Parking space data not found' });
    }

    const { maxSpace, filledSpace } = parkingSpace[0];
    const availableSpace = maxSpace - filledSpace;
    if (!availableSpace) {
      return res.status(422).json({ message: "No parking space available" });
    }

    const carEntries = new CarEntries(vehicleNo, currentTime, id);
    await carEntries.save();
    await Parking.increaseFilledSpace();

    return res.status(201).json({ message: "Car entry saved" });
  } catch (error) {
    console.log('Error while adding entry for the car', error);
    return res.status(500).json({ message: `Error while adding entry for the car: ${error?.message}` });
  }
}

const addExit = async (req, res) => {
  const { vehicleNo } = req.body;
  const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    const [car] = await Car.findByVehicleNo(vehicleNo);

    if (!car.length) {
      return res.status(404).json({ message: 'Car is not registered' });
    }
    const { id } = car[0];

    const [entries] = await CarEntries.findLatestEntry(id, vehicleNo);

    if (entries.length && entries[0].exitTime != null) {
      throw new Error('No car entry found for marking the exit time');
    }

    const [parkingSpace] = await Parking.fetch();
    if (!parkingSpace.length) {
      return res.status(404).json({ message: 'Parking space data not found' });
    }

    await CarEntries.updateCarExitTime(entries[0].id, currentTime);
    await Parking.decreaseFilledSpace();

    return res.status(200).json({ message: "Car exit record saved" });
  } catch (error) {
    console.log('Error while saving the exit record of the car', error);
    return res.status(500).json({ message: `Error while saving the exit record of the car: ${error?.message}` });
  }
}

module.exports = {
  addEntry,
  addExit,
};