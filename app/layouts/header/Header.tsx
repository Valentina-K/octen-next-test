import Link from "next/link";

export const Header = () => {
    return (
        <nav className="flex items-center justify-evenly p-5 bg-blue-700 text-white">
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
        </nav>
    );
};