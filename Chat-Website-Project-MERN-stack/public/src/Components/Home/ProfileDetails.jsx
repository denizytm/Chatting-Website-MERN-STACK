
import { useNavigate } from "react-router-dom"
import {styled} from "styled-components"
import { useState , useEffect } from "react"
import { useFilePicker } from 'use-file-picker'
import { getUserRoute, logOutRoute, setProfileImageRoute } from "../../Utils/APIRoutes"
import axios from "axios"
import EditPictureContainer from "./EditPictureContainer"
import UserDetails from "./UserDetails"
import ButtonsContainer from "./ButtonsContainer"

export function ProfileDetails({currentUser , setCurrentUser , handleSelect , isClicked , setIsClicked , isCamOn , setIsCamOn , isFileOpen , setIsFileOpen , socket}) {

    const navigate = useNavigate()

    const [isHover , setIsHover] = useState(false)
    const [count,setCount] = useState(0)
    const [imageSrc,setImageSrc] = useState(undefined)
    const [askForPicture,setAskForPicture] = useState(false)

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        limitFilesConfig: { max: 1 },
        maxFileSize: 50,
    });

    useEffect(()=> {
        setCount((c)=>(c+1))        
    },[loading])

    useEffect(()=> {
        if( count > 0 && isFileOpen && currentUser &&  filesContent[0] ){
            setAskForPicture(true)
            setCurrentUser(user=>({...user,image : filesContent[0].content }))
        }
    },[loading])

   /*  useEffect(()=> {
        if(socket.current && !setAskForPicture ){
            socket.current.emit("set-image",({userId : currentUser._id}))    // Work in progress...
            console.log('naber1');
        }
    },[askForPicture])  */

    const setProfileImage = async()=> {
        if( currentUser && filesContent[0] ){
        const {data} = await axios.post(`${setProfileImageRoute}/${currentUser._id}`,({data : filesContent[0].content}))
        if(data.status){
            setCurrentUser(data.user)
            localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
        }
        }
    }

    const handleSave = async()=>{
        setIsClicked(v=>!v)
        setIsCamOn(false)
        setIsFileOpen(false)
        setAskForPicture(false)

        const {data} = await axios.post(`${setProfileImageRoute}/${currentUser._id}`,({data : imageSrc}))
        if(data.status){
            setCurrentUser(data.user)
            localStorage.setItem("Logged-User-Data",JSON.stringify(data.user))
        }
        
    }

    const handleFile = ()=> {
        setIsFileOpen(true)
        openFileSelector()
    }

    const navigateSettings = ()=> {
        handleSelect(6)
        navigate("/settings")
    }

    if(currentUser)
    return (
    <>
    <Container>
        <div className="profile-brand">
            <div className="user-details">
                <UserDetails {...{currentUser , isHover , setIsHover , askForPicture , setIsClicked , handleFile}} />
            </div>
            {isClicked ?
                <ButtonsContainer {...{setCurrentUser,isCamOn , setIsCamOn , isFileOpen , setIsFileOpen , askForPicture , setAskForPicture , setProfileImage , setIsClicked , handleFile , handleSave , imageSrc}}
                />
            :   <button className="edit-profile-button" type="button" onClick={navigateSettings}>Edit Profile</button>
            }
            
        </div>
    </Container>
    {isClicked && <EditPictureContainer {...{isCamOn , isFileOpen ,imageSrc , setImageSrc}} /> }
    </>
    )

}

const Container = styled.div`
    background-color : #0a011f;

    .profile-brand {
        display : flex;
        justify-content : space-around;
        align-items : center;
        padding : 1rem;

        .user-details {
            display : flex;
            gap : 2rem;
            position : relative;
            justify-content : end;
            width : 35rem;

        }

        .edit-profile-button {
            color : gray;
            background-color : transparent;
            border : 0.1rem solid gray;
            padding : 0.8rem 2rem;
            font-size : 1.5rem;
            border-radius : 0.5rem;
            cursor : pointer;
            transition : 0.5s ease-in-out;

            @media screen and (max-width : 1600px){
                padding : 0.2rem 1.2rem;
                margin : 0 2rem 0 2rem;
            }

            &:hover {
                color : #8b16f2; 
                border : 0.1rem solid #8b16f2;
            }

        }

    }

`
