import {
    Navbar,
    TextInput,
    Button,
    NavbarLink,
    NavbarCollapse,
    NavbarToggle,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
    const path = useLocation().pathname;
    console.log(path);

    return (
        <Navbar className="border-b-2">
            <Link
                to="/"
                className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold
                dark:text-white"
            >
                <span
                    className="px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
                 text-white"
                >
                    Blog
                </span>
                Web
            </Link>
            <form>
                <TextInput
                    placeholder="Recherche..."
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                />
            </form>
            <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                    <FaMoon />
                </Button>
                <Link to="/sign-in">
                    {/* <Button gradientDuoTone="purpleToBlue">Connexion</Button> */}
                </Link>
                <NavbarToggle />
            </div>

            <NavbarCollapse>
                <NavbarLink as={Link} to="/" active={path === "/"}>
                    Accueil
                </NavbarLink>
                <NavbarLink as={Link} to="/about" active={path === "/about"}>
                    A propos
                </NavbarLink>
                <NavbarLink
                    as={Link}
                    to="/projects"
                    active={path === "/projects"}
                >
                    Projets
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}
