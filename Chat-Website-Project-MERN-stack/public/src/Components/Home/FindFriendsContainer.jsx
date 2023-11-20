
import {styled} from "styled-components"
import { Link } from "react-router-dom"

export function FindFriendsContainer({ currentUser , setCurrentUser , contacts , friends , socket }) {

    const sendFriendRequest = async(contact) => {
        if(currentUser && socket && contact){
            socket.current.emit("send-friend-req",{from : currentUser._id , to : contact._id})
            setCurrentUser((currentUser=>({...currentUser , [currentUser.friendRequests.toOthers] : currentUser.friendRequests.toOthers.push(contact._id) })))
            localStorage.setItem("Logged-User-Data",JSON.stringify(currentUser))
        }
    }

    if(contacts && friends && currentUser )
    return (
        <Container>
            <div className="header">
                <h2>New People</h2>
                <Link to={"/explore"}><h3>More People</h3></Link>
            </div>
            <div className="contact-container">
                {contacts.map((contact , index )=> {
                    if(!friends.includes(contact) && !currentUser.friendRequests.fromOthers.includes(contact._id) && !currentUser.friendRequests.toOthers.includes(contact._id) )
                    return (
                        <div key={index} className="contact">
                            <img 
                                src={`${contact.isImageDefault ? `data:image/svg+xml;base64,${contact.image}` : `${contact.image}`}`} 
                                style={contact.isImageDefault ? {} : {borderRadius : "100%" , width : "25%" , height :"5rem" } } 
                            />
                            <div className="contact-details">
                            <h2>{contact.username}</h2>
                            <button onClick={()=>sendFriendRequest(contact)}>Add Friend</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    )

}

const Container = styled.div`
    color : white;
    overflow-y : auto;

    &::-webkit-scrollbar {
        width : 0.4rem;
        &-thumb {
            background-color : purple;
        }
    }

    .header {
        display : flex;
        align-items :center;
        justify-content : space-around;
        gap : 2rem;

        a {
            color : white;
            text-decoration : none;
        }
    }

    .contact-container {
        margin : 2rem 1rem ;
        margin-top : 1rem;
        display : flex;
        flex-direction : column;
        justify-content : space-around;
        grid-template-columns : 23% 23% 23% 23%;
        gap : 1rem 0;
        
        @media screen and (max-width : 1570px) {
            grid-template-columns : 45% 45%;
        }

        .contact {
            padding : 0.5rem;
            background-color: #131324;
            display : flex;
            align-items : center;
            gap : 2rem;
            padding : 1rem;
            border : 1px solid #8b16f2; 
            transition : 0.5s ease-in-out;

            @media screen and (max-width : 1570px) {
                padding : 0.2rem 0.1rem;
            }

            &:hover {
                border : 1px solid white;
            }

            img {
                width  : 25%;
                border : 4px solid #8b16f2 ;
                transition : 0.5s ease-in-out;
                border-radius : 100%;

                &:hover {
                    border : 4px solid white;
                }

                @media screen and (max-width : 1570px) {
                    grid-template-columns : 45% 45%;
                }

            }

            .contact-details {

                h2 {
                    color : white;
                    cursor : default;
                   
                }
    
                button {
                    padding : 0.4rem 1rem;
                    align-items : center;
                    gap : 0.4rem;
                    font-size : 1rem;
                    border-radius : 1rem;
                    border : none;
                    background-color : #8b16f2;
                    transition : 0.5s ease-in-out;
                    border : 1px solid transparent;
                    font-weight : bold;

                    &:hover {
                        color : white;
                        background-color : #2f003b ;
                        border : 1px solid #8b16f2;
                    }
    
                    @media screen and (max-width : 1570px) {
                        padding : 0.1rem 0.5rem;
                    }
    
                }

            }

        }

    }

`
