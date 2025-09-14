
import React, { useState } from 'react';
import type { User } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import DigitalIdCard from './DigitalIdCard';
import SOSButton from './SOSButton';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onSos: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onSos }) => {
    const [showId, setShowId] = useState(false);

    return (
        <>
            <header className="bg-white shadow-md w-full p-3 flex justify-between items-center z-10">
                <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="h-8 w-8 text-brand-primary" />
                    <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Tourist Safety System</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative group">
                         <button onClick={() => setShowId(true)} className="flex items-center space-x-2 text-gray-600 hover:text-brand-primary transition-colors">
                            <UserCircleIcon className="h-7 w-7"/>
                            <span className="font-medium hidden md:inline">{user.name}</span>
                        </button>
                    </div>
                    <button onClick={onLogout} className="text-sm text-gray-500 hover:text-gray-800">Logout</button>
                    <SOSButton onSos={onSos} />
                </div>
            </header>
            {showId && <DigitalIdCard user={user} onClose={() => setShowId(false)} />}
        </>
    );
}

export default Header;
