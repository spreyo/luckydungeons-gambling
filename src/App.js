import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar';
import { Route } from "wouter";
import cookie from "react-cookies";
import { LoggedIn } from './components/LoggedIn';
import { useEffect, useState } from 'react';

function App() {
  const [diamonds, setDiamonds] = useState(0);

  useEffect(() => {
    if (cookie.load("loggedin")) {
      GetDiamonds().then(amount => setDiamonds(amount));

    }
  }, [])


  function getRandomIntInclusive(min, max) {
    const randomBuffer = new Uint32Array(1);

    window.crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
  }
  const delay = ms => new Promise(res => setTimeout(res, ms));
  var coinflipDone = false;
  async function Coinflip() {

    const betButton = document.getElementById("bet-button");
    const circle = document.getElementById("coinflip-circle");
    const betInput = document.getElementById("bet-input");
    const result = getRandomIntInclusive(0, 1)
    console.log(result);


    if (betInput.value == "" || betInput.value == undefined || !betInput.value.match(/^-?\d+$/) || betInput.value > diamonds) {
      return;
    }
    betButton.classList.add("btn-disabled");
    await RemoveDiamonds(betInput.value);
    await GetDiamonds();


    if (result == 1) {
      circle.classList.remove("text-white")
      circle.classList.add("text-base-100")
      circle.style.transition = "1s";
      circle.classList.add("text-green-500");
    } else {

      circle.classList.remove("text-white")
      circle.classList.add("text-base-100")
      circle.style.transition = "1s";
      circle.classList.add("text-green-500");

    }

    await delay(1000);


    circle.classList.remove("text-red-500");
    circle.classList.remove("text-green-500");
    circle.style.transition = "1s";
    circle.classList.add("text-white");
    betButton.classList.remove("btn-disabled")



  }

  async function RemoveDiamonds(amount) {
    await fetch(`https://luckydungeons-api.vercel.app/diamonds?amount=${amount}&username=${cookie.load("username")}`, { method: "DELETE" });

  }
  async function GetDiamonds() {
    const response = await fetch(`https://luckydungeons-api.vercel.app/diamonds?username=${cookie.load("username")}`)
    const result = await response.json();
    setDiamonds(result[0]["amount"]);
    return result[0]["amount"];
  }

  return (

    <div className="App">
      <NavBar diamonds={diamonds} />
      <Route path="/">

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-5xl">
              <h1 className="text-5xl font-bold">Welcome to Lucky Dungeons Gambling</h1>
              {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
              <button className="btn btn-primary mt-10">Get Started</button>
            </div>
          </div>
        </div>
      </Route>
      <Route path="/login">
        <LoggedIn />
        <form className=' h-full flex flex-col justify-center items-center gap-4 m-auto mt-64' onSubmit={(e) => { e.preventDefault() }}>
          <h1 className='text-5xl font-bold'>Log In</h1>

          <div className='w-full max-w-xs gap-4 flex flex-col justify-center items-center' >
            <input id="login-username" className='input input-bordered input-primary join-item' placeholder='username' />
            <input id="login-token" type="password" className='input input-bordered join-item' placeholder='token' />
            <button className='btn btn-primary join-item rounder-r full' onClick={() => {
              const username = document.getElementById("login-username").value;
              const token = document.getElementById("login-token").value;
              fetch(`https://luckydungeons-api.vercel.app/login?username=${username}`, { mode: "cors", method: "GET", redirect: "follow" }).then(res => res.json().then(result => {
                console.log(cookie.load("username"));
                if (token == result[0]["token"]) {
                  console.log(result[0]["token"]);
                  cookie.save("username", username)
                  cookie.save("loggedin", true);
                  window.location.pathname = "/";
                }
              }));
            }}>submit</button>
          </div>
        </form>
      </Route>
      <Route path="/coinflip">
        <LoggedIn />
        <div className=" h-full flex flex-col justify-center items-center gap-4 mt-[10%]">
          <div id="coinflip-circle" className='rounded-full w-32 h-32 mb-10 duration-1000'>

          </div>
          <div className='w-full flex justify-center items-center'>

            <input id="bet-input" onBlur={(e) => { e.target.value = parseInt(e.target.value) == NaN ? " " : parseInt(e.target.value) }} type="text" placeholder="bet" className="input input-bordered input-accent bet-input" />
            <button id="bet-button" className='btn btn-neutral ml-2' onClick={() => { Coinflip() }}>BET</button>
          </div>
        </div>
      </Route>
    </div >
  );
}

export default App;
