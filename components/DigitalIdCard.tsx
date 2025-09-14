
import React from 'react';
import type { User } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface DigitalIdCardProps {
  user: User;
  onClose: () => void;
}

const DigitalIdCard: React.FC<DigitalIdCardProps> = ({ user, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-6 text-white relative">
            <div className="absolute top-4 right-4 opacity-20">
                <ShieldCheckIcon className="h-24 w-24" />
            </div>
            <h2 className="text-2xl font-bold">Digital Tourist ID</h2>
            <p className="text-sm opacity-80">Blockchain Verified</p>
        </div>
        <div className="p-6 space-y-4">
            <div>
                <label className="text-xs font-semibold text-gray-500">NAME</label>
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
            </div>
            <div>
                <label className="text-xs font-semibold text-gray-500">PASSPORT / ID No.</label>
                <p className="text-lg font-medium text-gray-900">{`****${user.passportNumber.slice(-4)}`}</p>
            </div>
             <div>
                <label className="text-xs font-semibold text-gray-500">BLOCKCHAIN ID</label>
                <p className="text-sm font-mono text-gray-700 break-all">{user.digitalId}</p>
            </div>
            <div className="flex justify-center pt-4">
                 {/* Placeholder for a QR code */}
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">QR CODE</p>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 p-4">
             <button
                onClick={onClose}
                className="w-full bg-brand-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
             >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalIdCard;
