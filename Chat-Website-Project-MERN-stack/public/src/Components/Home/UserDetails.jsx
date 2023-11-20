
import {styled} from 'styled-components'
import { FiEdit2 } from "react-icons/fi"

export default function UserDetails({currentUser , isHover , setIsHover , askForPicture , setIsClicked , handleFile}){
    return (
        <Container>
            <div 
             className="user-details-photo"
             onMouseOver={()=>setIsHover(true)} 
             onMouseOut={()=>setIsHover(false)} 
            >
                <img
                  onClick={()=>{
                      if(!askForPicture)
                      setIsClicked(v=>!v)
                      else
                      handleFile()
                  }}
                  style= {isHover ?  {width : "169px" , height : "169px" } : {width : "169px" , height : "169px" }}
                  src={`${currentUser.isImageDefault ? `data:image/svg+xml;base64,${currentUser.image}` : `${currentUser.image}`}`} 
                  alt="profile-photo" 
                />
                <FiEdit2 style={isHover ? {opacity : "100%"} : {opacity :"0"}}/>
            </div>
            <h1>NAME SURNAME</h1>
            <h2>@{currentUser.username}</h2>
        </Container>
    )
}

const Container = styled.div`

    .user-details-photo {

    img {
        position : absolute;
        z-index : 1;
        width : 30%;
        top : -30%;
        border : 0.5rem solid #0a011f ;
        border-radius : 100%;
        left : 5%;
        background-color : #0a011f;
        transition : 0.5s ease-in-out;
        cursor : pointer;

        &:hover {
            background-color : #0a011f;
            opacity : 30%;
        }

    }

    svg {
        position : absolute;
        z-index : 2;
        top : 80%;
        left : 25%;
        font-size : 1.5rem;
        background-color : gray;
        padding : 0.7rem;
        width : 5%;
        height : 20%;
        border-radius : 50%;
        cursor : pointer;

    }

}

h2 {
    opacity : 50%;
}
`
