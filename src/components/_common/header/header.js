import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setTheme } from '../../../features/theme/themeSlice';
const Header = () => {
    const theme = useSelector((state) => state.theme);
    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const openNav = (check) => {
        const section = document.querySelector('.header-navigation');
        const ul = document.querySelector('.mobile-site-nav');
        if (check) {
            section.classList.add('header-navigation--open');
            ul.classList.add('header-navigation--open');
        } else {
            section.classList.remove('header-navigation--open');
            ul.classList.remove('header-navigation--open');
        }
    };
    const handleFormSearch = (e) => {
        e.preventDefault();
        const q = e.target.childNodes[3].value;
        if (q) {
            navigate('/search?q=' + q);
            setIsSearchOpened(false);
        }
    };
    useEffect(() => {
        openNav(false);
    }, [params]);
    return (
        <>
            <div id="shopify-section-header" className="shopify-section">
                <div className="site-header" data-section-id="header" data-section-type="header" role="banner">
                    <header className="header-content container">
                        <div className="page-header page-width">
                            <div className="utils relative utils--center">
                                <button
                                    className="btn btn--plain burger-icon js-mobile-menu-icon hide-for-search"
                                    aria-label="Toggle menu"
                                    style={
                                        !isSearchOpened
                                            ? {}
                                            : {
                                                  display: 'none',
                                              }
                                    }
                                    onClick={() => {
                                        openNav(true);
                                    }}
                                >
                                    <svg
                                        className="icon icon--stroke-only icon--medium icon--type-menu"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                        focusable="false"
                                        role="presentation"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4 12h16M4 6h16M4 18h16"></path>
                                    </svg>
                                </button>
                                {!isSearchOpened && (
                                    <div className="utils__item utils__item--search-icon utils__item--search-center hide-for-search desktop-only">
                                        <Link to="#" className="plain-link js-search-form-open" aria-label="Search">
                                            <span className="icon--header">
                                                <svg
                                                    className="icon icon--stroke-only icon--medium icon--type-search"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsSearchOpened(true);
                                                        setTimeout(() => {
                                                            document.getElementById('open-search-closed').focus();
                                                        }, 10);
                                                    }}
                                                >
                                                    <g>
                                                        <circle cx="11" cy="11" r="8"></circle>
                                                        <path d="m21 21l-4.35-4.35"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <span className="icon-fallback-text">Search</span>
                                        </Link>
                                    </div>
                                )}
                                <div
                                    className="utils__item search-bar desktop-only search-bar--fadein desktop-only"
                                    data-live-search="true"
                                    data-live-search-price="true"
                                    data-live-search-vendor="false"
                                    data-live-search-meta="true"
                                    style={
                                        !isSearchOpened
                                            ? {}
                                            : {
                                                  opacity: 1,
                                                  pointerEvents: 'auto',
                                                  zIndex: 102,
                                              }
                                    }
                                >
                                    <div
                                        className="search-bar__container"
                                        style={
                                            isSearchOpened
                                                ? {}
                                                : {
                                                      display: 'none',
                                                  }
                                        }
                                    >
                                        <button
                                            className="btn btn--plain icon--header search-form__icon js-search-form-open"
                                            aria-label="Open Search"
                                            tabIndex="-1"
                                            style={
                                                !isSearchOpened
                                                    ? {}
                                                    : {
                                                          opacity: 1,
                                                      }
                                            }
                                        >
                                            <svg
                                                className="icon icon--stroke-only icon--medium icon--type-search"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                aria-hidden="true"
                                                focusable="false"
                                                role="presentation"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <g>
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <path d="m21 21l-4.35-4.35"></path>
                                                </g>
                                            </svg>
                                        </button>
                                        <span className="icon-fallback-text">Search</span>

                                        <form
                                            className="search-form"
                                            role="search"
                                            autoComplete="off"
                                            onSubmit={handleFormSearch}
                                        >
                                            <input type="hidden" name="type" defaultValue="product" tabIndex="-1" />
                                            <input
                                                type="hidden"
                                                name="options[prefix]"
                                                defaultValue="last"
                                                tabIndex="-1"
                                            />
                                            <label htmlFor="open-search-closed " className="label-hidden">
                                                Search our store
                                            </label>
                                            <input
                                                type="search"
                                                name="q"
                                                id="open-search-closed"
                                                defaultValue=""
                                                placeholder="Search our store"
                                                className="search-form__input"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                tabIndex="-1"
                                            />
                                            <button
                                                type="submit"
                                                className="btn btn--plain search-form__button"
                                                aria-label="Search"
                                                tabIndex="-1"
                                            ></button>
                                        </form>

                                        <button
                                            className="btn btn--plain feather-icon icon--header search-form__icon search-form__icon-close js-search-form-close"
                                            aria-label="Close"
                                            tabIndex="-1"
                                            style={
                                                !isSearchOpened
                                                    ? {}
                                                    : {
                                                          opacity: 1,
                                                      }
                                            }
                                            onClick={() => {
                                                setIsSearchOpened(false);
                                            }}
                                        >
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                role="presentation"
                                                className="icon feather-x"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M18 6L6 18M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                        <span className="icon-fallback-text">Close search</span>

                                        <div className="search-bar__results"></div>
                                    </div>
                                </div>

                                <h1
                                    className="h1 store-logo hide-for-search hide-for-search-mobile store-logo--image store-logo-desktop--center store-logo-mobile--inline"
                                    itemType="http://schema.org/Organization"
                                    style={
                                        !isSearchOpened
                                            ? {}
                                            : {
                                                  opacity: 0,
                                                  pointerEvents: 'none',
                                              }
                                    }
                                >
                                    <Link to="/" itemProp="url" className="site-logo site-header__logo-image">
                                        <div itemProp="name" content="Bao's Fish Market">
                                            <img
                                                src="/images/logo.png"
                                                alt=""
                                                itemProp="logo"
                                                width="340"
                                                height="272"
                                            />
                                        </div>
                                    </Link>
                                </h1>
                                {!isSearchOpened && (
                                    <div className="utils__right">
                                        <Link
                                            to="#"
                                            className="plain-link utils__item utils__item--search-icon utils__item--search-inline hide-for-search mobile-only js-search-form-open"
                                            aria-label="Search"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsSearchOpened(true);
                                                setTimeout(() => {
                                                    document.getElementById('open-search-closed').focus();
                                                }, 10);
                                            }}
                                        >
                                            <span className="icon--header">
                                                <svg
                                                    className="icon icon--stroke-only icon--medium icon--type-search"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g>
                                                        <circle cx="11" cy="11" r="8"></circle>
                                                        <path d="m21 21l-4.35-4.35"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <span className="icon-fallback-text">Search</span>
                                        </Link>

                                        <div
                                            className="utils__item search-bar mobile-only search-bar--fadein settings-close-mobile-bar"
                                            data-live-search="true"
                                            data-live-search-price="true"
                                            data-live-search-vendor="false"
                                            data-live-search-meta="true"
                                        >
                                            <div className="search-bar__container">
                                                <button
                                                    className="btn btn--plain icon--header search-form__icon js-search-form-open"
                                                    aria-label="Open Search"
                                                    tabIndex="-1"
                                                >
                                                    <svg
                                                        className="icon icon--stroke-only icon--medium icon--type-search"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        role="presentation"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <g>
                                                            <circle cx="11" cy="11" r="8"></circle>
                                                            <path d="m21 21l-4.35-4.35"></path>
                                                        </g>
                                                    </svg>
                                                </button>
                                                <span className="icon-fallback-text">Search</span>

                                                <form
                                                    className="search-form"
                                                    role="search"
                                                    autoComplete="off"
                                                    onSubmit={handleFormSearch}
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="type"
                                                        defaultValue="product"
                                                        tabIndex="-1"
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="options[prefix]"
                                                        defaultValue="last"
                                                        tabIndex="-1"
                                                    />
                                                    <label
                                                        htmlFor="open-search-mobile-closed "
                                                        className="label-hidden"
                                                    >
                                                        Search our store
                                                    </label>
                                                    <input
                                                        type="search"
                                                        name="q"
                                                        id="open-search-mobile-closed "
                                                        defaultValue=""
                                                        placeholder="Search our store"
                                                        className="search-form__input"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        tabIndex="-1"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn--plain search-form__button"
                                                        aria-label="Search"
                                                        tabIndex="-1"
                                                    ></button>
                                                </form>

                                                <button
                                                    className="btn btn--plain feather-icon icon--header search-form__icon search-form__icon-close js-search-form-close"
                                                    aria-label="Close"
                                                    tabIndex="-1"
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        role="presentation"
                                                        className="icon feather-x"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M18 6L6 18M6 6l12 12"></path>
                                                    </svg>
                                                </button>
                                                <span className="icon-fallback-text">Close search</span>
                                                <div className="search-bar__results"></div>
                                            </div>
                                        </div>

                                        <div className="utils__item header-cart hide-for-search">
                                            <Link
                                                to="#"
                                                onClick={() => {
                                                    if (theme === 'light') dispatch(setTheme('dark'));
                                                    else dispatch(setTheme('light'));
                                                }}
                                            >
                                                <span className="icon--header">
                                                    <img
                                                        height="60px"
                                                        width="auto"
                                                        src="https://cdn.shopify.com/s/files/1/0648/5347/5564/files/whale-cart_15eb60bc-8cb7-47d5-8036-d03f21cb519c.svg?v=1682993180"
                                                        alt=""
                                                    />
                                                </span>
                                                {/* <span className="header-cart__count">
                                                    0
                                                </span> */}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <section className="header-navigation container">
                        <nav className="navigation__container page-width">
                            <div className="mobile-menu-utils">
                                <button
                                    className="btn btn--plain close-mobile-menu js-close-mobile-menu"
                                    aria-label="Close"
                                    onClick={() => {
                                        openNav(false);
                                    }}
                                >
                                    <span className="feather-icon icon--header">
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            role="presentation"
                                            className="icon feather-x"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 6L6 18M6 6l12 12"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            <div className="mobile-menu-search-bar">
                                <div
                                    className="utils__item search-bar mobile-only search-bar--fadein mobile-menu-search"
                                    data-live-search="true"
                                    data-live-search-price="true"
                                    data-live-search-vendor="false"
                                    data-live-search-meta="true"
                                >
                                    <div className="search-bar__container">
                                        <button
                                            className="btn btn--plain icon--header search-form__icon js-search-form-open"
                                            aria-label="Open Search"
                                            tabIndex="-1"
                                        >
                                            <svg
                                                className="icon icon--stroke-only icon--medium icon--type-search"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                aria-hidden="true"
                                                focusable="false"
                                                role="presentation"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <g>
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <path d="m21 21l-4.35-4.35"></path>
                                                </g>
                                            </svg>
                                        </button>
                                        <span className="icon-fallback-text">Search</span>

                                        <form
                                            className="search-form"
                                            action="/search"
                                            method="get"
                                            role="search"
                                            autoComplete="off"
                                            onSubmit={handleFormSearch}
                                        >
                                            <input type="hidden" name="type" defaultValue="product" tabIndex="-1" />
                                            <input
                                                type="hidden"
                                                name="options[prefix]"
                                                defaultValue="last"
                                                tabIndex="-1"
                                            />
                                            <label htmlFor="mobile-menu-search" className="label-hidden">
                                                Search our store
                                            </label>
                                            <input
                                                type="search"
                                                name="q"
                                                id="mobile-menu-search"
                                                defaultValue=""
                                                placeholder="Search our store"
                                                className="search-form__input"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                tabIndex="-1"
                                            />
                                            <button
                                                type="submit"
                                                className="btn btn--plain search-form__button"
                                                aria-label="Search"
                                                tabIndex="-1"
                                            ></button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <ul className="nav mobile-site-nav">
                                <li className="mobile-site-nav__item">
                                    <Link to="/" className="mobile-site-nav__link">
                                        Home
                                    </Link>
                                </li>

                                <li className="mobile-site-nav__item">
                                    <Link to="/videos" className="mobile-site-nav__link">
                                        Videos
                                    </Link>
                                </li>

                                <li className="mobile-site-nav__item">
                                    <Link to="/images" className="mobile-site-nav__link">
                                        Images
                                    </Link>

                                    <button
                                        className="btn--plain feather-icon mobile-site-nav__icon"
                                        aria-label="Open dropdown menu"
                                        onClick={() => {
                                            const btn = document.querySelector('.btn--plain');
                                            if (!btn.classList.contains('submenu-open')) {
                                                document.querySelector('.mobile-site-nav__menu').style.display =
                                                    'block';
                                                btn.classList.add('submenu-open');
                                            } else {
                                                document.querySelector('.mobile-site-nav__menu').style.display = 'none';
                                                btn.classList.remove('submenu-open');
                                            }
                                        }}
                                    >
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            role="presentation"
                                            className="icon feather-icon feather-chevron-down"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </button>

                                    <ul className="mobile-site-nav__menu">
                                        {category &&
                                            category.map((cat, index) => (
                                                <li key={index} className="mobile-site-nav__item">
                                                    <Link
                                                        to={'/images?category=' + cat.value}
                                                        className="mobile-site-nav__link"
                                                    >
                                                        {cat.label}
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </li>

                                <li className="mobile-site-nav__item">
                                    <Link
                                        to="#"
                                        className="mobile-site-nav__link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.alert('This information is being kept confidential');
                                        }}
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>

                            <div className="header-social-icons">
                                <div className="social-links">
                                    <ul className="social-links__list">
                                        <li>
                                            <Link
                                                aria-label="Twitter"
                                                className="twitter"
                                                target="_blank"
                                                rel="noopener"
                                                to="https://twitter.com/baovtuber"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    className="icon svg-twitter"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M23.954 4.569a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 0 0 2.46-2.548l-.047-.02z"></path>
                                                </svg>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                aria-label="Youtube"
                                                className="youtube"
                                                target="_blank"
                                                rel="noopener"
                                                to="https://www.youtube.com/c/baovtuber"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    className="icon svg-youtube"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        className="a"
                                                        d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"
                                                    ></path>
                                                </svg>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                aria-label="Tiktok"
                                                className="tiktok"
                                                target="_blank"
                                                rel="noopener"
                                                to="https://www.tiktok.com/@baovtuber"
                                            >
                                                <svg
                                                    className="icon svg-tiktok"
                                                    width="15"
                                                    height="16"
                                                    viewBox="0 0 15 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M7.63849 0.0133333C8.51182 0 9.37849 0.00666667 10.2452 0C10.2985 1.02 10.6652 2.06 11.4118 2.78C12.1585 3.52 13.2118 3.86 14.2385 3.97333V6.66C13.2785 6.62667 12.3118 6.42667 11.4385 6.01333C11.0585 5.84 10.7052 5.62 10.3585 5.39333C10.3518 7.34 10.3652 9.28667 10.3452 11.2267C10.2918 12.16 9.98516 13.0867 9.44516 13.8533C8.57183 15.1333 7.05849 15.9667 5.50516 15.9933C4.55183 16.0467 3.59849 15.7867 2.78516 15.3067C1.43849 14.5133 0.491825 13.06 0.351825 11.5C0.338492 11.1667 0.331825 10.8333 0.345158 10.5067C0.465158 9.24 1.09183 8.02667 2.06516 7.2C3.17183 6.24 4.71849 5.78 6.16516 6.05333C6.17849 7.04 6.13849 8.02667 6.13849 9.01333C5.47849 8.8 4.70516 8.86 4.12516 9.26C3.70516 9.53333 3.38516 9.95333 3.21849 10.4267C3.07849 10.7667 3.11849 11.14 3.12516 11.5C3.28516 12.5933 4.33849 13.5133 5.45849 13.4133C6.20516 13.4067 6.91849 12.9733 7.30516 12.34C7.43182 12.12 7.57182 11.8933 7.57849 11.6333C7.64516 10.44 7.61849 9.25333 7.62516 8.06C7.63182 5.37333 7.61849 2.69333 7.63849 0.0133333Z"
                                                    ></path>
                                                </svg>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                aria-label="Twitch"
                                                className="twitch"
                                                target="_blank"
                                                rel="noopener"
                                                to="https://www.twitch.tv/baoo"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    className="icon svg-twitch"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"></path>
                                                </svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <ul className="nav site-nav site-nav--center">
                                <li
                                    className={
                                        'site-nav__item ' + (window.location.pathname === '/' ? 'site-nav--active' : '')
                                    }
                                >
                                    <Link to="/" className="site-nav__link">
                                        Home
                                    </Link>
                                </li>

                                <li
                                    className={
                                        'site-nav__item ' +
                                        (window.location.pathname === '/videos' ? 'site-nav--active' : '')
                                    }
                                >
                                    <Link to="/videos" className="site-nav__link">
                                        Videos
                                    </Link>
                                </li>

                                <li
                                    className={
                                        'site-nav__item site-nav__item--has-dropdown site-nav__item--smalldropdown ' +
                                        (window.location.pathname === '/images' ||
                                        window.location.pathname === '/images/'
                                            ? 'site-nav--active'
                                            : '')
                                    }
                                >
                                    <Link
                                        to="/images"
                                        className="site-nav__link "
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Images
                                        <span className="feather-icon site-nav__icon">
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                role="presentation"
                                                className="icon feather-icon feather-chevron-down"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </Link>
                                    <div className="site-nav__dropdown js-mobile-menu-dropdown small-dropdown">
                                        <ul className="small-dropdown__container">
                                            {category &&
                                                category.map((cat, index) => (
                                                    <li key={index} className="small-dropdown__item">
                                                        <Link
                                                            to={'/images?category=' + cat.value}
                                                            className="site-nav__link site-nav__dropdown-link"
                                                        >
                                                            {cat.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </li>

                                <li className="site-nav__item">
                                    <Link
                                        to="#"
                                        className="site-nav__link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.alert('This information is being kept confidential');
                                        }}
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </div>
            </div>
            {isSearchOpened && (
                <Link
                    to="#"
                    className="focus-tint"
                    aria-hidden="true"
                    aria-label="Close"
                    style={{
                        opacity: 1,
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                        visibility: 'visible',
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsSearchOpened(false);
                    }}
                ></Link>
            )}
        </>
    );
};
export default memo(Header);
