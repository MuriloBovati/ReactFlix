const API_KEY = "25d6e3f04aa16e623459f7f357476dd9"
const API_BASE = "https://api.themoviedb.org/3"


/*
- originais da netfli
- recomendados (trending)
- em alta (top rated)
- acao
- terror
- romance
- documentarios
*/
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json
}


export default {
    getHomeList: async () =>{
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para voce',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Acao',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, Type) => {
        let info = {}

        if(movieId){
            switch(Type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break
            }
        return info
        }
    }
}
