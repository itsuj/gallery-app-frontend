import React, { useEffect, useState } from "react";

const ImageGallery = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);

    const handleSearch = () => {
        if (query.trim() === '') {
            return; // Do nothing if the query is empty
        }

        fetch(`http://localhost:8080/api/photos?query=${query}`)
            .then(response => response.json())
            .then(data => setImages(data.results))
            .catch(error => console.error("Error fetching photos:", error));
    };
    useEffect(()=>{
        // Fetch some default images when page first loads
        fetch(`http://localhost:8080/api/photos?query=nature`)
        .then(response => response.json())
        .then(data => setImages(data.results))
        .catch(error => console.err("Error while showing photos",error));
    },[])
    return (
        <div>
            {/**Search Input and Button */}
            <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update query state
                placeholder="Search for images"
            />
            <button onClick={handleSearch}>Search</button>
            </div>
            <div className="gallery">
                {images.map(image => (
                    <div key={image.id} className="gallery-item">
                        <img src={image.urls.small} alt={image.alt_description} />
                        <p>Photo by: {image.user.name}</p>
                        <a href={image.links.html} target="_blank" rel="noopener noreferrer">View on Unsplash</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
