
import { styled } from "styled-components"
import { useEffect, useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import logo from "../Assets/logo.svg"
import { loginRoute } from "../Utils/APIRoutes"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login(){

    const navigate = useNavigate()

    useEffect(()=> {
        if(localStorage.getItem("Logged-User-Data"))
        navigate("/")
    },[])

    const [userData,setUserData] =useState({
        username : "",
        password : "",
    })

    const toastOptions = {
        position : "bottom-right",
        theme : "dark"
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        if(handleValidation()){
        const {data} = await axios.post(loginRoute,{
            userData
        })
    
        if(data.status){
            navigate("/")
            localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
        }else
            toast.error(data.msg,toastOptions)
        }
    }

    const handleChange = (event) => {
        const {value} = event.target
        const {name} = event.target
        setUserData({...userData , [name] : value})
    }

    const handleValidation = ()=> {
        
        const {username,password} = userData
        
        if(username === ""){
            toast.error("Username is required", toastOptions)
            return false
        }else if(password === ""){
            toast.error("Password is required", toastOptions)
            return false
        }else 
            return true
    }
 
    return(
        <>
            <Container>
            <form onSubmit={handleLogin} className="form-container">
                <div className="logo-container">
                    <img src={logo} alt="logo" />
                    <h1>Snappy</h1>
                </div>
                <input onChange={handleChange} type="text" name="username" placeholder="Username"></input>
                <input onChange={handleChange} type="text" name="password" placeholder="Password"></input>
                <button className="form-button" type="submit" >Log In</button>
                <h1 className="link">Dont Have An Acoount ? <Link to="/register" >Create One.</Link> </h1>
            </form>
            </Container>
            <ToastContainer />
        </>
    )
}
 
const Container = styled.div`
    height : 100vh;
    width : 100vw;
    color : white;
    overflow: hidden ;
    background-color: #131324;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    
    .logo-container {
        
        display :flex;
        gap : 1rem ;
        align-items : center;
        font-size : 1.5rem;
        text-transform : uppercase;

        img {
            height :5rem
        }
    }
    form{
        width : 17%;
        display : flex;
        flex-direction : column;
        gap: 2rem;
        background-color : #00000076;
        align-items : center;
        padding : 3rem 7rem;
        border-radius : 2rem;

        input {
            padding : 1rem;
            border-radius : 0.5rem;
            width : 100%;
            background-color : transparent ;
            border : 0.1rem solid #4e0eff;
            transition : 0.5s ease-in-out;
            font-size : 1rem;
            color : white;
            &:focus {
                outline :none;
                border : 0.1rem solid #997af0;
            }   
        }

        .form-button {
            text-transform : uppercase;
            padding : 1rem;
            width : 108%;
            color :white;
            background-color : #4e0eff;
            border-radius : 0.4rem;
            border : none;
            cursor : pointer;
            
        }

        .link {
            text-transform : uppercase;
            font-size : 1.3rem;
            font-weight :bold ;

            a{
                text-decoration : none;
                color : #4e03ff
            }

        }

    }
`
