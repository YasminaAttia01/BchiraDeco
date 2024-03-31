import { createContext, useReducer } from 'react'

export const cardStore= createContext()
export const cardActions={
addToCard:(prod)=>{return{type:"ADD_TO_CARD",payload:prod}},
removeFromCard:(prod)=>{return{type:"REMOVE_FROM_CARD",payload:prod}},
clearCard:()=>{return{type:"CLEAR_CARD"}},
    
}


const cardReducer=(state,action)=>{
    switch(action.type){
        case "ADD_TO_CARD":{
            const pos =state.findIndex((item)=>item._id===action.payload._id)
            console.log(pos);
            if(pos>=0){
                return [...state]
            }
            return [...state,action.payload]
        }
        case "REMOVE_FROM_CARD":
            return state.filter((item)=>item._id!==action.payload._id)
        case "CLEAR_CARD":
            return []
        default:
            return state

    }}


function CardContext({children}) {
    const [card,dispatchCard]=useReducer(cardReducer,[ {
        brand: "Nike",
        category: "tshirt",
        color: "White",
        images:[("\\exmple1.png", "\\exmple2.png", "\\exmple3.jpg")],
        price: 25,
        title: "Nike Graphic T-shirt",
        _id: "6601fb13e931a7d9df0a1989",
      }])

  return (
    <cardStore.Provider value={{card,dispatchCard}}>
        {children}
    </cardStore.Provider>
    
  )
}

export default CardContext
