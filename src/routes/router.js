import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/error-page';
import ImageDetails from '../pages/image/ImageDetails';
import ImagesPage from '../pages/image/image';
import Index from '../pages/index';
import Layout from '../pages/layout';
import Search from '../pages/search/search';
import VideoDetails from '../pages/video/VideoDetails';
import VideosPage from '../pages/video/videos';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/videos',
                children: [
                    { index: true, element: <VideosPage /> },
                    { path: ':id', element: <VideoDetails /> },
                ],
            },
            {
                path: '/images',
                children: [
                    { index: true, element: <ImagesPage /> },
                    { path: ':id', element: <ImageDetails /> },
                ],
            },
            {
                path: '/search',
                children: [{ index: true, element: <Search /> }],
            },
        ],
    },
]);
export default router;
