import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Marquee from "react-fast-marquee";
import Fade from 'react-reveal/Fade';
function App() {
  const [loader, setLoader] = useState(false); // Use boolean value, not string
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const encodedURL = encodeURIComponent(text);
  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${encodedURL}`);
      setLoader(false);
      setResult(res.data.result.full_short_link);
      console.log(result)
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClick = () => {
    fetchData();
    setText('');
  };

  return (
    <div className="App">
      <Fade>
      <h1>URL SHORTENER</h1>
      <input
        type="text"
        placeholder="Enter the link..."
        value={text}
        onChange={(e) => setText(e.target.value)} // Use onChange to update the state
      />
      <button onClick={handleClick}>Submit</button>

      {loader ? <p>Loading...</p> : <p className='shorted'>Shorted Link:  {result}</p>}

      <span className='nb'>NB: Not Supported For instagram url's</span>
      </Fade>
    </div>
  );
}

export default App;
