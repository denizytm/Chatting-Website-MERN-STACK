
import {styled} from "styled-components"
import { FiSearch , FiMoreHorizontal } from "react-icons/fi";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

export function FriendsContainerE({ currentUser , currentContact , contacts }) {

    const navigate = useNavigate()

    const [isClicked,setIsCLicked] = useState()
    const [isSave,setIsSafe] = useState(false)
    const [contactFriends,setContactFriends] = useState([])

    useEffect(()=> {
        contacts.map((contact)=> {
            if(currentContact.friends.includes(contact._id)){
                setContactFriends(contactFriends=>[...contactFriends,contact._id])
            }
        })
    },[currentContact])

    if(currentContact && contactFriends && currentUser)
    return (
        <Container onClick={()=> {
            if(isSave){
                setIsCLicked(undefined)
                setIsSafe(false)
            }}}>
            <div className="friend-list-brand">
                <h1>Friends</h1>
                <div className="friend-list-search">
                    <input type="text" placeholder="Search friend... "/>
                    <FiSearch />
                </div>
            </div>
            <div className="friend-list-items">
                {contacts && contacts.map((contact,index)=> {
                    if(contactFriends.includes(contact._id))
                    return (
                        <div key={index} className="friend-list-item">
                            <div className="friend-list-user">
                                <img 
                                    alt="picture"
                                    src={`${contact.isImageDefault ? `data:image/svg+xml;base64,${contact.image}` : `${contact.image}`}`} 
                                    style={contact.isImageDefault ? {} : {borderRadius : "100%" , width : "4.5rem" , height : "4.5rem"} }
                                />
                                <div className="friend-list-user-details">
                                    <h2>{contact.username}</h2>
                                    <button>{currentUser.friends.includes(contact._id) ? "Send Message" : "Add friend"}</button>
                                </div>
                            </div>
                            <FiMoreHorizontal onClick={()=>{
                                setIsCLicked(oldIndex=> oldIndex!=index ? index : undefined)
                                setIsSafe(true)
                            }}/>
                            {isClicked === index ? 
                                <div className="friend-list-user-options" >
                                    <button 
                                        onClick={()=>navigate(`/`)}
                                    >see profile</button>
                                </div> 
                                : 
                                <div className="friend-list-user-options-hidden" />
                            }
                        </div>
                    )
                })}
            </div>
        </Container>
    )

}

const Container = styled.div`
    padding : 5rem 20rem;
    margin-top : 3%;         
    
    @media screen and (max-width : 2000px) {
    padding : 5rem;
    }

    .friend-list-brand {
        display : flex;
        justify-content : space-around;
        align-items : center;
        gap : 15rem;
    
        .friend-list-search {
            display : flex;
            align-items : center;
            background-color : #23273f;
            padding : 0.5rem;
            width : 30%;
            border-radius : 0.5rem;
            padding : 0.5rem 1rem;
            opacity : 0%;

            input {
                border : none;
                background-color : transparent;
                font-size : 1.5rem;
                width : 100%;
                color : white;
                cursor : default;

                &:focus {
                    outline : none;
                    
                }
            }
        
            svg {
                color : gray;
                font-size : 1.5rem;
            }
        
        }
    
    }
    
    .friend-list-items {
        display : grid;
        grid-template-columns : 50% 50%;
        align-items : center;
        padding : 2rem;
        gap : 2rem 0;
    
        .friend-list-item {
            display : flex;
            width : 80%;
            justify-content : space-between;
            align-items : center;
            background-color : #0a0115;
            color : black;
            padding : 1rem 2rem;
            border : 1px solid #8b16f2;
            border-radius : 1rem;
            transition : 0.5s ease-in-out;
            position : relative ;
        
            &:hover {
                background-color: #0e139c;
                border : 1px solid white;
            }
        
            .friend-list-user {
                display : flex;
                align-items : center;
                gap : 2rem;
            
                .friend-list-user-details {
                
                    h2 {
                        margin : 0;
                        color : white;
                        margin-bottom : 0.4rem;
                        cursor :default;
                    }
                
                    button {
                        background-color : #8b16f2;
                        color : white;
                        padding : 0.5rem 1rem;
                        font-size : 1rem;
                        border-radius : 0.5rem;
                        border : none;
                        cursor : pointer;
                    }
                
                }
            
                img {
                    height : 4.5rem;
                }
            
            }
        
            .friend-list-user-options{
                position : absolute ;
                bottom : -5.5rem ;
                right : -4rem;
                width : 10rem;
                height : 8rem;
                z-index : 1;
                background-color : #0a0115;
                border-radius : 10%;
                transition : 0.5s ease-in-out;
                display : flex;
                flex-direction : column;
                align-items : center;
                justify-content : center;
                border : 1px solid #0e139c;
                gap : 1rem;
            
                &:hover {
                    background-color: #0e139c;
                    border : 1px solid white;    
                }
            
                button {
                    width : 50%;
                    height : 30%;
                    border-radius : 10%;
                    background-color : #8b16f2;
                    color : white;
                    cursor : pointer;
                    transition : 0.5s ease-in-out;
                    border : none;
                    
                
                    &:hover {
                        background-color : white;
                        color : black;
                    }
                
                }
            
            }
        
            .friend-list-user-options-hidden {
                position : absolute ;
                bottom : -4rem ;
                right : -4rem;
                width : 10rem;
                height : 6rem;
                z-index : 1;
                border-radius : 10%;
                transition : 0.5s ease-in-out;
            }
        
            svg {
                font-size : 2rem;
                color : white;
                cursor : pointer;
            }
        
        }
    
    }

`

