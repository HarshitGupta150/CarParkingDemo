const Car = require('../models/carSchema');

const getAllCars = async (req, res) => {
  try {
    const [cars] = await Car.fetchAll();
    if (!cars.length) {
      return res.status(404).json({ message: 'No Car registered' })
    }

    return res.status(200).json(cars);
  } catch (error) {
    console.log('Error while fetching the cars', error);
    return res.status(500).json({ message: `Error while fetching the cars: ${error?.message}` });
  }
}

const register = async (req, res) => {
  const { vehicleNo } = req.body;

  try {
    const [cars] = await Car.fetchAll();
    if (cars.length) {
      const isAlreadyRegsitered = cars.includes(vehicleNo);
      if (isAlreadyRegsitered) {
        return res.status(409).json({ message: 'Car already registered' })
      }
    }

    const car = new Car(vehicleNo);
    await car.save();
    return res.status(201).json({ message: `Car registered successfully with vehicle no ${vehicleNo}` });
  } catch (error) {
    console.log('Error while registering the car', error);
    return res.status(500).json({ message: `Error while registering the car: ${error?.message}` });
  }
}

module.exports = {
  getAllCars,
  register,
};