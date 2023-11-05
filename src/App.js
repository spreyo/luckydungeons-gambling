import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar';
import { Route } from "wouter";

function App() {
  return (
    <div className="App">
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
        <form className='w-screen h-screen flex flex-col justify-center items-center gap-4 m-auto' onSubmit={(e) => { e.preventDefault() }}>

          <div className='w-full max-w-xs gap-4 flex flex-col justify-center items-center' >
            <input id="login-username" className='input input-bordered input-primary join-item' placeholder='username' />
            <input id="login-token" type="password" className='input input-bordered join-item' placeholder='token' />
            <button className='btn btn-primary join-item rounder-r full' onClick={() => {
              const username = document.getElementById("login-username");
              const token = document.getElementById("login-token");
              fetch(`https://luckydungeons-api.vercel.app/login?username=${username}`, { method: "GET" }).then(res => res.json().then(result => {
                console.log(result);
              }))
            }}>submit</button>
          </div>
        </form>
      </Route>
    </div>
  );
}

export default App;
