import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Container } from './NavBar'
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
// import Movies from './Movies'
import NoImg from '../images/NoImage.jpg'
import '../Styles/Videos.css'

function Trends() {
  const Api = `https://api.themoviedb.org/3`
  const {toggle, inputValue} = useContext(Container)
  const TrendsShown = '/trending/all/week'
  const input = inputValue
  const [trailer, setTrailer] = useState(true)
  const[trendTitle, setTrendTitle] = useState('')
  const [trendsArray, setTrendsArray] = useState([])
  const Images = 'https://image.tmdb.org/t/p/w500/'
  const Trends = async() => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params : {
        api_key: '2c33e841987bec12cf42a496bfb40a6c',
      }
    })
    const results =data.data.results
    setTrendsArray(results)
  }
  useEffect(() => {
    setTimeout(() => {
      Trends()
  }, 100);

  }, [input])
  const TrendTitle = (trend) => {
    setTrendTitle (trend.title)
    setTrailer(!trailer)
  }
  return (
    <Fragment>
        <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
            <div className='movies-container'>
            {trendsArray.map((trend) => {
              return(
                <Fragment>
                <div id={trailer ? 'container' : 'NoContainer'}>
                    <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TrendTitle(trend)} />
                    <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg} alt="" onClick={() => TrendTitle(trend)}/>
                    <h3 id='smaller-text' className={toggle ? 'mainColor' : 'secondaryColor'} >{trend.title}</h3>
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

export default Trends
