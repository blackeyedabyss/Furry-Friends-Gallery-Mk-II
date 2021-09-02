import React, { useEffect, useState } from 'react';
import { fetchBreeds } from '../lib/api';

export default ({ dispatchBreedChange }) => {
    const [value, setValue] = useState('');
    const [breeds, setBreeds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleChange = e => {
        setValue(e.target.value);
    
        if(dispatchBreedChange) {
            dispatchBreedChange(e.target.value);
        }
    };

    const handlePageClick = newPageNumber => {
        if(newPageNumber < 0 || newPageNumber >= totalPages) {
            return;
        }
      
        setCurrentPage(newPageNumber);
    };

    useEffect(() => {
        const loadBreeds = async () => {
            setIsLoading(loading => !loading);
            const breedsData = await fetchBreeds(currentPage, 15);
            setBreeds(breedsData.breeds);
            setTotalPages(parseInt(Math.ceil(breedsData.totalBreeds / 15),10));
            setIsLoading(loading => !loading);
          };
      
          loadBreeds();
    }, [currentPage]);

    return (
        <>
            {isLoading && (
                <progress className='progress is-medium is-link' max='100'>
                    60%
                </progress>
            )}
             {
                !isLoading && (
                    <>
                    <div className='field breed-list'>
                        <div className='control'>
                        {breeds.map(breed => (
                            <label className='radio' key={breed.id}>
                                <input type="radio" name="breed" checked={value === breed.id.toString()} value={breed.id} onChange={handleChange} />
                                {breed.name}
                            </label>
                        ))}
                        </div>
                    </div>
                    <br />
                    <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
                        <a className="pagination-previous" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage <= 0}>
                        Previous
                        </a>
                        <a className="pagination-previous" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage + 1 >= totalPages}>
                        Next page
                        </a>
                    </nav>
                    </>
                )
                }
        </>
    );
};

