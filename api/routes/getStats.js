/* eslint-disable no-console */

import { Chart, Sequelize } from '../sequelize';

module.exports = (app) => {
    app.get('/getStats', (req, res) => {
        let minAnswered = req.query.minAnswered ? parseInt(req.query.minAnswered) : 2
        let leastCorrect = req.query.leastCorrect ? req.query.leastCorrect : false
        let limit = req.query.limit ? parseInt(req.query.limit) : 10
        let paginator = req.query.paginator ? parseInt(req.query.paginator) : 0


        Chart.findAll({ attributes: { exclude: ['svg'] }, where: { chartType: 'mapTab', numAnswered: { [Sequelize.Op.gte]: minAnswered } } }).then(charts => {
            charts.forEach(chart => {
                chart.dataValues['pct'] = Math.round((chart.dataValues.numCorrect / chart.dataValues.numAnswered) * 100)
            })
            charts.sort(function (a, b) {
                if (leastCorrect === 'true') {
                    //sort by least correct, if a tie, sort by most answered
                    return (a.dataValues.pct - b.dataValues.pct) || (b.dataValues.numAnswered - a.dataValues.numAnswered)
                }
                else {
                    //sort by most correct
                    return (b.dataValues.pct - a.dataValues.pct) || (b.dataValues.numAnswered - a.dataValues.numAnswered)
                }
            })
            res.send({ charts: charts.slice(paginator, paginator + limit), paginator: (paginator + limit), numResults: charts.length })

        })
    })
}
