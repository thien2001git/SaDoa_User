import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import categoryApis from '../api/baseAdmin/category';
import '../assets/css/more.css';
import '../assets/css/styles.css';
import '../assets/css/theme.css';
import Header from '../components/_common/header/header';
import { setInitialValue } from '../features/category/categorySlice';

export default function Layout() {
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    useEffect(() => {
        if (theme) {
            document.body.classList.add(theme + '-theme');
            if (theme === 'dark') document.body.classList.remove('light-theme');
            else document.body.classList.remove('dark-theme');
        }
    }, [theme]);
    useEffect(() => {
        async function fetchData() {
            const res = await categoryApis.get();
            if (res.success) {
                const a = [];
                res.data.docs.forEach((cat) =>
                    a.push({
                        value: cat.title,
                        label: cat.title,
                    })
                );
                dispatch(setInitialValue(a));
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
