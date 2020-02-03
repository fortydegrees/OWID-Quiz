import React from "react";
import Chart from "./Chart";
import Score from "./Score";
import QuestionNumber from "./QuestionNumber";

const Game: React.FC = () => {
  return (<>
    <div>
    <Chart />
  </div>
  <div className="flex justify-between mx-2">
    <Score />
    <QuestionNumber />
  </div></>
  );
}

export default Game;