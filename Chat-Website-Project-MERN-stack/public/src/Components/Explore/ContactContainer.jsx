
import {styled} from "styled-components"

export function ContactContainer ({ currentUser , setCurrentContact , contacts , searchContact , friends }){

    if(contacts && friends)
    return (
        <Container>
            {searchContact.map((contact , index )=> {
                if(!friends.includes(contact) && !currentUser.friendRequests.fromOthers.includes(contact._id) && !currentUser.friendRequests.toOthers.includes(contact._id) )
                return (
                    <div key={index} className="contact">
                        <img 
                            src={`${contact.isImageDefault ? `data:image/svg+xml;base64,${contact.image}` : `${contact.image}`}`} 
                            style={contact.isImageDefault ? {} : {borderRadius : "100%" , width : "85%"  } } 
                        />
                        <h2>{contact.username}</h2>
                        <button onClick={()=> {setCurrentContact(contact)}}>See Profile</button>
                    </div>
                )
            })}
        </Container>
    )

}

const Container = styled.div`

    margin : 2rem 1rem ;
    margin-top : 1rem;
    display : grid;
    justify-content : space-around;
    grid-template-columns : 23% 23% 23% 23%;
    gap : 1rem 0;
    
    @media screen and (max-width : 1570px) {
        grid-template-columns : 45% 45%;
    }

    .contact {
        background-color: #131324;
        display : flex;
        flex-direction : column;
        align-items : center;
        justify-content : space-around;
        padding : 1rem;
        border : 1px solid #8b16f2; 
        transition : 0.5s ease-in-out;

        &:hover {
            border : 1px solid white;
        }

        img {
            height : 65%;
            border : 4px solid #8b16f2 ;
            transition : 0.5s ease-in-out;
            border-radius : 100%;

            &:hover {
                border : 4px solid white;
            }

        }

        h2 {
            color : white;
            cursor : default;
           
        }

        button {
            padding : 0.4rem 1rem;
            display : flex;
            align-items : center;
            gap : 0.4rem;
            font-size : 1rem;
            border-radius : 1rem;
            border : none;
            background-color : #8b16f2;
            transition : 0.5s ease-in-out;
            border : 1px solid transparent;
            font-weight : bold;

            &:hover {
                color : white;
                background-color : #2f003b ;
                border : 1px solid #8b16f2;
            }

        }

    }

`
