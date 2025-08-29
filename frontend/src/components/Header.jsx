import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaBars, FaTimes, FaSun } from "react-icons/fa";
import { Avatar, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} from "../redux/user/userSlice";

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    // voir si le mot recherché et mettre dans l'url
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);
    // déconnexion
    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch("./api/auth/signout");
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data.message));
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("searchTerm", searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    return (
        <nav className="border-b-2 bg-white dark:bg-gray-900 dark:text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="font-semibold text-xl flex items-center"
                >
                    <span className="px-5 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                        Blog
                    </span>
                    Web
                </Link>

                {/* Search bar - hidden on mobile */}
                <form
                    onSubmit={handleSubmit}
                    className="hidden lg:flex items-center border rounded-md overflow-hidden"
                >
                    <input
                        type="text"
                        placeholder="Recherche..."
                        className="px-3 py-1 outline-none dark:bg-gray-800 dark:text-white"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="px-3 text-gray-600 dark:text-gray-300 hover:text-indigo-500"
                    >
                        <AiOutlineSearch size={20} />
                    </button>
                </form>

                {/* Search icon button - shown only on mobile */}
                <Button
                    className="w-10 h-10 lg:hidden flex items-center justify-center"
                    color="gray"
                    pill
                    onClick={() => alert("Search clicked")}
                    aria-label="search"
                >
                    <AiOutlineSearch />
                </Button>

                {/* Right side */}
                <div className="flex items-center gap-3 md:order-2">
                    {/* Theme toggle button */}
                    <button
                        className="p-2 border border-gray-300 rounded-full hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition flex items-center justify-center"
                        color="gray"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label="toggle theme"
                    >
                        {theme === "light" ? <FaSun /> : <FaMoon />}
                    </button>

                    {/* User menu or Sign In */}
                    {currentUser ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                aria-label="user menu"
                            >
                                <Avatar
                                    img={currentUser.profilePicture}
                                    rounded
                                    alt="User avatar"
                                    className="rounded-full"
                                />
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
                                    <div className="px-4 py-2 border-b dark:border-gray-700">
                                        <p className="text-sm font-semibold">
                                            @{currentUser.username}
                                        </p>
                                        <p className="text-xs truncate">
                                            @{currentUser.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigate("/dashboard?tab=profile");
                                            setUserMenuOpen(false);
                                        }}
                                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                                    >
                                        Profil
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/sign-in">
                            <Button gradientduotone="purpleToBlue" outline>
                                Connexion
                            </Button>
                        </Link>
                    )}

                    {/* Hamburger menu toggle */}
                    <button
                        className="ml-2 inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <FaTimes size={24} />
                        ) : (
                            <FaBars size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        to="/"
                        className={`block px-4 py-2 border-b dark:border-gray-700 ${
                            path === "/"
                                ? "bg-indigo-100 dark:bg-indigo-700 font-bold"
                                : ""
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/about"
                        className={`block px-4 py-2 border-b dark:border-gray-700 ${
                            path === "/about"
                                ? "bg-indigo-100 dark:bg-indigo-700 font-bold"
                                : ""
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        A propos
                    </Link>
                    <Link
                        to="/projects"
                        className={`block px-4 py-2 border-b dark:border-gray-700 ${
                            path === "/projects"
                                ? "bg-indigo-100 dark:bg-indigo-700 font-bold"
                                : ""
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Projets
                    </Link>
                </div>
            )}
        </nav>
    );
}
