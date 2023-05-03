import { useQuery } from "react-query";
import Character from "./Character";
import { useState } from "react";

const Characters = () => {
   const [page, setPage] = useState(1);
   const fetchCharacters = async ({ queryKey }) => {
      const response = await fetch(
         `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
      );
      return await response.json();
   };

   const { data, isLoading, isError } = useQuery(
      ["characters", page],
      fetchCharacters,
      {
         keepPreviousData: true,
      }
   );

   if (isLoading) return <div>Loading...</div>;
   if (isError) return <div>error</div>;

   return (
      <div className="characters">
         {data.results.map((char) => (
            <Character character={char} key={char.id} />
         ))}
         <div>
            <button
               disabled={page === 1}
               onClick={() => setPage((old) => old - 1)}
            >
               Previous
            </button>
            <button
               disabled={!data.info.next}
               onClick={() => setPage((old) => old + 1)}
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default Characters;
