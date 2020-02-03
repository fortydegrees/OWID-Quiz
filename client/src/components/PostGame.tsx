import React from "react";
import { useMst } from "../models/Root";
import { Question } from "../models/QuestionList"
import { Instance } from "mobx-state-tree";
import cheerio from 'cheerio'

const PostGame: React.FC = () => {
    const { printUserScore, scoreDescription, restart, questionList } = useMst()

    function createMarkup(svg: string) {
        const $ = cheerio.load(svg)
        $('svg').attr('viewBox', '0 0 850 600')
        $('svg').removeAttr('height')
        $('svg').attr('width', '100%')

        return { __html: $.html($('svg')[0]) };
    }

    return (<>
        <div className="pre-game px-4 py-6 text-center mx-4 text-lg mt-8 mb-16">

            <p className='text-center text-4xl font-bold mb-4'>You Scored {printUserScore}</p>
            <p className='text-center text-lg'>{scoreDescription}</p>
            <button className="min-w-full lg:min-w-0 text-center mt-8 bg-transparent text-secondary font-semibold border-2 py-2 px-4 mx-auto" onClick={() => restart()}>Play Again</button>

        </div>
        <p className='text-center text-4xl font-bold'>Your Charts:</p>
        <p className='italic text-center mb-2'>Click for more info (opens new window)</p>
        <div className='pre-game pt-4'>
        {questionList.questions.map((question: Instance<typeof Question>, i: number) => {
            return (<div className='mb-8'>
                <h3 className='text-center text-lg font-semibold mb-2'>Question {i + 1} {(question.userAnswer === question.title) ? '✅' : '❌'}</h3>
                <a href={`//ourworldindata.org/grapher/${question.fileName}`} target="_blank" rel="noopener noreferrer" >
                <div key={question.id} dangerouslySetInnerHTML={createMarkup(atob(question.svg))} />
            </a></div>
            )
        })}</div>


    </>
    );
}

export default PostGame;