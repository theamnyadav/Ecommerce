import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, } from "react-icons/ai";
import { BsFillBagCheckFill } from 'react-icons/bs'

function Navbar({cart ,addToCart, removeFromCart, clearCart}) {
  console.log(cart ,addToCart, removeFromCart, clearCart)
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col py-2 shadow-md justify-center items-center md:justify-start md:flex-row sticky top-0 bg-white z-10 ">
      <div className="logo mx-5">
        <Link href="/">
          <a>
            <Image src="/MediumLogo.png" width={170} height={60} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-semibold  md:text-md cursor-pointer ">
          <Link href="/tshirts">
            <a>
              <li className="hover:text-pink-500"> Tshirts </li>
            </a>
          </Link>
          <Link href="/hoodies">
            <a>
              <li className="hover:text-pink-500">Hoodies</li>
            </a>
          </Link>
          <Link href="/sticker">
            <a>
              <li className="hover:text-pink-500">Stickers</li>
            </a>
          </Link>
          <Link href="/mugs">
            <a>
              <li className="hover:text-pink-500">Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div
        onClick={toggleCart}
        className="cart absolute right-0 top-6 cursor-pointer mx-5"
      >
        <AiOutlineShoppingCart className="text-xl md:text-2xl hover:text-pink-500" />
      </div>
      <div className="sidebar absolute right-0 top-0 w-full bg-pink-100">
      <div
        ref={ref}
        className="sidecart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform translate-x-full transition-transform"
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal ">
          {Object.keys(cart).length== 0 && <div className="my-4  font-normal">Not items in the cart</div>}
          {Object.keys(cart).map((k)=>{
            return           
          <li key={k}>
            <div className="item flex my-5 ">
            <div className="w-2/3 font-semibold">{cart[k].name}</div>
            <div className="flex font-semibold items-center justify-center w-1/3 text-sm"><AiFillMinusCircle className="cursor-pointer text-pink-500"/><span className="mx-3 ">{cart[k].qty}</span><AiFillPlusCircle className="cursor-pointer text-pink-500"/></div>
            </div>
          </li>
          })}

          
        </ol>
        <div className="flex">
        <button className=" flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"><BsFillBagCheckFill className="m-1"/>CheckOut</button>
        <button onClick={clearCart} className=" flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Clear Cart</button>
</div>
      </div>
    </div>
    </div>
  );
}

export default Navbar
