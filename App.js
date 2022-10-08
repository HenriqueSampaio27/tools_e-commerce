import 'react-native-gesture-handler'
import react from 'react'
import Router from './src/router'
import CartProvider from './src/context/cartContext'

export default function App() {

  return (
      <>
      <CartProvider>
        <Router />
      </CartProvider>
      </>
  );
}
