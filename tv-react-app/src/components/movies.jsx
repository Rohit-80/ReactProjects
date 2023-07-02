import { useEffect, useState } from "react";
import { getGenres } from "../services/GenreServices";
import { deleteMovie, getMovies } from '../services/MovieServices'
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviestable";
import _ from 'lodash'

function Movies(props) {
    const { user } = props
   
    const [state, setState] = useState({
        movies: [],
        genres: [],
        PageSize: 4,
        currentPage: 1,
        sort: { name: 'title', order: 'asc' }
    });

    const { PageSize } = state;

    const getData = async () => {
        const { data } = await getGenres();
        const genres = [{ name: 'All genre' }, ...data];
        const { data: MoviesData } = await getMovies();

        setState({ ...state, genres, movies: MoviesData })
    }
    useEffect(() => {
        getData()
    }, [])
   
    // componentDidMount() {
    //     const genres = [{ name: 'All Movies' }, ...getGenres()];
    //     setState({
    //         movies: getMovies(),
    //         genres
    //     })
    // }

    const deleteHandler = async (id) => {
        const OriginalData = state.movies;
        const newmovies = state.movies.filter(item => item._id !== id)
        setState((prevState) => {
            return { ...prevState, movies: newmovies }
        })

        try {
            await deleteMovie(id);

        } catch (error) {
            console.log(error)
            toast.error('Not found')
            setState((prevState) => {
                return { ...prevState, movies: OriginalData }
            })
        }

    }
    const handleLike = (movie) => {
        const newmovies = [...state.movies]
        const ind = newmovies.indexOf(movie);
        newmovies[ind].liked ^= 1;
        setState((prevState) => { return { ...prevState, movies: newmovies } });

    }
    const handleGenre = (genre) => {
        setState((prevState) => { return { ...prevState, selectGenre: { ...genre }, currentPage: 1 } })

    }
    const onPageHandler = (page) => {
        const newPage = page;
        setState((e) => { return { ...e, currentPage: newPage } })
    }

    const handleSort = (sortby) => {
      
        const sort = state.sort;

        if (sort.name === sortby) {
            sort.order = sort.order === 'asc' ? 'desc' : 'asc';
        } else {
            sort.name = sortby;
            sort.order = 'asc';
        }
        setState((prevState) => { return { ...prevState, sort } })
    }
    

    const genresmovies = state.selectGenre
        && state.selectGenre._id ? state.movies.filter(item => item.genre.name === state.selectGenre.name) : state.movies;
    const { length: Count } = genresmovies;
    const sortgenre = _.orderBy(genresmovies, [state.sort.name], [state.sort.order]);
    const Movies = paginate(sortgenre, state.currentPage, state.PageSize);

    return (
        <>

            <div className="row">
                <div className="col-2">

                    <ListGroup
                        onItemSelect={handleGenre}
                        sselectGenre={state.selectGenre}
                        listGenres={state.genres} />
                </div>
                <div className="col">

                    <p> showing {Count} movies in database. </p>
                    {user && (<Link to="/movies/new" className="btn btn-primary btn-sm"> Add </Link>)}
                    <MoviesTable
                        user={user}
                        allMovies={Movies}
                        onSort={handleSort}
                        onDelete={deleteHandler}
                        onLike={handleLike} />

                    <Pagination
                        onPage={onPageHandler}
                        totalMovies={Count}
                        pageSize={PageSize}
                        currentPage={state.currentPage} />
                </div>
            </div>
        </>

    );

}

export default Movies;