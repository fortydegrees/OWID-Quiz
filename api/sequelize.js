import Sequelize from 'sequelize';
import ChartModel from './models/chart';


const sequelize = new Sequelize('charts', 'test', 'test1234', {
  host: 'db',
  dialect: 'mysql',
});

const Chart = ChartModel(sequelize, Sequelize);

//need something where if it's empty, populate

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log('Charts db and chart table have been created');
  // CrawlCharts(Chart)
});

module.exports = { Chart, Sequelize };
