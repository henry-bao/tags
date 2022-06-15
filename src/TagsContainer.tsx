import Tags from './Tags';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { dataType } from './App';

interface TagsContainerProps {
    data: dataType;
    setData: any;
}

function TagsContainer({ data, setData }: TagsContainerProps) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('https://api-test-ischool.azurewebsites.net/get').then((res) => {
            if (res.data.status.toLowerCase() === 'error') {
                setData({
                    status: res.data.status,
                    error_message: res.data.error_message,
                });
            } else {
                setTags(res.data.names);
            }
        });
    }, [setData]);

    return (
        <>
            <div className="tags-container">
                <h1 className={tags.length ? 'hidden' : ''}>
                    {data.status && data.status.toLowerCase() === 'error'
                        ? ''
                        : 'Data is loading...'}
                </h1>
                {tags.map((tag, index) => (
                    <Tags text={tag} key={index} />
                ))}
            </div>
        </>
    );
}

export default TagsContainer;
