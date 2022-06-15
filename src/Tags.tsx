import { useState } from 'react';

interface TagProps {
    text: string;
}

function Tags({ text }: TagProps) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
    };
    return (
        <>
            <div className={`tags-item ${isSelected ? 'selected' : ''}`}>
                <span className="tags-text">{text}</span>
                <span className="tags-button" onClick={handleClick}>
                    {isSelected ? '-' : '+'}
                </span>
            </div>
        </>
    );
}

export default Tags;
