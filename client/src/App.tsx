import React from "react";
import { Provider, rootStore, useMst } from "./models/Root";
import { observer } from "mobx-react-lite";
import Game from "./components/Game";
import PreGame from "./components/PreGame";
import PostGame from "./components/PostGame";
import Stats from './components/Stats'
import img from './worldmapdark.png'
import { Switch, Route } from 'react-router-dom';

const ScreenSelect: React.FC = observer(() => {

  const { status } = useMst()

  if (status === 'pre-game') {
    return (
      <PreGame />
    )
  }
  else if (status === 'game') {
    return (
      <Game />
    )
  }
  else if (status === 'post-game') {
    return (
      <PostGame />
    )
  }
  else {
    return (
      <div className="text-center">Error</div>
    )
  }

})

const NotFound: React.FC = () =>{
  return(
    <div className="flex items-center justify-center h-screen flex-col">
    
    <div className='text-center text-4xl font-bold'>Page not found</div>
    <div className='text-center text-lg underline mt-4'><a href='/'>Index</a></div>
    
    </div>
   
  )
}

const App: React.FC = () => {
  return (
    <Provider value={rootStore}>
      <div className="max-w-sm lg:max-w-3xl mx-auto" style={{backgroundImage: img }}>
      <Switch>
        <Route exact path='/' component={ScreenSelect}></Route>
        <Route exact path='/stats' component={Stats}></Route>
        <Route component={NotFound}/>
      </Switch>
      </div>
      </Provider>
  );
}



export default App;
