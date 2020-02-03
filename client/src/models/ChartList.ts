import { types, flow, Instance} from "mobx-state-tree";
import axios from 'axios'

//base64 of white SVG box - default to maintain layout when loading SVG (prevent component jumping down page)

export const Chart = types.model({
  id: types.number,
  title: types.string,
  numAnswered: types.number,
  numCorrect: types.number,
  pct: types.number,
  fileName: types.string
})

export const ChartList = types.model({
  charts: types.array(Chart),
  minAnswered: 2,
  paginator: 0,
  limit: 10,
  leastCorrect: false,
  loaded: false,
  numResults: 0
}).actions(self => ({
  afterCreate() {
    this.getCharts()
  },
  getCharts: flow(function* getCharts(back?: boolean) {
    let {minAnswered, paginator, limit, leastCorrect} = self
    if(back) paginator -= limit *2
    self.charts.length=0
    self.loaded = false
    const response = yield axios.get(
      '//178.62.106.135:3003/getStats', { params: { minAnswered, paginator, limit, leastCorrect } }
    )
    const charts = response.data.charts
    charts.forEach((chart: Instance<typeof Chart>) => {
      self.charts.push({ id: chart.id, title: chart.title, fileName: chart.fileName, numAnswered: chart.numAnswered, numCorrect: chart.numCorrect, pct: chart.pct })
    })
    self.paginator = response.data.paginator
    self.numResults = response.data.numResults
    self.loaded = true
  }),
  submit(order: boolean, min: number){
    self.leastCorrect = order
    self.minAnswered = min
    self.paginator = 0
    this.getCharts()
  }
}))