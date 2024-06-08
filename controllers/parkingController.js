const Parking = require('../models/parkingSchema');

const addTotalSpace = async (req, res) => {
  const { totalSpace } = req.body;
  try {
    const [parkingSpace] = await Parking.fetch();

    if (parkingSpace.length) {
      await Parking.update(totalSpace);
    } else {
      const parking = new Parking(totalSpace, 0);
      await parking.save();
    }

    return res.status(200).json({ message: `Max parking space is set to ${totalSpace}` });
  } catch (error) {
    console.log('Error while setting the max parking data', error);
    return res.status(500).json({ message: `Error while setting the max parking data: ${error?.message}` });
  }
}

const getAvailableSpace = async (req, res) => {
  try {
    const [parkingSpace] = await Parking.fetch();

    if (parkingSpace.length) {
      const { maxSpace, filledSpace } = parkingSpace[0];
      const availableSpace = maxSpace - filledSpace;
      return res.status(200).json({availableSpace});
    }

    return res.status(404).json({ message: 'Parking space data not found' });
  } catch (error) {
    console.log('Error while fetching the parking data', error);
    return res.status(500).json({ message: `Error while fetching the parking data: ${error?.message}` });
  }
}

module.exports = {
  getAvailableSpace,
  addTotalSpace,
}