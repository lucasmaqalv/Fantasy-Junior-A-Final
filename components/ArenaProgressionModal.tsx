import React from 'react';
import { ARENA_DATA } from '../constants';
import { Modal } from './shared/Modal';
import { Lock, Check } from 'lucide-react';

interface ArenaProgressionModalProps {
    currentUserXp: number;
    onClose: () => void;
}

export const ArenaProgressionModal: React.FC<ArenaProgressionModalProps> = ({ currentUserXp, onClose }) => {
    // Reverse arenas to show highest at top (Clash Royale style)
    const reversedArenas = [...ARENA_DATA].reverse();
    const currentArena = reversedArenas.find(a => currentUserXp >= a.xpRequired) || reversedArenas[reversedArenas.length - 1];

    return (
        <Modal onClose={onClose} title="Camino del Jugador">
            <div className="space-y-8 py-4 relative">
                 {/* Connecting Line */}
                 <div className="absolute left-8 top-10 bottom-10 w-1 bg-gray-800 z-0"></div>

                {reversedArenas.map((arena, index) => {
                    const isUnlocked = currentUserXp >= arena.xpRequired;
                    const isCurrent = arena.id === currentArena.id;
                    const Component = arena.graphicComponent;

                    return (
                        <div key={arena.id} className={`relative z-10 flex items-center gap-4 ${!isUnlocked ? 'opacity-50 grayscale' : ''}`}>
                            {/* Graphic Container */}
                            <div className={`w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 shadow-lg relative bg-black ${isCurrent ? 'border-neon-red shadow-neon-red' : isUnlocked ? 'border-gray-600' : 'border-gray-800'}`}>
                                {Component ? <Component /> : <div className="w-full h-full bg-gray-900" />}
                                
                                {/* Lock/Check Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {!isUnlocked && <Lock size={24} className="text-gray-500" />}
                                    {isUnlocked && !isCurrent && <Check size={24} className="text-green-500 opacity-0" />} {/* Hidden check for clean look */}
                                </div>
                            </div>

                            {/* Text Info */}
                            <div className="flex-1">
                                <h4 className={`font-bold uppercase font-oswald text-lg ${arena.color} ${isCurrent ? 'animate-pulse' : ''}`}>
                                    {arena.name}
                                </h4>
                                <p className="text-xs text-gray-400 font-oswald tracking-widest">
                                    {arena.xpRequired} XP
                                </p>
                                {isCurrent && (
                                    <span className="inline-block px-2 py-0.5 mt-1 bg-neon-red text-black text-[10px] font-bold uppercase rounded-sm">
                                        Arena Actual
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
};
