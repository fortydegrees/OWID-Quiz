/* eslint-disable no-console */

import { Chart } from '../sequelize';

module.exports = (app) => {
    app.put('/addStats', (req, res) => {
        let {id, userAnswer} = req.body.params
        Chart.findByPk(id, { attributes: { exclude: ['svg'] } }).then(chart => {
            if (chart.title === userAnswer){
                chart.increment({numCorrect: 1, numAnswered: 1})
            }
            else{
                chart.increment({numAnswered: 1})
            }
            res.sendStatus(200)
        }).catch(err => res.send(err))
    })
}
