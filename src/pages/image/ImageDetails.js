import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import worksApis from '../../api/baseAdmin/works';
import '../../assets/css/_images.css';
import ImageLink from '../../components/_common/images/imageLink';
import Loading from '../../components/loading';
import { MySwal, scrollToTop, setTitle } from '../../helpers/common';
const ImageDetails = () => {
    const { id } = useParams();
    const [images, setImages] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingMore = useRef(false);
    const [isLoadFirst, setIsLoadFirst] = useState(true);
    const [zoom, setZoom] = useState(7);
    const navigate = useNavigate();
    useEffect(() => {
        if (document.body.clientWidth <= 940 && document.body.clientWidth > 650) setZoom(8);
        if (document.body.clientWidth <= 650 && document.body.clientWidth > 500) setZoom(9);
        if (document.body.clientWidth < 500) setZoom(10);
        setIsLoadFirst(false);
    }, []);
    useEffect(() => {
        async function loadMore() {
            if (!images || images.page === images.pages) return;
            const y = window.pageYOffset + window.innerHeight;
            const last = document.body.clientHeight;
            if (last - y < 100 && !isLoadingMore.current) {
                setIsLoadMore(true);
                isLoadingMore.current = true;
                const res = await worksApis.getByRecommended(id, { page: images.page + 1 });
                if (res.success)
                    setImages({
                        page: res.data.page,
                        pages: res.data.pages,
                        docs: [...images.docs, [...res.data.docs]],
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
    }, [id, images]);
    useEffect(() => {
        scrollToTop();
        async function fetchData() {
            setIsLoading(true);
            const res = await worksApis.getById(id);
            if (res.success) {
                setImage(res.data);
                setTitle(res.data.title);
                setIsLoading(false);
            } else if (res.status === 404)
                MySwal.fire({
                    title: '404 not found',
                    html: 'The images does not exist or has been deleted',
                    icon: 'error',
                    allowOutsideClick: false,
                }).then(() => {
                    navigate('/images');
                });
            else
                MySwal.fire({
                    title: 'Error: ' + res.status,
                    html: res.message,
                    icon: 'error',
                    allowOutsideClick: false,
                }).then(() => {
                    navigate('/images');
                });
        }
        if (id) fetchData();
        async function loadRecommended() {
            const res = await worksApis.getByRecommended(id);
            if (res.success) setImages(res.data);
        }
        if (id) loadRecommended();
    }, [id]);
    if (!image || isLoading)
        return (
            <section className="image-details">
                <div style={{ paddingTop: '100px' }}>
                    <Loading />
                </div>
            </section>
        );
    return (
        <>
            <section className="image-details">
                <div className="top">
                    <div className="title">{image.title}</div>
                    <div className="zoom">
                        <span
                            id="minus"
                            className={zoom === 1 ? 'disable' : ''}
                            onClick={() => {
                                const btn = document.getElementById('minus');
                                if (btn.classList.contains('disable')) return;
                                setZoom((prev) => prev - 1);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </span>
                        <div className="slidecontainer">
                            <input
                                type="range"
                                min={1}
                                max={10}
                                value={zoom}
                                className="slider"
                                onChange={(e) => {
                                    setZoom(e.target.value);
                                }}
                            />
                        </div>
                        <span
                            id="add"
                            className={zoom === 1 ? 'disable' : ''}
                            onClick={() => {
                                const btn = document.getElementById('add');
                                if (btn.classList.contains('disable')) return;
                                setZoom((prev) => prev + 1);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </span>
                    </div>
                    {!isLoadFirst && (
                        <div className={'list-images'}>
                            <ImageList variant="masonry" cols={11 - zoom} gap={8}>
                                {image.images.map((item) => (
                                    <ImageListItem key={item}>
                                        <img srcSet={`${item}`} src={`${item}`} alt={item} loading="lazy" />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                    )}
                </div>
                <div className="middle"></div>
                <div className="bottom">
                    <div className="bottom__recommended-videos">
                        <h1 className="title">Recommended Images</h1>
                        <div className="bottom__big-video">
                            {images &&
                                images.docs.map((image, index) => (
                                    <div className="item" key={index}>
                                        <ImageLink image={image} />
                                    </div>
                                ))}
                        </div>
                        {!images && <Loading />}
                    </div>
                    {isLoadMore && <Loading />}
                </div>
            </section>
        </>
    );
};

export default memo(ImageDetails);
