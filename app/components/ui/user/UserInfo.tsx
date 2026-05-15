import { PiUserCircleFill } from "react-icons/pi";
export const UserInfo = () => {
    return (
        <div className={'flex justify-center items-center gap-2'}>
            <PiUserCircleFill size={32}/>
            <p className={'font-semibold'}>John Duck</p>
        </div>
    );
};