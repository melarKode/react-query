import React from 'react'
import {useQuery} from 'react-query';
import Planet from './Planet';

const fetchPlanets = async()=>{
    const res = await fetch('http://swapi.dev/api/planets/');
    return res.json();
}

export default function Planets() {
    const {data, status} = useQuery('planets', fetchPlanets, {
        staleTime:0,
        onSuccess: ()=>{
            console.log('Data fetched with no problem')
        }
    });
    console.log(data)
    return (
        <div>
            <h2>Planets</h2>
            {/* <p>{ status }</p> */}
            {status==="loading" && (
                <div>
                    Loading Data
                </div>
            )}
            {status==="error" && (
                <div>
                    Error Fetching Data
                </div>
            )}
            {status==="success" && (
                <div>
                    {
                        data.results.map(planet=><Planet key={planet.name} planet={planet}/>)
                    }
                </div>
            )}
        </div>
    )
}
