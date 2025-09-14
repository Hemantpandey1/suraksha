
import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface StatusPanelProps {
    isSafe: boolean;
    setIsSafe: (isSafe: boolean) => void;
    sosActivated: boolean;
    resetSos: () => void;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ isSafe, setIsSafe, sosActivated, resetSos }) => {

    const handleSimulateLeave = () => {
        setIsSafe(false);
    };

    const handleReturnToSafe = () => {
        if(sosActivated) {
            resetSos();
        } else {
            setIsSafe(true);
        }
    };
    
    return (
        <div className={`rounded-xl shadow-md p-6 flex items-center justify-between transition-colors duration-300 ${isSafe ? 'bg-safe-green text-white' : 'bg-alert-red text-white'}`}>
            <div className="flex items-center space-x-4">
                {isSafe ? <ShieldCheckIcon className="h-12 w-12"/> : <ExclamationTriangleIcon className="h-12 w-12"/>}
                <div>
                    <h3 className="text-xl font-bold">{isSafe ? "Status: All Safe" : (sosActivated ? "SOS Signal Sent" : "ALERT: Unsafe Zone")}</h3>
                    <p className="text-sm opacity-90">{isSafe ? "You are currently within a designated safe zone." : (sosActivated ? "Emergency services have been notified." : "You've moved out of a safe zone. Proceed with caution.")}</p>
                </div>
            </div>
            <div>
            {sosActivated ? (
                <button 
                    onClick={handleReturnToSafe}
                    className="bg-white text-alert-red font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition-colors"
                >
                    Cancel SOS
                </button>
            ) : isSafe ? (
                <button 
                    onClick={handleSimulateLeave}
                    className="bg-white text-safe-green font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition-colors"
                >
                    Simulate Leaving Safe Zone
                </button>
            ) : (
                 <button 
                    onClick={handleReturnToSafe}
                    className="bg-white text-alert-red font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition-colors"
                >
                    I'm Safe Now
                </button>
            )}
            </div>
        </div>
    );
}

export default StatusPanel;
