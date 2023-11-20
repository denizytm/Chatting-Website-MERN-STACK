
import {styled} from "styled-components"
import robotImage from "../../Assets/robot.gif"

export function Welcome({currentUser}){
 
    return (
        <Container>
            <img src={robotImage} alt="image" />
            <h1>Welcome, <span>{currentUser.username}!</span></h1>
            <h2>Please select a chat to Start Messaging.</h2>
        </Container>
    )
}

const Container = styled.div`
    color : white;
    display  :flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;

    h1 {
        margin : 0;
    }

    h3 {
        margin : 0;
    }

    img {
        height : 20rem;
    }

    span {
        color : #4e00ff;
    }

`
