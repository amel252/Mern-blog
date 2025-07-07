// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Label, TextInput, Button, Spinner, Card } from "flowbite-react";
// import { useState } from "react";

// export default function SignUp() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({});
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({
//             // ici nous attribuons les élement donnée par l'util  a notre elements
//             ...formData,
//             // dans chaque input y a une id (id->username ,,,,)
//             [e.target.id]: e.target.value.trim(),
//         });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.username || !formData.email || formData.password) {
//             return setErrorMessage("Tous les chams sont requis ");
//         }
//         try {
//             setLoading(true);
//             setErrorMessage(null);
//             const res = await fetch("/api/auth/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });
//             const data = await res.json();
//             if (data.success === false) {
//                 return setErrorMessage(data.message);
//             }
//             setLoading(false);
//             if (res.ok) {
//                 navigate("/sign-in");
//             }
//         } catch (err) {
//             setErrorMessage(err.message);
//             setLoading(false);
//         }

//         return (
//             <div className="min-h-screen mt-20">
//                 <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
//                     {/* left */}
//                     <div className="flex-1">
//                         <Link
//                             to="/"
//                             className="font-bold dark:text-white text-4xl"
//                         >
//                             <span className="px-5 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
//                                 Blog
//                             </span>
//                             web
//                         </Link>
//                         <p className="text-sm mt-5">
//                             Ceci est un projet de démonstration. Vous pouvez
//                             vous inscrire avec votre adresse e-mail et votre mot
//                             de passe ou via Google.
//                         </p>
//                     </div>

//                     {/* right */}
//                     <div className="flex-1">
//                         <form
//                             className="flex flex-col gap-4"
//                             // onSubmit={handleSubmit}
//                         >
//                             <div>
//                                 <Label htmlFor="username" value="Votre nom" />
//                                 <TextInput
//                                     type="text"
//                                     placeholder="Votre nom"
//                                     id="username"
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="email" value="Votre email" />
//                                 <TextInput
//                                     type="email"
//                                     placeholder="name@company.com"
//                                     id="email"
//                                 />
//                             </div>
//                             <div>
//                                 <Label
//                                     htmlFor="password"
//                                     value="Votre mot de passe"
//                                 />
//                                 <TextInput
//                                     type="password"
//                                     placeholder="Mot de passe"
//                                     id="password"
//                                 />
//                             </div>
//                             {/*le bouton dans une div stylée */}
//                             <div className="bg-white p-4 rounded-md ">
//                                 <Button color="blue" type="submit">
//                                     Connectez-vous
//                                 </Button>
//                             </div>
//                         </form>

//                         <div className="flex gap-2 mt-5 text-sm">
//                             <span>Avez-vous un compte ?</span>
//                             <Link to="/sign-in" className="text-blue-500">
//                                 Connectez-vous
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim(),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage("Tous les champs sont requis");
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                return setErrorMessage(data.message);
            }

            setLoading(false);
            if (res.ok) {
                navigate("/sign-in");
            }
        } catch (err) {
            setErrorMessage(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* left */}
                <div className="flex-1">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-5 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Blog
                        </span>
                        web
                    </Link>
                    <p className="text-sm mt-5">
                        Ceci est un projet de démonstration. Vous pouvez vous
                        inscrire avec votre adresse e-mail et votre mot de passe
                        ou via Google.
                    </p>
                </div>

                {/* right */}
                <div className="flex-1">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <Label htmlFor="username" value="Votre nom" />
                            <TextInput
                                type="text"
                                placeholder="Votre nom"
                                id="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Votre email" />
                            <TextInput
                                type="email"
                                placeholder="name@company.com"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="password"
                                value="Votre mot de passe"
                            />
                            <TextInput
                                type="password"
                                placeholder="Mot de passe"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>

                        {errorMessage && (
                            <div className="text-red-500 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <div className="bg-white p-4 rounded-md ">
                            <Button color="blue" type="submit">
                                {loading ? "Chargement..." : "Inscription"}
                            </Button>
                        </div>
                    </form>

                    <div className="flex gap-2 mt-5 text-sm">
                        <span>Avez-vous un compte ?</span>
                        <Link to="/sign-in" className="text-blue-500">
                            Connectez-vous
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
