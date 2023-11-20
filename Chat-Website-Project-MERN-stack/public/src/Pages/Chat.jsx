import { useEffect , useState } from "react"
import {styled} from "styled-components"
import { Contacts } from "../Components/Chat/Conctacts"
import { ChatContainer } from "../Components/Chat/ChatContainer"
import { Welcome } from "../Components/Chat/Welcome"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CallContainer from "../Components/Chat/CallContainer"
import { getMessagesRoute , getLastMessagesRoute } from "../Utils/APIRoutes"

export function Chat({ currentUser , setCurrentUser , contacts , setContacts , currentChat , setCurrentChat, friends , setFriends , socket }) {

    const [isOnCall,setIsOnCall] = useState(false)
    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const [lastMessages,setLastMessages] = useState([])
    const [selectedUser,setSelectedUser] = useState("")

    useEffect(()=>{
        getLastMessages()
    },
    [currentUser])

    useEffect(()=>{
        console.log(lastMessages);
    },[lastMessages])

    const getLastMessages = async()=>{
        if(currentUser){
        const {data} = await axios.post(getLastMessagesRoute,{user : currentUser})
        setLastMessages(data.lastMessages)
        }
    } 

    const getMessages = async() => {{
        const {data} = await axios.post(getMessagesRoute,{
            from : currentUser,
            to : currentChat,
        })
        
        socket.current.on("message-recieve",(data)=> {
            setArrivalMessage({sender : currentUser._id , message : data.message})
            getLastMessages()
        })
        setMessages(data.messages)}
    }

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return (
        <>
            <Container>
                <div className="container">
                    { currentUser && contacts && 
                        <Contacts {...{ currentUser , handleChatChange , friends , lastMessages , selectedUser , setSelectedUser}} />
                    }
                    { (currentUser  && !currentChat)  ? <Welcome {...{currentUser}} /> : socket && !isOnCall ? <ChatContainer {...{ currentUser , setCurrentUser , currentChat , setCurrentChat , contacts , friends , setFriends , socket , messages , setMessages , getMessages , arrivalMessage , setContacts , selectedUser , setSelectedUser , lastMessages , setLastMessages }} /> : <CallContainer /> }
                </div>
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
    width : 100vw;
    height : 100vh;
    background-color: #131324;
    display : flex;
    align-items : center;
    justify-content : center;

    .container {
        height: 100vh;
        width : 100%;
        background-color: #00000076;
        display : grid ;
        overflow : hidden;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 55% 45%; 
        }
        @media screen and (max-width: 720px) {
            grid-template-columns: 55% 45%; 
        }

    }
`
