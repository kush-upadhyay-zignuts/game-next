"use client"

import { useState } from "react";
import useGameInfo from "./Hooks/useGameInfo";
import GameCard from "./components/gameCard";

function App() {
  const [platformFilter, setPlatformFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isSuggestion,setIsSuggestion] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null);
  const { loading, error, data } = useGameInfo();
  const platforms = [];
  const titles = [];

  setTimeout(() => {
    const filterBtn = document.querySelector('#filter-btn');

    filterBtn.addEventListener('change', () => {
      const selectedPlatform = filterBtn.value;
      setPlatformFilter(selectedPlatform);
    })

  }, 1000)

  for (let game of data) {
    if (!platforms.includes(game.platform)) platforms.push(game.platform);
    if (!titles.includes(game.title)) titles.push(game.title);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPlatformFilter("All");
    setIsSuggestion(true); 
  
    if (value) {
      const suggestions = data.slice(1).filter((game) =>
        game.title.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
      setIsSuggestion(false);
      setSelectedGame(null);
    }
  };


  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setSelectedGame(suggestion); 
    setFilteredSuggestions([]);
    setIsSuggestion(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <p>
      Something went wrong: <br />
      {error}
    </p>
  );
  return (
    <>
      <div className="w-full sm:w-9/12 mx-auto lg:w-full flex flex-col items-center justify-center gap-y-2 my-3 mt-5 px-7">
        <input
          type="text"
          value={query}
          placeholder="Search a game by Title"
          onChange={handleInputChange}
          name="searchInput"
          id="search-btn"
          className="w-full md:w-fit lg:w-96 text-start px-4 py-2 border-2 border-black placeholder-black rounded-full"
        />
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          <div      style={isSuggestion ? {
            padding: "10px",
            cursor: "pointer",
            width:"30rem",
            height:"auto",
            position:"absolute"
            ,left:"730px",
            border:"2px solid black",
            backgroundColor:"#fff",
            zIndex:"6"
          } : { padding: "10px",
            cursor: "pointer",
            width:"30rem",
            height:"auto",
            position:"absolute"
            ,left:"730px",
            border:"2px solid black",
            backgroundColor:"#fff",
            display:"none"
          }}>
            {filteredSuggestions.length === 0 && "No Item Found"  }
          {filteredSuggestions.map((suggestion, index) => (

            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              {suggestion.title  }
            </li>

))}
</div>
        </ul>
        <div className="flex items-center gap-x-2">
          <label htmlFor="filter-btn" className="font-medium text-sm text-gray-600">Filter by Platform:</label>
          <select
            name="filter-btn"
            id="filter-btn"
            className="w-fit h-fit border-none text-black bg-gray-300 rounded-md py-1 pl-2 cursor-pointer"
            defaultValue={"All"}
          >
            <option
              value="All"
            >
              All
            </option>
            {
              platforms.slice(1).map((platform) => (
                <option
                  key={platform}
                  value={platform}
                >
                  {platform}  
                </option>
              ))
            }

          </select>
        </div>
      </div>

      <main className="w-full sm:w-9/12 sm:mx-auto md:w-fit md:justify-center flex flex-wrap gap-3 px-7 my-10">
        {
 

         data.slice(1)
  .filter((game) =>
    (platformFilter == "All" || game.platform == platformFilter) &&
    (!selectedGame || game.title === selectedGame.title)  

  )
         .map((game, index) => (
           <>
             <GameCard
               key={index}
               gameTitle={game.title}
               gamePlatform={game.platform}
               gameScore={game.score}
               gameGenre={game.genre}
               editors_choice={game.editors_choice}
             />
           </>
         ))
        }
        <GameCard />
      </main>
    </>
  );
}

export default App;