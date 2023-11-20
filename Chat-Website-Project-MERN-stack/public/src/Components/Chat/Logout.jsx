
import {styled} from "styled-components"
import { BiPowerOff } from "react-icons/bi"
import { logOutRoute } from "../../Utils/APIRoutes"
import axios from "axios"

export function Logout({currentUser , socket}){


    const handleClick = async()=> {
        const {data} = await axios.post(`${logOutRoute}/${currentUser._id}`)
        if(data.status){
        localStorage.clear()
        socket.current.emit("log-out",currentUser._id)
        socket.current.disconnect()
        window.location.reload(true)}
    }

    return (
        <Container onClick={handleClick}>
            <BiPowerOff />
        </Container>
    )

}

const Container = styled.button`
    display: flex;
    background-color: #9a86f3;
    border : none;
    border-radius : 1rem;
    cursor : pointer; 
    padding : 0rem;

    svg {
        color : white;
        font-size : 1.3rem;     
        
    }

`
