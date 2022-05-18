import './FilmeDestaque.css'


export default function FilmeDestaque({item}){

    let firstDate = new Date(item.first_air_date)
    let genres = []
    for(let i in item.genres){
        genres.push(item.genres[i].name)
    }

    let description = item.overview
    if(description.length > 100) {
        description = description.substring(0, 200) + '...'
        console.log(description)
    }
    

    return(
        <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(http://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className='featuredVertical'>
                <div className='featuredHorizontal'>
                    <div className='featuredName'>{item.name}</div>
                    <div className='featuredInfo'>
                        <div className='featuredPoints featuredAll'>{item.vote_average}</div>
                        <div className='featuredYear featuredAll'>{firstDate.getFullYear()}</div>
                        <div className='featuredSeasons featuredAll'>{item.number_of_seasons} temporada{item.number_of_seasons > 1 ? 's'  : ''}</div>
                    </div>
                    <div className='featuredDescription '>{description}</div>
                    <div className='featuredButtons'>
                        <a href={`/watch/${item.id}`} className="featuredWatchButton btnConfig"> Assitir</a>
                        <a href={`/list/add/${item.id}`} className="featuredMyListButton btnConfig" >+ Minha Lista</a>

                    </div>
                    <div className='featuredGenres'><strong>Generos: </strong>{genres.join(', ')}</div>
                </div>
            </div>
        </section>
    )
}