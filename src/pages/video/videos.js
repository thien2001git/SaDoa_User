import { memo, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import worksApis from '../../api/baseAdmin/works';
import '../../assets/css/_videos.css';
import VideoLink from '../../components/_common/video/videoLink';
import Loading from '../../components/loading';
import { scrollToTop, setTitle } from '../../helpers/common';
import { SORT_OPTIONS } from '../../helpers/constants';
const VideosPage = () => {
    const [sort, setSort] = useState(SORT_OPTIONS[0]);
    const [page, setPage] = useState({ label: 'Page 1', value: 1 });
    const [videos, setVideos] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isLoadingMore = useRef(false);
    const [Page_Option, setPage_Option] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const res = await worksApis.get({ type: 1, sort: sort.value, page: parseInt(searchParams.get('page')) });
            if (res.success) {
                setVideos(res.data);
                const p = [];
                for (let i = 0; i < res.data.pages; i++) {
                    p.push({
                        label: 'Page ' + (i + 1),
                        value: i + 1,
                    });
                }
                setPage_Option(p);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [sort.value]);
    useEffect(() => {
        async function loadMore() {
            if (!videos || videos.page === videos.pages || isLoading) return;
            const y = window.pageYOffset + window.innerHeight;
            const last = document.body.clientHeight;
            if (last - y < 100 && !isLoadingMore.current) {
                setSearchParams({
                    page: videos.page + 1,
                    sort: searchParams.get('sort') || 0,
                });
                setIsLoadMore(true);
                isLoadingMore.current = true;
                const res = await worksApis.get({ type: 1, page: videos.page + 1, sort: sort.value });
                if (res.success) {
                    setVideos({
                        page: res.data.page,
                        pages: res.data.pages,
                        docs: [...videos.docs, ...res.data.docs],
                        limit: res.data.limit,
                    });
                    setPage(Page_Option[videos.page]);
                }
                isLoadingMore.current = false;
                setIsLoadMore(false);
            }
        }
        document.addEventListener('scroll', loadMore);
        return () => {
            document.removeEventListener('scroll', loadMore);
        };
    }, [Page_Option, isLoading, sort.value, videos]);
    useEffect(() => {
        setTitle('Videos');
        scrollToTop(document.getElementById('shopify-section-header')?.clientHeight);
        const p = parseInt(searchParams.get('page')) || 1;
        const s = parseInt(searchParams.get('sort')) || 0;
        setPage({ label: 'Page ' + p, value: p });
        setSort(SORT_OPTIONS[s] || SORT_OPTIONS[0]);
    }, []);
    return (
        <>
            <section className="videos">
                <div className="title">Videos</div>
                <div className="filter">
                    <div className="start">
                        <Select
                            isSearchable={false}
                            options={SORT_OPTIONS}
                            value={sort}
                            onChange={(select) => {
                                setSort(select);
                                setPage(Page_Option[0]);
                                setSearchParams((prev) => ({ ...prev, sort: select.value }));
                            }}
                        />
                    </div>
                    <div className="center"></div>
                    <div className="end">
                        <Select
                            isSearchable={false}
                            options={Page_Option}
                            value={page}
                            onChange={async (select) => {
                                setPage(select);
                                setSearchParams({
                                    page: videos.page + 1,
                                    sort: searchParams.get('sort') || 0,
                                });
                                setIsLoading(true);
                                const res = await worksApis.get({ type: 1, page: select.value, sort: sort.value });
                                if (res.success) {
                                    setVideos(res.data);
                                }
                                setIsLoading(false);
                            }}
                        />
                    </div>
                </div>
                {isLoading && (
                    <div className="videos-list">
                        <div style={{ paddingTop: '50px' }}>
                            <Loading />
                        </div>
                    </div>
                )}
                {!isLoading && (
                    <div className="videos-list">
                        <div className="videos-list__row">
                            {videos &&
                                videos.docs.map((video, index) => (
                                    <div className="item" key={index}>
                                        <VideoLink video={video} />
                                    </div>
                                ))}
                        </div>
                        {!videos && <Loading />}
                    </div>
                )}
                {isLoadMore && <Loading />}
            </section>
        </>
    );
};
export default memo(VideosPage);
