
import React, { useState } from 'react';
import { Player, ArenaProps, Bet, BetType } from '../types';
import { Users2, Handshake, Hexagon, UserPlus, GraduationCap, Edit3, Droplet, Activity, Clock, ShieldCheck, Plus, Trash2, Zap } from 'lucide-react';
import { Modal } from './shared/Modal';

export const Arena: React.FC<ArenaProps> = ({ user, players, isEditor = false, onTriggerEdit, onTrust, bets = [], onAddBet, onDeleteBet }) => {
    const [activeSubPage, setActiveSubPage] = useState<'quinteto' | 'confiar'>('quinteto');
    const [activeLeague, setActiveLeague] = useState<'junior' | 'provincial'>('junior');
    const [selectedPositions, setSelectedPositions] = useState<{[key: number]: number | null}>({ 1: null, 2: null, 3: null, 4: null, 5: null });
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
    
    // State for Custom Bet Modal
    const [showBetModal, setShowBetModal] = useState(false);
    const [betType, setBetType] = useState<BetType>('custom');
    const [betForm, setBetForm] = useState({ title: '', description: '', amount: 50 });

    const currentLeaguePlayers = players;

    const positionSlots = [
        { id: 1, label: 'Base', x: '50%', y: '15%' },
        { id: 2, label: 'Escolta', x: '25%', y: '30%' },
        { id: 3, label: 'Alero', x: '75%', y: '30%' },
        { id: 4, label: 'Ala-Pívot', x: '35%', y: '50%' },
        { id: 5, label: 'Pívot', x: '65%', y: '50%' },
    ];
    
    const handleSlotClick = (slotId: number) => {
        if (selectedPlayerId !== null) { 
            setSelectedPositions(prev => ({ ...prev, [slotId]: selectedPlayerId }));
            setSelectedPlayerId(null);
        }
    };

    const handlePlayerClick = (playerId: number) => {
         setSelectedPlayerId(playerId);
    };

    const openBetModal = (type: BetType) => {
        setBetType(type);
        let initialTitle = '';
        let initialDesc = '';
        
        switch(type) {
            case 'join':
                initialTitle = 'Me uno a la misión';
                initialDesc = 'Me comprometo a cumplir el objetivo junto a...';
                break;
            case 'combine':
                initialTitle = 'Reto Combinado';
                initialDesc = 'Propongo un objetivo conjunto de...';
                break;
            case 'teach':
                initialTitle = 'Mentoría / Enseñanza';
                initialDesc = 'Ofrezco ayuda técnica/táctica en...';
                break;
            default:
                initialTitle = '';
                initialDesc = '';
        }

        setBetForm({ title: initialTitle, description: initialDesc, amount: 50 });
        setShowBetModal(true);
    };

    const handleSubmitBet = (e: React.FormEvent) => {
        e.preventDefault();
        if (onAddBet) {
            onAddBet({
                type: betType,
                title: betForm.title,
                description: betForm.description,
                amount: Number(betForm.amount)
            });
        }
        setShowBetModal(false);
    };

    const getBetIcon = (type: BetType) => {
        switch(type) {
            case 'join': return <UserPlus size={16} className="text-blue-400" />;
            case 'combine': return <Users2 size={16} className="text-purple-400" />;
            case 'teach': return <GraduationCap size={16} className="text-yellow-400" />;
            default: return <Zap size={16} className="text-neon-red" />;
        }
    };

    const RankingTable = ({ data, title, type = 'xp' }: { data: any[], title: string, type?: 'xp' | 'money' | 'trust' }) => (
        <div className="bg-graphite-light/50 p-4 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold uppercase tracking-wider text-neon-red font-oswald mb-3">{title}</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {data.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-black/40 rounded-lg border border-gray-700/60 relative group">
                        <span className="font-bold text-white font-oswald text-lg w-6">#{idx + 1}</span>
                        <span className="font-semibold text-gray-200 flex-1">{p.name}</span>
                        <div className="flex items-center gap-2">
                            <span className={`font-bold font-oswald ${type === 'trust' ? 'text-green-400' : 'text-neon-red'}`}>
                                {type === 'xp' ? p.points : type === 'money' ? p.virtualMoney : p.trustXp} {type === 'xp' ? 'XP' : type === 'trust' ? 'TXP' : ''}
                            </span>
                            {isEditor && onTriggerEdit && (
                                <button 
                                    onClick={() => onTriggerEdit('player', type === 'trust' ? 'trustXp' : 'points', p.id, type === 'trust' ? p.trustXp : p.points, 'number')}
                                    className="p-1 text-neon-magenta hover:text-white"
                                    title="Editar XP"
                                >
                                    <Edit3 size={12} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
      <div className="animate-fade-in space-y-6 pb-20">
        <h2 className="text-2xl font-bold uppercase tracking-wider text-white font-oswald flex items-center gap-2">
            <Users2 className="text-neon-red" /> Arena Fantasy
        </h2>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-6">
            <button 
                onClick={() => setActiveSubPage('quinteto')} 
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold uppercase font-oswald border-2 transition-all duration-300 ${ activeSubPage === 'quinteto' ? 'bg-neon-red border-neon-red text-black shadow-neon-red' : 'bg-black/40 border-gray-700 text-gray-400 hover:text-white' }`}
            >
                <Users2 size={18} /> <span>Mi Quinteto</span>
            </button>
            <button 
                onClick={() => setActiveSubPage('confiar')} 
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold uppercase font-oswald border-2 transition-all duration-300 ${ activeSubPage === 'confiar' ? 'bg-neon-red border-neon-red text-black shadow-neon-red' : 'bg-black/40 border-gray-700 text-gray-400 hover:text-white' }`}
            >
                <Handshake size={18} /> <span>Confiar</span>
            </button>
        </div>

        {/* --- QUINTETO TAB --- */}
        {activeSubPage === 'quinteto' && (
          <div className="space-y-6">
            <div className="flex justify-center gap-4 bg-black/30 p-1 rounded-lg">
              <button 
                onClick={() => setActiveLeague('junior')} 
                className={`flex-1 py-2 rounded-md font-bold uppercase font-oswald transition-all ${ activeLeague === 'junior' ? 'bg-gray-700 text-white' : 'text-gray-500' }`}
              >
                  Liga Junior
              </button>
              <button 
                onClick={() => setActiveLeague('provincial')} 
                className={`flex-1 py-2 rounded-md font-bold uppercase font-oswald transition-all ${ activeLeague === 'provincial' ? 'bg-gray-700 text-white' : 'text-gray-500' }`}
              >
                  Liga Provincial
              </button>
            </div>

            <div className="bg-graphite-light p-4 rounded-xl border border-gray-700 shadow-lg">
                <svg viewBox="0 0 100 70" className="w-full h-auto rounded-lg" style={{ background: 'linear-gradient(to bottom, #2a2a2a 0%, #111 100%)' }}>
                    <path d="M 0 0 H 100 V 70 H 0 Z" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
                    <path d="M 50 0 V 70" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    <circle cx="50" cy="35" r="8" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
                    <rect x="35" y="0" width="30" height="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
                    
                    {positionSlots.map(slot => {
                        const pid = selectedPositions[slot.id];
                        const player = players.find(p => p.id === pid);
                        return (
                          <g key={slot.id} onClick={() => handleSlotClick(slot.id)} className="cursor-pointer group">
                              <circle 
                                cx={slot.x} cy={slot.y} r="6" 
                                fill={player ? '#E30613' : 'rgba(0,0,0,0.5)'} 
                                stroke={player ? '#E30613' : 'white'} 
                                strokeWidth="0.5" 
                                className="transition-all duration-300"
                              />
                              <text 
                                x={slot.x} y={slot.y} dy="12" 
                                fill={player ? 'white' : '#888'} 
                                fontSize="4" textAnchor="middle" 
                                className="font-oswald uppercase pointer-events-none"
                              >
                                  {player ? player.name.split(' ')[0] : slot.label}
                              </text>
                              {!player && <circle cx={slot.x} cy={slot.y} r="2" fill="white" className="animate-pulse opacity-50"/>}
                          </g>
                        );
                    })}
                </svg>
                <p className="text-center text-xs text-gray-500 mt-2 font-oswald uppercase">Toca un jugador abajo y luego una posición arriba</p>
            </div>
            
            <div className="bg-graphite-light/50 p-4 rounded-xl border border-gray-700">
                <h3 className="text-lg font-bold uppercase tracking-wider text-neon-red font-oswald mb-3">Jugadores Disponibles</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                    {currentLeaguePlayers.map(p => {
                        const isPlaced = Object.values(selectedPositions).includes(p.id);
                        return (
                          <button 
                              key={p.id} 
                              onClick={() => handlePlayerClick(p.id)} 
                              disabled={isPlaced}
                              className={`w-full flex justify-between items-center p-3 rounded-lg border transition-all ${isPlaced ? 'bg-gray-800 border-gray-700 opacity-40 cursor-not-allowed' : selectedPlayerId === p.id ? 'bg-neon-red/20 border-neon-red' : 'bg-black/40 border-gray-700 hover:bg-gray-700'}`}
                          >
                              <div className="text-left">
                                  <span className="block font-semibold text-white">{p.name}</span>
                                  <span className="text-xs font-oswald text-gray-400 uppercase">{p.position} | {p.points} XP</span>
                              </div>
                              {selectedPlayerId === p.id && <div className="w-2 h-2 rounded-full bg-neon-red shadow-neon-red animate-pulse"></div>}
                          </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <RankingTable data={[...players].sort((a,b) => b.points - a.points)} title={`Ranking Semanal`} />
                 <RankingTable data={[...players].sort((a,b) => b.virtualMoney - a.virtualMoney)} title="Ranking Global" type="money" />
            </div>
          </div>
        )}
        
        {/* --- CONFIAR TAB --- */}
        {activeSubPage === 'confiar' && (
            <div className="animate-fade-in space-y-6">
                
                <div className="bg-graphite-light p-4 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-green-400 font-oswald mb-3">Apuestas: Aspectos Esenciales</h3>
                    <p className="text-gray-400 text-sm mb-4">Invierte fichas en la disciplina de tus compañeros. ¡Si cumplen, ganas XP!</p>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'water', label: 'Hidratación', icon: Droplet },
                            { id: 'punctuality', label: 'Puntualidad', icon: Clock },
                            { id: 'material', label: 'Material (Gomas)', icon: Activity },
                            { id: 'discipline', label: 'Disciplina', icon: ShieldCheck }
                        ].map(aspect => (
                             <button 
                                key={aspect.id}
                                onClick={() => onTrust && onTrust(user.id, 20, 'essential', aspect.label)}
                                className="flex flex-col items-center justify-center p-3 bg-black/40 border border-gray-700 rounded-lg hover:border-green-500 hover:bg-green-900/20 transition-all group"
                             >
                                 <aspect.icon size={24} className="text-gray-400 group-hover:text-green-400 mb-2"/>
                                 <span className="text-xs font-bold uppercase text-white font-oswald">{aspect.label}</span>
                                 <span className="text-[10px] text-yellow-500 font-mono">-20 Fichas</span>
                             </button>
                        ))}
                    </div>
                </div>

                <RankingTable data={[...players].sort((a,b) => (b.trustXp || 0) - (a.trustXp || 0))} title="Ranking Confianza" type="trust" />

                <div className="bg-graphite-light p-4 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-neon-red font-oswald">Centro de Apuestas y Acciones</h3>
                        <button 
                            onClick={() => openBetModal('custom')}
                            className="flex items-center gap-1 px-3 py-1 bg-neon-red text-white rounded text-xs font-bold uppercase hover:bg-red-600 transition-colors"
                        >
                            <Plus size={14} /> Personalizada
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        <button
                            onClick={() => openBetModal('join')}
                            className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/40 border border-gray-700 hover:border-blue-400 hover:bg-blue-900/10 transition-all group"
                        >
                            <UserPlus size={24} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform"/>
                            <span className="font-bold font-oswald text-white uppercase text-sm">Incluirse</span>
                            <span className="text-[10px] text-gray-400 text-center">Unirse a misión existente</span>
                        </button>
                        <button
                            onClick={() => openBetModal('combine')}
                            className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/40 border border-gray-700 hover:border-purple-400 hover:bg-purple-900/10 transition-all group"
                        >
                            <Users2 size={24} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform"/>
                            <span className="font-bold font-oswald text-white uppercase text-sm">Combinada</span>
                            <span className="text-[10px] text-gray-400 text-center">Proponer misión conjunta</span>
                        </button>
                        <button
                            onClick={() => openBetModal('teach')}
                            className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/40 border border-gray-700 hover:border-yellow-400 hover:bg-yellow-900/10 transition-all group"
                        >
                            <GraduationCap size={24} className="text-yellow-400 mb-2 group-hover:scale-110 transition-transform"/>
                            <span className="font-bold font-oswald text-white uppercase text-sm">Enseñanza</span>
                            <span className="text-[10px] text-gray-400 text-center">Mentorizar compañero</span>
                        </button>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase font-oswald mb-2">Apuestas Activas</h4>
                        {bets && bets.length > 0 ? bets.map((bet) => (
                            <div key={bet.id} className="p-3 bg-black/40 rounded-lg border border-gray-700 flex justify-between items-center relative pl-8 group">
                                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                                    {getBetIcon(bet.type)}
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm flex items-center gap-2">
                                        {bet.title}
                                        {isEditor && onTriggerEdit && (
                                            <button onClick={() => onTriggerEdit('bet', 'title', bet.id, bet.title, 'text')} className="opacity-0 group-hover:opacity-100 text-neon-magenta hover:text-white">
                                                <Edit3 size={10} />
                                            </button>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-400">{bet.description}</p>
                                    <p className="text-[10px] text-gray-500 mt-1">Autor: {bet.authorName}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-green-400 font-bold font-oswald flex items-center gap-1">
                                        {bet.amount} Fichas
                                        {isEditor && onTriggerEdit && (
                                            <button onClick={() => onTriggerEdit('bet', 'amount', bet.id, bet.amount, 'number')} className="opacity-0 group-hover:opacity-100 text-neon-magenta hover:text-white">
                                                <Edit3 size={10} />
                                            </button>
                                        )}
                                    </span>
                                    {isEditor && onDeleteBet && (
                                        <button onClick={() => onDeleteBet(bet.id)} className="text-gray-500 hover:text-red-500 mt-1">
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500 text-xs italic py-4 bg-black/20 rounded">No hay apuestas o acciones activas.</p>
                        )}
                    </div>
                </div>

                <div className="bg-graphite-light p-4 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-neon-red font-oswald mb-3">Confiar en Misiones</h3>
                    <p className="text-gray-400 text-sm mb-4">Apoya los objetivos técnicos de tus compañeros.</p>
                    
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {players.filter(p => p.id !== user.id).map(p => (
                            <div key={p.id} className="p-4 rounded-lg bg-black/40 border border-gray-700/60 flex flex-col md:flex-row justify-between items-center gap-3">
                                <div className="flex-1">
                                    <p className="font-semibold text-white text-lg">{p.name}</p>
                                    <p className="text-sm text-yellow-500 italic">Misión: "{p.focus}"</p>
                                </div>
                                <button 
                                    onClick={() => onTrust && onTrust(p.id, 50, 'mission')}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold uppercase text-xs transition-colors shadow-lg shadow-green-900/50"
                                >
                                    <Handshake size={16}/> <span>Confiar 50</span> <Hexagon size={12}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {showBetModal && (
            <Modal onClose={() => setShowBetModal(false)} title={`Crear: ${betType === 'custom' ? 'Apuesta Personalizada' : betType === 'join' ? 'Incluirse' : betType === 'combine' ? 'Combinada' : 'Enseñanza'}`}>
                <form onSubmit={handleSubmitBet} className="space-y-4 pt-2">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1 font-oswald">Título</label>
                        <input 
                            type="text" 
                            required
                            value={betForm.title}
                            onChange={(e) => setBetForm({...betForm, title: e.target.value})}
                            className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-neon-red outline-none"
                            placeholder="Ej: Reto de Tiros"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1 font-oswald">Descripción / Condiciones</label>
                        <textarea 
                            required
                            value={betForm.description}
                            onChange={(e) => setBetForm({...betForm, description: e.target.value})}
                            className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-neon-red outline-none min-h-[80px]"
                            placeholder="Detalles de la apuesta..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1 font-oswald">Apuesta (Fichas)</label>
                        <input 
                            type="number" 
                            required
                            min="1"
                            value={betForm.amount}
                            onChange={(e) => setBetForm({...betForm, amount: Number(e.target.value)})}
                            className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-neon-red outline-none font-oswald"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-3 bg-neon-red hover:bg-red-600 text-white font-bold uppercase font-oswald rounded-lg transition-colors shadow-lg shadow-neon-red/30"
                    >
                        Confirmar Acción
                    </button>
                </form>
            </Modal>
        )}

      </div>
    );
};
