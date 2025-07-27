import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        const getUserPosts = async () => {
            try {
                const res = await fetch(
                    `/api/post/getposts?userId=${currentUser._id}`
                );
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.post.lengt < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.error("Erreur lors du chargement des posts :", error);
            }
        };

        if (currentUser?._id) {
            getUserPosts();
        }
    }, [currentUser]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `/api/post/getposts?userid=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            // si tout est ok
            if (res.ok) {
                // on prend l'ancienne version et on rajoute les modif
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <TableHead>
                            <TableHeadCell>Date </TableHeadCell>
                            <TableHeadCell>Image</TableHeadCell>
                            <TableHeadCell>Titre</TableHeadCell>
                            <TableHeadCell>Catégorie</TableHeadCell>
                            <TableHeadCell>Supprimer</TableHeadCell>
                            <TableHeadCell>Éditer</TableHeadCell>
                        </TableHead>
                        {userPosts.map((post) => (
                            <TableBody className="divide-y" key={post._id}>
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>
                                        {new Date(
                                            post.updatedAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-20 h-10 object-cover gb-gray-500"
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className="font-medium text-gray-900 dark:text-white"
                                            to={`/post/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>
                                        <span className="font-medium text-red-500 hover:underline cursor-center ">
                                            Supprimer
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className="text-teal-500 hover:underline"
                                            to={`/update/post/${post._id}`}
                                        >
                                            <span>Editer</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                    {showMore && (
                        <button
                            className="w-full text-teal-500 self-center text-sm py-7"
                            onClick={handleShowMore}
                        >
                            Affiche +{" "}
                        </button>
                    )}
                </>
            ) : (
                <p>Vous n'avez pas d'articles </p>
            )}
            <div></div>
        </div>
    );
}
