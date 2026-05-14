import Link from "next/link";
import { usePathname } from 'next/navigation'
import {Search} from "@/app/components/ui/search/Search";
import {UserInfo} from "@/app/components/ui/user/UserInfo";

export const Header = () => {
    const path = usePathname();
    return (
        <header className={'flex justify-between p-5 mb-10'}>
            <nav>
                <ul className={'flex gap-7 text-2xl'}>
                    <li><Link href="/" className={`${path === '/' ? "text-blue-900 font-bold underline" : "hover:text-purple-900 font-semibold transition-all duration-500 text-gray-500"}`}
                    >Home</Link></li>
                    <li><Link  className={`${path === '/movies' ? "text-blue-900 font-bold underline" : "hover:text-purple-900 font-semibold transition-all duration-500 text-gray-500"}`
                    } href={'/movies'}>Movies</Link></li>
                </ul>
            </nav>
            <div className={'flex gap-2.5 items-center'}>
                <Search />
                <UserInfo />
            </div>
        </header>
    );
};