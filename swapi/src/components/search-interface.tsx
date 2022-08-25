import { useState } from "react";
import { findCharacters } from "../api/find-characters";
import { TFilmResult, TPerson } from "../types/types";
import { RenderCharacterData } from "./render-characters-data";
import { RenderMoviesData } from "./render-movies-data";
import "../styles/search-interface.css";

export type TMoviesData =
  | {
      type: "initial";
    }
  | {
      type: "loading";
    }
  | {
      type: "loaded";
      movies: TFilmResult[];
      characterName: string;
    }
  | {
      type: "error";
      errorMessage: string;
    };

type TCharactersData =
  | {
      type: "initial";
    }
  | {
      type: "loading";
    }
  | {
      type: "loaded";
      characters: TPerson[];
    }
  | {
      type: "error";
      errorMessage: string;
    };

export const SearchInterface = () => {
  const [searchText, setSearchText] = useState("");
  const [characters, setCharacters] = useState<TCharactersData>({
    type: "initial",
  });
  const [movies, setMovies] = useState<TMoviesData>({ type: "initial" });

  const handleChange = (value: string) => {
    setMovies({ type: "initial" });
    setCharacters({ type: "initial" });
    setSearchText(value);
  };

  const handleSearch = async () => {
    setMovies({ type: "initial" });
    setCharacters({ type: "loading" });

    try {
      setCharacters({
        type: "loaded",
        characters: await findCharacters(searchText),
      });
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;

      setCharacters({
        type: "error",
        errorMessage: message,
      });
    }
  };

  const handleSetMovies = (moviesData: TMoviesData) => {
    setMovies(moviesData);
  };

  return (
    <div className="App">
      <h3 className="Header">Find Star Wars characters</h3>
      <div>
        <input
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type character full name, Homeworld name or Homeworld population"
        ></input>
      </div>
      <button onClick={handleSearch}>
        use the force to find what you are looking for
      </button>
      {characters.type === "loading" && (
        <h5 className="SideInfo">Loading...</h5>
      )}
      {characters.type === "error" && (
        <h5 className="SideInfo">{characters.errorMessage}</h5>
      )}
      {characters.type === "loaded" && (
        <div>
          <h4 className="SideInfo">
            List of characters matching the given criteria:
          </h4>
          <h6 className="SideInfo">
            (click on a name to see a list of movies with a given character):
          </h6>
          {characters.characters.map((character, index) => (
            <RenderCharacterData
              key={index}
              character={character}
              handleSetMovies={handleSetMovies}
            />
          ))}
        </div>
      )}
      <div>
        {movies.type === "loading" && <h5 className="SideInfo">Loading...</h5>}
        {movies.type === "loaded" && (
          <div>
            <h4 className="SideInfo">
              List of movies with {movies.characterName}:
            </h4>
            {movies.movies.map((movie, index) => (
              <RenderMoviesData key={index} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
