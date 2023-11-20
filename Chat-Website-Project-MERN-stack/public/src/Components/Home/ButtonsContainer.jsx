
import {styled} from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ButtonsContainer({setCurrentUser,isCamOn , setIsCamOn , isFileOpen , setIsFileOpen , askForPicture , setAskForPicture , setProfileImage , setIsClicked , handleFile , handleSave , imageSrc}){

    return (
        <Container>
            {isCamOn ? 
                    <button className="edit-profile-photo-button" type="button" onClick={()=>{
                        if(imageSrc){
                        handleSave()
                        toast.info('Avatar has successfully changed.',{
                            pauseOnHover : true,
                            position : 'bottom-right',
                            theme : 'dark'
                        })}
                        else 
                            toast.error('Please take a shot before setting a image!',{
                            theme : 'dark',
                            position : 'bottom-right'
                            })
                    }}>Save</button>
                     :
                     !askForPicture && (
                     <>
                     <button className="edit-profile-photo-button" type="button" onClick={()=>setIsCamOn(true)}>Edit Picture With Camera</button>
                     <button className="edit-profile-photo-button" type="button" onClick={handleFile}>Edit Picture With File</button>
                     </>
                    )}
                    {!isCamOn && isFileOpen && askForPicture && 
                    <>
                        <button className="edit-profile-photo-button" type="button" onClick={()=>{
                            setProfileImage()
                            setAskForPicture(false)    
                            setIsClicked(false)
                            setIsCamOn(false)
                            setIsFileOpen(false)
                        }}>Save</button>
                    </>
                    }
                    <button className="edit-profile-photo-button" type="button" onClick={()=>{
                        setIsClicked(v=>!v)
                        setIsCamOn(false)
                        setIsFileOpen(false)
                        setAskForPicture(false)
                        setCurrentUser(JSON.parse(localStorage.getItem('Logged-User-Data')))
                    }}>Cancel</button>
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    align-items : center;
    gap : 1rem;

    .edit-profile-photo-button {
        color : gray;
        background-color : transparent;
        border : 0.1rem solid gray;
        padding : 0.6rem 1.8rem;
        font-size : 1.4rem;
        border-radius : 0.5rem;
        cursor : pointer;
        transition : 0.5s ease-in-out;
    
        @media screen and (max-width : 1600px){
            padding : 0.2rem 1.2rem;
            margin : 0 1.5rem 0 1.5rem;
        }
    
        &:hover {
            color : #8b16f2; 
            border : 0.1rem solid #8b16f2;
        }
    }

`
