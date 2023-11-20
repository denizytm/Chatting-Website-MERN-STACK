
import { styled } from "styled-components"
import { ProfileDetailsE } from "./ProfileDetailsE"
import { FriendsContainerE } from "./FriendsContainerE"

export function ProfileContainerE ({ currentUser , setCurrentChat , currentContact , setCurrentContact , contacts , sendFriendRequest , isInHome , handleSelect , socket }) {

    return (
        <Container>
            <div className="profile-background">
                <img src={currentContact.backgroundImage} />
            </div>
            <ProfileDetailsE {...{ currentUser , setCurrentChat , currentContact , setCurrentContact , sendFriendRequest , isInHome , handleSelect , socket }} />
            <FriendsContainerE {...{ currentUser , currentContact , contacts }} />
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

        button {
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

        }

    }

`

