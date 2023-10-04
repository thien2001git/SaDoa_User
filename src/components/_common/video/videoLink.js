import { memo, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../assets/css/video.css';
import Loading from '../../loading';
const VideoLink = ({ video }) => {
    const bgRef = useRef();
    const [bgHeight, setBgHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setBgHeight(bgRef.current?.clientWidth / 1.77);
        function handleResize() {
            setBgHeight(bgRef.current?.clientWidth / 1.77);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [video]);
    if (isLoading)
        return (
            <>
                <div className="video-link loading">
                    <div className="bg" ref={bgRef} style={{ height: bgHeight }}>
                        <div className="bg-image">
                            <Loading />
                        </div>
                    </div>
                    <Link className="title">{video?.title ?? 'Loading...'}</Link>
                </div>
            </>
        );
    return (
        <>
            <div
                className="video-link"
                onClick={(e) => {
                    if (e.target.classList.contains('title')) return;
                    e.preventDefault();
                    navigate('/videos/' + video?._id);
                }}
            >
                <div className="bg" ref={bgRef} style={{ height: bgHeight }}>
                    <div
                        className="bg-image"
                        style={{
                            backgroundImage: `url(${video?.thumbnail})`,
                        }}
                    ></div>
                    {/* <div className="view-now">
                        <Link to={'/videos/' + videoId}>View</Link>
                    </div> */}
                </div>
                <Link className="title" to={'/videos/' + video?._id}>
                    {video?.title}
                </Link>
            </div>
        </>
    );
};
export default memo(VideoLink);
