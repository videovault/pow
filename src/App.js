import React from 'react';
import logo from './logo.svg';
import './App.css';

import { createPow } from "@textile/powergate-client"

function App() {
  
  const host = "http://0.0.0.0:6002" // or whatever powergate instance you want

  const pow = createPow({ host })
  
  const noAuthApi = async () =>  await pow.health.check()
    .then(results=> {console.log("status",results.status) 
    console.log("messageList",results.messageList)} )
 

  const peersList  = async () => await pow.net.peers() 
    .then(results=> console.log("peersList",results.peersList))

  noAuthApi()
  peersList()
  

  const FFSinstance = async () => await pow.ffs.create()
  .then(results=> {
    const authToken = results.token
    pow.setToken(authToken)
    console.log(authToken)
    console.log("FFS instance id", results.id)
    console.log("FFS instance token", results.token)
  }) // save this token for later use!
  
  FFSinstance()


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          FFS instance created. Check console
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
