import { useContext, createContext } from "react";
import { types, Instance } from "mobx-state-tree";

import { QuestionList } from "./QuestionList";

import { ChartList } from './ChartList'

const RootModel = types.model({
  userScore: 0,
  questionNumber: 0,
  status: 'pre-game',
  loading: true,
  questionList: QuestionList,
  chartList: ChartList
}).actions(self => ({
  addScore() {
    self.userScore++
  },
  nextQuestion() {
    let questionNumber: number = self.questionNumber
    let totalQuestions: number = self.questionList.len

    if (questionNumber + 1 === totalQuestions) {
      this.end()
    }
    else {
      self.questionNumber++
    }
  },
  loaded(){
    self.loading = false
  },
  start() {
    self.status = 'game'
  },
  end() {
    self.status = 'post-game'
  },
  restart(){
    self.loading = true
    self.userScore =  0
    self.questionNumber = 0
    self.questionList.questions.length = 0
    self.questionList.getQuestions(7)
    self.status = 'pre-game'
  }
})).views(self => ({
  get printUserScore() {
    return self.userScore + '/' + self.questionList.questions.length
  },
  get scoreDescription(){
    let pct: number = (self.userScore / self.questionList.len) * 100
    if (pct === 100){ //7 out of 7
      return "Wow! You're really an expert on the world's data!"
    }
    else if ((pct < 100) && (pct >=70)){ //5-6 out of  7
      return "Nice one! You really know a lot about the world!"
    }
    else if ((pct < 70) && (pct >=40)){ //3-4 out of 7
      return "Not bad! Play again to improve your knowledge!"
    }
    else if (pct < 40){
      return "Let's just say there's room for improvement. Play again to improve your knowledge!"
    }
    else{
      return "Error parsing your score. Sorry!"
    }
  }
}))

export const rootStore = RootModel.create({ questionList: { questions: [] }, chartList: {charts:[]} });

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store as RootInstance;
}
