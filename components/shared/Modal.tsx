import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => (
  <div className="fixed inset-0 bg-black/85 z-50 flex justify-center items-center p-4 backdrop-blur-md animate-fade-in"> 
    <div className="relative bg-graphite w-full max-w-lg rounded-xl shadow-[0_0_20px_rgba(255,0,110,0.3)] border border-neon-red/60 overflow-hidden"> 
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-red via-neon-magenta to-neon-red shadow-neon-red"></div>
      
      <div className="flex justify-between items-center p-4 pb-0">
          {title && <h3 className="text-xl font-bold font-oswald uppercase text-white tracking-wide">{title}</h3>}
          <button onClick={onClose} className="ml-auto text-gray-400 hover:text-white z-50 p-1 bg-white/10 rounded-full hover:bg-neon-red/20 transition-colors">
            <X size={20} />
          </button>
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);