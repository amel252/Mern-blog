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
    Modal,
    ModalHeader,
    ModalBody,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState("");

    useEffect(() => {
        const getUserPosts = async () => {
            try {
                const res = await fetch(
                    `/api/post/getposts?userId=${currentUser._id}`
                );
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
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
                `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
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
    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
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
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setPostIdToDelete(post._id);
                                            }}
                                            className="font-medium text-red-500 hover:underline cursor-center "
                                        >
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
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle
                            className="h-14 w-14 text-red-400
                          dark:text-gray-200 mb-4 mx-auto"
                        />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                            Vous etes sur de supprimer votre article ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeletePost}>
                                oui , je suis sur
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setShowModal(false)}
                            >
                                Non, j'annule
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}
