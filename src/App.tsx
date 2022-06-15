import './App.css';
import TagsContainer from './TagsContainer';
import axios from 'axios';
import { useState } from 'react';

function App() {
    const [data, setData] = useState({} as dataType);

    const handleClick = () => {
        const selectedTags = document.querySelectorAll('.tags-item.selected .tags-text');
        const selectedNameArray = Array.from(selectedTags).map((tag) => tag.textContent);
        if (selectedNameArray.length) {
            axios
                .post('https://api-test-ischool.azurewebsites.net/post', {
                    input: selectedNameArray,
                })
                .then((res) => {
                    setData(res.data);
                });
        } else {
            setData({
                status: 'Error',
                error_message: 'Please select at least one tag',
            });
        }
    };

    return (
        <>
            <div className="App">
                <TagsContainer data={data} setData={setData} />
                <button className="submit-button" onClick={handleClick}>
                    Submit
                </button>
                <p className={`result-text ${data.status ? '' : 'hidden'}`}>
                    {data.status && data.status.toLowerCase() === 'error'
                        ? `Error: ${data.error_message}`
                        : `Result: ${data.server_message}`}
                </p>
            </div>
        </>
    );
}
export interface dataType {
    status: string;
    error_message?: string;
    server_message?: string;
}

export default App;
