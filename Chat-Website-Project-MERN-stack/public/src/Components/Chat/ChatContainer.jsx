
import { styled } from "styled-components"
import { ChatInput } from "./ChatInput"
import axios from "axios"
import { deleteMessageRoute, getMessagesRoute} from "../../Utils/APIRoutes"
import { sendMessageRoute } from "../../Utils/APIRoutes"
import { useState , useEffect , useRef } from "react"
import { Logout } from "./Logout"
import {v4 as uuidv4} from "uuid"
import { useFilePicker } from 'use-file-picker'
import { BiDotsHorizontalRounded , BiPhone , BiSolidCamera } from "react-icons/bi"

export function ChatContainer({ currentUser , setCurrentUser , currentChat , setCurrentChat , contacts , friends , setFriends , socket , messages , setMessages , getMessages , arrivalMessage  , setContacts , selectedUser , setSelectedUser , lastMessages , setLastMessages}){

    const [message,setMessage] = useState('')
    const [isHover,setIsHover] = useState('')
    const [isClicked,setIsClicked] = useState(false)
    const [counter,setCounter] = useState(0)
    const [isSafe,setIsSafe] = useState(false)
    const scrollRef = useRef()

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        limitFilesConfig: { max: 1 },
        maxFileSize: 50,
    })

    if(socket.current){
    socket.current.on("image-changed",(data)=> {
        if(data.status){
            setCurrentChat(data.user)
            console.log('naber');
        }
    })

    socket.current.on('message-deleted',async()=>{
        getMessages()
    })
    }

    useEffect(()=> {
        if(currentChat && currentUser)
        getMessages()
    },[currentChat])

    useEffect(()=> {
        if(currentChat && currentUser)
        getMessages()
    },[arrivalMessage])

     const handleSendMessage = async(e)=> {
        setLastMessages(oldValue=>{
            let tempArray = oldValue.filter((message)=>message!=oldValue[selectedUser])
            tempArray.unshift(message)
            console.log(oldValue[selectedUser]);
            console.log(tempArray);

            return tempArray
        }) 
        setFriends(oldValue=>{
            let tempArray = oldValue
            tempArray = oldValue.filter((friend)=>friend.username !== currentChat.username)
            tempArray.unshift(currentChat)
            return tempArray
        })
        setSelectedUser(0)
        e.preventDefault()
        if(message !== ""){
            setMessage("")
            await axios.post(sendMessageRoute,{
                message,
                from : currentUser,
                to : currentChat,
                isPhoto : false
            })}

            if(currentUser && currentChat) {
                socket.current.emit("send-message",{from : currentUser._id , to : currentChat._id , message})
                getMessages() 
                setContacts((contacts)=>{
                    let tempArray = contacts
                    tempArray = tempArray.filter(item=>(item.username != currentChat.username))
                    return [currentChat,...tempArray]
                })
            }     
    } 

    useEffect(()=>{
        setCounter(c=>c+1)
    },[loading])

    useEffect(()=>{
        if(counter > 0 && filesContent[0]){
            handleSendPhoto()
        }
    },[loading])

    const handleSendPhoto = async()=>{
        setSelectedUser(0)
        if(counter>0 && filesContent[0] ){

                await axios.post(sendMessageRoute,{
                    photo : filesContent[0].content,
                    from : currentUser,
                    to : currentChat,
                    isPhoto : true
                })
    
                if(currentUser && currentChat) {
                    socket.current.emit("send-message",{from : currentUser._id , to : currentChat._id , message })
                    getMessages() 
                } 
        }
    }

    useEffect(()=> {
        arrivalMessage && setMessages((messages)=> [...messages,arrivalMessage]) 
    },[arrivalMessage])

    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior : "smooth"})
    },[messages])

    const deleteMessage = async (message)=>{
        const {data} = await axios.post(deleteMessageRoute,{message , from : currentUser._id , to : currentChat._id})
        if(data.status){
            setMessages(data.messages.messages)
        }
        if(socket.current){
            socket.current.emit('delete-message',{to : currentChat._id})
        }
    }

    return (
        currentChat && currentChat.image && currentChat.username &&
        <Container onClick={()=>{
            if(isSafe){
                setIsClicked(false)
                setIsSafe(false)
            }
            }}>
            <div className="chat-header">
                <div className="user-data">
                    <img 
                        alt="profile-photo"
                        src={`${currentChat.isImageDefault ? `data:image/svg+xml;base64,${currentChat.image}` : `${currentChat.image}`}`} 
                        style={currentChat.isImageDefault ? {} : {borderRadius : "100%" , width : "25%" , height :"3rem" } } 
                    />
                    <h2>{currentChat.username}</h2>
                </div>
                <div className="icon-container">
                    <BiPhone />
                    <BiSolidCamera />
                    <Logout {...{currentUser , socket}} />
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((message,index)=> {
                    return (
                        <div key={uuidv4()} ref={scrollRef}>
                            {!message.isPhoto ? 
                            <div onMouseOver={()=>{
                                if(!isClicked){
                                setIsHover(index)
                            }}} className={`message ${message.sender === currentUser._id ? "from-message" : ""}`}>
                                {isClicked && (isHover === index) 
                                ? 
                                <div className="details-button" >
                                    <button onClick={()=>deleteMessage(message)}>Delete Message</button>
                                </div>  
                                : '' }
                                {(isHover === index) && (message.sender === currentUser._id) && <BiDotsHorizontalRounded onClick={()=>{
                                    setIsClicked(v=>!v)
                                    setIsSafe(true)
                                    }} />}
                                {message.sendTime}
                                <h3>{message.message}</h3>
                            </div> 
                            :
                            <div className={` photo  ${message.sender === currentUser._id ? "from-photo" : ""}`} onMouseOver={()=>{
                                if(!isClicked){
                                setIsHover(index)
                            }}} >
                                {isClicked && (isHover === index) 
                                ? 
                                <div className="details-button" >
                                    <button onClick={()=>deleteMessage(message)}>Delete Message</button>
                                </div>  
                                : '' }
                                {(isHover === index) && (message.sender === currentUser._id) && <BiDotsHorizontalRounded onClick={()=>{
                                    setIsClicked(v=>!v)
                                    setIsSafe(true)
                                }} />}
                                {message.sendTime}
                                <img src={message.photo} className='chat-photos' />
                            </div>
                            }
                        </div>
                    )
                })}
            </div>
            <ChatInput {...{ handleSendMessage , message , setMessage , openFileSelector , setSelectedUser }} />
        </Container>
    )
}

