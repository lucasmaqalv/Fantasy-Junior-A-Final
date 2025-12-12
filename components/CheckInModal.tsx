
import React, { useState } from 'react';
import { Player, CheckInStep } from '../types';
import { Modal } from './shared/Modal';
import { ArrowRight, Send, Edit3 } from 'lucide-react';

interface CheckInProps {
    user: Player;
    onClose: () => void;
    onComplete: (xp: number) => void;
    steps: CheckInStep[];
    isEditor?: boolean;
    onEditStep?: (stepId: string, newTitle: string) => void;
}

export const CheckInModal: React.FC<CheckInProps> = ({ user, onClose, onComplete, steps, isEditor = false, onEditStep }) => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<any>({});

    const handleRate = (field: string, val: number) => setData((prev: any) => ({ ...prev, [field]: val }));

    const currentStep = steps[step];

    const handleSubmit = () => {
        onComplete(50); // Give 50 XP
        onClose();
    };

    return (
        <Modal onClose={onClose} title="Check-In Diario">
            <div className="space-y-6 text-center min-h-[300px] flex flex-col justify-between">
                <div>
                    <div className="flex justify-center mb-4">
                        <currentStep.icon size={48} className="text-neon-red animate-pulse-slow" />
                    </div>
                    
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-white uppercase font-oswald tracking-wider">{currentStep.title}</h4>
                        {isEditor && onEditStep && (
                            <button 
                                onClick={() => {
                                    const newTitle = prompt("Editar Título de la Pregunta:", currentStep.title);
                                    if (newTitle) onEditStep(currentStep.id, newTitle);
                                }}
                                className="text-neon-magenta hover:text-white"
                            >
                                <Edit3 size={16} />
                            </button>
                        )}
                    </div>
                    
                    {currentStep.type === 'scale' && (
                        <div className={`grid ${currentStep.compact ? 'grid-cols-5 gap-y-3' : 'grid-cols-5'} gap-2 justify-center`}>
                            {currentStep.options?.map((val, idx) => (
                                <div key={val} className="flex flex-col items-center">
                                    <button
                                        onClick={() => handleRate(currentStep.field, val)}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg font-bold font-oswald text-xl border transition-all ${data[currentStep.field] === val ? 'bg-neon-red border-neon-red text-black shadow-neon-red scale-110' : 'bg-transparent border-gray-600 text-gray-400 hover:border-white'}`}
                                    >
                                        {val}
                                    </button>
                                    {currentStep.labels && (
                                        <span className={`text-[9px] mt-1 uppercase font-oswald ${data[currentStep.field] === val ? 'text-neon-red' : 'text-gray-600'}`}>
                                            {currentStep.labels[idx]}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {currentStep.type === 'number' && (
                        <div className="flex justify-center items-center">
                            <input 
                                type="number" 
                                value={data[currentStep.field] || ''}
                                onChange={(e) => handleRate(currentStep.field, Number(e.target.value))}
                                className="bg-black border border-gray-600 text-white text-4xl font-oswald text-center w-32 p-2 rounded-lg focus:border-neon-red outline-none"
                            />
                            <span className="ml-2 text-gray-400 font-oswald">BPM</span>
                        </div>
                    )}
                </div>

                <div className="pt-6 flex justify-between items-center border-t border-gray-800 mt-4">
                     <button 
                        onClick={() => setStep(s => Math.max(0, s - 1))} 
                        disabled={step === 0}
                        className={`text-sm text-gray-400 uppercase font-oswald ${step === 0 ? 'opacity-0' : 'hover:text-white'}`}
                     >
                         Atrás
                     </button>

                    <div className="flex gap-1">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1 w-3 rounded-full transition-colors ${i <= step ? 'bg-neon-red' : 'bg-gray-800'}`}></div>
                        ))}
                    </div>
                    
                    {step < steps.length - 1 ? (
                        <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold font-oswald uppercase rounded hover:bg-gray-200 transition-colors">
                            Siguiente <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold font-oswald uppercase rounded hover:bg-green-400 transition-colors shadow-lg shadow-green-500/30">
                            Enviar <Send size={16} />
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};
