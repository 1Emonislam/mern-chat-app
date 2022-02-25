import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftSidebar from './ChatHome/LeftSidebar';
import BodyChat from './ChatHome/BodyChat';
const ChatPage = () => {
    const [chat, setChat] = useState([]);
    useEffect(() => {
        const userInfo = window?.localStorage?.getItem("user") ? JSON.parse(window?.localStorage?.getItem("user")) : {};
        if (userInfo?.user) {
            window?.location?.replace('/chat')
        }
    }, [])
    const fetchChatData = async () => {
        try {
            // const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts').then(data => { return data })
            // setChat(data);
        }
        catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        fetchChatData();
    }, [])
    return (
        <>
            <div className="container">
                <div className="w-48">
                    <LeftSidebar />
                </div>
                <div className="w-48">
                    <BodyChat />
                </div>

            </div>

        </>
    );
};

export default ChatPage;