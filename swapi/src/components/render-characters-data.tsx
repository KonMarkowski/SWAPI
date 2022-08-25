import { findMoviesByPerson } from "../api/find-movies";
import { TPerson } from "../types/types";
import { TMoviesData } from "./search-interface";

interface RenderCharactersDataProps {
  character: TPerson;
  handleSetMovies: (moviesData: TMoviesData) => void;
}

export const RenderCharacterData: React.FC<RenderCharactersDataProps> = ({
  character,
  handleSetMovies,
}) => {
  const handleFindMoviesByCharacter = async (character: TPerson) => {
    handleSetMovies({ type: "loading" });
    try {
      const movies = await findMoviesByPerson(character);
      handleSetMovies({
        type: "loaded",
        movies,
        characterName: character.name,
      });
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;

      handleSetMovies({
        type: "error",
        errorMessage: message,
      });
    }
  };

  return (
    <h2
      className="CharacterName"
      onClick={() => handleFindMoviesByCharacter(character)}
    >
      {character.name}
    </h2>
  );
};
