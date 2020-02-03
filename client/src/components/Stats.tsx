import React  from "react";
import Table from './Table'
import { useMst } from "../models/Root";
import StatForm from './StatForm'
import { observer } from "mobx-react-lite";
import Collapsible from './Collapsible'

const Stats: React.FC = observer(() => {
  const {chartList} = useMst()
  const {paginator, getCharts, numResults, limit, loaded} = chartList

  let numFirst = paginator - (limit-1)
  let numLast = numFirst + (chartList.charts.length -1)

  return (<div className="container mx-auto px-4 sm:px-8">
  <div className="py-8">
      <div className='flex flex-row'>
        <div className='flex-1'><a className='underline' href='/'>Back</a></div>
          <h2 className="flex-none text-4xl font-bold text-center py-4">Chart Stats</h2>
          <div className='flex-1'></div>
      </div>
        <Collapsible label='Options'>
      <StatForm />
      </Collapsible>
      
      {loaded && <div className='text-right my-4'>Showing {numFirst}-{numLast} of {numResults}</div>}
      <div className='pre-game'>
          <Table />
      </div>
      <div className='my-4 text-right'>
      {(paginator > 10) && <button className='text-center bg-transparent text-secondary font-semibold border-2 py-2 px-4 mx-auto' onClick={()=>getCharts(true)}>&lt;-</button>}
      {(numResults !== numLast) && <button className='text-center bg-transparent text-secondary font-semibold border-2 py-2 px-4 mx-auto' onClick={()=>getCharts()}>-></button>}
      </div>
  </div>
</div>

  );
})

export default Stats;