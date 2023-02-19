import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {AiFillPlayCircle} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import NoImg from '../images/NoImage.jpg'
import { Container } from './NavBar'
import '../Styles/Videos.css'

function TvShows() {
  const {toggle, inputValue} = useContext(Container)
  const [showData, setShowData] = useState([])
  const   [trailer, setTrailer] = useState(true)
  const input = inputValue
  const Shown = input ? 'search' : 'discover'
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`
  const Images = 'https://image.tmdb.org/t/p/w500/'
 const [title, setTitle] = useState('')
  const TvShows = async () => {
      const data = await axios.get(Api, {
      params: {
          api_key: '2c33e841987bec12cf42a496bfb40a6c',
          query: input
      }
    })
    const results = (data.data.results)
    setShowData(results)
  }

  useEffect(() =>{
    setTimeout(() => {
      TvShows()
  }, 100)
  }, [input])

  console.log(showData)
  const TvShowTitle = (shows) => {
    setTitle(shows.name)
    setTrailer(!trailer)
  }
  return (
    <Fragment >
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
       <div className='movies-container'>

      {showData.map((shows) => {
        return (
            <Fragment key={shows.id}>
                <div id={ trailer ? 'container' : 'NoContainer'}>
                  <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TvShowTitle(shows)} />
                  <img src={shows.poster_path ? `${Images}${shows.poster_path}` : NoImg} alt="" onClick={() => TvShowTitle(shows)} />
                  <h3 id={shows.name.length > 28 ? 'smaller-text' : '' } className={toggle ? 'mainColor' : 'secondaryColor'}>{shows.name}</h3>
                </div>
            </Fragment>
        )
      })}
      <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} cursor={'pointer'} fontSize={55} color='#fff'  onClick={() => setTrailer(true)}/>
        </div> 
      </div> 
    </Fragment>
    )
}

export default TvShows
