import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-white border border-teal-500 rounded-3xl shadow-md">
            {/* Texte et bouton */}
            <div className="flex-1 text-center sm:text-left space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                    Apprendre le JavaScript
                </h2>
                <p className="text-gray-600">
                    Découvre une liste de 100 projets pratiques pour maîtriser
                    JavaScript.
                </p>
                <Button
                    as="a"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    gradientDuoTone="purpleToPink"
                    className="mx-auto w-fit"
                >
                    100 Projets JavaScript
                </Button>
            </div>

            {/* Image */}
            <div className="flex-1 max-w-sm">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DmLCy9PSJfFqO55mNTYOQLx3x8THsbokkw&s"
                    alt="Illustration JavaScript"
                    className="rounded-xl w-full h-auto object-cover"
                />
            </div>
        </div>
    );
}
