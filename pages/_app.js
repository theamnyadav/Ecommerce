import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
function MyApp({ Component, pageProps }) {

const saveCart = (myCart) =>{
  localStorage.setItem("cart",JSON.stringify(myCart) )
}

  const [cart, setCart] = useState({})
  const [progress, setProgress] = useState(0)
  const [key, setKey] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
const router = useRouter()


useEffect(() => {
  router.events.on('routeChangeStart', ()=>{
    setProgress(40)
  })
  router.events.on('routeChangeComplete', ()=>{
    setProgress(100)
  })
 console.log('Hey I am useEffect')

try {
  if(localStorage.getItem("cart")){
    setCart(JSON.parse(localStorage.getItem("cart")))
  }
  
} catch (error) {
  console.error(error)
  localStorage.clear()
}

}, [])




  const addToCart = ( itemCode, qty, price, name, size, variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = {qty:1, price, name, size, variant}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () =>{
    setCart({})
    saveCart({})
  }


  const removeFromCart = ( itemCode, qty, price, name, size, variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode]["qty"]<=0){
      delete newCart[itemCode]
    }
      
        setCart(newCart)
        saveCart(newCart)
    }

  return (
    
  <>
  <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime= {400}
        onLoaderFinished={() => setProgress(0)}
      />
  <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart}  />
  <Component {...pageProps} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart}   />
  <Footer/>
</>
  )
}

export default MyApp
