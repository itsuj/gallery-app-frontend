import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ImageGallery = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (query.trim() === '') {
            return; // Do nothing if the query is empty
        }
        setLoading(true); // Start the loading spinner
        fetch(`${process.env.REACT_APP_API_URL}/api/photos?query=${query}`)
            .then(response => response.json())
            .then(data => {
                setImages(data.results);
                setLoading(false); // Stop the loading spinner
            })
            .catch(error => {
                console.error("Error fetching photos:", error);
                setLoading(false); // Stop the loading spinner even if there's an error
            });
    };

    useEffect(() => {
        // Fetch some default images when the page first loads
        setLoading(true); // Start the loading spinner
        fetch(`${process.env.REACT_APP_API_URL}/api/photos?query=nature`)
            .then(response => response.json())
            .then(data => {
                setImages(data.results);
                setLoading(false); // Stop the loading spinner
            })
            .catch(error => {
                console.error("Error while fetching photos:", error);
                setLoading(false); // Stop the loading spinner even if there's an error
            });
    }, []);

    return (
        <div>
            {/* Search Input and Button */}
            <div className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update query state
                    placeholder="Search for images"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading ? ( // Show spinner if loading
                <LoadingSpinner />
            ) : (
                <div className="gallery">
                    {images.map(image => (
                        <div key={image.id} className="gallery-item">
                            <img src={image.urls.small} alt={image.alt_description} />
                            <p>Photo by: {image.user.name}</p>
                            <a href={image.links.html} target="_blank" rel="noopener noreferrer">
                                View on Unsplash
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;

