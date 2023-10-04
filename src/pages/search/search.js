import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import '../../assets/css/_images.css';
import VideoLink from '../../components/_common/video/videoLink';
import Loading from '../../components/loading';
import { scrollToTop, setTitle } from '../../helpers/common';
import { SORT_OPTIONS } from '../../helpers/constants';
const Page_Option = [
    { label: 'Page 1', value: 1 },
    { label: 'Page 2', value: 2 },
    { label: 'Page 3', value: 3 },
];
const Search = () => {
    const CAT = useSelector((state) => state.category);
    const [sort, setSort] = useState(SORT_OPTIONS[0]);
    const [category, setCategory] = useState(null);
    const [page, setPage] = useState({ label: 'Page 1', value: 1 });
    const [videos, setVideos] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const isLoadingMore = useRef(false);
    const pageCurrent = useRef(page.value);
    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        setTitle((searchParams.get('q') ?? 'Empty') + ' - Search');
        scrollToTop();
        setVideos([
            {
                id: '5AKSV27a',
            },
            {
                id: 'brWeWsJJ',
            },
            {
                id: '5AKSV27a',
            },
            {
                id: 'brWeWsJJ',
            },
            {
                id: '5AKSV27a',
            },
            {
                id: 'brWeWsJJ',
            },
            {
                id: '5AKSV27a',
            },
            {
                id: 'brWeWsJJ',
            },
        ]);
        function loadMore() {
            const y = window.pageYOffset + window.innerHeight;
            const last = document.body.clientHeight;
            if (last - y < 100 && !isLoadingMore.current) {
                setIsLoadMore(true);
                isLoadingMore.current = true;
                setTimeout(() => {
                    setVideos((pre) => [
                        ...pre,
                        {
                            id: '5AKSV27a',
                        },
                        {
                            id: 'brWeWsJJ',
                        },
                        {
                            id: '5AKSV27a',
                        },
                        {
                            id: 'brWeWsJJ',
                        },
                        {
                            id: '5AKSV27a',
                        },
                        {
                            id: 'brWeWsJJ',
                        },
                        {
                            id: '5AKSV27a',
                        },
                        {
                            id: 'brWeWsJJ',
                        },
                    ]);
                    isLoadingMore.current = false;
                    setIsLoadMore(false);
                    setPage(Page_Option[pageCurrent.current++]);
                }, 1000);
            }
        }
        document.addEventListener('scroll', loadMore);
        return () => {
            document.removeEventListener('scroll', loadMore);
        };
    }, []);
    useEffect(() => {}, [category]);
    return (
        <>
            <section className="images">
                <div className="title">Search results for: {searchParams.get('q') ?? ''}</div>
                <div className="filter">
                    <div className="start">
                        <div>
                            <Select
                                isSearchable={false}
                                options={
                                    CAT ? [{ label: 'All', value: 'all' }, ...CAT] : [{ label: 'All', value: 'all' }]
                                }
                                value={category}
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            />
                        </div>
                        <div>
                            <Select
                                isSearchable={false}
                                options={SORT_OPTIONS}
                                value={sort}
                                onChange={(value) => {
                                    setSort(value);
                                }}
                            />
                        </div>
                        <div className="start__page">
                            <Select isSearchable={false} options={Page_Option} value={page} />
                        </div>
                    </div>
                    <div className="center"></div>
                    <div className="end">
                        <Select isSearchable={false} options={Page_Option} value={page} />
                    </div>
                </div>
                <div className="images-list">
                    <div className="images-list__row">
                        {videos &&
                            videos.map((video, index) => (
                                <div className="item" key={index}>
                                    <VideoLink videoId={video.id} />
                                </div>
                            ))}
                    </div>
                    {!videos && <Loading />}
                </div>
                {isLoadMore && <Loading />}
            </section>
        </>
    );
};
export default memo(Search);
