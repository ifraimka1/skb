// import { useEffect } from "react";

function VKvideo({ video }) {
    video.url = `https://vk.com/video_ext.php?id=${video.id}&oid=${video.oid}`;

    return (
        <iframe
            title="vkvideo"
            class="vkvideo"
            src={video.url}
            width={video.width}
            height={video.height}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
            allowfullscreen>
        </iframe>
    );
}

export default VKvideo;