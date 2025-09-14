
import React from 'react';

interface SOSButtonProps {
    onSos: () => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ onSos }) => {
    return (
        <button 
            onClick={onSos} 
            className="relative flex items-center justify-center w-16 h-10 bg-alert-red text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out animate-pulse-slow"
        >
            <span className="z-10 text-lg">SOS</span>
            <span className="absolute inset-0 bg-alert-red rounded-lg opacity-75 animate-ping"></span>
        </button>
    );
}

export default SOSButton;
