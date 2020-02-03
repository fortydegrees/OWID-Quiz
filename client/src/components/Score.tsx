import React from "react";
import { observer } from 'mobx-react-lite'
import { useMst } from "../models/Root";

const Score: React.FC = observer(() => {
  const { printUserScore } = useMst();
  return (
    <p>Score: {printUserScore}</p>
  );
})

export default Score;