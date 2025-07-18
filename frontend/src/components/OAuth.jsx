import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            // console.log(resultFromGoogle)
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <Button onClick={handleGoogleClick} color="blue" type="submit">
                <AiFillGoogleCircle className="w-6 h-6 mr-2" />
                Continue avec google
            </Button>
        </div>
    );
}
