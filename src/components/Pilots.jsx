/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Pilots = ({ starshipPilots }) => {
  const [pilotList, setPilotList] = useState([]);

  useEffect(() => {
    const fetchPilots = async () => {
     
        const promises = starshipPilots.map(async (pilotUrl) => {
          const response = await fetch(pilotUrl);
          const data = await response.json();

          if (data.result && data.result.properties) {
            const properties = data.result.properties;

            return {
              ...properties,
              id: data.result.uid,
              imageUrl: `https://starwars-visualguide.com/assets/img/characters/${data.result.uid}.jpg`,
            };
          } 
        });

        const pilotsData = await Promise.all(promises);
        setPilotList(pilotsData);
      
    };
    if (starshipPilots && starshipPilots.length > 0) {
      fetchPilots();
    }
  }, [starshipPilots]);


  return (
      <>
        <h2 className='w-full mx-auto border-t border-b border-1 mt-10 md:mt-20 mb-10 md:mb-20 text-md md:text-2xl text-center uppercase'>Pilots</h2>

          <div className='md:flex md:flex-wrap md:gap-1'>
            {pilotList.map((pilot, index) => (
            
                <div className='flex flex-col md:w-1/5 mx-16 md:mx-auto p-6 md:p-4 m-6 md:m-2  border-2 border-yellow-500  rounded-md bg-gray-700 cursor-pointer' key={index}>
                        
                    <h1 className='text-md md:text-2xl text-yellow-500 font-jedi-outline mb-2 font-semibold'>
                    {pilot.name}</h1>
                        
                    <div>
                        <img src={pilot.imageUrl} alt={pilot.name} className='md:w-50 border-4 border-gray-200 rounded-md mx-auto'/>
                    </div>
                    
                    <div className='mt-2 text-sm md:text-lg text-yellow-500'>
                        <p className='font-jedi-outline '>- Height:<span className="font-normal text-white pr-2 pb-6'"> {pilot.height}</span> </p>
                        
                        <p className='font-jedi-outline '>- Mass: <span className="font-normal text-white pr-2 pb-6'"> {pilot.mass}</span></p>

                        <p className='font-jedi-outline '>- Gender: <span className="font-normal text-white pr-2 pb-6'">{pilot.gender}</span></p>
                    </div>
                    
                </div>
                
            ))}
          </div>    
     </>
  );
};

export default Pilots;



