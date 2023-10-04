import { memo, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../assets/css/video.css';
const ImageLink = ({ image }) => {
    const bgRef = useRef();
    const [bgHeight, setBgHeight] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        setBgHeight(bgRef.current.clientWidth / 1.2);
        function handleResize() {
            setBgHeight(bgRef.current.clientWidth / 1.2);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [image]);
    return (
        <>
            <div
                className="image-link"
                onClick={(e) => {
                    if (e.target.classList.contains('title')) return;
                    navigate('/images/' + image._id);
                }}
            >
                <div className="bg" ref={bgRef} style={{ height: bgHeight }}>
                    <div
                        className="bg-image"
                        style={{
                            backgroundImage: `url(${image.thumbnail})`,
                        }}
                    ></div>
                </div>
                <Link to={'/images/' + image._id} className="title">
                    {image.title}
                </Link>
            </div>
        </>
    );
};
export default memo(ImageLink);
