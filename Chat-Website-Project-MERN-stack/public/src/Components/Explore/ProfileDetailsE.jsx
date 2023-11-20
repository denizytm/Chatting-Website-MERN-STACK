
import {styled} from "styled-components"
import { useNavigate } from "react-router-dom"
import { FiCheck } from "react-icons/fi";
import { FiUserPlus , FiMessageSquare } from "react-icons/fi";

export function ProfileDetailsE({ currentUser , setCurrentChat , currentContact , setCurrentContact , sendFriendRequest , isInHome , handleSelect , socket }) {

    const navigate = useNavigate()

    const handleClick = async(user)=> {
        setCurrentChat(user)
        navigate("/chat")
        handleSelect(3)
    }

    if(currentContact)
    return (<Container>
        <div className="profile-brand">
            <div className="user-details">
                <div className="user-details-name">
                    <div className="user-details-photo">
                        <img
                            style= {{width : "169px" , height : "169px" }}
                            src={`${currentContact.isImageDefault ? `data:image/svg+xml;base64,${currentContact.image}` : `${currentContact.image}`}`} 
                            alt="profile-photo" 
                        />
                    </div>
                    <h1>NAME SURNAME</h1>
                    <h2>@{currentContact.username}</h2>
                </div>
            </div>
            <button className="go-back-button" onClick={()=>{
                if(isInHome)
                    navigate("/")
                else
                    navigate("/explore")
                setCurrentContact(undefined)
            }}>Go Back</button>
            {!currentUser.friends.includes(currentContact._id) ? 
            <button 
                className="add-friend-button" 
                type="button" 
                style={currentUser.friendRequests.toOthers.includes(currentContact._id) 
                    ? 
                    {backgroundColor : "#8b16f2" , color : "white" , border : "none" }
                    : 
                    {}} onClick={()=>{sendFriendRequest(currentContact)}} >
                        {currentUser.friendRequests.toOthers.includes(currentContact._id) 
                        ? 
                        "Request Send" : "Add Friend" }{currentUser.friends.includes(currentContact._id) ? "" : currentUser.friendRequests.toOthers.includes(currentContact._id) ? <FiCheck /> : <FiUserPlus />}
            </button> 
            : 
            <button
            className="send-message-button"
            onClick={()=>handleClick(currentContact)}
            > 
                Send Message <FiMessageSquare />
            </button>}
            
        </div>
    </Container>)

}

const Container = styled.div`
    background-color : #0a011f;

    .profile-brand {
        display : flex;
        align-items : center;
        padding : 1rem;
        justify-content : center;
        gap : 2rem;

        .user-details {
            display : flex;
            gap : 2rem;
            position : relative;
            justify-content : end;
            width : 35rem;

            .user-details-name {

                .user-details-photo {

                    img {
                        position : absolute;
                        z-index : 1;
                        width : 30%;
                        top : -30%;
                        border : 0.5rem solid #0a011f ;
                        border-radius : 100%;
                        left : 5%;
                        background-color : #0a011f;
                        transition : 0.5s ease-in-out;
    
                    }

                }

                h2 {
                    opacity : 50%;
                }

            }

        }

        .add-friend-button {
            color : gray;
            display : flex;
            align-items : center;
            gap : 0.5rem;
            background-color : transparent;
            border : 0.1rem solid gray;
            padding : 0.8rem 2rem;
            font-size : 1.5rem;
            border-radius : 0.5rem;
            cursor : pointer;
            transition : 0.5s ease-in-out;

            &:hover {
                color : #8b16f2; 
                border : 0.1rem solid #8b16f2;
            }

            @media screen and (max-width : 1550px) {
                font-size : 1rem;
            }

        }

        .send-message-button {
            color : gray;
            display : flex;
            align-items : center;
            gap : 0.5rem;
            background-color : transparent;
            border : 0.1rem solid gray;
            padding : 0.8rem 2rem;
            font-size : 1.5rem;
            border-radius : 0.5rem;
            cursor : pointer;
            transition : 0.5s ease-in-out;

            &:hover {
                color : #8b16f2; 
                border : 0.1rem solid #8b16f2;
            }

            @media screen and (max-width : 1550px) {
                font-size : 1rem;
            }

        }

        .go-back-button {
            color : gray;
            background-color : transparent;
            border : 0.1rem solid gray;
            padding : 0.8rem 2rem;
            font-size : 1.5rem;
            border-radius : 0.5rem;
            cursor : pointer;
            transition : 0.5s ease-in-out;

            &:hover {
                color : #8b16f2; 
                border : 0.1rem solid #8b16f2;
            }

            @media screen and (max-width : 1550px) {
                font-size : 1rem;
            }

        }

    }

`
