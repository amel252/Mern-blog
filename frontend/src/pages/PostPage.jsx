// import { FaDribbble } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/commentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
    const [post, setPost] = useState(null);
    console.log(post);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recentPosts, setRecentPosts] = useState(null);
    const { postSlug } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                console.log(data);

                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
                console.log(error);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPost = async () => {
                const res = await fetch(`/api/post/getposts/?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            };
            fetchRecentPost();
        } catch (error) {
            console.log(error);
        }
    }, []);
    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    return (
        // ce code va center tous les élements
        <main className="min-h-screen p-3 flex flex-col max-w-6xl mx-auto">
            <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl ">
                {post && post.title}
            </h1>
            <Link
                className="self-center mt-5"
                to={`/search?category=${post && post.category}`}
            >
                <Button
                    className="mx-auto w-full sm:w-fit px-6 py-3 text-lg font-semibold"
                    color="gray"
                    pill
                    size="xs"
                >
                    {post && post.category}
                </Button>
            </Link>
            <img
                className="mt-10 p-3 max-h-[500px] w-full object-cover"
                src={post && post.image}
                alt={post && post.title}
            />
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>
                    {post && new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span>
                    {post && (post.content.length / 1000).toFixed(0)} mins de
                    lecture
                </span>
            </div>
            {/* <div className="p-3 mx-auto max-w-2xl w-full post-content dangerouslySetInnerHTML={{_html:post && post.content}} "></div> */}
            <div
                className="p-3 mx-auto max-w-2xl w-full post-content"
                dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></div>

            <div className="max-w-4xl mx-auto w-full">
                <CallToAction />
            </div>
            {post && <CommentSection postId={post._id} />}
            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl m-5">Les articles recentes</h1>
                <div className="flex flex-wrap gap-5 mt-5 justify-center">
                    {recentPosts &&
                        recentPosts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                </div>
            </div>
        </main>
    );
}
