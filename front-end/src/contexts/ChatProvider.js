import React, { createContext, useContext, useEffect, useState } from 'react';
const ChatContext = createContext()
function ChatProvider({ children }) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const userInfo = window?.localStorage?.getItem("user") ? JSON.parse(window?.localStorage?.getItem("user")) : {};
        setUser(userInfo);
        if (!userInfo) {
            window.location.replace('/login')
        }
    }, [])
    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
}
export const ChatState = () => {
    return useContext(ChatContext)
}
// console.log(ChatState)
export default ChatProvider;