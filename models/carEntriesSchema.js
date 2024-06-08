const db = require('../utils/database');

class CarEntries {
  constructor(vehicleNo, entryTime, vehicleId, exitTime) {
    this.vehicleNo = vehicleNo;
    this.entryTime = entryTime;
    this.exitTime = exitTime;
    this.vehicleId = vehicleId;
  }

  save() {
    return db.execute('INSERT INTO carentries (vehicleNo, entryTime, vehicleId) VALUES (?, ?, ?)',
      [this.vehicleNo, this.entryTime, this.vehicleId]);
  }

  static fetchAll() {
    return db.execute('SELECT id, vehicleNo, entryTime, exitTime FROM carentries');
  }

  static fetchByDay(id, vehicleNo, entryTime) {
    return db.execute('SELECT id, vehicleNo, entryTime, exitTime FROM carentries WHERE vehicleId = ? AND vehicleNo = ? AND DATE(entryTime) = ?',
      [id, vehicleNo, entryTime]);
  }

  static findLatestEntry(id, vehicleNo) {
    return db.execute('SELECT id, vehicleNo, entryTime, exitTime FROM carentries WHERE vehicleId = ? AND vehicleNo = ? ORDER BY entryTime desc LIMIT 1',
      [id, vehicleNo]);
  }

  static updateCarExitTime(id, exitTime) {
    return db.execute('UPDATE carentries SET exitTime = ? WHERE id = ?',
      [exitTime, id]);
  }
}

module.exports = CarEntries;