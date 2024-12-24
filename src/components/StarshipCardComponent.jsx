/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Pilots from './Pilots'

const StarshipCardComponent = () => {
    const params = useParams()
    const [info, setInfo] = useState({})
    const id = params.shipId
   
    async function shipInfo() {
        const request = await fetch(`https://swapi.tech/api/starships/${id}`)
        const data = await request.json()
        console.log(data.result.properties)
        setInfo(data.result.properties)
    }

    useEffect(() => {
        shipInfo()
    },[])

    return (
        <>
            <Link to= {'/starships'}>
              <button className="w-20 md:w-40 py-2 text-zinc-400 text-center text-xs md:text-sm  mb-6 md:mt-10  border-2 border-zinc-400 rounded-md hover:text-yellow-500 hover:border-yellow-500 cursor-pointer">Go Back</button>
            </Link>
       
     
            <div className='flex flex-col md:flex-row p-4 md:p-8 border-2 border-gray-300 rounded-md bg-gray-800 cursor-pointer'>
                <div>
                    <h1 className='text-md md:text-2xl uppercase text-center text-yellow-500 font-jedi-outline font-semibold p-4 md:pb-6'>{info.name}</h1>

                    <img src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`} alt="image"
                        className="w-50 h-auto rounded-md border-4 border-yellow-500 "
                        onError={(e) => (e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")}
                    />
                </div>

                <div className='text-sm md:text-lg text-yellow-500 font-jedi-outline mt-4 md:mt-16 md:pt-6 md:ml-6'>
                    <p>- Model: <span className="font-normal text-white pb-6'">{info.model}</span></p>
                    <p>- Cost in credits:<span className="font-normal text-white pb-6'"> {info.cost_in_credits} </span></p>
                    <p>- Atmospheric speed:<span className="font-normal text-white pb-6'"> {info.max_atmosphering_speed} </span></p>
                    <p>- Manufacturer: <span className="font-normal text-white pb-6'"> {info.manufacturer}</span></p>
                    <p>- Lenght: <span className="font-normal text-white pb-6'">{info.length} </span></p>
                    <p>- Crew:<span className="font-normal text-white pb-6'"> {info.crew}</span></p>
                </div>
               
            </div>
            
            
            <div className="text-white mt-10 flex flex-col">
                {info.pilots && info.pilots.length > 0
                    ? <Pilots starshipPilots={info.pilots} />
                    : "There are no related pilots for this starship."}
            </div>
           
        </>
    )
}

export default StarshipCardComponent