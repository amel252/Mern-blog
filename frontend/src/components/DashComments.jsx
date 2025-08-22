import { React, useState, useEffect } from "react";
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
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashComments() {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    // montrer  plus de commentaires
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                // chemin de notre requete API backend
                const res = await fetch("/api/comment/getcomments");
                // réponse du serveur
                const data = await res.json();
                // si c'est ok
                if (res.ok) {
                    setComments(data.comments);
                    if (data.comments.length > 9) {
                        setShowMore(false);
                    }
                }
            } catch {
                console.log(error.message);
            }
        };
        //je l'ai appellé a l'interieur de la condition
        if (currentUser?.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id]);
    // afficher plus de commentaire
    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(
                `/api/comment/getcomments?startIndex=${startIndex}`
            );
            const data = await res.json();
            // si tout est ok
            if (res.ok) {
                // on prend l'ancienne version et on rajoute les modif
                setComments((prev) => [...prev, ...data.comments]);
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    // supp comments dans dashboard
    const handleDeleteComment = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `/api/comment/deleteComment/${commentIdToDelete}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                setComments((prev) =>
                    prev.filter((comment) => comment._id !== commentIdToDelete)
                );
                setShowModal(false);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>
                                    Date de mise à jour
                                </TableHeadCell>
                                <TableHeadCell>Commentaire</TableHeadCell>
                                <TableHeadCell>Nombre de j'aime</TableHeadCell>
                                <TableHeadCell>l'id du post</TableHeadCell>
                                <TableHeadCell>
                                    l'id de l'utilisateur
                                </TableHeadCell>
                                <TableHeadCell>Supprimer</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {comments.map((comment) => (
                                <TableRow
                                    key={comment._id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <TableCell>
                                        {new Date(
                                            comment.updatedAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{comment.content}</TableCell>
                                    <TableCell>
                                        {comment.numberOfLikes}
                                    </TableCell>
                                    <TableCell>{comment.postId}</TableCell>
                                    <TableCell>{comment.userId}</TableCell>

                                    <TableCell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setCommentIdToDelete(
                                                    comment._id
                                                );
                                            }}
                                            className="font-medium text-red-500 hover:underline cursor-pointer"
                                        >
                                            Supprimer
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {showMore && (
                        <button
                            className="w-full text-teal-500 self-center text-sm py-7"
                            onClick={handleShowMore}
                        >
                            Affiche plus de commentaires{" "}
                        </button>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-500">
                    Aucun utilisateur trouvé
                </p>
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
                            etes-vous sur de vouloir supprimer votre ce
                            commentaire ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={handleDeleteComment}
                            >
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
