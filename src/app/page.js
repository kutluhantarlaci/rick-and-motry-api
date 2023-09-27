'use client'
import Header from '@/components/Header'
import Topside from '@/components/Topside'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const urlApi = 'https://rickandmortyapi.com/api/character'


export default function Home() {

    const [character, setCharacter] = useState([])
    const [filter, setFilter] = useState({ page: 1 })
    const [loading, setLoading] = useState(true)

    function getCharacters() {
        setCharacter([])
        setLoading(true)
        let endPoint = urlApi

        let myFilter = filter
        if (myFilter.gender === 'all') {
            delete myFilter['gender']
        }
        if (myFilter.status === 'all') {
            delete myFilter['status']
        }

        let filters = new URLSearchParams(myFilter).toString()

        if (filters) {
            endPoint += `?${filters}`
        }

        fetch(`${endPoint}`)
            .then((resp) => resp.json())
            .then((resp) => {
                setCharacter(resp.results)
                setLoading(false)

            })
            .catch((e) => {
                console.log('error', e)
            })
    }

    useEffect(() => {
        getCharacters()
    }, [filter])

    const characterList = character.map(char => {
        return (

           /*<li key={`char_${char.id}`}>
                <Link href={`/character/${char.id}`}>
                    {char.id} {char.name}
                </Link>
            </li>

            */



          <div className={'card'}>
                <img src={char.image}/>
                <div className={'character-info'}>
                    <Link href={`/character/${char.id}`} className={'name'}>
                        {char.name}
                    </Link>
                    <ul>
                        <li>{char.status} - {char.species}</li>
                        <li>
                            <span className={'bold'}>Gender: </span>
                            <span className={'low-op'}> {char.gender}</span>
                        </li>
                        <li>
                            <span className={'bold'}>Origin: </span>
                            <span className={'low-op'}>{char.origin.name}</span>
                        </li>
                    </ul>
                </div>
            </div>




        )

        
        
        

        
    })

    if (loading) {
        return (<div>Loading...</div>)

    }

    return (
        <div className={'container'}>
            <Header/>
            <Topside/>
            <div className={'form-pagination'}>
                <div className={'pagination'}>
                    <button onClick={() => {
                        setFilter({
                            ...filter,
                            page: filter.page > 1 ? filter.page - 1 : 42
                        })
                    }}>Prev</button >

                    <div>{filter.page}</div>

                    <button onClick={() => {
                        setFilter({
                            ...filter,
                            page: filter.page < 42 ? filter.page + 1 : 1
                        })
                    }}>Next</button>
                </div>
                <form className={'form'}>
                    <select
                        defaultValue={filter.status}
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                status: e.target.value
                            })
                        }}>
                        <option value='all'>All Status</option>
                        <option value='dead'>Dead</option>
                        <option value='alive'>Alive</option>
                        <option value='unknown'>Unknown</option>

                    </select>
                    <select
                        defaultValue={filter.gender}
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                gender: e.target.value
                            })
                        }}>
                        <option value='all'>All Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='unknown'>Unknown</option>

                    </select>
                </form>
            </div>
            <div className={'botside'}>
                    {characterList}
            </div>

        </div>
    )
}