//wrote this so that the answers generated for each question use the same units
//didn't grab this info when initially crawling so had it use the DB

import { Chart, Sequelize } from '../sequelize';
const cheerio = require('cheerio')

module.exports = (app) => {
    app.get('/addField', (req, res) => {
        let unitTypes = {}
        Chart.findAll({ attributes: ['svg', 'title', 'id'], where: { chartType: 'mapTab' }}).then(charts => {
            charts.forEach(chart => {
                const $ = cheerio.load(unescape(chart.svg))
                let textLength = $('g.numericMapLegend').find('text').length
                let text = $('g.numericMapLegend').find('text').eq(3).text()
                let unit
                if (textLength < 4) {
                    unit = 'yesno'
                }
                else if (textLength === 4) {
                    console.log("skipping: " + chart.title)
                    return
                }
                else {
                    text = text.replace(/[0-9]/g, '').replace(' ', '').replace(',', '').replace('-', '').replace('.', '');
                    if (text === "") {
                        unit = 'number'
                    }
                    else {
                        unit = text
                    }
                }

                if (unit.length >= 1) {
                    if (!unitTypes[unit]) unitTypes[unit] = []
                    unitTypes[unit] = unitTypes[unit].concat(chart.id)
                }
            })
        }).catch(err => res.send(err)).finally(()=>{
            Object.keys(unitTypes).forEach(unitType=>{
                if (unitTypes[unitType].length > 6){
                    unitTypes[unitType].forEach(id=>{
                        Chart.update({legendUnit: unitType}, {where: {id}})
                        console.log(unitType, id)
                    })
                }
            })
        })
    })
}
