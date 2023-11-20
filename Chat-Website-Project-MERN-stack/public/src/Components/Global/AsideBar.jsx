
import {styled} from "styled-components"
import { Link , useNavigate} from "react-router-dom"
import { AiOutlineHome , AiOutlineMessage , AiOutlineStar } from "react-icons/ai";
import { FiUsers , FiSettings , FiLogOut , FiArrowRight , FiUser } from "react-icons/fi";
import { useEffect } from "react";
import axios from "axios"
import { logOutRoute } from "../../Utils/APIRoutes";

export function AsideBar({ currentUser , setCurrentUser , handleSelect , selected , socket }) {

    const navigate = useNavigate()

    useEffect(()=> {
        if(localStorage.getItem("Logged-User-Data")){
            setCurrentUser(JSON.parse(localStorage.getItem("Logged-User-Data")))
        }
        else {
            navigate("/login")
        }
    },[])

    const handleClickLogOut = async()=> {
        if(currentUser){
            const {data} = await axios.post(`${logOutRoute}/${currentUser._id}`)
            if(data.status){
            localStorage.clear()
            socket.current.emit("log-out",currentUser._id)
            socket.current.disconnect()
            window.location.reload(true)}
        }
    }

    if(selected)
    return (
        <Container>
            <div className="aside-bar-element">
                <AiOutlineHome onClick={()=>handleSelect(1)} className={`${ selected === 1 ? "selected" : ""}`} />
                </div>
            <div className="aside-bar-element">
                <Link to="/">
                    <FiUser onClick={()=>handleSelect(2)} className={`${ selected === 2 ? "selected" : ""}`} />
                </Link>
                <Link to="/chat">
                    <AiOutlineMessage onClick={()=>handleSelect(3)} className={`${ selected === 3 ? "selected" : ""}`} />
                </Link>
                <Link to="/explore">
                    <FiUsers onClick={()=>handleSelect(4)} className={`${ selected === 4 ? "selected" : ""}`} />
                </Link>
                <AiOutlineStar onClick={()=>handleSelect(5)} className={`${ selected === 5 ? "selected" : ""}`}r />
            </div>
            <div className="aside-bar-element">
                <Link to="/settings">
                    <FiSettings onClick={()=>handleSelect(6)} className={`${ selected === 6 ? "selected" : ""}`} />
                </Link>
                <FiLogOut onClick={()=>handleClickLogOut()} className={`${ selected === 7 ? "selected" : ""}`} />
            </div>  
            <div className="aside-bar-element">
                <FiArrowRight onClick={()=>handleSelect(8)} className={`${ selected === 8 ? "selected" : ""}`} />
            </div>
        </Container>
    )

}

const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    align-items : center;
    background-color: #00000076;
    overflow-x : hidden;
    overflow-y : auto;
    direction : rtl;

    @media screen and (max-width : 1100px ) {
        width : 4rem;
        font-size : 1.5rem;
    }

    &::-webkit-scrollbar {
        width : 0.2rem;
        &-thumb {
            background-color : #00109e;
        }
    }

    .aside-bar-element {
        display : flex;
        flex-direction : column;
        gap : 2rem;
        
        svg {
            color : #673ead;
            cursor : pointer ;
            border-right : 0.3rem solid transparent;
            transition : 0.5s ease-in-out;
            padding : 2rem 1rem;
            font-size : 200%;
            &:hover {
                color : white;
            }
            @media screen and (max-width : 1080px) {
                & {
                    font-size : 150%;
                    padding : 0;
                    border-right : 0.4rem solid transparent;
                  
                }
            }
        }
        .selected {
            border-right : 0.3rem solid #00109e;
            color : #0029a6;

            @media screen and (max-width : 1080px) {
                & {
                    font-size : 150%;
                    padding : 0;
                    border-right : 0.4rem solid #0029a6;
                }
            }
        }
    }

`
