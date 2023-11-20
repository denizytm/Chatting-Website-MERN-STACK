
import {BrowserRouter , Routes , Route } from "react-router-dom"
import { Chat } from "./Pages/Chat"
import { Register } from "./Pages/Register"
import { Login } from "./Pages/Login"
import { SetAvatar } from "./Pages/SetAvatar"
import { Home } from "./Pages/Home"
import "./Components/Style/style.css"
import { useState , useRef } from "react"
import { Explore } from "./Pages/Explore"
import { PageContainer } from "./Pages/PageContainer"
import { Settings } from "./Pages/Settings"

function App() {

  const socket = useRef()
  const [currentUser,setCurrentUser] = useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined)
  const [contacts,setContacts] = useState([])
  const [friends,setFriends] = useState([])
  const [friendRequests,setFriendRequests] = useState([])
  const [selected,setSelected] = useState(localStorage.length > 1 ? Number(localStorage.getItem("selected")) : 2)
  const [peer,setPeer] = useState(undefined)

  const handleSelect = (number)=> {
    localStorage.setItem("selected",number)
    setSelected(number)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/setAvatar" element={<SetAvatar />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<PageContainer {...{currentUser,setCurrentUser,currentChat,setCurrentChat,contacts,setContacts,friends,setFriends,setFriendRequests,selected,peer,setPeer,handleSelect,socket}} />}>
            <Route index element={<Home {...{ currentUser , setCurrentUser , setCurrentChat , contacts , friends , setFriends , friendRequests , setFriendRequests , handleSelect , socket }} />} />
            <Route path="chat" element={<Chat {...{ currentUser , setCurrentUser , contacts , setContacts , currentChat , setCurrentChat, friends , setFriends , socket }} />}/>
            <Route path="explore" element={<Explore {...{currentUser , setCurrentUser , setCurrentChat , contacts , setContacts , friends , setFriends , socket , friendRequests , setFriendRequests , handleSelect }} />}></Route>
            <Route path="settings" element={<Settings {...{currentUser , setCurrentUser , contacts  , socket}} />}></Route>
          </Route>
          <Route path="*" element={<div>404 Not Found.</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
