import React, { useState } from "react";
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { login } from "../../services/authServices";
import Joi from "joi-browser"
const Login = () => {
    const [state, setstate] = useState({
        act: {
            username: "",
            password: ""
        }
        ,
        error: {}
    });
    const navi = useNavigate()
  
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    }
    const acts = state.act
    const validator = () => {
        const result = Joi.validate(acts, schema, { abortEarly: false });
        ////   console.log(result)
        if (!result.error) return null;
        const errors = {}
        for (let item of result.error.details) errors[item.path[0]] = item.message;
        //console.log(errors)
        return errors;



    }
    const validateproperty = (name, value) => {
        const obj = { [name]: value };
        const schemas = { [name]: schema[name] };
        const { error } = Joi.validate(obj, schemas)
        return error ? error.details[0].message : null;
    }
    const doSubmit = async () => {
        try {
            const { data: jwt } = await login(state.act.username, state.act.password)
            localStorage.setItem('token', jwt);
            window.location = '/'
        } catch (ex) {
            console.log(ex)
            if (ex.response && ex.response.status == 400) {
                const err = { ...state.error }
                err.username = ex.response.data;
                setstate((prevState) => { return { ...prevState, error: err } })
            }
        }
    }
    const handlesubmit = (e) => {
        e.preventDefault();

        const errors = validator();
        setstate({ ...state, error: errors || {} })
        if (errors) return;
        doSubmit()
    }

    const handlechange = (e) => {
        const { currentTarget } = e;
        const name = currentTarget.name;
        //console.log(name)
        const errors = state.error;
        const errorMessage = validateproperty(name, currentTarget.value);
        if (errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];


        const data = { ...state }
        data.act[e.currentTarget.name] = e.currentTarget.value;
        setstate({ error: errors, act: data.act })
    }
    //console.log(state)
    return (
        <>
            <form onSubmit={handlesubmit} >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input name='username' onChange={handlechange} value={state.act.username} autoFocus type="text" className="form-control" id="username" />
                 </div>
                {state.error.username && (<div className="alert alert-danger">{state.error.username}</div>)}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name='password' onChange={handlechange} value={state.act.password} type="password" className="form-control" id="password" />
                 </div>
                {state.error.password && (<div className="alert alert-danger">{state.error.password}</div>)}
                <button disabled={validator()} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default Login;