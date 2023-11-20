
import { FiSearch } from "react-icons/fi";
import {styled} from "styled-components"
import { ContactContainer } from "./ContactContainer";
import { useEffect, useState } from "react";

export function ContactsContainer ({currentUser , setCurrentContact , contacts , friends , socket}) {

    const [searchInput,setSearchInput] = useState("")
    const [searchContact,setSearchContact] = useState([])

    useEffect(()=> {
        if(contacts)
            setSearchContact(contacts)
    },[contacts])

    const findTarget = (searchInput)=> {
        if(searchContact == ""){
            setSearchContact(contacts)
        }else{
            let tempArray = []
            contacts.forEach((contact)=> {
                const re = new RegExp(searchInput,"gi")
                const data = re.exec(contact.username)
                if(data !== null){
                    tempArray.push(contact)
                }
        })
            setSearchContact(tempArray)
    }
    }

    return (
        <Container>
            <div className="input-container">
                <div className="input-items">
                    <input type="text" placeholder="Search people... " value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
                    <button>
                        <FiSearch onClick={()=>findTarget(searchInput)} />
                    </button>
                </div>
            </div>
            <ContactContainer {...{ currentUser , setCurrentContact , contacts , searchContact , friends }} />
        </Container>
    )

}

const Container = styled.div`
    background-color : #0a0115;
    border : 1px solid #8b16f2;
    transition : 0.5s ease-in-out;
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

    .input-container {
        display : flex;
        justify-content : center;
        padding :1rem;
        
        .input-items {
            background-color: #131324;
            width : 95%;
            transition : 0.5s ease-in-out;
            border : 1px solid #8b16f2;
            padding : 0 1rem;
            display : flex;
            align-items : center;
            
            &:hover {
                outline : none;
                border : 1px solid white;
            }

            input {
                width : 95%;
                padding : 1rem;
                font-size : 1.5rem;
                border : none;
                background-color : transparent;
                color : white;

                &:focus {
                    outline : none;
                }

            }

            button {
                border: none;
                background-color : transparent;
                cursor : pointer;

                svg {
                    color : white;
                    font-size : 1.5rem;
                }

            }

        }

    }

`
