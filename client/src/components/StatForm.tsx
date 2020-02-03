import React, { useState } from "react";
// import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";

const StatForm: React.FC = () => {
    const { chartList } = useMst()

    const [order, setOrder] = useState(chartList.leastCorrect);
    const [min, setMin] = useState(chartList.minAnswered);

    function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        chartList.submit(order, min)
    }

    return (<form className='w-full' onSubmit={(e) => formSubmit(e)}>
        <div className='flex flex-col max-w-lg px-4 py-2'>
            <label className='font-semibold text-lg'>Order:</label>
            <div className='flex flex-row justify-around'>
                <div className='pt-2 mb-4'>
                    <input type='radio' name='order' id='most' checked={!order} onChange={e => setOrder(false)} />
                    <label className='px-2' htmlFor='most'>Most Correct</label>
                </div>
                <div className='pt-2 mb-4'>
                    <input type='radio' name='order' id='least' checked={order} onChange={e => setOrder(true)} />
                    <label className='px-2' htmlFor='least'>Least Correct</label>
                </div>
            </div>
            <label className='font-semibold text-lg pt-2 border-t'>Minimum Times Answered:</label>
            <div className='flex flex-row justify-around'>
                <div className='p-2'>
                    <input type='radio' name='minA' id='1' value='1' checked={min === 1} onChange={e => setMin(1)} />
                    <label className='px-1 ' htmlFor='1'>1</label>
                </div>
                <div  className='p-2'>
                    <input type='radio' name='minA' id='2' value='2' checked={min === 2} onChange={e => setMin(2)} />
                    <label className='px-1' htmlFor='2'>2</label>
                    
                </div>
                <div className='p-2'>
                    <input type='radio' id='3' name='minA' value='3' checked={min === 3} onChange={e => setMin(3)} />
                    <label className='px-1 ' htmlFor='3'>3</label>
                </div>
            </div>
        </div>
        <button className="min-w-full text-center bg-transparent text-secondary font-semibold border-2 py-2 px-4 mt-4 mx-auto">Submit</button>
    </form>
    );
}

export default StatForm;