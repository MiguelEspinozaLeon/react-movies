import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'
import moviesResults from './mocks/movies.json'

function App() {
  const [query, setQuery] = useState('');
  const [movieWord, setMovieWord] = useState('');
 
  
  const movies = moviesResults.Search;

  const filteredMovies = query != '' ? movies.filter((movie)=>
  movie.Title.toLowerCase().includes(query.toLowerCase())
  || movie.Year.includes(query)
  ) : movies; 

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const url = 'https://www.omdbapi.com/?s=' + movieWord + '&apikey=e6447a34'; 
      fetch(url)
        .then((response)=>response.json())
        .then((data)=>console.log(data))
    
  }

  
    /*useEffect(()=>{
      const url = 'https://www.omdbapi.com/?s=' + movieWord + '&apikey=e6447a34'; 
      fetch(url)
        .then((response)=>response.json())
        .then((data)=>console.log(data))
    },[movieWord]) */
  
  return (
    <>
      <main>
        <div className='container flex flex-col items-center gap-4'>
          <div>
              <form onSubmit={handleSubmit} action="">
                  <input className='border-2 border-black' onChange={(event)=>{setMovieWord(event.target.value)}} placeholder='Get all movies that have this word...' type="text" />
                  <button type='submit'>Search</button>
              </form>
          </div>
          <div>
                <input placeholder='Search by title or release year...' className='border-2 border-black p-4' onChange={(event)=>{setQuery(event.target.value)}} type="text" /> 
          </div>
          
            {filteredMovies.map((movie: any)=>(
              <ul key={movie.imdbID}>
                  <li className='flex flex-col items-center' key={movie.imdbID}>
                    <h2 className='text-2xl text-slate-700 font-bold'>{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    <img className='w-[50%] border-2 border-black rounded-xl' src={movie.Poster} alt={movie.Title} />
                  </li>
              </ul>
            ))}
        </div>
      </main>


      
    </>
  )
}

export default App
