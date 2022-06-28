import './Login.css'
import React, { useState, useEffect } from "react";
import Register from '../Register/Register';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";


export default function Login(data) {
    let navigate = useNavigate();
    var [log, setLog] = useState({
        email: "",
        password: "",
    });


    function handleChange(e) {
        let value = e.target.value;
        setLog({
            ...log,
            [e.target.name]: value,
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios(`http://localhost:3001/client/ingreso`, {
                method: "post",
                data: log,
            }).then((res) => {
                const MySwal = withReactContent(Swal)
                if (res.data?.account) {

                    MySwal.fire({
                        title: <p className='swal'>tu cuenta no se activó aún, fijate en tu casilla {res.data.email} que ahí enviamos el link de activación :)</p>,
                        didOpen: () => {
                            // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                            // MySwal.showLoading()
                        },
                    })
                    return setLog({ ...log, password: "" });
                }
                if (res.data?.badPassword) {

                    MySwal.fire({
                        title: <p className='swal'>Wups! 😬 La contraseña que ingresaste no es correcta</p>,
                        didOpen: () => {
                            // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                            // MySwal.showLoading()
                        },
                    })
                    return setLog({ ...log, password: "" });

                }
                if (res.data?.notFound) {
                    MySwal.fire({
                        title: <p className='swal'>el mail {res.data.email} no está registrado aún, por favor regístrese :)</p>,
                        didOpen: () => {
                            // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                            // MySwal.showLoading()
                        },
                    })
                    return setLog({ ...log, password: "" });
                }
                if (res.data.email) {
                    localStorage.setItem("ComprasComnutariasAG", res.data.email);
                    return navigate("/home")
                }
                setLog({ email: "", password: "" });
            });
        } catch (error) {
            console.log(error)
            return alert(
                `página fuera de servicio, por favor aguarde restablecimiento`
            );
        }
    }


    return (
        <div className="nav">
            <h1 className="logo"> ComprasComunitarias🛒🐶 </h1>

            <div>

                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        <h4>Mail</h4>
                    </label>

                    <input
                        className="input"
                        name="email"
                        value={log.email}
                        id="myInput"
                        onChange={(e) => handleChange(e)}
                        required
                        autoComplete="off"
                    />

                    <label>
                        <h4>Password</h4>
                    </label>

                    <input
                        className="input"
                        name="password"
                        type="password"
                        value={log.password}
                        onChange={(e) => handleChange(e)}
                        required
                        autoComplete="off"
                    />
                    <div className="buttons">
                        <button type="submit" className='registro'>
                            <h4>Ingresar</h4>
                        </button>

                    </div>
                </form>
            </div>


            <Register></Register>


        </div>
    );

};