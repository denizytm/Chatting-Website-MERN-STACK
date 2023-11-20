import { styled } from "styled-components"
import { FriendsContainer } from "./FriendsContainer"
import { HiCamera } from "react-icons/hi2"
import { useFilePicker } from 'use-file-picker'
import { setBackgroundRoute } from "../../Utils/APIRoutes"
import { useState , useEffect } from "react"
import axios from "axios"
import { ProfileDetails } from "./ProfileDetails"

export function ProfileContainer ({ currentUser , setCurrentUser , setCurrentChat , contacts  , friends , handleSelect , setCurrentContact , isInHome , setIsInHome , isClicked , setIsClicked , socket }) {

    const [count,setCount] = useState(0)
    const [isCamOn,setIsCamOn] = useState(false)
    const [isFileOpen,setIsFileOpen] = useState(false)
    const [askForBackgroundImage,setAskForBackgroundImage] = useState(false)

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        limitFilesConfig: { max: 1 },
        maxFileSize: 50,
    });

    useEffect(()=>{
        setCount((c)=>(c+1))
    },[loading])

    useEffect(()=> {
        if(count>0 && filesContent[0]){
            setAskForBackgroundImage(true)
            setCurrentUser(user=>({...user,backgroundImage : filesContent[0].content }))
        }
    },[loading])

    const setBackgroundImage= async()=> {
        if(currentUser && filesContent && filesContent[0]){
            const {data} = await axios.post(`${setBackgroundRoute}/${currentUser._id}`,({data:filesContent[0].content}))
            if(data.status){
                setCurrentUser((data.user))
                localStorage.setItem("Logged-User-Data",JSON.stringify(data.user)) 
            }
        }
    }

    const handleSave = ()=>{
        setAskForBackgroundImage(false)
        setBackgroundImage()
    }

    const handleFile = ()=> {
        openFileSelector()
    }

    const handleCancel =()=>{
        setAskForBackgroundImage(false)
        setCurrentUser(JSON.parse(localStorage.getItem('Logged-User-Data')))
    }

    return (
        <Container>
            <div className="profile-background">
                <img src={currentUser.backgroundImage} />
                {askForBackgroundImage ? (
                <div className="button-container">
                    <button className="edit-background-buttons" onClick={handleSave} >Save</button>
                    <button className="edit-background-buttons" onClick={handleCancel} >Cancel</button>
                </div>
                )
                :
                <button className="edit-background-button" onClick={handleFile}><HiCamera />Edit cover photo</button>}
            </div>
            <ProfileDetails {...{currentUser , setCurrentUser , handleSelect , isClicked , setIsClicked , isCamOn , setIsCamOn , isFileOpen , setIsFileOpen , socket}} />
            {!isCamOn && !isFileOpen && !isClicked && <FriendsContainer {...{ currentUser , setCurrentChat , contacts , friends , handleSelect , setCurrentContact , socket }} /> }
        </Container>
    )

}

const Container = styled.div`
    display : grid;
    grid-template-rows : 25% 10% 65%;
    overflow-y : auto;
    color : white;
    background-color : #0a011f;

    &::-webkit-scrollbar {
        width : 0.2rem;

         &-thumb {
             background-color : purple;
         }

     }

    .profile-background {
        background-color : gray;
        position :relative;

        img {
            position :absolute;
            bottom : 0;
            left : 0;
            max-height : 100%;
            min-width : 100%;
        }

        .edit-background-button {
            position : absolute;
            bottom : 1.5rem;
            right : 2rem;
            background-color : transparent;
            border-radius : 0.5rem;
            opacity : 70%;
            padding : 0.5rem 1rem;
            cursor : pointer;
            display : flex;
            align-items : center;
            gap : 0.3rem;
            transition : 0.5s ease-in-out;

            &:hover {
                color : #8b16f2; 
                border : 0.1rem solid #8b16f2;
            }

        }

        .button-container {
            position : absolute;
            bottom : 0rem;
            right : 2rem;
            display : flex;
            height : 5rem;
            width : 10rem;
            justify-content : space-between;   
            align-items : center;

            .edit-background-buttons {
                background-color : transparent;
                border-radius : 0.5rem;
                opacity : 70%;
                padding : 0.5rem 1rem;
                cursor : pointer;
                transition : 0.5s ease-in-out;

                &:hover {
                    color : #8b16f2; 
                    border : 0.1rem solid #8b16f2;
                }

            }

        }

    }

`
