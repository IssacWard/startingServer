import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Main = () => {
    const [embed, setEmbed] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/commands")
            .then(res => setEmbed(res.data.results))
            .catch(err => console.log("Error:", err))    
    }, []);

    return (
        <div>
            <h2>Message from the backend:</h2>
        </div>
    )
}

export default Main;