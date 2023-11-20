
import {styled} from "styled-components"
import { useState , useEffect } from "react"
import { FriendRequestsContainerH } from "../Components/Home/FriendRequestsContainerH"
import { ProfileContainer } from "../Components/Home/ProfileContainer"
import { FindFriendsContainer } from "../Components/Home/FindFriendsContainer"
import { ContactProfileContainer } from "../Components/Explore/ContactProfileContainer"

export function Home({ currentUser , setCurrentUser , setCurrentChat , contacts , friends , setFriends , friendRequests , setFriendRequests , handleSelect , socket }) {

    const [selectedButton,setSelectedButton] = useState(1)
    const [currentContact,setCurrentContact] = useState(undefined) 
    const [isInHome,setIsInHome] = useState(true)
    const [isClicked,setIsClicked] = useState(false)

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

    const handleFriends = async ()=>{
        if(currentUser && contacts){
            let tempArray = []

            contacts.forEach(contact=>{
                if(currentUser.friends.includes(contact._id)){
                    tempArray.push(contact)
                }
            })
            setFriends(tempArray)
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
            if(data.status){
                setCurrentUser(data.user)
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
                setFriendRequests(data.user.friendRequests.fromOthers)
            } 
        })
        socket.current.on("friend-removed",async(data)=> {
            if(data.status){
                setCurrentUser(data.user)
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
                handleFriends()
                setCurrentChat(undefined)
            }
        })
    } 

    if(currentUser && friends && contacts && !currentContact)
    return (
        <>
            <Container>
                <ProfileContainer {...{ currentUser , setCurrentUser , setCurrentChat , contacts  , friends , handleSelect , setCurrentContact , isInHome , setIsInHome , isClicked , setIsClicked , socket }} />
                <div className="contacts-container">
                    <div className="find-request">
                        <button onClick={(()=> setSelectedButton(1))} className={`${selectedButton === 1 ? "selected" : "" }`}>Find Friends</button>
                        <button onClick={(()=> setSelectedButton(2))} className={`${selectedButton === 2 ? "selected" : "" }`}>Friend Requests</button>
                    </div>
                    {selectedButton === 1 ?
                     <FindFriendsContainer {...{ currentUser , setCurrentUser , contacts , friends , socket }} />
                    :
                     <FriendRequestsContainerH {...{ currentUser , contacts , friendRequests , setFriendRequests , socket }} /> }
                </div>
            </Container>
        </>
    )
    else if(currentUser && friends && contacts && currentContact)
        return <ContactProfileContainer {...{ currentContact , setCurrentContact , currentUser ,
             setCurrentUser , setCurrentChat , contacts 
             , friends , setFriends , friendRequests , setFriendRequests 
             , handleSelect , sendFriendRequest , isInHome , socket}} 
        />

}

const Container = styled.div`
    display : grid;
    width : 100vw;
    height : 100vh;
    background-color: #131324;
    grid-template-columns : 80% 20%;

    @media screen and (max-width : 1560px) {
        grid-template-columns :  65% 35%;
    }

    .contacts-container {
        display : flex;
        flex-direction : column;
        overflow : hidden;

        .find-request {
            display : flex;
            align-items : center;
            gap : 2rem;
            padding : 2rem;
        
            button {
                background-color : transparent;
                border :none;
                color : gray;
                font-size : 1.3rem;
                cursor : pointer;
                transition : 0.5s ease-in-out;

                &:hover {
                    color : white;
                }

            }

            .selected {
                color :  #8b16f2;
            }

        }

    }

`
