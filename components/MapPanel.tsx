
import React from 'react';
import { MapPinIcon } from './icons/MapPinIcon';

interface MapPanelProps {
    isSafe: boolean;
    sosActivated: boolean;
}

const MapPanel: React.FC<MapPanelProps> = ({ isSafe, sosActivated }) => {
    const SafeZone: React.FC<{ name: string; position: string }> = ({ name, position }) => (
        <div className={`absolute ${position}`}>
            <div className="relative flex flex-col items-center group">
                <div className="absolute bottom-0 flex flex-col items-center hidden mb-8 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">{name}</span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                </div>
                <div className="p-2 bg-blue-500 bg-opacity-30 rounded-full animate-pulse">
                    <div className="p-1 bg-blue-500 bg-opacity-50 rounded-full">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex-1 flex flex-col relative overflow-hidden">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Live Location & Safe Zones</h2>
            <div className={`flex-1 rounded-lg bg-cover bg-center relative ${isSafe ? 'border-safe-green' : 'border-alert-red'} border-4`} style={{ backgroundImage: "url('https://picsum.photos/seed/mapbg/1200/800')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                
                {/* Mocked safe zones */}
                <SafeZone name="Heritage Site" position="top-1/4 left-1/4" />
                <SafeZone name="Main Market" position="top-1/2 left-3/4" />
                <SafeZone name="Hotel District" position="bottom-1/4 left-1/2" />
                
                {/* Tourist Location Pin */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 ${isSafe ? '' : 'scale-125'}`}>
                    <MapPinIcon className={`h-12 w-12 drop-shadow-lg ${isSafe ? 'text-brand-secondary' : 'text-alert-red animate-pulse-slow'}`} />
                     <span className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">YOU ARE HERE</span>
                </div>
                
                {sosActivated && (
                    <div className="absolute inset-0 bg-alert-red bg-opacity-70 flex items-center justify-center animate-pulse">
                        <div className="text-center text-white">
                            <h3 className="text-4xl font-extrabold">SOS ACTIVATED</h3>
                            <p className="mt-2 text-lg">Sharing your location with emergency responders.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapPanel;
