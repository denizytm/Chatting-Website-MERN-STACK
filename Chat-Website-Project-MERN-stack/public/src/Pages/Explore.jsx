
import { styled } from "styled-components"
import { FriendRequestsContainerE } from "../Components/Explore/FriendRequestsContainerE"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ContactsContainer } from "../Components/Explore/ContactsContainer"
import { ContactProfileContainer } from "../Components/Explore/ContactProfileContainer"

export function Explore ({currentUser , setCurrentUser , setCurrentChat , contacts , setContacts , friends , setFriends , socket , friendRequests , setFriendRequests , handleSelect }) {

    const [currentContact,setCurrentContact] = useState(undefined)
    const [isInHome,setIsInHome] = useState(false)

    const toastOptions = {
        position : "bottom-right",
        theme : "dark"
    }

    const sendFriendRequest = async(contact) => {
        if(currentUser && socket && contact){
            socket.current.emit("send-friend-req",{from : currentUser._id , to : contact._id})
            setCurrentUser((currentUser=>({...currentUser , [currentUser.friendRequests.toOthers] : currentUser.friendRequests.toOthers.push(contact._id) })))
            localStorage.setItem("Logged-User-Data",JSON.stringify(currentUser))
        }
    }

    if(socket && socket.current){
        socket.current.on("get-friend-req",(data)=> {
            if(data.status){
                setCurrentUser(data.user)
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
                setFriendRequests(data.user.friendRequests.fromOthers)
            }
        })
        socket.current.on("request-accepted",(data)=> {
            if(data.status){
                setCurrentUser(data.user)
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
                setFriendRequests(data.user.friendRequests.fromOthers) 
            }
        })
        socket.current.on("request-refused",(data)=> {
            setCurrentUser(data.user)
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
                setFriendRequests(data.user.friendRequests.fromOthers) 
        })
        socket.current.on("friend-removed",(data)=> {
            if(data.status){
                setCurrentUser(data.user)
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
                setFriends(data.user.friends)
            }
        })
    }

    if(currentUser && contacts && !currentContact)
        return (
            <>
                <Container>
                    <div className="explore-container">
                        <h1>Explore</h1>
                        <div className="explore-components">
                            <ContactsContainer {...{currentUser , setCurrentContact , contacts , friends , socket}} />
                            <div className="friend-requests-container">
                                <FriendRequestsContainerE {...{ currentUser , contacts , friendRequests , setFriendRequests , socket }} />
                            </div>
                        </div>
                    </div>
                </Container>
                <ToastContainer />
            </>
        )
    else if(currentContact) 
        return (
            <ContactProfileContainer {...{ currentContact , setCurrentContact , currentUser , setCurrentUser , setCurrentChat , contacts , setContacts , friends , setFriends , friendRequests , setFriendRequests , handleSelect , sendFriendRequest , isInHome , socket}} />
            )

}

const Container = styled.div`
    height : 100vh;
    width : 100vw;
    display : grid;
    background-color: #131324;
    overflow : hidden;

    .explore-container {
        overflow-x : hidden;
        overflow-y : hidden;

        h1{
            color : white;
            margin-left : 13%;
        }

        .explore-components {
            display : grid;
            justify-content : center;
            grid-template-columns : 60% 20%;
            gap : 5rem;
            grid-template-rows : 85%;
            max-height : 100vh;

            @media screen and (max-width : 1570px) {
                grid-template-columns : 40% 30%;
            }

            .friend-requests-container {
                background-color : #0a0115;;
                border : 1px solid #8b16f2;
                transition : 0.5s ease-in-out;
                max-height : 100%;    
                overflow : auto;

                &::-webkit-scrollbar {
                    width : 0.4rem;
        
                    &-thumb {
                        background-color : purple;
                        width : 0.2rem;
                    }
        
                }

                &:hover {
                    border : 1px solid white;
                }

                div {
                    align-items : center;
                    padding : 0.3rem 0;

                    &::-webkit-scrollbar {
                        height : 0.4rem;
                        
                        &-thumb {
                            border-radius : 1rem;
                        }

                    }

                }

            }

        }

    }

`
