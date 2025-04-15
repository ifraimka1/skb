function MediaContainer({ src }) {
    return (
        <div className="media-container">
            <img className="image" alt="" src={src} />
        </div>
    );
}

export default MediaContainer;