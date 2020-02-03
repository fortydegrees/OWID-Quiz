import { types, flow, Instance, getParent } from "mobx-state-tree";
import axios from 'axios'
import { RootInstance } from './Root'

//base64 of white SVG box - default to maintain layout when loading SVG (prevent component jumping down page)
const whiteBox = `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgc3R5bGU9ImZvbnQtZmFtaWx5OkxhdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE4cHg7YmFja2dyb3VuZC1jb2xvcjp3aGl0ZTt0ZXh0LXJlbmRlcmluZzpvcHRpbWl6ZUxlZ2liaWxpdHk7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZCIgd2lkdGg9IjEwMCUiIHZpZXdCb3g9IjEwIDc1IDgwMCA1MjUiPjwvc3ZnPg==`

export const Question = types.model({
  id: types.number,
  title: types.string,
  options: types.array(types.string),
  userAnswer: types.optional(types.string, ""),
  svg: whiteBox,
  fileName: types.string
}).actions(self => ({
  afterCreate() {
    this.getSVG()
  },
  setAnswer(answer: string) {
    self.userAnswer = answer
    let id = self.id
    if (answer === self.title) getParent<RootInstance>(self, 3).addScore()
    axios.put('//localhost:3003/addStats', { params: {id, userAnswer: answer}})
  },
  getSVG: flow(function* getSVG() {
    let id = self.id
    const response = yield axios.get('//localhost:3003/getSVG', { params: { id } })
    const svg: string = response.data.svg
    self.svg = btoa(unescape(encodeURIComponent(svg)))
  })
}))

export const QuestionList = types.model({
  questions: types.array(Question)
}).actions(self => ({
  afterCreate() {
    this.getQuestions(7)
  },
  getQuestions: flow(function* getQuestions(numQ: number) {
    const response = yield axios.get(
      '//localhost:3003/getCharts', { params: { numQ } }
    )
    const charts = response.data
    charts.forEach((chart: Instance<typeof Question>) => {
      self.questions.push({ id: chart.id, title: chart.title, fileName: chart.fileName, options: chart.options.sort(() => Math.random() - 0.5) })
    })
    getParent<RootInstance>(self, 1).loaded()
  }),
})).views(self => ({
  get len() {
    return self.questions.length
  }
}))