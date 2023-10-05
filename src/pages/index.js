import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import worksApis from '../api/baseAdmin/works';
import BannerIndex from '../components/_common/banner/banner';
import ImageLink from '../components/_common/images/imageLink';
import VideoLink from '../components/_common/video/videoLink';
import Loading from '../components/loading';
import { scrollToTop, setTitle } from '../helpers/common';

function Index() {
    const [works, setWorks] = useState(null);
    const [videos, setVideos] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const isLoadingMore = useRef(false);

    useEffect(() => {
        setTitle('Home');
        scrollToTop();
        function fetchData() {
            Promise.all([
                worksApis.get({
                    limit: 4,
                    type: 1,
                }),
                worksApis.get({
                    limit: 20,
                    type: 0,
                }),
            ]).then((data) => {
                if (data[0].success) setVideos(data[0].data.docs);
                if (data[1].success) setWorks(data[1].data);
            });
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function loadMore() {
            if (!works || works.page === works.pages) return;
            const y = window.pageYOffset + window.innerHeight;
            const last = document.body.clientHeight;
            if (last - y < 100 && !isLoadingMore.current) {
                setIsLoadMore(true);
                isLoadingMore.current = true;
                const res = await worksApis.get({ limit: 20, type: 0, page: works.page + 1 });
                if (res.success) {
                    setWorks({
                        page: res.data.page,
                        pages: res.data.pages,
                        docs: [...works.docs, ...res.data.docs],
                    });
                }
                isLoadingMore.current = false;
                setIsLoadMore(false);
            }
        }
        document.addEventListener('scroll', loadMore);
        return () => {
            document.removeEventListener('scroll', loadMore);
        };
    }, [works]);
    return (
        <>
            <BannerIndex />
            <div className="recommended-videos">
                <h1>Recommended videos</h1>
                <div className="link">
                    <Link to="/videos">See all</Link>
                </div>
                <div className="big-video">
                    {videos &&
                        videos.map((video, index) => (
                            <div key={index} className="big-video__item">
                                <VideoLink video={video} />
                            </div>
                        ))}
                    {!videos && <Loading />}
                </div>
            </div>
            <div className="latest-works">
                <h1>Latest Images</h1>
                <div className="link">
                    <Link to={'/images'}>See all</Link>
                </div>
                {works && (
                    <div className="works_list">
                        {works.docs.map((image, index) => (
                            <div className="works_list__item" key={index}>
                                <ImageLink image={image} />
                            </div>
                        ))}
                    </div>
                )}
                {!works && <Loading />}
            </div>
            {isLoadMore && <Loading />}
        </>
    );
}

export default memo(Index);
