import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import worksApis from '../../api/baseAdmin/works';
import VideoLink from '../../components/_common/video/videoLink';
import Loading from '../../components/loading';
import { MySwal, scrollToTop, setTitle } from '../../helpers/common';
const VideoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [videos, setVideos] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const isLoadingMore = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [video, setVideo] = useState(null);
    const [albums, setAlbums] = useState(null);
    useEffect(() => {
        async function loadMore() {
            if (!videos || videos.page === videos.pages) return;
            const y = window.pageYOffset + window.innerHeight;
            const last = document.body.clientHeight;
            if (last - y < 100 && !isLoadingMore.current) {
                setIsLoadMore(true);
                isLoadingMore.current = true;
                const res = await worksApis.getByRecommended(id, { page: videos.page + 1 });
                if (res.success)
                    setVideos({
                        page: res.data.page,
                        pages: res.data.pages,
                        docs: [...videos.docs, ...res.data.docs],
                        limit: res.data.limit,
                    });
                isLoadingMore.current = false;
                setIsLoadMore(false);
            }
        }
        document.addEventListener('scroll', loadMore);
        return () => {
            document.removeEventListener('scroll', loadMore);
        };
    }, [id, videos]);
    useEffect(() => {
        scrollToTop();
        async function fetchData() {
            if (!isLoading) setIsLoading(true);
            const res = await worksApis.getById(id);
            if (res.success) {
                setIsLoading(false);
                setVideo(res.data);
                setTitle(res.data.title);
            } else if (res.status === 404)
                MySwal.fire({
                    title: '404 not found',
                    html: 'The video does not exist or has been deleted',
                    icon: 'error',
                    allowOutsideClick: false,
                }).then(() => {
                    navigate('/videos');
                });
            else
                MySwal.fire({
                    title: 'Error: ' + res.status,
                    html: res.message,
                    icon: 'error',
                    allowOutsideClick: false,
                }).then(() => {
                    navigate('/videos');
                });
        }
        async function loadRecommended() {
            const res = await worksApis.getByRecommended(id);
            if (res.success) setVideos(res.data);
        }
        fetchData();
        if (id) loadRecommended();
    }, [id]);
    useEffect(() => {
        async function fetchData() {
            const res = await worksApis.getByAlbums(video.albums);
            if (res.success) setAlbums(res.data);
        }
        video?.albums && fetchData();
    }, [video]);
    return (
        <>
            <section className="video-detail">
                <div className="top">
                    <div className="video">
                        <div
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                paddingBottom: isLoading ? '0' : '56.25%',
                            }}
                        >
                            {isLoading && (
                                <div className="video-loading">
                                    <Loading />
                                </div>
                            )}
                            {!isLoading && (
                                <iframe
                                    src={`https://cdn.jwplayer.com/players/${video?.media_id}-${video?.site_id}.html`}
                                    width="100%"
                                    height="100%"
                                    title="..."
                                    style={{ position: 'absolute' }}
                                    frameBorder={0}
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                        <div className="title">{isLoading ? 'Loading...' : video?.title}</div>
                    </div>
                    {albums && albums.length > 0 && (
                        <div className="albums">
                            <div className="header">{isLoading ? 'Loading...' : video?.albums}</div>
                            <div className="albums-videos">
                                <div>
                                    {albums &&
                                        albums.map((video, index) => (
                                            <div className="item" key={index}>
                                                <VideoLink video={video} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="middle"></div>
                {!isLoading && (
                    <div className="bottom">
                        <div className="bottom__recommended-videos">
                            <h1 className="title">Recommended videos</h1>
                            <div className="bottom__big-video">
                                {videos &&
                                    videos.docs.map((video, index) => (
                                        <div className="item" key={index}>
                                            <VideoLink video={video} />
                                        </div>
                                    ))}
                            </div>
                            {!videos && <Loading />}
                        </div>
                        {isLoadMore && <Loading />}
                    </div>
                )}
            </section>
        </>
    );
};

export default memo(VideoPage);
