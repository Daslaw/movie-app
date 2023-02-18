import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import "../Styles/Videos.css"
import {AiFillPlayCircle} from 'react-icons/ai'
import { Container } from './NavBar'
import NoImg from '../images/NoImage.jpg'
function Movies() {
    const {toggle} = useContext(Container)
    const [moviesData, setMoviesData] = useState([])
    const [trailer, setTrailer] = useState(true)
    const Api = "https://api.themoviedb.org/3/discover/movie"
    const Images = 'https://image.tmdb.org/t/p/w500/'

    const MovieCall = async () => {
        const data = await axios.get(Api, {
            params : {
                api_key: '2c33e841987bec12cf42a496bfb40a6c',
            }
        })
        const results = data.data.results
        setMoviesData(results)
    }
    useEffect(() => {
        MovieCall()
    }, [])
  return (
    <Fragment>
        <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
            <div className='movies-container'>
                {moviesData.map((movie) => {
                return(
                <Fragment>
                    <div id={trailer ? 'container' : 'NoContainer'}>
                        <AiFillPlayCircle color='#fff' fontSize={40} id="playIcon"/>
                    <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt="" />
                        <h3 id={movie.title.length > 28 ? 'smaller-text' : ''}>{movie.title}</h3>
                    </div>
                </Fragment>
        )
    } )}
    </div>
</div>

    </Fragment>
  )
}

export default Movies
