import * as React from 'react';
import cheerio from 'cheerio';
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import  Button  from "./Button"

const Chart: React.FC = observer(() => {
    const { questionList, questionNumber, nextQuestion } = useMst();


    function createMarkup(svg: string) {
        const $ = cheerio.load(svg)
        $('g.HeaderView').remove()
        $('g.SourcesFooter').remove()
        $('svg').attr('viewBox', '10 75 800 525')
        $('svg').removeAttr('height')
        $('svg').attr('width', '100%')

        return { __html: $.html('svg') };
    }
    if (questionList && questionList.questions[questionNumber]) {
        let question = questionList.questions[questionNumber]
        return (<div className="lg:mt-8">
            <div dangerouslySetInnerHTML={createMarkup(atob(question.svg))} />
            <div className="flex flex-col lg:flex-row lg:flex-wrap w-full px-8 content-center text-center my-4">
                {question.options.map((option: string) => { return (
                    <Button
                        userAnswer={question.userAnswer}
                        correctAnswer={question.title}
                        label={option}
                        onClick={() => question.setAnswer(option)}
                        disabled={!!question.userAnswer}
                    />
                ) })}

            </div>
            {question.userAnswer &&
            <button className="flex-1 min-w-full h-full flex text-center text-secondary border-secondary justify-center bg-transparent text-primary font-semibold py-2 px-4 border-2 my-4 mx-auto" onClick={()=>nextQuestion()}>
                {(questionNumber + 1 === questionList.len) ? 'Finish' : 'Next Question ->'}
                </button>
            }
        </div>
        );
    }
    else {
        return (<div>{questionList.len}</div>)
    }
})

export default Chart;
