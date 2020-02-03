//Generates the questions

import { Chart, Sequelize } from '../sequelize';

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

module.exports = (app) => {
    app.get('/getCharts', (req, res) => {
        let chartType = req.query.chartType ? req.query.chartType : 'mapTab'
        let numQ = req.query.numQ ? parseInt(req.query.numQ) : 7


        Chart.findAll({ attributes: { exclude: ['svg'] }, where: { chartType, legendUnit: { [Sequelize.Op.ne]: null } }, order: Sequelize.literal('rand()'), limit: numQ }).then(charts => {
            let arrCharts = []
            var bar = new Promise((resolve, reject) => {
                asyncForEach(charts, async (chart,index,array) => {
                    const answers = await Chart.findAll({ attributes: ['title'], where: { chartType, legendUnit: chart.legendUnit, title: {[Sequelize.Op.ne]: chart.title} }, order: Sequelize.literal('rand()'), limit: 3 })
                        let arrAnswers = []
                        answers.map(answer => {
                            arrAnswers.push(answer.dataValues.title)
                        })
                        chart.dataValues['options'] = arrAnswers.splice(0, 3).concat(chart.title)
                        arrCharts.push(chart)
                        if (index === array.length - 1) resolve();
                    
                })
            })
            bar.then(() => {
                res.send(arrCharts)
            });
        })
    })
}
