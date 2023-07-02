import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../services/GenreServices";
import { getMovie, saveMovie } from "../services/MovieServices";
import Joi from "joi-browser"
import RenderSelect from "./common/renderSelect";

const MovieForm = () => {
    const params = useParams();
    const navi = useNavigate()


    const [state, setstate] = useState({
        act: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genre: [],
        error: {}
    });

    const getData = async () => {
        const { data } = await getGenres()
        setstate({ ...state, genre: [...data] });

        const movieId = params.id;
        if (movieId === "new") return;

        const { data: movieData } = await getMovie(movieId);
     
        if (!movieData) return navi('/notfound');

        setstate((prevState) => {
            return { ...prevState, act: mapToViewModel(movieData) };
        })

    }
    const mapToViewModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }
    useEffect(() => {
        getData();
    }, []);

    console.log(state)
    const schema = {
        _id: Joi.string(),
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().max(100).min(0).required(),
        dailyRentalRate: Joi.number().max(10).min(0).required()
    }
    const acts = state.act
    const validator = () => {
        const result = Joi.validate(acts, schema, { abortEarly: false });
      
        if (!result.error) return null;
        const errors = {}
        for (let item of result.error.details) errors[item.path[0]] = item.message;
        return errors;

    }
    const validateproperty = (name, value) => {
        const obj = { [name]: value };
        const schemas = { [name]: schema[name] };
        const { error } = Joi.validate(obj, schemas)
        return error ? error.details[0].message : null;
    }

    const dosubmit = async () => {
        try {
            await saveMovie(state.act)
            navi('/')
        } catch (ex) {}
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        const errors = validator();
        setstate({ ...state, error: errors || {} })
        if (errors) return;
        dosubmit()
    }

    const handlechange = (e) => {
        const { currentTarget } = e;
        const name = currentTarget.name;
       
        const errors = state.error;
        const errorMessage = validateproperty(name, currentTarget.value);
        if (errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];


        const data = { ...state }
        data.act[e.currentTarget.name] = e.currentTarget.value;
        setstate({ ...state, error: errors, act: data.act })
    }
 
    return (
        <>
            <form onSubmit={handlesubmit} >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input name='title' onChange={handlechange} value={state.act.title} autoFocus type="text" className="form-control" id="title" />
                </div>
                {state.error.title && (<div className="alert alert-danger">{state.error.title}</div>)}

                {<RenderSelect name="genreId" value={state.act.genreId} label={"genreId"} options={state.genre} onChange={handlechange} error={state.error.genreId} />}

                <div className="mb-3">
                    <label htmlFor="numberInStock" className="form-label">Number in stock</label>
                    <input name='numberInStock' onChange={handlechange} value={state.act.numberInStock} autoFocus type="text" className="form-control" id="numberInStock" />
                </div>
                {state.error.numberInStock && (<div className="alert alert-danger">{state.error.numberInStock}</div>)}

                <div className="mb-3">
                    <label htmlFor="dailyRentalRate" className="form-label">Number in dailyRentalRate</label>
                    <input name='dailyRentalRate' onChange={handlechange} value={state.act.dailyRentalRate} placeholder="i.e. 10" autoFocus type="text" className="form-control" id="dailyRentalRate" />
                </div>
                {state.error.dailyRentalRate && (<div className="alert alert-danger">{state.error.dailyRentalRate}</div>)}
                
                <button disabled={validator()} type="submit" className="btn btn-primary">Save</button>
            </form>
        </>
    );
}

export default MovieForm;
