import React, {useState, useEffect, useContext, createContext} from "react"

const cartContext = createContext()

export default function CartProvider({children}){

    const[bag, setBag] = useState([])
    const[total, setTotal] = useState([])

    function addBag(id, image1, image2, image3, name, price, description){
        const newBag = bag
        newBag.push({id: id, image1: image1, image2: image2, image3: image3, name: name, price: price, description: description})
        setBag([...newBag])
        
    }

    function increment(price){
        let totalPrice = total
        totalPrice = totalPrice + parseInt(price)
        setTotal(totalPrice)

    }
        
    function decrement(price){
        let totalPrice = total
        totalPrice = totalPrice - parseInt(price)
        setTotal(totalPrice)
    }

    function remove(id, amount, price){
        const newBag = bag.filter((item, index) => item.id != id)
        
        setBag([...newBag])
        
        const newTotal = total - (price * amount)
        setTotal(newTotal)
    }

    function clearBag(){
        const clearBag = []
        setBag([...clearBag])
    }

    useEffect(() => {
        let totalPrice = 0
        bag.map((item) => {
            totalPrice = totalPrice + parseInt(item.price)
        })
        setTotal(totalPrice)
    }, [bag])

    const store = {
        addBag,
        bag,
        total,
        increment,
        decrement,
        remove,
        clearBag
    }

    return(
        <cartContext.Provider value={store}>
            {children}
        </cartContext.Provider>
    )

}

export function useBag(){
    const context = useContext(cartContext)

    const {
        bag,
        addBag,
        total,
        increment,
        decrement,
        remove,
        clearBag
    } = context

    return{
        bag,
        addBag,
        total,
        increment,
        decrement,
        remove,
        clearBag
    }
}