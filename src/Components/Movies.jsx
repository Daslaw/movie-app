import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import "../Styles/Videos.css"
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import { Container } from './NavBar'
import NoImg from '../images/NoImage.jpg'
import TrailerMovies from '../Trailers/TrailerMovies'
function Movies() {
    const {toggle, inputValue} = useContext(Container)
    const input = inputValue
    const [moviesData, setMoviesData] = useState([])
    const [trailer, setTrailer] = useState(true)
    const Shown = input ? 'search' : 'discover'
    const [movieTitle, setMovieTitle] = useState('')
    const Api = `https://api.themoviedb.org/3/${Shown}/movie`
    const Images = 'https://image.tmdb.org/t/p/w500/'

    const MovieCall = async () => {
        const data = await axios.get(Api, {
            params : {
                api_key: '2c33e841987bec12cf42a496bfb40a6c',
                query: input
            }
        })
        const results = data.data.results
        setMoviesData(results)
    }
    useEffect(() => {   
        setTimeout(() => {
            MovieCall()
        }, 100);
    }, [input])
    const MoviesTitle = (movie) => {
        setMovieTitle(movie.title)
        setTrailer(!trailer)
    }
  return (
    <Fragment>
        <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
            <div className='movies-container'>
                {moviesData.map((movie) => {
                return(
                <Fragment>
                    <div id={trailer ? 'container' : 'NoContainer'}>
                        <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : 'hide'} onClick={() => MoviesTitle(movie)}/>
                    <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt="" onClick={() => MoviesTitle(movie)}/>
                        <h3 id={movie.title.length > 28 ? 'smaller-text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'} >{movie.title}</h3>
                    </div>
                </Fragment>
        )
    } )}
    {trailer ? console.log :  <TrailerMovies moviesTitle={movieTitle} toggle={toggle}/>   }
            <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} cursor={'pointer'} fontSize={55} color='#fff'  onClick={() => setTrailer(true)}/>
        </div>
    </div>

    </Fragment>
  )
}

export default Movies
