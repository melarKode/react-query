import React, {useState} from 'react'
import {usePaginatedQuery} from 'react-query';
import Planet from './Planet';

const fetchPlanets = async(key,page)=>{
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

export default function Planets() {
    const [page, setPage] = useState(1)
    const {resolvedData,latestData, status} = usePaginatedQuery(['planets',page], fetchPlanets, {
        staleTime:0,
        onSuccess: ()=>{
            console.log('Data fetched with no problem')
        }
    });
    return (
        <div>
            <h2>Planets</h2>
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
                <>
                <button
                    onClick={()=>setPage(old=>Math.max(old-1, 1))}
                    disabled = {page===1}
                >Previous Page</button>
                <span>{page}</span>
                <button
                    onClick={()=>setPage(old=>(!latestData || !latestData.next ? old:old+1))}
                    disabled = {!latestData||!latestData.next}
                >Next Page</button>
                <div>
                    {
                        resolvedData.results.map(planet=><Planet key={planet.name} planet={planet}/>)
                    }
                </div>
                </>
            )}
        </div>
    )
}
