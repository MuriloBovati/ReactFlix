import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/movieRow/MovieRow';
import FilmeDestaque from './components/FeaturedMovie/FilmeDestaque';
import Header from './components/Header/Header';

function App() {

  const [movieList, setmovieList] = useState([])
  const [destaqueData, setDestaqueData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
    const loadAll = async () => {
      //Pegando a lista Total
      let list = await Tmdb.getHomeList()
      setmovieList(list)

      //Pegando Filme Destaque
      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv')

      console.log(chosenInfo)
      setDestaqueData(chosenInfo)
    }
    loadAll()
  },[])

  useEffect(()=>{
    const scrollListner = () =>{
      if(window.scrollY > 10) {
        setBlackHeader(true)
      }
      else
      (setBlackHeader(false))
    }

    window.addEventListener('scroll', scrollListner)
    return () => {
      window.removeEventListener('scroll', scrollListner)
    }
  })


  return (
    <div className='page'>

      <Header black={blackHeader}/>
      {destaqueData &&
        <FilmeDestaque item={destaqueData}/>
      }
      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow 
          key={key}
          title={item.title}
          items={item.items}
          />
        ))}
      </section>
      <footer>
        Feito com <span role='img' aria-label='coracao'>❤️</span> Pela B7web<br/> 
        Direitos de imagem para Netflix: <a href='https://www.netflix.com/'>Netflix</a><br/>
        Dados pegos do site Themoviedb.org: <a href='https://www.themoviedb.org/'>Themoviedb</a><br/>
        Fonte: Canal Bonieky Lacerda: <a href='https://www.youtube.com/watch?v=tBweoUiMsDg'>Bonieky Lacerda</a><br/>
      </footer>
      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif'/>
        </div>
      }
    </div>
  );
}

export default App;
