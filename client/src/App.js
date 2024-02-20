import Container from './components/Container';
import './style.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Result from './components/Result';


function App() {

  const [data, setData] = useState([])
  const [dbData, setDbData] = useState(null);
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [err, setErr] = useState(null);

  const getSpecificData = async (country, zipcode) => {
    try {
      const res = await axios.get(`http://localhost:8080/${country}/${zipcode}`)
      setDbData(res.data)
      setErr(null);
    } catch (err) {
      setErr(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/data`)
        setData(res.data)
      } catch (err) {
        setErr(err)
      }
    }
    fetchData();
  }, [])


  return (
    <div className="App">
      <div className="header">
        <h1>Printec Task</h1>
      </div>
      <div className='inputs'>
        <label for="input1">Country</label>
        <input type="text" id="input1" name="input1" placeholder="Example: us" onChange={e => setCountry(e.target.value)}></input>
        <label for="input2">Zipcode</label>
        <input type="text" id="input2" name="input2" placeholder="Example: 90210" onChange={e => setZipcode(e.target.value)}></input>
        <button onClick={() => { getSpecificData(country, zipcode) }}>Submit</button>
      </div>
      {dbData&&!err&&<Result dbData={dbData}/>}
      {err&&<p className='error-container'>Invalid inputs!</p>}
      <div className='container'>
        <Container data={data} />
      </div>
    </div>
  );
}

export default App;
