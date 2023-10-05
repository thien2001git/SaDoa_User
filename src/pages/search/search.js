import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import worksApis from '../../api/baseAdmin/works';
import '../../assets/css/_images.css';
import ImageLink from '../../components/_common/images/imageLink';
import Loading from '../../components/loading';
import { scrollToTop, setTitle } from '../../helpers/common';
import { SORT_OPTIONS } from '../../helpers/constants';
const Page_One = { label: 'Page 1', value: 1 };
const Search = () => {
    const CATEGORY = useSelector((state) => state.category);
    const [cats, setCats] = useState([
        {
            label: 'All',
            value: 'all',
        },
    ]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(SORT_OPTIONS[0]);
    const [page, setPage] = useState(Page_One);
    const [category, setCategory] = useState(null);
    const [q, setQ] = useState(searchParams.get('q'));
    const [images, setImages] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isLoadingMore = useRef(false);
    const [Page_Option, setPage_Option] = useState([]);

    const loadMore = useMemo(() => {
        return async () => {
            if (!images || images.page === images.pages || isLoading) return;
            const y = window.pageYOffset + window.innerHeight;
            const last = document.body.clientHeight;
            if (last - y < 100 && !isLoadingMore.current) {
                setIsLoadMore(true);
                isLoadingMore.current = true;
                const res = await worksApis.get({
                    type: -1,
                    page: images.page + 1,
                    sort: sort.value,
                    category: category?.value === 'all' ? null : category?.value,
                });
                if (res.success) {
                    setImages({
                        page: res.data.page,
                        pages: res.data.pages,
                        docs: [...images.docs, ...res.data.docs],
                        limit: res.data.limit,
                    });
                }
                isLoadingMore.current = false;
                setIsLoadMore(false);
            }
        };
    }, [category, images, isLoading, sort]);
    useEffect(() => {
        document.addEventListener('scroll', loadMore);
        return () => {
            document.removeEventListener('scroll', loadMore);
        };
    }, [loadMore]);
    //Số trang thay đổi
    useEffect(() => {
        const params = {};
        if (page.value !== 1) params.page = page.value;
        if (sort.value !== 0) params.sort = sort.value;
        if (category && category.value.toLowerCase() !== 'all') params.category = category.value;
        if (q) params.q = q;
        setSearchParams(params);
        async function fetchData() {
            setIsLoading(true);
            const res = await worksApis.get({
                ...params,
                type: -1,
            });
            console.log(res);

            if (res.success) {
                if (res.data.pages !== images?.pages) {
                    const newPages = [];
                    for (let i = 0; i < res.data.pages; i++) newPages.push({ value: i + 1, label: 'Page ' + (i + 1) });
                    setPage_Option(newPages);
                }
                setIsLoading(false);
                setImages(res.data);
            }
        }
        fetchData();
    }, [page, category, sort, q]);
    //Danh mục thay đổi
    useEffect(() => {
        setPage(Page_One);
    }, [category]);
    //Sắp xếp thay đổi
    useEffect(() => {
        setPage(Page_One);
    }, [sort]);
    //Từ khoá thay đổi
    useEffect(() => {
        console.log(q);
        setPage(Page_One);
    }, [q]);
    //Todo: Load lần 1?
    useEffect(() => {
        setTitle('Search');
        scrollToTop();
        const p = parseInt(searchParams.get('page')) || 1;
        const s = parseInt(searchParams.get('sort')) || 0;
        if (page.value !== p) setPage({ label: 'Page ' + p, value: p });
        if (sort.value !== s) setSort(SORT_OPTIONS[s] || SORT_OPTIONS[0]);
        if (q !== searchParams.get('q')) setQ(searchParams.get('q'));
    }, []);
    //Todo: Khi danh mục ở đường dẫn thay đổi
    useEffect(() => {
        if (searchParams.get('category') && category && searchParams.get('category') !== category.value) {
            setCategory({ label: searchParams.get('category'), value: searchParams.get('category') });
        }
        if (q !== searchParams.get('q')) setQ(searchParams.get('q'));
    }, [searchParams]);
    //Todo: Load danh mục - xong
    useEffect(() => {
        setCats((prev) => [...prev, ...CATEGORY]);
        setCategory(
            searchParams.get('category')
                ? {
                      value: searchParams.get('category'),
                      label: searchParams.get('category'),
                  }
                : {
                      label: 'All',
                      value: 'all',
                  }
        );
    }, [CATEGORY]);
    return (
        <>
            <section className="images">
                <div className="title">Search: {searchParams.get('q') ?? '(all)'}</div>
                <div className="filter">
                    <div className="start">
                        <div>
                            <Select
                                isSearchable={false}
                                options={cats}
                                value={category}
                                onChange={(select) => {
                                    setCategory(select);
                                }}
                            />
                        </div>
                        <div>
                            <Select
                                isSearchable={false}
                                options={SORT_OPTIONS}
                                value={sort}
                                onChange={(select) => {
                                    setSort(select);
                                }}
                            />
                        </div>
                        <div className="start__page">
                            <Select
                                isSearchable={false}
                                options={Page_Option}
                                value={page}
                                onChange={(select) => {
                                    if (select.value !== page.value) setPage(select);
                                }}
                            />
                        </div>
                    </div>
                    <div className="center"></div>
                    <div className="end">
                        <Select
                            isSearchable={false}
                            options={Page_Option}
                            value={page}
                            onChange={(select) => {
                                if (select.value !== page.value) setPage(select);
                            }}
                        />
                    </div>
                </div>
                {isLoading && (
                    <div style={{ paddingTop: '30px' }}>
                        <Loading />
                    </div>
                )}
                {!isLoading && (
                    <>
                        {images.docs.length === 0 && (
                            <div className="images-list">
                                <div className="search-empty">
                                    <h4>There are no works matching your search</h4>
                                    <Link to={'/search?category=all'}>See all</Link>
                                </div>
                            </div>
                        )}
                        <div className="images-list">
                            <div className="images-list__row">
                                {images &&
                                    images.docs.map((item, index) => (
                                        <div className="item" key={index}>
                                            <ImageLink image={item} />
                                        </div>
                                    ))}
                            </div>
                            {!images && <Loading />}
                        </div>
                        {isLoadMore && <Loading />}
                    </>
                )}
            </section>
        </>
    );
};
export default memo(Search);
