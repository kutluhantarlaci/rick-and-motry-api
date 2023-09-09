'use client';
import { useState, useEffect } from 'react';

export default function CharacterDetail({ params: { characterId } }) {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);

  function getSingleCharacter() {
    console.log('istek atılıyor..');
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setCharacter(resp);
        setLoading(false);
        console.log('istek atıldı');
      });
  }
  useEffect(() => {
    getSingleCharacter();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>{characterId}. Character's Details Page</div>
      <img src={character.image} />
      <div>{character.name}</div>
      <div>{character.gender}</div>
      <div>{character.species}</div>
      <div>{character.origin.name}</div>
    </>
  );
}
