import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
    // on va récupérer plusieurs posts
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/post/getPosts");
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    });
    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className="text-3xl font-blod lg:text-6xl">
                    Bienvenue sur mon site de blog{" "}
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm">
                    Notre site est un site éditorial dédié aux développeurs qui
                    veulent apprendre vite et bien. Nous publions des articles
                    techniques, des tutoriels pas à pas et des retours
                    d’expérience couvrant le front‑end, le back‑end, le cloud,
                    l’IA et les bonnes pratiques d’ingénierie. Notre promesse :
                    du contenu à jour, applicable en production, et rédigé par
                    des praticiens
                </p>
                <Link
                    to="/search"
                    className="text-xs sm:text-sm text-teal-500 font-blod hover:underline"
                >
                    Voir tous les les posts
                </Link>
                <div className="p-3 bg-amber-100 dark:bg-slate-700">
                    <CallToAction />
                </div>
                <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
                    {posts && posts.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <h2 className="text-2xl font-semiblod text-center-center">
                                Posts récents
                                {/* className" */}
                            </h2>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {posts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                            <Link
                                to={"/search"}
                                className="text-lg text-teal-500 hover:underline text-center"
                            >
                                Voir tous les posts
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
