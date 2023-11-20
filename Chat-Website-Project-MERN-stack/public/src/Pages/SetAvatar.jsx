
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {styled} from "styled-components"
import {Buffer} from "buffer"
import loader from "../Assets/loader.gif"
import { setAvatarRoute } from "../Utils/APIRoutes";

export function SetAvatar() {

    const navigate = useNavigate()
    const api = `https://api.multiavatar.com/4645646`;

    const [isLoading,setIsLoading] = useState(true)
    const [avatars,setAvatars] = useState([])
    const [selectedAvatar,setSelectedAvatar] = useState(undefined)

    const toastOptions = {
        position : "bottom-right",
        theme : "dark"
    }

    const handleSetAvatar = async() => {
        if(selectedAvatar!==undefined){
            const user = JSON.parse(localStorage.getItem("Logged-User-Data"))
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image : avatars[selectedAvatar]
            })

            if(data.status){

                user.isImageSet = true
                user.image = avatars[selectedAvatar]

                localStorage.setItem("Logged-User-Data",JSON.stringify(user))
                navigate("/")
            }else {
                toast.error(data.msg)
                navigate("/register")
            }

        }else {
            toast.error("Please select an avatar before you go !",toastOptions)
        }
    }

    useEffect(()=> {
        if(!localStorage.getItem("Logged-User-Data"))
            navigate("/register")
    },[])

    useEffect(()=> {
        getAvatars()
    },[])

    const getAvatars = async()=> {
        const data = []

        for(let i =0 ; i < 4 ;i++){
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
            const base64Image = Buffer.from(image.data).toString("base64")
            data.push(base64Image)
        }
        setIsLoading(false)
        setAvatars(data)
    }
    
    return(
        <>
            <Container>
                {isLoading ? <img src={loader} alt="loader" /> : <>
                    <div className="avatar-brand">
                        <h1>Pick an avatar as your profile picture </h1>
                    </div>
                    <div className="avatar-container">
                    {avatars.map((avatar,index)=>
                        <div key={index} onClick={() => setSelectedAvatar(index)} className={`avatar ${selectedAvatar === index ? "selected" : "" }`}>
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                        </div>
                    )}

                    </div>
                    <button onClick={handleSetAvatar} className="set-avatar-button">Set as profile picture</button>
                    </>
                }
            </Container>
            <ToastContainer />
        </>
    )

}

const Container = styled.div`
    height : 100vh;
    width : 100vw;
    background-color: #131324;
    display : flex;
    flex-direction : column;
    align-items : center ;
    justify-content : center;
    gap : 2rem;

    .avatar-brand {
        color : white;
        
    }

    .avatar-container {
        height : 7rem;
        width : 7rem;
        display : flex;
        gap : 3rem;
        justify-content : center;
        
        .avatar {
            heigth : 6rem;
            width : 6rem;
            border-radius : 4rem;
            transition : 0.5s ease-in-out;
            border: 0.5rem solid transparent;
            
            img {
                height :100%;
            }

        }

        .selected {
            border: 0.5rem solid #4e0eff;
            border-raidus : 1rem;
        }

    }   

    .set-avatar-button {
        color :white ;
        background-color: #4e0eff;
        text-transform : uppercase;
        border : none;
        padding : 1rem 2rem;
        border-radius : 0.4rem;
        font-weight : bold;
        font-size : 1rem;
        cursor : pointer;
        transition : 0.5s ease-in-out;

        &:hover {
            background-color: #5f00e0;
        }
    }

`