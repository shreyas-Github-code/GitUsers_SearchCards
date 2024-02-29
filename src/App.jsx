import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [search, setsearch] = useState('');
  const [finalsearch, setfinalsearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
     if(finalsearch===''){
      const response = await fetch(`https://api.github.com/users`);
      const data = await response.json();
     
   
      setData(data);
     }
     else{
      const response = await fetch(`https://api.github.com/users/${finalsearch}`);
      const data = await response.json();
      const arr=[];
      arr.push(data);
      setData(arr);
     }
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    console.log(finalsearch);
    fetchData();
  }, [finalsearch]);

  function handleSearchChange(e){
      setsearch(e.target.value);
      
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search your query"
         
          value={search}
          onChange={handleSearchChange} // Use handleSearchChange for onChange event
        />
        <button
         
          onClick={() => setfinalsearch(search)} // Use setSearchQuery directly on button click
        >
          Search
        </button>
      </div>

        {data.length !== 0 ? (
          <div className="user-list">
            {data.map((user) => (
              <div className="user-card" key={user.id}>
                <img src={user?.avatar_url} alt="" />
                <div>
                  <h5>{user?.login}</h5>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No users available</p>
        )}
      </header>
    </div>
  );
}

export default App;
