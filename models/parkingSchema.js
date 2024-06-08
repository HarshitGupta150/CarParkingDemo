const db = require('../utils/database');

class Parking {
  constructor(maxSpace, filledSpace) {
    this.maxSpace = maxSpace;
    this.filledSpace = filledSpace;
  }

  save() {
    return db.execute('INSERT INTO parking (maxSpace, filledSpace) VALUES (?, ?)',
      [this.maxSpace, this.filledSpace]);
  }

  static fetch() {
    return db.execute('SELECT maxSpace, filledSpace from parking');
  }

  static update(maxSpace) {
    return db.execute('UPDATE parking SET maxSpace = ? WHERE id = 1',
      [maxSpace]);
  }

  static increaseFilledSpace() {
    return db.execute('UPDATE parking SET filledSpace = filledSpace + 1 WHERE id = 1');
  }

  static decreaseFilledSpace() {
    return db.execute('UPDATE parking SET filledSpace = filledSpace - 1 WHERE id = 1');
  }
}

module.exports = Parking;