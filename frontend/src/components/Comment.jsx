// import { useEffect, useState } from "react";
// import moment from "moment";
// import { FaThumbsUp } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { Button, Textarea } from "flowbite-react";

// export default function Comment({ comment, onLike, onEdit, onDelete }) {
//     const [user, setUser] = useState({});
//     const { currentUser } = useSelector((state) => state.user);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedContent, setEditedContent] = useState(comment.content);

//     useEffect(() => {
//         const getUser = async () => {
//             try {
//                 const res = await fetch(`/api/user/${comment.userId}`);
//                 const data = await res.json();
//                 if (res.ok) {
//                     setUser(data);
//                 }
//             } catch (error) {
//                 console.log(error.message);
//             }
//         };
//         getUser();
//     }, [comment]);

//     const handleEdit = () => {
//         setIsEditing(true);
//         setEditedContent(comment.content);
//     };

//     const handleSave = async () => {
//         try {
//             const res = await fetch(`/api/comment/editComment/${comment._id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     content: editedContent,
//                 }),
//             });
//             if (res.ok) {
//                 setIsEditing(false);
//                 onEdit(comment, editedContent);
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     return (
//         <div className="flex p-4 border-b dark:border-gray-600 text-sm">
//             <div className="flex-shrink-0 mr-3">
//                 <img
//                     className="w-10 h-10 rounded-full bg-gray-200"
//                     src={user.profilePicture}
//                     alt={user.username}
//                 />
//             </div>
//             <div className="flex-1">
//                 <div className="flex items-center mb-1">
//                     <span className="font-bold mr-1 text-xs truncate">
//                         {user ? `@${user.username}` : "Utilisateur anonyme"}
//                     </span>
//                     <span className="text-gray-50 text-xs">
//                         {moment(comment.createdAt).fromNow()}
//                     </span>
//                 </div>
//                 {isEditing ? (
//                     <>
//                         <Textarea
//                             className="mb-2"
//                             value={editedContent}
//                             onChange={(e) => setEditedContent(e.target.value)}
//                         />
//                         <div className="flex justify-end gap-2 text-xs">
//                             <Button
//                                 type="button"
//                                 size="sm"
//                                 gradientDuoTone="purpleToBlue"
//                                 onClick={handleSave}
//                             >
//                                 Sauvegarder
//                             </Button>
//                             <Button
//                                 type="button"
//                                 size="sm"
//                                 gradientDuoTone="purpleToBlue"
//                                 onClick={() => setIsEditing(false)}
//                             >
//                                 Annuler
//                             </Button>
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         {/* ------------- */}
//                         {/* <p className="text-gray-500 pb-2">{comment.content}</p>
//                         <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
//                             <button
//                                 className={`text-gray-400 hover:text-blue-500 ${
//                                     currentUser &&
//                                     comment.likes.includes(currentUser._id)
//                                 }`}
//                                 onClick={() => onLike(comment._id)}
//                                 type="button"
//                             >
//                                 <FaThumbsUp className="text-sm" />
//                             </button>
//                             <p className="text-gray-400">
//                                 {comment.numberOfLikes > 0 &&
//                                     comment.numberOfLikes +
//                                         "" +
//                                         (comment.numberOfLikes === 1
//                                             ? "like"
//                                             : "likes")}
//                             </p> */}
//                         {/* <div>
//                             {currentUser &&
//                                 (currentUser._id === comment.userId ||
//                                     currentUser.isAdmin) && (
//                                     <button
//                                         onClick={handleEdit}
//                                         className="text-gray-400 hover:text-blue-500"
//                                     >
//                                         Editer
//                                     </button>
//                                 )}
//                         </div> */}
//                     </>
//                 )}
//                 {/*  ----------------- */}
//                 <p className="text-gray-500 pb-2">{comment.content}</p>
//                 <div
//                     className="flex items-center pt-2 text-xs border-t
//                   dark:border-gray-700 max-w-fit gap-2"
//                 >
//                     <button
//                         type="button"
//                         className={`text-gray-400 hover:text-blue-500
//                          ${
//                              currentUser &&
//                              comment.likes.includes(currentUser._id) &&
//                              "!text-blue-500"
//                          } `}
//                         onClick={() => onLike(comment._id)}
//                     >
//                         <FaThumbsUp className="text-sm" />
//                     </button>
//                     <p>
//                         {comment.numberOfLikes > 0 &&
//                             comment.numberOfLikes +
//                                 "" +
//                                 (comment.numberOfLikes === 1
//                                     ? "like"
//                                     : "likes")}
//                     </p>
//                     {currentUser &&
//                         (currentUser._id === comment.userId || currentUser)}
//                     <>
//                         <button
//                             onClick={handleEdit}
//                             className="text-gray-400 hover:text-blue-500"
//                         >
//                             Editer
//                         </button>
//                         <button
//                             onClick={() => onDelete(comment._id)}
//                             className="text-gray-400 hover:text-blue-500"
//                         >
//                             Supprimer
//                         </button>
//                     </>
//                 </div>
//             </div>
//         </div>
//     );
// }
// revoir les modif
// ------------------------------------------------------------------
import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const canModify =
        currentUser &&
        (currentUser._id === comment.userId || currentUser.isAdmin);

    return (
        <div className="flex p-4 border-b dark:border-gray-600 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img
                    className="w-10 h-10 rounded-full bg-gray-200"
                    src={user.profilePicture}
                    alt={user.username}
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs truncate">
                        {user ? `@${user.username}` : "Utilisateur anonyme"}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>

                {isEditing ? (
                    <>
                        <Textarea
                            className="mb-2"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 text-xs">
                            <Button
                                size="sm"
                                gradientDuoTone="purpleToBlue"
                                onClick={handleSave}
                            >
                                Sauvegarder
                            </Button>
                            <Button
                                size="sm"
                                gradientDuoTone="purpleToBlue"
                                onClick={() => setIsEditing(false)}
                            >
                                Annuler
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500 pb-2">{comment.content}</p>
                        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-4">
                            <button
                                type="button"
                                className={`text-gray-400 hover:text-blue-500 ${
                                    currentUser &&
                                    comment.likes.includes(currentUser._id)
                                        ? "text-blue-500"
                                        : ""
                                }`}
                                onClick={() => onLike(comment._id)}
                            >
                                <FaThumbsUp className="text-sm" />
                            </button>
                            <p className="text-gray-400">
                                {comment.numberOfLikes > 0 &&
                                    `${comment.numberOfLikes} ${
                                        comment.numberOfLikes === 1
                                            ? "like"
                                            : "likes"
                                    }`}
                            </p>

                            {canModify && (
                                <>
                                    <button
                                        onClick={handleEdit}
                                        className="text-gray-400 hover:text-blue-500"
                                    >
                                        Éditer
                                    </button>
                                    <button
                                        onClick={() => onDelete(comment._id)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        Supprimer
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
