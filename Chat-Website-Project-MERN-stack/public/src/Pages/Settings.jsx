
import {styled} from "styled-components"
import { useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom"
import VideoContainer from "../Components/Settings/VideoContainer"

export function Settings({currentUser , setCurrentUser , contacts  , socket}){

    const navigate = useNavigate()

    const toastOptions = {
        position : "bottom-right",
        theme : "dark"
    }

    if(currentUser)
    return (
        <Container>
            <div className="settings-container">
                <div className="profile-settings-container">
                    <div className="profile-settings">
                        <div className="a">
                            <img src={currentUser.isImageDefault ? `data:image/svg+xml;base64,${currentUser.image}` : currentUser.image} alt="" />
                            <h2>{currentUser.username}</h2>
                        </div>
                        <div className="b">b</div>
                    </div>
                </div>
                <div className="alert-settings">
                    <VideoContainer />
                </div>
                <div className="theme-settings"></div>
                <div className="button-container">
                    <button>save</button>
                    <button>cancel</button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`

    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 100%;
    overflow : hidden;
    background-color: #131324;

    .settings-container {
        display : flex;
        flex-direction : column;
        width : 85vw;
        height : 100vh;
        background-color : yellow;
        overflow-y : auto;
        gap : 2rem;
        
        .profile-settings-container {
            background-color : blue;
            width : 80%;
            height : 20rem;
            margin-left : 5%;    
            margin-top : 5%;
            display : flex;
            align-items : center;

            .profile-settings {
                display : grid;
                grid-template-columns : 35% 50%;
                height : 20rem;
                justify-content : space-between;

                .a {
                    flex-direction : column;
                    background-color : red;
                    height : 100%;
                    width : 100%;
                    display : flex;
                    align-items : center;
                    justify-content : center;

                    img {
                        height : 75%;
                        width : 75%;
                        border-radius : 100%;
                    }

                    h2 {
                        color : white;

                    }

                }
    
                .b {
                    background-color : green;
                }
    
            }

        }

        

    }

`
