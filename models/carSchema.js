const db = require('../utils/database');

class Car {
  constructor(vehicleNo) {
    this.vehicleNo = vehicleNo;
  }

  save() {
    return db.execute('INSERT INTO cars (vehicleNo) VALUES (?)',
      [this.vehicleNo]);
  }

  static fetchAll() {
    return db.execute('SELECT vehicleNo from cars');
  }

  static findByVehicleNo(vehicleNo) {
    return db.execute('SELECT id, vehicleNo from cars WHERE vehicleNo = ?', [vehicleNo]);
  }
}

module.exports = Car;