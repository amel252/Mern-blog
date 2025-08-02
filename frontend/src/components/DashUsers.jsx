import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Button,
    Table,
    TableHead,
    TableRow,
    TableHeadCell,
    TableBody,
    TableCell,
    Modal,
    ModalHeader,
    ModalBody,
} from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/user/getusers");
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser?.isAdmin) {
            fetchUsers();
        }
    }, [currentUser]);
    //
    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(
                `/api/user/getusers?startIndex=${startIndex}`
            );
            const data = await res.json();
            // si tout est ok
            if (res.ok) {
                // on prend l'ancienne version et on rajoute les modif
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    // supp user
    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                setUsers((prev) =>
                    prev.filter((user) => user._id !== userIdToDelete)
                );
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };
    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser?.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Date création</TableHeadCell>
                                <TableHeadCell>Image</TableHeadCell>
                                <TableHeadCell>Nom utilisateur</TableHeadCell>
                                <TableHeadCell>Email</TableHeadCell>
                                <TableHeadCell>Admin</TableHeadCell>
                                <TableHeadCell>Supprimer</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {users.map((user) => (
                                <TableRow
                                    key={user._id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <TableCell>
                                        {new Date(
                                            user.updatedAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={user.profilePicture}
                                            alt={user.name}
                                            className="w-10 object-cover rounded-full"
                                        />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.isAdmin ? (
                                            <FaCheck className="text-green-500" />
                                        ) : (
                                            <FaTimes className="text-red-500" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setUserIdToDelete(user._id);
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
                            Affiche plus d'utilisateurs{" "}
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
                            etes-vous sur de vouloir supprimer votre
                            utilisateur? ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteUser}>
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
