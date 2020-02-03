//script to crawl the OWID charts page and extract the relevant data
//written before i realized there was a 'download' button on each chart page..

const axios = require("axios")
const cheerio = require('cheerio')

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};


const fetchData = async (uri) => {
    const result = await axios.get(uri)

    return result.data
}

module.exports = async function CrawlCharts(ChartTable) {
    const chartHTML = await fetchData('https://ourworldindata.org/charts')
    let $ = cheerio.load(chartHTML)

    let chartList = []

    $('main').find('li').each(async function (i, e) {
        const title = $(this).text()
        const category = $(this).parent().parent().find('h2').text()
        const href = $(this).find('a').attr('href')
        const fileName = href.replace('/grapher/', '')
        const url = "https://ourworldindata.org/grapher/exports/" + fileName + ".svg"

        chartList.push({ title, category, fileName, url })
    });

    asyncForEach(chartList, async chart => {
        const svg = await fetchData(chart.url)
        $ = cheerio.load(svg)
        const chartType = $('svg').children().eq(1).attr('class')
        ChartTable.create({ title: chart.title, category: chart.category, fileName: chart.fileName, chartType, svg }).catch(e => console.error(e)).finally(console.log('Added: ' + chart.title))
    })

}
