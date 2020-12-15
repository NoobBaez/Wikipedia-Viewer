import { useState } from 'react';
import axios from 'axios';
import Logo from './logo.png';
import './App.css';


const Article = ({ data }) => {
  return (
    <div className="article">
      <div className="title"><a href={`http://en.wikipedia.org/?curid=${data.pageid}`}>{data.title}</a></div>
      <div className="snippet"> <div className="content" dangerouslySetInnerHTML={{ __html: data.snippet }}></div></div>
      <div className="url">{`http://en.wikipedia.org/?curid=${data.pageid}`}</div>
    </div>
  );
};

const App = () => {

  const [input, setInput] = useState();
  const [search, setSearch] = useState([]);

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault()
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${input}`).then(response => {
      if (!response.error) {
        setSearch(response.data.query.search);
      };
    });
  };

  const handleRandom = event => {
    event.preventDefault()
    window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
  };

  return (
    <div id="main">
      <div id="logo">
        <img src={Logo} alt="Wikipedia Viewer Logo"></img>
      </div>
      <form>
        <input onChange={handleChange} id="search-box"></input>
        <div id="action-buttons">
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleRandom}>Random</button>
        </div>
      </form>

      <ul>
        {
          search.map((data, index) => {
            return <Article key={index} data={data} />
          })
        }
      </ul>

      <footer>By <a href="https://twitter.com/HanielBaez">Haniel Baez</a></footer>
    </div>
  );
};

export default App;