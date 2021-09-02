import React, { useState, useEffect } from 'react';

// data 
import { fetchPictures } from './lib/api';

// components
import DogCardInfo from './components/DogCardInfo';
import BreedList from './components/BreedList';

// styles
import './App.css';

function App() {
  const [pictures, setPictures] = useState([]);
  const [selectedBreedId, setSelectedBreedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPictures = async () => {
      if (selectedBreedId !== '') {
        setIsLoading(loading => !loading);
        const fetchedPictures = await fetchPictures(selectedBreedId, 20);
        setPictures(fetchedPictures);
        setIsLoading(loading => !loading);
      }
    };

    loadPictures();
  }, [selectedBreedId]);

  return (
    <div className='container'>
      <header className='section has-text-centered'>
        <h1 className='title is-size-3 has-text-primary'>
          Search for pictures of good doggos
        </h1>
        <p>Filter by breed for more choice!</p>
      </header>
      <hr />
      <div className='columns section is-multiline'>
        <div className='column is-one-quarter'>
          <h2 className='title is-size-4 has-text-info'>Search by breed</h2>
          <BreedList
            dispatchBreedChange={breedId => setSelectedBreedId(breedId)}
          />
        </div>
        <div className='column'>
          <div className='columns is-multiline'>
            {isLoading && (
              <progress className='progress is-medium is-link' max='100'>
                60%
              </progress>
            )}
            {!isLoading &&
              pictures.map(picture => (
                <div className='column is-one-quarter' key={picture.id}>
                  <DogCardInfo imgUrl={picture.url} pictureId={picture.id} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