const Container = styled.div`
    display : grid;
    grid-template-rows : 10% 80% 10%;
    overflow : hidden;     
    .chat-header {
        display :flex;
        align-items : center;
        justify-content : space-between;
        padding: 0 2rem;

        .user-data {
            display : flex;
            align-items : center;
            gap:1.5rem;

            img {
                height : 3.5rem;
            }
    
            h2 {
                color :white;
            }
        }

        .icon-container {
            display: flex;
            justify-content: center;
            align-items: center;
            
            
            border : none;
            
            cursor : pointer; 
            gap : 2rem;

            svg {
                color : white;
                font-size : 1.3rem;     
                background-color: #9a86f3;
                padding :1rem;
                border-radius : 1rem;
            }
        }

    }

    .chat-messages {
        display : flex;
        flex-direction : column;
        overflow-y : auto;
        margin : 1rem;

        &::-webkit-scrollbar {
            
            width : 0.2rem;

            &-thumb {
                background-color: #ffffff39;
                width : 0.1rem;
                border-radius : 1rem;    
            }

        }

        .message {
            color : white;
            display : flex;
            transition : 0.5s ease-in-out;
            align-items : center;
            gap : 1rem;
            position : relative; 

            svg {
                font-size : 2rem;
                cursor : pointer;
            }

            h3{
                padding : 1rem 2rem;
                border-radius : 1rem;
                background-color: #9900ff20;
            }

            .details-button{
                position : absolute ;
                right : 15%;
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

        }

        .from-message {
            justify-content : end;

            h3{
                background-color: #4f04ff21;
            }
            
        }

        .photo {
            color : white;
            display : flex;
            align-items :center;
            position : relative;

            .chat-photos {
                height : 300px;
                width : 300px;
                cursor : pointer;
                color : white;
                margin-left : 1.5rem; 
       
            }

            .details-button{
                position : absolute ;
                right : 15%;
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

        }

        .from-photo {
            display : flex;
            justify-content : end;
            align-items : center;
            color : white;
    
            img {
                margin-left : 1.5rem; 
            }

            svg {
                font-size :3rem;
                cursor : pointer;
                color : white;
                margin-right : 2rem;
            }

        }

    }

`
