import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ChatPage = () => {
    const [chat, setChat] = useState([]);
    const fetchChatData = async () => {
        try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts').then(data => { return data })
            setChat(data);
        }
        catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        fetchChatData();
    }, [])
    console.log(chat)
    return (
        <div>

        </div>
    );
};

export default ChatPage;