import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const StarshipsComponent = () => {

    const [starships, setStarships] = useState([]);
    const [page, setPage] = useState(1);

  
    const fetchStarshipDetails = async () => {
   
          const response = await fetch(`https://www.swapi.tech/api/starships?page=${page}`);
          const data = await response.json();

          const mappedStarships = await Promise.all(
              data.results.map(async (starship) => {
                  const detailResponse = await fetch(starship.url);
                  const detailData = await detailResponse.json();

                  return {
                      id: starship.uid,
                      name: detailData.result.properties.name,
                      model: detailData.result.properties.model,
                  };
              })
          );

          setStarships(mappedStarships);
     
    };

  
    const changeNumberPage = (action) => {
        action === 'increase' ? setPage(page + 1) : setPage(page - 1);
    };

  
    useEffect(() => {
        fetchStarshipDetails();
    }, [page]);

  
    return (
      <>
        <Navbar />
        
       <header className="font-Exo2 md:text-lg md:text-center mb-4 uppercase text-yellow-500"> - Starships List -</header>
            
       {starships.map((ship, index) => (
               
          <div className="w-90 md:w-3/4 mx-auto mb-4" key={index}>
           
           <Link  to={`/starships/${ship.id}`}>
              <div className='p-2  border-2 border-gray-300  rounded-md bg-gray-800 cursor-pointer hover:bg-gray-600'>
                  <h1 className=' text-sm md:text-md uppercase text-yellow-500 font-jedi-outline font-semibold'>{ship.name}</h1>
               <h3 className=' text-sm md:text-md text-white'>{ship.model}</h3>
              </div>
           </Link>
                    
          </div>
       ))}
               
        <div className="flex justify-around content-center">
            <button
              className="w-28 rounded-lg border-2 text-zinc-400 border-zinc-400 hover:text-yellow-500 hover:border-yellow-500 p-3 m-5 "
              onClick={() => changeNumberPage("decrease")}
            >
              go back
            </button>
                    
            <button
              className="w-28 rounded-lg border-2 text-zinc-400 border-zinc-400 hover:text-yellow-500 hover:border-yellow-500 p-3 m-5 border-1"
              onClick={() => changeNumberPage("increase")}
            >
              view more
            </button>
        </div>
        
    </>
  )
}

export default StarshipsComponent