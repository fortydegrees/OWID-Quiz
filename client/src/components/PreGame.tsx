import React from "react";
import { useMst } from "../models/Root";
import { observer } from "mobx-react-lite";

const PreGame: React.FC = observer(() => {
    const { start, questionList, loading} = useMst()

    return (<>
            <h1 className='text-center mt-16 mb-8 text-4xl mx-4 font-bold leading-tight'>How well do you know the world?</h1>

    <div className="pre-game px-4 py-6 text-center mx-4 text-lg">
        {/* <h2 className="text-2xl font-bold mb-6">
How well do you know the world?
</h2> */}
<p className='mb-4 font-semibold'>In this short quiz, you'll be shown a randomly selected map from <a className='underline' href="https://ourworldindata.org/">Our World In Data</a> that's been stripped of its legend.</p>
<p className='mb-6 font-semibold'>You will be presented with four options which could explain the map, and your job is to select the answer which explains the data.</p>
<p className='italic mb-4 text-sm'>{loading ? 'Loading Questions...' : `There are ${questionList.len} questions.`}</p>
<button disabled={loading} className={`min-w-full text-center bg-transparent text-secondary font-semibold border-2 py-2 px-4 mx-auto ${loading && 'opacity-50'}`} onClick={() => start()}>Start Quiz</button>
        </div>
        <div className='text-center mt-8 underline'><a href='/stats'>View Stats</a></div></>
    );
})

export default PreGame;