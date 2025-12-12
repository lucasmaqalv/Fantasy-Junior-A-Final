
import React from 'react';
import { Flame, Repeat, BarChart, Edit3 } from 'lucide-react';

interface MambaMentalityProps {
    xp: number;
    onAddReps: (reason?: string) => void;
    isEditor?: boolean;
    onEditXp?: () => void;
}

export const MambaMentality: React.FC<MambaMentalityProps> = ({ xp, onAddReps, isEditor = false, onEditXp }) => {
    // Determine Mamba Level based on XP
    const levels = [
        { name: "Rookie", limit: 100 },
        { name: "Obsesión", limit: 300 },
        { name: "Implacable", limit: 600 },
        { name: "Leyenda", limit: 1000 },
        { name: "Inmortal", limit: 2000 }
    ];
    
    const currentLevelIdx = levels.findIndex(l => xp < l.limit);
    const currentLevel = currentLevelIdx === -1 ? levels[levels.length - 1] : levels[currentLevelIdx];
    const prevLimit = currentLevelIdx > 0 ? levels[currentLevelIdx - 1].limit : 0;
    const progressPercent = Math.min(100, Math.max(0, ((xp - prevLimit) / (currentLevel.limit - prevLimit)) * 100));

    const handleClick = () => {
        onAddReps(); 
    };

    return (
        <div className="bg-gradient-to-br from-purple-900/80 to-black p-5 rounded-xl border border-purple-500/40 relative overflow-hidden shadow-[0_0_20px_rgba(147,51,234,0.3)] group">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {isEditor && onEditXp && (
                <button 
                    onClick={onEditXp}
                    className="absolute top-4 right-4 z-20 text-purple-400 hover:text-white opacity-50 group-hover:opacity-100 transition-opacity"
                >
                    <Edit3 size={16} />
                </button>
            )}

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold uppercase tracking-wider text-purple-300 font-oswald flex items-center gap-2">
                        <Flame size={24} className="text-yellow-400" /> Mentalidad Mamba
                    </h3>
                    <div className="text-right">
                        <span className="block text-2xl font-bold text-white font-oswald leading-none">{xp}</span>
                        <span className="text-[10px] uppercase text-gray-400 tracking-widest">Puntos Mamba</span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between text-xs font-oswald uppercase text-purple-200 mb-1">
                        <span>Nivel: {currentLevel.name}</span>
                        <span>{currentLevel.limit} XP prox.</span>
                    </div>
                    <div className="h-3 w-full bg-gray-900 rounded-full border border-gray-700 overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-purple-600 to-yellow-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" 
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={handleClick}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg bg-black/40 border transition-all group ${isEditor ? 'border-purple-500 hover:bg-purple-900/40' : 'border-gray-600 hover:border-yellow-500'}`}
                    >
                        <Repeat size={20} className="text-yellow-400 mb-1 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-xs font-bold uppercase text-white font-oswald">
                            {isEditor ? 'Añadir XP (Admin)' : 'Registrar (Solicitud)'}
                        </span>
                        <span className="text-[9px] text-gray-400">
                             {isEditor ? 'Instantáneo' : 'Pendiente Revisión'}
                        </span>
                    </button>
                    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/40 border border-gray-700 opacity-70">
                        <BarChart size={20} className="text-gray-500 mb-1" />
                        <span className="text-xs font-bold uppercase text-gray-400 font-oswald">Analíticas</span>
                        <span className="text-[9px] text-gray-500">Próximamente</span>
                    </div>
                </div>
                
                <p className="mt-4 text-xs text-center text-gray-400 italic">"Los descansos al final, no en el medio." - KB24</p>
            </div>
        </div>
    );
};
