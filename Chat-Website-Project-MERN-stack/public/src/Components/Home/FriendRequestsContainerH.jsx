
import { useEffect } from "react";
import {  FiUserPlus , FiUserMinus } from "react-icons/fi";
import {styled} from "styled-components"

export function FriendRequestsContainerH ({ currentUser , contacts , friendRequests , setFriendRequests , socket }) {

    const acceptRequest = (contact)=> {
        if(currentUser && socket && socket.current) {
            socket.current.emit("accept-request",{acceptReceiver : currentUser._id , acceptSender : contact._id})
        }
    }

    const refuseRequest = (contact)=> {
        if(currentUser && socket.current){
            socket.current.emit("refuse-request",{refuseReceiver : currentUser._id , refuseSender : contact._id})
        }
    }

    useEffect(()=> {
        if(currentUser)
            setFriendRequests(currentUser.friendRequests.fromOthers)
    },[])

    if(friendRequests)
        return(
            <Container>
                <h2>Recent Requests</h2>
                    <div className="requests">
                        {friendRequests && contacts && contacts.map((contact,index)=> {
                            if(friendRequests.includes(contact._id))
                            return (
                                <div key={index} className="request">
                                    <img src={`${contact.isImageDefault ? `data:image/svg+xml;base64,${contact.image}` : `${contact.image}`}`} 
                                         style={contact.isImageDefault ? {} : {borderRadius : "100%" , width : "6rem" , height : "6rem"} } 
                                         alt="picture" 
                                    />
                                    <div className="request-details">
                                        <h2>{contact.username}</h2>
                                        <div className="buttons-container">
                                            <button onClick={()=>{acceptRequest(contact)}} className="button-confirm"><FiUserPlus />Confirm</button>
                                            <button onClick={(()=>refuseRequest(contact))} className="button-cancel"><FiUserMinus />Cancel</button>
                                        </div>
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
    overflow-y : scroll;
    display : flex;
    flex-direction : column;
    padding : 1rem;

    &::-webkit-scrollbar {
        width :0.4rem;

        &-thumb {
            background-color : purple;
        }

    }

    .requests {
        display : flex;
        flex-direction : column;
        gap : 2rem;
        align-items : center;

        .request {
            width : 100%;
            display : flex;
            gap : 1rem;
            align-items : center;
            justify-content : center;
            border : 1.2px solid purple;
            padding : 1rem 0 ;

            img {
                height : 4rem;
            }

            .request-details {
            
                h2 {
                    margin-bottom : 0.3rem;
                }

                .buttons-container {
                    display : flex;

                    .button-confirm {
                        color : black;
                        background-color : #68bd9e;
                        border-radius : 1rem;
                        margin-right : 0.5rem;
                        padding : 0.2rem 1rem;
                        cursor : pointer;
                        transition : 0.5s ease-in-out;
                        display : flex;
                        align-items : center;
                        gap :0.3rem;
                        border : none;
                        font-weight : bold;

                        &:hover {
                            background-color : green;
                            color : white;
                        }

                    }

                    .button-cancel {
                        color : black;
                        background-color : #d96262;
                        border-radius : 1rem;
                        padding : 0.2rem 1rem;
                        cursor : pointer;
                        transition : 0.5s ease-in-out;
                        display : flex;
                        align-items : center;
                        gap :0.3rem;
                        border : none;
                        font-weight : bold;

                        &:hover {
                            background-color : #ff0000;
                            color : white;
                        }

                    }

                }                        

            }

        }

    } 

`
