/* eslint-disable indent */

module.exports = (sequelize, type) => sequelize.define('chart', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: type.STRING,
  category: type.STRING,
  fileName: type.STRING,
  chartType: type.STRING,
  legendUnit: type.STRING,
  svg: type.TEXT('long'),
  numAnswered: type.INTEGER,
  numCorrect: type.INTEGER
});
