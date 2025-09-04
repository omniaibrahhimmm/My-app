import { useState } from "react";
import { createContext } from "react";

export const CounterContext =  createContext()


import React from 'react'

export default function CounterContextProvider({children}) {

const [counter, setCounter] = useState(0)

function incriment() {
    setCounter(counter + 1)
}

function decriment() {
    setCounter(counter - 1)
}



    return (
    
<CounterContext.Provider value={{counter, incriment ,decriment }}>
{/* hna b2olo a3ml share l components dh  */}


{/* lma click nn2s aw nzwd counter fy app button  */}

{children}
{/* ay component gaylk props hoto hna */}
</CounterContext.Provider>




  )
}
