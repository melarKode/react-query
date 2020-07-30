import React, {useState} from 'react'
import {useQuery} from 'react-query';
import Planet from './Planet';

const fetchPlanets = async(key, greeting,page)=>{
    console.log(greeting);
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

export default function Planets() {
    const [page, setPage] = useState(1)
    const {data, status} = useQuery(['planets','hello, ninjas', page], fetchPlanets, {
        staleTime:0,
        onSuccess: ()=>{
            console.log('Data fetched with no problem')
        }
    });
    console.log(data)
    return (
        <div>
            <h2>Planets</h2>
            <button onClick={()=>{setPage(1)}}>Page 1</button>
            <button onClick={()=>{setPage(2)}}>Page 2</button>
            <button onClick={()=>{setPage(3)}}>Page 3</button>
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
