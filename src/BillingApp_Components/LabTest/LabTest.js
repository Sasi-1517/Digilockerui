import React from 'react';
import "../CardDetails.css";

class App extends React.Component {
  render = () => {
    return (
      <div className="card2">
        <div className="header">
          <div className="logo">
            <a href=".">LAB TEST</a>
          </div>
         
        </div>
        <div className="content">
          <div className="title-holder">
            <h1>Get ready for the change.</h1>
            <p>Website coming soon. Please check back to know more. Shoot us an email if you're curious.</p>
          </div>
          <a >
            <div className="cta">Send us an email</div>
          </a>
        </div>
        <div className="footer">
          <span>made by <a className="underlined"  target="_blank" rel="noopener noreferrer">TEST</a> using <a className="underlined" href="https://reactjs.org/" title="ReactJS" target="_blank" rel="noopener noreferrer">React</a> | <a className="underlined" href="" title="GitHub repo" target="_blank" rel="noopener noreferrer">GitHub</a></span>
        </div>
      </div>
    );
  }
}

export default App;