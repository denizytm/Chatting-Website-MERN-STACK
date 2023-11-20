
import { Outlet , useNavigate } from "react-router-dom"    
import { useEffect, useState } from "react"
import axios from "axios"
import { getUsersRoute } from "../Utils/APIRoutes"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {io} from "socket.io-client"
import { server } from "../Utils/APIRoutes"
import { AsideBar } from "../Components/Global/AsideBar"
import {styled} from "styled-components"
import Peer from "peerjs"
import { getRequestsRoute } from "../Utils/APIRoutes"

export function PageContainer({currentUser , setCurrentUser  , currentChat , setCurrentChat , contacts , setContacts , friends , setFriends , setFriendRequests , selected , handleSelect , socket , peer , setPeer}) {

    const navigate = useNavigate()

    useEffect(()=>{
        setPeer(new Peer(undefined,{
            host : 'localhost',
            path : '/',
            port : '9000'
        }))
    },[])

    if(peer && socket && socket.current){
        peer.on('open',userId=>{
            socket.current.emit('join-room',(userId))
        })
    }

    useEffect(()=> {
        if(localStorage.getItem("Logged-User-Data")){
            setCurrentUser(JSON.parse(localStorage.getItem("Logged-User-Data")))
        }
        else {
            navigate("/login")
        }
    },[])

    const handleFriends =()=>{
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

    useEffect(()=>{
        handleFriends()
    },[contacts])

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

    const toastOptions = {
        position : "bottom-right",
        theme : "dark"
    }

    useEffect(()=> {
        if(currentUser && socket ) {
            socket.current = io(server)
            socket.current.emit("add-user",currentUser._id)
            socket.current.emit("get-users",currentUser._id)
            socket.current.on("get-status",(data)=> {
                if(data.status) {
                    getUsers()
                }
            })
        }
    },[currentUser])

    if(socket && socket.current){
        socket.current.on("friend-removed",async(data)=> {
            if(data.status){
                setCurrentUser(data.user)
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
                handleFriends()
                setCurrentChat(undefined)
            }
        })
    }

    const getUsers = async()=> {
        if(currentUser){
            const {data} = await axios.post(`${getUsersRoute}/${currentUser._id}`)
        
            if(data.status){
                setContacts(data.allUsers)
            }else {
                toast.error(data.msg,toastOptions)
            }

        }
    }

    useEffect(()=> {
        if(currentUser)
        setFriendRequests(currentUser.friendRequests.fromOthers)
    },[currentUser])

    useEffect(()=> {
        if(currentUser && contacts && socket && socket.current){
            socket.current.on("message-alert",(data)=> {
                if(localStorage.getItem("selected")!=3 && data?.message )
                    toast.info(`message from ${data.from.username} : ${data.message}`,toastOptions)
                else if(localStorage.getItem('selected')!=3)
                    toast.info(`photo from ${data.from.username}`,toastOptions)

                contacts.forEach((contact)=> {
                    if(contact.username===data.from.username){
                        setCurrentChat(contact)
                    }
                })
            })
        }
    },[currentUser])

    if(currentUser && friends && contacts)
    return (
        <Container>
        <AsideBar {...{ currentUser , setCurrentUser , handleSelect , selected , socket }} />
        <Outlet/>
        <ToastContainer onClick={()=>{
            navigate("/chat")
            handleSelect(3)}}
            />
        </Container>    
        )

}

const Container = styled.div`
    display : flex;
    height :100vh;
    background-color: #020008;

`
