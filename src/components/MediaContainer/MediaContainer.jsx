function MediaContainer({ src, key }) {
    return (
        <div className="media-container">
            <img className="image" alt="" src={src} key={key} />
        </div>
    );
}

export default MediaContainer;