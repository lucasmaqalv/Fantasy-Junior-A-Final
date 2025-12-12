
import React from 'react';
import { Player, Badge, ArenaData } from '../types';
import { placeholderPhotoUrl, PSICO_STAT_NAMES, STAT_NAMES, ARENA_DATA } from '../constants';
import { Hexagon, Clock, ChevronUp, Edit3, Plus } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { MambaMentality } from './MambaMentality';
import { ClubLogo } from './ClubLogo';

interface PlayerCardProps {
  user: Player;
  onShowArenaModal: () => void;
  onShowCapsuleModal: () => void;
  onAddReps: (reason?: string) => void;
  isEditor?: boolean;
  onTriggerEdit?: (key: keyof Player, value: string | number, type: 'text' | 'number' | 'textarea') => void;
  onAddBadge?: () => void;
  onEditStat?: (type: 'tactical' | 'psico') => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ user, onShowArenaModal, onShowCapsuleModal, onAddReps, isEditor = false, onTriggerEdit, onAddBadge, onEditStat }) => {
  
  const tacticalData = STAT_NAMES.map((name, i) => ({
    subject: name,
    A: user.stats[i],
    fullMark: 100,
  }));

  const psychoData = PSICO_STAT_NAMES.slice(0, 5).map((name, i) => ({
      subject: name.substring(0, 4),
      A: user.psicoStats[i],
      fullMark: 100,
  }));

  const currentArena = ARENA_DATA.slice().reverse().find(a => user.points >= a.xpRequired) || ARENA_DATA[0];

  const handleEdit = (key: keyof Player, type: 'text' | 'number' | 'textarea' = 'text') => {
      if (onTriggerEdit) {
          onTriggerEdit(key, user[key] as any, type);
      }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      
      <button 
        onClick={onShowArenaModal} 
        className="w-full p-1 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-neon-red transition-all group shadow-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-neon-red/5 group-hover:bg-neon-red/10 transition-colors"></div>
        <div className="relative z-10 flex items-center justify-between px-4 py-3">
            <div className={`flex items-center gap-3 ${currentArena.color}`}>
                <currentArena.icon size={24} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <div className="text-left">
                    <span className="block text-xs text-gray-400 font-oswald uppercase">Arena Actual</span>
                    <span className="text-lg font-bold uppercase tracking-wider font-oswald leading-none">{currentArena.name}</span>
                </div>
            </div>
            <ChevronUp size={20} className="text-gray-500 group-hover:text-neon-red group-hover:-translate-y-1 transition-all" />
        </div>
      </button>

      <div className="relative bg-gradient-to-b from-gray-800 via-black to-gray-900 border border-neon-red/30 rounded-2xl shadow-xl overflow-hidden p-6 group">
        
        {isEditor && (
            <button 
                onClick={() => handleEdit('name')}
                className="absolute top-4 right-4 z-20 p-2 bg-neon-magenta text-black rounded-full shadow-lg hover:scale-110 transition-transform"
                title="Editar Nombre"
            >
                <Edit3 size={16} />
            </button>
        )}

        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-neon-red/10 to-transparent"></div>
        
        <div className="absolute top-10 right-0 w-48 h-48 opacity-[0.05] pointer-events-none transform translate-x-10 -rotate-12">
            <ClubLogo className="text-neon-red" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-neon-red to-neon-magenta shadow-[0_0_15px_rgba(227,6,19,0.5)] mb-4 relative group">
                <img 
                    src={placeholderPhotoUrl(user.name, user.dorsal)} 
                    alt={user.name} 
                    className="w-full h-full object-cover rounded-full border-4 border-black relative z-10"
                />
                <div className="absolute inset-0 bg-neon-red/20 blur-md rounded-full -z-0 group-hover:bg-neon-red/40 transition-all"></div>
            </div>
            
            <h2 className="text-3xl font-bold uppercase tracking-widest text-white font-oswald mb-1 relative">
                {user.name}
            </h2>
            <div className="flex items-center gap-2 mb-4">
                 <p className="text-neon-red font-bold tracking-wide">{user.position} | #{user.dorsal}</p>
                 {isEditor && (
                     <button onClick={() => handleEdit('dorsal', 'number')} className="bg-neon-magenta/20 p-1 rounded-full hover:bg-neon-magenta hover:text-black transition-colors">
                         <Edit3 size={12} />
                     </button>
                 )}
            </div>
            
            <div className="w-full p-3 bg-white/5 rounded-lg border border-yellow-500/30 text-center mb-6 backdrop-blur-sm relative hover:border-yellow-500/60 transition-colors group/focus">
                {isEditor && (
                    <button 
                        onClick={() => handleEdit('focus', 'textarea')}
                        className="absolute top-2 right-2 text-yellow-500 cursor-pointer opacity-50 group-hover/focus:opacity-100 hover:scale-110 transition-all"
                    >
                        <Edit3 size={14} />
                    </button>
                )}
                <p className="text-[10px] uppercase text-gray-400 tracking-widest font-oswald mb-1">Foco Semanal</p>
                <p className="text-yellow-300 italic font-medium">"{user.focus}"</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mb-6 relative">
                 {isEditor && (
                    <button 
                        onClick={() => handleEdit('points', 'number')}
                        className="absolute -top-2 -right-2 bg-neon-magenta text-black text-[9px] px-2 py-0.5 rounded font-bold uppercase z-20 hover:scale-105 shadow-neon-magenta/50 shadow-md"
                    >
                        Editar XP
                    </button>
                )}
                <div className="bg-black/40 p-3 rounded-lg border border-neon-red/30 text-center">
                    <span className="block text-2xl font-bold text-white font-oswald">{user.points}</span>
                    <span className="text-xs uppercase text-gray-400 font-oswald">Nivel XP</span>
                    <div className="h-1 w-full bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-neon-red w-3/4"></div>
                    </div>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-green-500/30 text-center">
                    <span className="block text-2xl font-bold text-green-400 font-oswald flex items-center justify-center gap-1">
                        <Hexagon size={16} fill="currentColor" /> {user.virtualMoney}
                    </span>
                    <span className="text-xs uppercase text-gray-400 font-oswald">Fichas</span>
                </div>
            </div>

            <div className="w-full mb-6">
                 <MambaMentality 
                    xp={user.mambaXp || 0} 
                    onAddReps={onAddReps} 
                    isEditor={isEditor} 
                    onEditXp={() => handleEdit('mambaXp', 'number')}
                 />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-2 rounded-xl border border-gray-800 relative group">
                    {isEditor && onEditStat && (
                        <button 
                            onClick={() => onEditStat('tactical')}
                            className="absolute top-2 right-2 bg-neon-magenta text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        >
                            <Edit3 size={12} />
                        </button>
                    )}
                    <p className="text-center text-xs text-gray-400 font-oswald uppercase mb-2">ADN Táctico</p>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={tacticalData}>
                                <PolarGrid stroke="#333" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 9, fontFamily: 'Oswald' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Táctico" dataKey="A" stroke="#E30613" strokeWidth={2} fill="#E30613" fillOpacity={0.4} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-black/30 p-2 rounded-xl border border-gray-800 relative group">
                    {isEditor && onEditStat && (
                        <button 
                            onClick={() => onEditStat('psico')}
                            className="absolute top-2 right-2 bg-neon-magenta text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        >
                            <Edit3 size={12} />
                        </button>
                    )}
                    <p className="text-center text-xs text-gray-400 font-oswald uppercase mb-2">ADN Psico</p>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={psychoData}>
                                <PolarGrid stroke="#333" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 9, fontFamily: 'Oswald' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Psico" dataKey="A" stroke="#FF00F5" strokeWidth={2} fill="#FF00F5" fillOpacity={0.4} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>

      <button onClick={onShowCapsuleModal} className="w-full flex items-center justify-center space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-neon-red hover:bg-gray-700 transition-all shadow-lg">
          <Clock size={20} className="text-neon-red" />
          <span className="font-oswald uppercase tracking-wider">Abrir Cápsula del Tiempo</span>
      </button>

      <div className="relative">
          {isEditor && onAddBadge && (
             <button 
                onClick={onAddBadge}
                className="absolute -top-1 right-0 text-[10px] bg-neon-magenta text-black px-2 py-0.5 rounded font-bold uppercase hover:bg-white transition-colors flex items-center gap-1"
             >
                 <Plus size={10} /> Añadir Insignia
             </button>
          )}
          <h3 className="text-xl font-bold uppercase tracking-wider text-white font-oswald pt-4">Insignias</h3>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {user.badges && user.badges.map(badge => (
                <div key={badge.id} className={`relative flex flex-col items-center p-3 rounded-xl border ${badge.earned ? 'bg-gray-800 border-neon-red/40' : 'bg-gray-900/50 border-gray-800 opacity-50'} transition-all group`}>
                    <div className={`p-2 rounded-full mb-2 ${badge.earned ? 'bg-neon-red text-black' : 'bg-gray-700 text-gray-500'}`}>
                        <badge.icon size={20} />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-center">{badge.title}</span>
                </div>
            ))}
          </div>
      </div>

    </div>
  );
};
