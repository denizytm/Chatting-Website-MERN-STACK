
import {styled} from "styled-components"
import { useState , useEffect } from "react";
import { FriendRequestsContainerH } from "../Home/FriendRequestsContainerH";
import { ProfileContainerE } from "./ProfileContainerE";
import { FindFriendsContainer } from "../Home/FindFriendsContainer";
import axios from "axios"
import { getUsersRoute , getRequestsRoute } from "../../Utils/APIRoutes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ContactProfileContainer ({ currentContact , setCurrentContact , currentUser , setCurrentUser , setCurrentChat , contacts , friends , setFriends , friendRequests , setFriendRequests , handleSelect , sendFriendRequest , isInHome , socket}){

    const [selectedButton,setSelectedButton] = useState(1)

    const toastOptions = {
        position : "bottom-right",
        theme : "dark"
    }

    useEffect(()=> {
        getRequests()
    },[])

    const getRequests = async()=> {
        if(currentUser){
        const {data} = await axios.post(`${getRequestsRoute}/${currentUser._id}`)
        if(data.status) {
            setFriendRequests(data.friendRequests)
        }}
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
        socket.current.on("friend-removed",(data)=> {
            if(data.status){
                setCurrentUser(data.user)
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
                setFriends(data.user.friends)
            }
        })
    }

    if(currentUser && friends && contacts)
    return (
        <>
            <Container>
                <ProfileContainerE {...{ currentUser , setCurrentChat , currentContact , setCurrentContact , contacts , sendFriendRequest , isInHome , handleSelect , socket }} />
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

