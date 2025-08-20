import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    Alert,
    Button,
    Textarea,
    Modal,
    ModalHeader,
    ModalBody,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Comment from "./Comment";
export default function CommentSection({ postId }) {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [commentError, setCommentError] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    console.log(comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch("/api/comment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment("");
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(
                    `/api/comment/getPostComments/${postId}`
                );
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate("/sign-in");
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: "PUT",
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                  ...comment,
                                  likes: data.likes,
                                  numberOfLikes: data.likes.length,
                              }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate("/sign-in");
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.filter((comment) => comment._id !== commentId)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Connecté en tant que:</p>
                    <img
                        className="h-5 w-5 object-cover rounded-full"
                        src={currentUser.profilePicture}
                        alt=""
                    />
                    <Link
                        to={"/dashboard?tab=profile"}
                        className="text-xs text-cyan-600 hover:underline"
                    >
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div
                    className="text-sm text-teal-500 
              my-5 flex gap-1"
                >
                    Connectez-vous avant de commenter.
                    <Link
                        className="text-blue-500 hover:underline"
                        to={"/sign-in"}
                    >
                        Connectez-vous
                    </Link>
                </div>
            )}
            {currentUser && (
                <form
                    onSubmit={handleSubmit}
                    className="border border-teal-500 rounded-md p-3"
                >
                    <Textarea
                        placeholder="Ajouter un commentaire..."
                        rows="3"
                        maxLength="200"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className="flex justify-between items-center mt-5 text-xs">
                        <p className="text-gray-500">
                            {200 - comment.length} caracteres requis
                        </p>
                        <Button
                            outline
                            gradientDuoTone="purpleToBlue"
                            type="submit"
                        >
                            Valider
                        </Button>
                    </div>
                    {commentError && (
                        <Alert color="failure" className="mt-5">
                            {commentError}
                        </Alert>
                    )}
                </form>
            )}
            {comments.length === 0 ? (
                <p className="text-sm my-5">
                    Aucun commentaire a été mentionné!
                </p>
            ) : (
                <>
                    <div className="text-sm my-5 flex items-center gap-1">
                        <p>Commentaire</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">
                            {comments.length}
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                                setShowModal(true);
                                setCommentToDelete(commentId);
                            }}
                        />
                    ))}
                </>
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
                            Etes-vous sure de supprimer ce commentaire ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => handleDelete(commentToDelete)}
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
