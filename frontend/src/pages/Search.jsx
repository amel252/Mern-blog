//                         <label className="whitespace-nowrap font-semibold">
//                             Le mot recherché
//                         </label>
//
//                     <div className="flex items-center gap-2">
//                         <label className="font-semibold">Sort:</label>
//
//                             <option value="desc">Les plus récents</option>
//                             <option value="asc">les plus anciens</option>
//                        >
//                         <label className="font-semibold">Categorie :</label>
//
//                             <option value="uncategorized">
//                                 Non categorizé
//                             </option>
//                             <option value="reactjs">React.js</option>
//                             <option value="nextjs">Next.js</option>
//                             <option value="javascript">Javascript</option>
//
//                         Appliquer les filtres
//
//                 >
//                     Résultat des Postes:
//                 </h1>
//                 <div className="p-7 flex flex-wrap gap-4">
//                     {!loading && posts.length === 0 && (
//                         <p className="text-xl text-gray-500">
//                             postes non trouvé
//                         </p>
//                     )}
//                     {loading && (
//                         <p className="text-xl text-gray-500">Chargement...</p>
//                     )}
//                     {!loading &&
//                         posts &&
//                         posts.map((post) => (
//                             <PostCard key={post._id} post={post} />
//                         ))}
//                     {showMore && (
//                         <button
//                             onClick={handleShowMore}
//                             className="text-teal-500 text-lg hover:underline p-7 w-full"
//                         >
//                             Afficher plus
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
import { TextInput, Select, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        sort: "desc",
        category: "uncategorized",
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const sortFromUrl = urlParams.get("sort");
        const categoryFromUrl = urlParams.get("category");
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData((prev) => ({
                ...prev,
                searchTerm: searchTermFromUrl || "",
                sort: sortFromUrl || "desc",
                category: categoryFromUrl || "uncategorized",
            }));
        }

        const fetchPost = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);

            if (!res.ok) {
                setLoading(false);
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if (data.posts.length === 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            }
        };
        fetchPost();
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === "searchTerm") {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }

        if (e.target.id === "sort") {
            const order = e.target.value || "desc";
            setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === "category") {
            const category = e.target.value || "uncategorized";
            setSidebarData({ ...sidebarData, category });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("searchTerm", sidebarData.searchTerm);
        urlParams.set("sort", sidebarData.sort);
        urlParams.set("category", sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
            return;
        }
        if (res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="searchTerm"
                            className="whitespace-nowrap font-semibold"
                        >
                            Search Term
                        </label>
                        <TextInput
                            id="searchTerm"
                            type="text"
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Trie:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.sort}
                            id="sort"
                        >
                            <option value="desc">Plus récents</option>
                            <option value="asc">Plus anciens</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Category:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.category}
                            id="category"
                        >
                            <option value="uncategorized">
                                Non catégorisée
                            </option>
                            <option value="reactjs">React.js</option>
                            <option value="nextjs">Next.js</option>
                            <option value="javascript">Javascript</option>
                        </Select>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <Button color="blue" type="submit">
                            Filtres
                        </Button>
                    </div>
                </form>
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
                    Resultats des postes
                </h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && posts.length === 0 && (
                        <p>Postes non trouvés</p>
                    )}
                    {loading && (
                        <p className="text-xl text-gray-500">Chargement...</p>
                    )}
                    {!loading &&
                        posts &&
                        posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="text-teal-500 text-lg hover:underline p-7 w-full"
                        >
                            Affiche +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
