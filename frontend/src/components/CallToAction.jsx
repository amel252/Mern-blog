import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-br-3xl text-center">
            <div className="flex-1 justify-center text-center flex-col">
                <h2 className="text-2xl">Apprendre du Javascript</h2>
                <p className="">
                    Vérifie ces ressourses contenant 100 projets enJS
                </p>
                {/* revoir ca  */}
                <Button
                    rel="noopener noreferrer"
                    className="rounded-tl-xl rounded-bl-none text-center block"
                    gradientduotone="purpleToPink"
                    target="_blank"
                >
                    <a href="#">100 Projets Javascript</a>
                </Button>
            </div>
            <div className="flex-1 p-7">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DmLCy9PSJfFqO55mNTYOQLx3x8THsbokkw&s"
                    alt=""
                />
            </div>
        </div>
    );
}
