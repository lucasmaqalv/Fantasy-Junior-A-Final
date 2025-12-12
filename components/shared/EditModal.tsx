

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Save } from 'lucide-react';

interface EditModalProps {
  title: string;
  initialValue: string | number;
  onSave: (value: string | number) => void;
  onClose: () => void;
  type?: 'text' | 'number' | 'textarea';
  confirmLabel?: string;
}

export const EditModal: React.FC<EditModalProps> = ({ title, initialValue, onSave, onClose, type = 'text', confirmLabel = "Guardar" }) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(value);
    onClose();
  };

  return (
    <Modal onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
            {type === 'textarea' ? (
                <textarea 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-neon-red outline-none min-h-[100px]"
                    autoFocus
                />
            ) : (
                <input 
                    type={type}
                    value={value}
                    onChange={(e) => setValue(type === 'number' ? Number(e.target.value) : e.target.value)}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-neon-red outline-none font-oswald tracking-wide text-lg"
                    autoFocus
                />
            )}
        </div>
        
        <button 
            type="submit"
            className="w-full py-3 bg-neon-magenta text-black font-bold uppercase font-oswald rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,245,0.4)]"
        >
            <Save size={18} /> {confirmLabel}
        </button>
      </form>
    </Modal>
  );
};