import React from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";

const Table: React.FC = observer(() => {
  const { chartList } = useMst()
  const charts = chartList.charts

  return (
  <div>
    <table className="w-full">
      <thead>
        <tr>
          <th className="py-4 bg-grey-lightest font-bold uppercase text-sm text-center border-b border-grey-light">Chart</th>
          <th className="py-4 bg-grey-lightest hidden lg:table-cell  font-bold uppercase text-sm text-center border-b border-grey-light min-w-15">Times Answered</th>
          <th className="py-4 bg-grey-lightest hidden lg:table-cell font-bold uppercase text-sm text-center border-b border-grey-light min-w-10">Times Correct</th>
          <th className="py-4 bg-grey-lightest font-bold uppercase text-sm text-center border-b border-grey-light pr-4 min-w-15 lg:min-w-10">%</th>
        </tr>
      </thead>
      <tbody>
          {charts.map(chart=>{
            return(
  <tr className="hover:bg-grey-lighter">
          <td className="py-4 px-4 border-b border-grey-light underline"><a href={`//ourworldindata.org/grapher/${chart.fileName}`} target="_blank" rel="noopener noreferrer">{chart.title}</a></td>
            <td className="hidden lg:table-cell py-4 px-6 border-b border-grey-light text-center">
                <div>{chart.numAnswered}</div>
            </td>
            <td className="hidden lg:table-cell py-4 px-6 border-b border-grey-light text-center">
                <div>{chart.numCorrect}</div>
            </td>
            <td className="py-4 pr-4 border-b border-grey-light text-center">
                <div>{chart.pct}%</div>
                <div className='w-full lg:hidden'>({chart.numCorrect}/{chart.numAnswered})</div>
            </td>
          </tr>
            )
          })}

      </tbody>
    </table>
  </div>
  );
})

export default Table;