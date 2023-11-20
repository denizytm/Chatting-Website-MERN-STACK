import {styled} from "styled-components"
import logo from "../../Assets/logo.svg"

export function Contacts({ currentUser , handleChatChange , friends , lastMessages , selectedUser , setSelectedUser}){

    const handleClick = (chat,index)=> {
        handleChatChange(chat)
        setSelectedUser(index)
    }

    const getTimeDif = (contact)=> {
        if(contact){
            let difference = Math.ceil((new Date().getTime() - contact.lastOnline)/1000)
            let second = 0
            let hour = 0
            let minute = 0
            let day = 0
            let week = 0

            for(;difference >= 3600;){
                difference-=3600
                hour++
            }
            
            for(;difference >= 60;){
                difference-=60
                minute++
            }

            for(;difference>=0;difference--){
                second++
            }

            if(hour>24)
            for( ; hour>=24;hour-=24){
                day++
            }

            if(day>1)
            for( ; day >=7 ;day-=7){
                week++
            }

            if(week > 0)
                return `${week} w`
            else if(day>1) {
                return `${day} d ${hour} h`}
            else if(hour>0) {
                return `${hour} h ${minute} m`
            }
            else {
                return `${minute} m ${second} s`}
            }
    }

    if( currentUser && friends && lastMessages )
    return (
            <Container>
                <div className="brand">
                    <img src={logo} alt="logo" />
                    <h1>Chat</h1>
                </div>
                <div className="contacts">
                    {friends && friends.map((friend,index)=> {
                        return (
                                <div onClick={()=>handleClick(friend,index)} key={index} className={`contact ${selectedUser === index ? "selected" : "" }`}>
                                    <div className="profile-photo">
                                        <img 
                                        src={`${friend.isImageDefault ? `data:image/svg+xml;base64,${friend.image}` : `${friend.image}`}`} 
                                        style={friend.isImageDefault ? {} : {borderRadius : "100%" , width : "6rem" , height : "6rem"} }
                                        />
                                        <div style={ friend.isOnline ? {backgroundColor : "green"} : {backgroundColor : "darkgray"}} className="online-status"></div>
                                    </div>
                                    <div>
                                        <h2>{friend.username}</h2>
                                        <h4 key={index} className="last-message" >{ lastMessages[index] && lastMessages[index]}</h4>
                                        <h3>{ !friend.isOnline ? <div>Last Online { getTimeDif(friend) }  </div> : "" }</h3>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <div className="current-user">
                    <img 
                        alt="image"
                        src={`${currentUser.isImageDefault ? `data:image/svg+xml;base64,${currentUser.image}` : `${currentUser.image}`}`} 
                        style={currentUser.isImageDefault ? {} : {borderRadius : "100%" , width : "6rem" , height : "6rem"} } 
                    />
                    <h1>{currentUser.username}</h1>
                </div>
            </Container>
    )
}

const Container = styled.div`
    color : white;
    background-color: #080420;
    display : grid;
    grid-template-rows : 10% 75% 15%;
    overflow-y: hidden;
    overflow-x : auto;

    .brand {
        display : flex;
        align-items : center;
        justify-content : center;
        gap : 1rem;

        img {
            height: 3rem;

        }

        h1 {
            color : white;
            text-transform : uppercase;
        }

    }

    .contacts {
        display : flex;
        flex-direction : column;
        gap : 2rem;
        align-items : center;
        overflow-y : auto;
        overflow-x : hidden; 
        
        &::-webkit-scrollbar {
            width : 0.5rem;
            height : 0.5rem;

            &-thumb {
                background-color : white;
                width : 0.1rem;
                border-radius : 1rem; 
                   
            }
        }

        .contact {
            width : 85%;
            max-height : 100%;
            background-color: #ffffff34;
            display : flex;
            justify-content : start;
            align-items : center;
            gap : 1.5rem ;
            padding : 1rem;
            border-radius : 0.4rem;
            cursor : pointer;
            border : 2px solid transparent;
            transition : 0.5s ease-in-out;

            .profile-photo {
                position : relative;

                img {
                    height : 6rem;
                }
  
                .online-status {
                    position : absolute;
                    width : 0.7rem;
                    height : 0.7rem;
                    border-radius : 100%;
                    border : 2px solid gray;
                    bottom : 0;
                    right : 10%;
                }

            }

            div {
                .last-message {
                    opacity : 50%;
                }
            }

        }

        .selected {
            border : 2px solid purple;
        }

    }

    .current-user {

        display : flex;
        align-items : center;
        justify-content : center;
        gap : 2rem;

        img {
            height : 4rem;
        }

    }

`
