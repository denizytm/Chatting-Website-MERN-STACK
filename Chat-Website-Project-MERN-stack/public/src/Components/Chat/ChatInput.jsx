
import {styled} from "styled-components"
import { BsEmojiSmileFill , BsFillFileEarmarkPlusFill } from "react-icons/bs"
import { IoMdSend } from "react-icons/io"
import Picker from "emoji-picker-react"
import { useEffect, useState } from "react"

export function ChatInput({ handleSendMessage , message , setMessage , openFileSelector }){

    const [showPicker,setShowPicker] = useState(false)

    const handleEmojiClick = (e)=> {
        setMessage((m)=> `${m}${e.emoji}`)
    }

    return (
        <Container>
            <div className="emoji-container">
                <div className="emoji">
                    {<BsEmojiSmileFill onClick={()=>setShowPicker(!showPicker)} />}
                    {showPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="input-container">  
            <input value={message} onChange={(e)=>setMessage(e.target.value)} className="chat-text-input" type="text" placeholder="type your message here" />
            <BsFillFileEarmarkPlusFill onClick={openFileSelector} className="chat-send-file" />
            <button className="chat-send-input" onClick={handleSendMessage}>{<IoMdSend />}</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display :grid ;
    grid-template-columns : 5% 95%;
    align-items : center;
    background-color: #080420;
    
    .emoji-container {
        display :flex;
        align-items : center;
        justify-content : center;
        color : yellow;
        position : relative;

        svg {
            font-size : 2rem;
            cursor : pointer;
        }

        .EmojiPickerReact {
            position :absolute;
            bottom : 5rem ;
            left : 1rem;
            box-shadow: 0 5px 10px #9a86f3;
            border-color: #9a86f3;
            background-color: #080420;

            .epr-search-container {
                input {
                background-color: transparent;
                border-color: #9a86f3;
                }
              }

            .epr-body::-webkit-scrollbar {
                background-color: #080420;
                width: 5px;

                &-thumb {
                  background-color: #9a86f3;
                }

              }
       
              .epr-emoji-category-label{
                background-color: #080420;
            }

        }

    }

    .input-container {
        padding-left : 1rem;
        width : 95%;
        display :flex;
        justify-content : space-between;
        background-color: #ffffff34;
        align-items : center;
        border-radius : 1rem;

    .chat-text-input {
        height : 100%;
        width : 100%;
        font-size : 1.2rem;
        background-color: transparent;
        color : white;
        border : none;

        &::selection {
            background-color: #9a86f3;
          }

        &:focus {
          outline: none;
        }

    }

    .chat-send-file {
        color : white;
        margin-right : 2%;
        font-size : 25px;
        cursor : pointer;

    }

    .chat-send-input {
        display : flex;
        align-items : center;
        color : white;
        background-color: #9a86f3;
        padding : 0.5rem 2.3rem;
        font-size : 2rem;
        border : none;
        border-radius : 1.3rem;
        transition : 0.5s ease-in-out;
        cursor : pointer;   

    }

}

`
