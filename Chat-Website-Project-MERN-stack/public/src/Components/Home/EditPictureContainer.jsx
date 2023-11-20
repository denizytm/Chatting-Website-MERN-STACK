import {styled} from 'styled-components'
import Webcam from 'react-webcam'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function EditPictureContainer({isCamOn , isFileOpen ,imageSrc , setImageSrc}){

    var takePhoto

    return (
        <Container>
            {isCamOn && 
            <>
                <div className="webcam-container">
                    <Webcam
                    screenshotFormat="image/jpeg"
                    >
                        {({ getScreenshot })=>(
                            takePhoto = getScreenshot             
                        )}    
                    </Webcam>
                    {imageSrc ? <img src={imageSrc} /> : <div style={{width : '640px' , height : '480px' , borderRadius : '100%' }} ></div>}
                </div>
                <div className="button-container">
                    <button onClick={()=>{setImageSrc(takePhoto())}}>Take a Shot</button>
                </div>
            </>}
        </Container>
    )
}

const Container = styled.div`
    width : 90%;
    height : 100%;
    margin-top : 8%;
    margin-left : 5%;
    margin-bottom : 15%;

    .webcam-container {
        display : flex;
        gap : 2rem;
        align-items : center;
        margin-right : 5%;
        justify-content : start;    

    }

    .button-container {
        display : flex;
        align-items : center;
        justify-content : center;
        padding : 2rem;

        button {
            width : 30%;
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

    }

    

`
