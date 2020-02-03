/* eslint-disable no-console */

import { Chart } from '../sequelize';

module.exports = (app) => {
    app.get('/getSVG', (req, res) => {
        Chart.findByPk(req.query.id, { attributes: ['svg'] }).then(svg => {
            res.send(svg)
        }).catch(err => res.send(err))
    })
}
