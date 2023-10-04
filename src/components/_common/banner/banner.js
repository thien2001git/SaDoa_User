import { memo } from 'react';
import { Link } from 'react-router-dom';
const BannerIndex = () => {
    return (
        <>
            <section className="banner">
                <div className="bg">
                    <div
                        className="bg-image"
                        style={{
                            backgroundImage: `url(${'/images/banner.jpg'})`,
                        }}
                    ></div>
                </div>
                <div className="text">
                    <div className="title">New Album</div>
                    <div className="content">April Showers bring May Flowers... and sexy girl!</div>
                    <Link className="footer">View now</Link>
                </div>
            </section>
        </>
    );
};
export default memo(BannerIndex);
