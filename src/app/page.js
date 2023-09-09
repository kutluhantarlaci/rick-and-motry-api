'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const urlApi = 'https://rickandmortyapi.com/api/character'


export default function Home() {

    const [character, setCharacter] = useState([])
    const [filter, setFilter] = useState({ page: 1 })
    const [loading, setLoading] = useState(false)

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

            <li key={`char_${char.id}`}>
                <Link href={`/character/${char.id}`}>
                    {char.id} {char.name}
                </Link>
            </li>
        )
    })

    if (loading) {
        return (<div>Loading...</div>)

    }

    return (
        <>
            <form>
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

            <ul className={'characters'}>
                {characterList}
            </ul>

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
        </>
    )
}