import React from "react";
import { observer } from 'mobx-react-lite'
import { useMst } from "../models/Root";

interface Props {}

const QuestionNumber: React.FC<Props> = observer(() => {

  const { questionNumber, questionList } = useMst();

  return (
<p className='text-right'>Question {questionNumber + 1} of {questionList.len}</p>
  );
})

export default QuestionNumber;