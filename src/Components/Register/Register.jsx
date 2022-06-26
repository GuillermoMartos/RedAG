import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Register.css";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Register() {

    const info = useSelector((state) => state.data);


    var [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        repeatPass: "",
    });

    const [errors, setErrors] = React.useState({});
    const [habilitado, setHabilitado] = React.useState(false);

    useEffect(() => {
        setErrors(inputValidate(data));
    }, [data]);

    const inputValidate = (input) => {
        const errors = {};
        const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if (!data.name) {
            errors.name = "Poner nombre para registro";
            setHabilitado(false);
        }
        if (regex.test(data.email) === false) {
            errors.email = "Poner e-mail para registro";
            setHabilitado(false);
        }
        if (!data.password) {
            errors.password = "Se precisa contraseña";
            setHabilitado(false);
        }
        if (!data.repeatPass) {
            errors.password = "Se precisa contraseña";
            setHabilitado(false);
        }
        if (data.password !== data.repeatPass) {
            errors.repeatPass = "Las contraseñas no coinciden";
            setHabilitado(false);
        }
        if (data.name && data.password && data.password == data.repeatPass && regex.test(data.email) === true) {
            setHabilitado(true)
        }

        return errors;
    };

    function handleChange(e) {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setHabilitado(false)
        if (data.password === data.repeatPass) {
            let name = data.name.split(" ");
            let nameArr = [];

            for (let n of name) {
                let word = n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
                nameArr.push(word);
            }

            let DefinitiveName = nameArr.join(" ");
            try {

                await axios(`http://localhost:3001/client/registrar`, {
                    method: "post",
                    data: { ...data, name: DefinitiveName },
                }).then((res) => {
                    const MySwal = withReactContent(Swal)
                    if (res.data?.faltanDatos) {

                        MySwal.fire({
                            title: <p className='swal'>faltaron algunos datos para el registro: mandaste TODOS los campos?, intentá de nuevo, y si se repite, avisanos! :)</p>,
                            didOpen: () => {
                                // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                                // MySwal.showLoading()
                            },
                        })
                        setData({
                            name: "",
                            email: "",
                            password: "",
                            repeatPass: "",
                        })
                    }
                    if (res.data?.repetido) {

                        MySwal.fire({
                            title: <p className='swal'>El mail que intentás registrar ya existe. Estás segur@ que es {data.email}? Si es así, avisanos!</p>,
                            didOpen: () => {
                                // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                                // MySwal.showLoading()
                            },
                        })
                        setData({
                            name: "",
                            email: "",
                            password: "",
                            repeatPass: "",
                        })
                    }
                    if (res.data?.email) {

                        MySwal.fire({
                            title: <p className='swal'>registro exitoso, fijate en tu casilla {res.data.email} que ahí enviamos el link de activación :)</p>,
                            didOpen: () => {
                                // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                                // MySwal.showLoading()
                            },
                        })
                        setData({
                            name: "",
                            email: "",
                            password: "",
                            repeatPass: "",
                        })
                    }
                    if (res.data?.error) {

                        MySwal.fire({
                            title: <p className='swal'>registro no exitoso, estaremos averiguando qué pasa ☹</p>,
                            didOpen: () => {
                                // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                                // MySwal.showLoading()
                            },
                        })
                        setData({
                            name: "",
                            email: "",
                            password: "",
                            repeatPass: "",
                        })
                    }
                })
            } catch (error) {
                console.log(error)
                return alert(
                    `página fuera de servicio, por favor aguarde restablecimiento`
                );
            }
        }
    }

    return (
        <div className="mainContainer">
            <div className="container">
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <h2>Registrarse  <p>(si aún no tenés cuenta)</p></h2>

                        <input
                            className="fullname"
                            type="text"
                            placeholder="Full Name"
                            required
                            name="name"
                            value={data.name}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <div className="register__err">
                                <strong>{errors.name}</strong>
                            </div>
                        )}
                        <input
                            className="email"
                            type="email"
                            placeholder="E-mail"
                            required
                            name="email"
                            value={data.email}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.email && (
                            <div className="register__err">
                                <strong>{errors.email}</strong>
                            </div>
                        )}
                        <input
                            className="password"
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={data.password}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.password && (
                            <div className="register__err">
                                < strong > {errors.password}</strong>
                            </div>
                        )}
                        <input
                            className="repeatPass"
                            type="password"
                            placeholder="Repeat your Password"
                            required
                            name="repeatPass"
                            value={data.repeatPass}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.repeatPass && (
                            <div className="register__err">
                                < strong > {errors.repeatPass}</strong>
                            </div>
                        )
                        }
                        <button
                            type="submit"
                            disabled={!habilitado}
                            onClick={(e) => handleSubmit(e)}
                            className="creator_btn"
                        >
                            enviar!
                        </ button>
                    </form>
                </div >

            </div >
        </div >
    );
}

export default Register;
