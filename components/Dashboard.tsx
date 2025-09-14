
import React, { useState } from 'react';
import Header from './Header';
import MapPanel from './MapPanel';
import StatusPanel from './StatusPanel';
import Chatbot from './Chatbot';
import type { User } from '../types';

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const [isSafe, setIsSafe] = useState(true);
    const [sosActivated, setSosActivated] = useState(false);

    const handleSos = () => {
        setIsSafe(false);
        setSosActivated(true);
    }
    
    const resetSos = () => {
        setSosActivated(false);
        setIsSafe(true);
    }

    return (
        <div className="flex flex-col h-screen bg-brand-safest overflow-hidden">
            <Header user={user} onLogout={onLogout} onSos={handleSos} />
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <MapPanel isSafe={isSafe} sosActivated={sosActivated}/>
                    <StatusPanel 
                        isSafe={isSafe} 
                        setIsSafe={setIsSafe} 
                        sosActivated={sosActivated}
                        resetSos={resetSos}
                    />
                </div>
                <div className="lg:col-span-1 bg-white rounded-xl shadow-md flex flex-col">
                    <Chatbot />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
