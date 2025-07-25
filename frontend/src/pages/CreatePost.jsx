import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
    const [content, setContent] = useState("");

    return (
        <div className="min-h-screen p-3 mx-auto max-w-3xl">
            <h1 className="text-center text-3xl my-7">Créer un article</h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Titre"
                        required
                        id="title"
                        className="flex-1"
                    />
                    <Select>
                        <option value="uncategorized">
                            Selectionner une categorie
                        </option>
                        <option value="javascript">Javascript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div
                    className="flex gap-4 items-center 
                    justify-between border-4 border-teal-500 border-dotted p-3"
                >
                    <FileInput type="file" accept="image/*" />
                    <Button color="blue" type="submit">
                        Telecharger l'image
                    </Button>
                </div>

                {/* <ReactQuill theme='snow' placeholder="Ecrit quelque chose..."
                 className="h-72 mb-12" 
                 />  */}
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="Écris quelque chose..."
                    className="h-72 mb-12"
                />

                <Button color="blue" type="submit">
                    Publier
                </Button>
            </form>
        </div>
    );
}
