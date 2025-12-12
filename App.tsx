import React, { useState, useEffect } from 'react';
import { Home, User, Gamepad2, Briefcase, Plus, HeartPulse, BarChart2, Lock, LogOut, Check, Search } from 'lucide-react';
import { realPlayers, mockMatches, PLAYBOOK_DATA, BADGE_CATALOG, CHECKIN_STEPS } from './constants';
import { FeedItem, UserRole, Player, EditFieldData, Match, Play, Badge, Bet, CheckInStep } from './types';
import { Dashboard } from './components/Dashboard';
import { PlayerCard } from './components/PlayerCard';
import { Lab } from './components/Lab';
import { CoachPanel } from './components/CoachPanel';
import { CheckInModal } from './components/CheckInModal';
import { Arena } from './components/Arena';
import { ArenaProgressionModal } from './components/ArenaProgressionModal';
import { Modal } from './components/shared/Modal';
import { EditModal } from './components/shared/EditModal';
import { ClubLogo } from './components/ClubLogo';
import { LoginScreen } from './components/LoginScreen';
import { supabase } from './services/supabaseClient';

export const App = () => {
  // --- AUTHENTICATION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('player');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // --- NAVIGATION STATE ---
  const [currentPage, setCurrentPage] = useState('inicio');

  // --- DATA STATE ---
  const [players, setPlayers] = useState<Player[]>(realPlayers);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [plays, setPlays] = useState<Play[]>(PLAYBOOK_DATA);
  const [teamMission, setTeamMission] = useState<string>("Rebote Agresivo");
  const [bets, setBets] = useState<Bet[]>([]);
  const [checkInSteps, setCheckInSteps] = useState<CheckInStep[]>(CHECKIN_STEPS);
  
  // --- UI STATE ---
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showArenaModal, setShowArenaModal] = useState(false);
  const [showCapsuleModal, setShowCapsuleModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<EditFieldData | null>(null);

  // Input Modals State
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | string | null>(null);
  const [showMambaModal, setShowMambaModal] = useState(false);
  
  // Custom Modals
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostData, setNewPostData] = useState({ text: '', videoUrl: '' });
  
  const [showBadgeSelector, setShowBadgeSelector] = useState(false);
  const [showStatSelector, setShowStatSelector] = useState<{ type: 'tactical' | 'psico' } | null>(null);

  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    { id: 1, type: 'post', user: 'Coach Mike', text: 'Gran intensidad hoy. Recordad: La defensa gana campeonatos.', timestamp: new Date(), likes: 12, likedBy: [], comments: [] },
  ]);

  // --- DATA FETCHING ---
  const fetchAllData = async () => {
    try {
      // 1. Players
      const { data: playerData, error: pErr } = await supabase.from('players').select('*').order('id', { ascending: true });
      if (playerData && !pErr && playerData.length > 0) {
        setPlayers(playerData);
      }

      // 2. Matches
      const { data: matchData, error: mErr } = await supabase.from('matches').select('*').order('id', { ascending: true });
      if (matchData && !mErr && matchData.length > 0) {
           setMatches(matchData);
      }

      // 3. Feed
      const { data: feedData, error: fErr } = await supabase.from('feed_items').select('*').order('timestamp', { ascending: false });
      if (feedData && !fErr && feedData.length > 0) {
          setFeedItems(feedData);
      }
      
      // 4. Bets
      const { data: betsData, error: bErr } = await supabase.from('bets').select('*').order('id', { ascending: false });
      if (betsData && !bErr) {
          setBets(betsData);
      }

    } catch (err) {
      console.error("Supabase connection error:", err);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchAllData();
  }, []);

  // Polling: Refresh data every 5 seconds to simulate real-time
  useEffect(() => {
      if (!isAuthenticated) return;
      
      const intervalId = setInterval(() => {
          console.log("Syncing data...");
          fetchAllData();
      }, 5000);

      return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const user = players.find(p => p.id === (currentUserId !== null ? currentUserId : 8)) || players[0];

  // --- HELPERS PARA SUPABASE ---
  const savePlayerToDb = async (player: Player) => {
      try {
          await supabase.from('players').update({
              points: player.points,
              virtualMoney: player.virtualMoney,
              mambaXp: player.mambaXp,
              trustXp: player.trustXp,
              stats: player.stats,
              psicoStats: player.psicoStats
          }).eq('id', player.id);
      } catch (e) { console.error("Error saving player", e); }
  };

  const saveMatchToDb = async (match: Match) => {
      try {
          await supabase.from('matches').update({
              opponent: match.opponent,
              time: match.time,
              location: match.location,
              fantasyNudge: match.fantasyNudge
          }).eq('id', match.id);
      } catch (e) { console.error("Error saving match", e); }
  };
  // -----------------------------

  const handleLogin = (role: UserRole, player?: Player) => {
      setIsAuthenticated(true);
      setUserRole(role);
      if (role === 'player' && player) {
          setCurrentUserId(player.id);
          setCurrentPage('micarta'); 
      } else {
          setCurrentUserId(null); 
          setCurrentPage('inicio');
      }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setUserRole('player');
      setCurrentUserId(null);
      setCurrentPage('inicio');
  };

  const handleStatIncrease = (stat: string, amount: number) => {
    let updatedPlayer: Player | undefined;
    
    setPlayers(prev => prev.map(p => {
        if (p.id === user.id) {
            updatedPlayer = { ...p, points: p.points + amount };
            return updatedPlayer;
        }
        return p;
    }));

    if (updatedPlayer) savePlayerToDb(updatedPlayer);

    setModalMessage(`+${amount} ${stat}`);
    setTimeout(() => setModalMessage(null), 2000);
  };

  const handleAddReps = (reason?: string) => {
      if (currentUserId !== null && userRole === 'player') {
          if (reason) {
              // In a real app, create a 'requests' table. 
              // For now, we just give visual feedback.
              setModalMessage("Solicitud Enviada con Motivo");
              setTimeout(() => setModalMessage(null), 2500);
          } else {
              setShowMambaModal(true);
          }
      } else if (currentUserId !== null || userRole === 'editor') {
        const targetId = currentUserId !== null ? currentUserId : user.id; 
        let updatedPlayer: Player | undefined;

        setPlayers(prev => prev.map(p => {
            if (p.id === targetId) {
                updatedPlayer = { 
                    ...p, 
                    mambaXp: (p.mambaXp || 0) + 10,
                    points: p.points + 10
                };
                return updatedPlayer;
            }
            return p;
        }));

        if (updatedPlayer) savePlayerToDb(updatedPlayer);

        setModalMessage("+10 XP MAMBA");
        setTimeout(() => setModalMessage(null), 2000);
      }
  };

  const handleAddBet = async (betData: Omit<Bet, 'id' | 'authorId' | 'authorName'>) => {
      const newBetId = Date.now();
      const newBet: Bet = {
          id: newBetId,
          authorId: user.id,
          authorName: user.name,
          ...betData
      };
      
      // Optimistic Update
      setBets(prev => [newBet, ...prev]);

      // DB Insert
      const { error } = await supabase.from('bets').insert({
          id: newBetId,
          type: betData.type,
          authorId: user.id,
          authorName: user.name,
          title: betData.title,
          description: betData.description,
          amount: betData.amount
      });
      
      if (error) console.error("Error creating bet:", error);

      let msg = "Apuesta Creada";
      if (betData.type === 'join') msg = "Te has incluido en la misión";
      if (betData.type === 'combine') msg = "Propuesta combinada creada";
      if (betData.type === 'teach') msg = "Oferta de enseñanza publicada";

      setModalMessage(msg);
      setTimeout(() => setModalMessage(null), 2000);
  };

  const handleDeleteBet = async (id: number) => {
      setBets(prev => prev.filter(b => b.id !== id));
      
      const { error } = await supabase.from('bets').delete().eq('id', id);
      if(error) console.error("Error deleting bet:", error);

      setModalMessage("Apuesta Eliminada");
      setTimeout(() => setModalMessage(null), 1500);
  };

  const handleTriggerEdit = (target: any, key: string, id: number | string | undefined, value: string | number, type: 'text' | 'number' | 'textarea' = 'text') => {
      setEditingField({ target, id, key, value, type });
  };

  const handleSaveEdit = (newValue: string | number) => {
      if (!editingField) return;

      const { target, id, key } = editingField;

      if (target === 'user' || (target === 'player' && id !== undefined)) {
          // Handle numeric fields
          if (key === 'mambaXp' || key === 'points' || key === 'trustXp' || key === 'virtualMoney') {
              newValue = Number(newValue);
          }
          const targetId = id !== undefined ? Number(id) : user.id;
          let updatedPlayer: Player | undefined;

          setPlayers(prev => prev.map(p => {
              if (p.id === targetId) {
                  updatedPlayer = { ...p, [key]: newValue };
                  return updatedPlayer;
              }
              return p;
          }));

          if (updatedPlayer) savePlayerToDb(updatedPlayer);

          if (key === 'points') setModalMessage("XP Actualizado");
          if (key === 'mambaXp') setModalMessage("Mamba XP Actualizado");
      } else if (target === 'mission') {
          setTeamMission(newValue as string);
      } else if (target === 'match' && id) {
          setMatches(prev => {
              const updated = prev.map(m => m.id === id ? { ...m, [key]: newValue } : m);
              const changedMatch = updated.find(m => m.id === id);
              if (changedMatch) saveMatchToDb(changedMatch);
              return updated;
          });
      } else if (target === 'feedItem' && id) {
           // Optimistic update for feed
           setFeedItems(prev => prev.map(i => i.id === id ? { ...i, [key]: newValue } : i));
           // Async save
           supabase.from('feed_items').update({ [key]: newValue }).eq('id', id).then();
           setModalMessage("Post Actualizado");
      } else if (target === 'play' && id) {
           setPlays(prev => prev.map(p => p.id === id ? { ...p, [key]: newValue } : p));
           setModalMessage("Jugada Actualizada");
      } else if (target === 'bet' && id) {
           setBets(prev => prev.map(b => b.id === id ? { ...b, [key]: newValue } : b));
           supabase.from('bets').update({ [key]: newValue }).eq('id', id).then();
           setModalMessage("Apuesta Editada");
      } else if (target === 'stat') {
           const index = parseInt(key);
           const isPsico = id === 'psico'; 
           let updatedPlayer: Player | undefined;

           setPlayers(prev => prev.map(p => {
               if (p.id === user.id) {
                   const newStats = isPsico ? [...p.psicoStats] : [...p.stats];
                   newStats[index] = Number(newValue);
                   const newVal = isPsico ? { ...p, psicoStats: newStats } : { ...p, stats: newStats };
                   updatedPlayer = newVal;
                   return newVal;
               }
               return p;
           }));

           if (updatedPlayer) savePlayerToDb(updatedPlayer);
           setModalMessage("Estadística Actualizada");
      } else if (target === 'checkin' && id) {
           setCheckInSteps(prev => prev.map(s => s.id === id ? { ...s, title: newValue as string } : s));
           setModalMessage("Pregunta Actualizada");
      }

      if (!['feedItem', 'play', 'bet', 'stat', 'checkin'].includes(target)) {
          setModalMessage("Cambios Guardados");
      }
      setTimeout(() => setModalMessage(null), 1500);
      setEditingField(null);
  };

  const handleTrust = (targetPlayerId: number, amount: number, type: 'mission' | 'essential', aspect?: string) => {
      if (user.virtualMoney >= amount) {
          let updatedUser: Player | undefined;
          let updatedTarget: Player | undefined;

          setPlayers(prev => prev.map(p => {
              // Jugador que confía: Gasta fichas, gana TrustXP y GANA Puntos Totales
              if (p.id === user.id) {
                  updatedUser = { 
                      ...p, 
                      virtualMoney: p.virtualMoney - amount,
                      trustXp: (p.trustXp || 0) + 10,
                      points: p.points + 10
                  };
                  return updatedUser;
              }
              // Jugador que recibe la confianza (en misiones): Gana TrustXP y Puntos Totales
              if (p.id === targetPlayerId && type === 'mission') {
                  updatedTarget = { 
                      ...p, 
                      trustXp: (p.trustXp || 0) + 5,
                      points: p.points + 5
                  };
                  return updatedTarget;
              }
              return p;
          }));

          // Save to DB
          if (updatedUser) savePlayerToDb(updatedUser);
          if (updatedTarget) savePlayerToDb(updatedTarget);
          
          if (type === 'mission') {
            setModalMessage("Confianza Enviada (-" + amount + ")");
          } else {
             setModalMessage(`Apuesta: ${aspect} (-${amount})`);
          }
          setTimeout(() => setModalMessage(null), 2000);
      } else {
          setModalMessage("Fichas Insuficientes");
          setTimeout(() => setModalMessage(null), 2000);
      }
  };

  // Badge Logic
  const handleAddBadge = (badgeDef: any) => {
      const newBadge: Badge = {
          id: Date.now(),
          badgeId: badgeDef.id,
          icon: badgeDef.icon,
          title: badgeDef.title,
          description: "Otorgada por el staff técnico",
          earned: true
      };
      
      setPlayers(prev => prev.map(p => {
          if (p.id === user.id) {
              const currentBadges = p.badges || [];
              const updated = { ...p, badges: [...currentBadges, newBadge], points: p.points + badgeDef.xp };
              // Note: Badges are not yet persisted in Supabase Table structure in this version
              // We'll update the points at least
              savePlayerToDb(updated); 
              return updated;
          }
          return p;
      }));
      
      setShowBadgeSelector(false);
      setModalMessage(`Insignia ${badgeDef.title} Asignada`);
      setTimeout(() => setModalMessage(null), 2000);
  };

  const handleNewPostClick = () => {
      setNewPostData({ text: '', videoUrl: '' });
      setShowNewPostModal(true);
  }

  const handleCreatePost = async () => {
      if(newPostData.text) {
          // Prepare DB object
          const dbItem = {
              type: (newPostData.videoUrl ? 'video' : 'post') as 'post' | 'video',
              user: userRole === 'editor' ? 'Admin' : 'Coach',
              text: newPostData.text,
              videoUrl: newPostData.videoUrl,
              likes: 0
          };

          // Optimistic UI update
          const newItem: FeedItem = {
              ...dbItem,
              id: Date.now(), // Temp ID
              timestamp: new Date(),
              likedBy: [],
              comments: []
          };
          setFeedItems(prev => [newItem, ...prev]);

          // Save to DB
          const { error } = await supabase.from('feed_items').insert(dbItem);
          if (error) console.error("Error creating post", error);

          setShowNewPostModal(false);
          setModalMessage("Post Creado");
          setTimeout(() => setModalMessage(null), 1500);
      }
  }

  const handleFeedInteraction = (id: number | string, type: 'like' | 'comment', payload?: string) => {
      const activeUserId = user.id;

      if (type === 'comment' && !payload) {
          setActiveCommentPostId(id);
          return;
      }

      setFeedItems(prev => prev.map(item => {
          if (item.id === id) {
              if (type === 'like') {
                  const likedBy = item.likedBy || [];
                  const isLiked = likedBy.includes(activeUserId);
                  const currentLikes = item.likes || 0;
                  const newLikes = isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;
                  
                  // Update DB
                  supabase.from('feed_items').update({ likes: newLikes }).eq('id', id).then();

                  if (isLiked) {
                      return { 
                          ...item, 
                          likes: newLikes, 
                          likedBy: likedBy.filter(uid => uid !== activeUserId) 
                      };
                  } else {
                      return { 
                          ...item, 
                          likes: newLikes, 
                          likedBy: [...likedBy, activeUserId] 
                      };
                  }

              } else if (type === 'comment' && payload) {
                  const newComments = [...(item.comments || []), { user: user.name, text: payload }];
                  
                  // Update DB
                  supabase.from('feed_items').update({ comments: newComments }).eq('id', id).then();

                  return { 
                      ...item, 
                      comments: newComments
                  };
              }
          }
          return item;
      }));

      if (type === 'comment' && payload) {
          setModalMessage("Comentario Añadido");
          setTimeout(() => setModalMessage(null), 1500);
          setActiveCommentPostId(null);
      }
  };

  const handleNewPlay = () => {
      const newPlay: Play = {
          id: `play_${Date.now()}`,
          name: "Nueva Jugada",
          description: "Descripción...",
          videoUrl: ""
      };
      setPlays(prev => [...prev, newPlay]);
      setModalMessage("Jugada Creada");
      setTimeout(() => setModalMessage(null), 1500);
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'inicio': 
        return <Dashboard 
                  user={user} 
                  feedItems={feedItems} 
                  matches={matches} 
                  teamMission={teamMission}
                  isEditor={userRole === 'editor'}
                  onTriggerEdit={handleTriggerEdit}
                  onInteraction={handleFeedInteraction}
                  onNewPost={handleNewPostClick}
               />;
      
      case 'micarta': 
        return <PlayerCard 
                user={user} 
                onShowArenaModal={() => setShowArenaModal(true)} 
                onShowCapsuleModal={() => setShowCapsuleModal(true)} 
                onAddReps={handleAddReps} 
                isEditor={userRole === 'editor'}
                onTriggerEdit={(key, val, type) => handleTriggerEdit('user', key as string, user.id, val, type)}
                onAddBadge={() => setShowBadgeSelector(true)}
                onEditStat={(type) => setShowStatSelector({ type })}
               />;
      
      case 'lab': 
        return <Lab 
                onStatIncrease={handleStatIncrease} 
                isEditor={userRole === 'editor'} 
                onTriggerEdit={handleTriggerEdit}
                onNewPlay={handleNewPlay}
                plays={plays}
               />;
      
      case 'arena': 
        return <Arena 
                user={user} 
                players={players} 
                isEditor={userRole === 'editor'}
                onTriggerEdit={handleTriggerEdit}
                onTrust={handleTrust}
                bets={bets}
                onAddBet={handleAddBet}
                onDeleteBet={handleDeleteBet}
               />;
      
      case 'coach': 
        if (userRole === 'player') return <div className="p-10 text-center text-gray-500">Acceso Restringido</div>;
        return <CoachPanel 
                  players={players} 
                  onClose={() => setCurrentPage('inicio')} 
                  isEditor={userRole === 'editor'} 
                  onTriggerEdit={handleTriggerEdit} 
                  onLogout={handleLogout}
               />;
          
      default: return <Dashboard user={user} feedItems={feedItems} matches={matches} teamMission={teamMission} />;
    }
  };

  if (!isAuthenticated) {
      return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-graphite font-sans text-white pb-24 selection:bg-neon-red selection:text-white relative overflow-hidden">
      
      <header className="sticky top-0 z-40 bg-graphite/95 backdrop-blur-md border-b border-neon-red/20 p-4 shadow-lg relative">
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-4">
                <div className="w-16 h-20 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                    <ClubLogo />
                </div>
                <div>
                   <h1 className="text-3xl md:text-5xl font-bold font-oswald uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 leading-none">
                       Fantasy <span className="text-neon-red">Junior A</span>
                   </h1>
                   <p className="text-[10px] font-oswald uppercase tracking-widest text-gray-400 mt-1">
                       Sesión: <span className="text-white">{userRole === 'player' ? user.name : userRole}</span>
                   </p>
                </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-neon-red text-white text-xs rounded border border-gray-600 hover:border-neon-red transition-all font-oswald uppercase"
                >
                    <LogOut size={12} /> Salir
                </button>

                {userRole === 'editor' && (
                    <div className="relative animate-fade-in mt-1 flex flex-col items-end gap-1">
                        <select 
                            value={currentPage === 'coach' ? 'coach' : 'player'}
                            onChange={(e) => {
                                if (e.target.value === 'coach') setCurrentPage('coach');
                                else setCurrentPage('inicio');
                            }}
                            className="bg-neon-magenta/10 border border-neon-magenta text-white text-[10px] rounded-md px-2 py-1 focus:bg-neon-magenta/20 outline-none pr-6 font-oswald uppercase tracking-wider cursor-pointer text-right w-32"
                        >
                            <option value="player">Vista Jugador</option>
                            <option value="coach">Vista Coach</option>
                        </select>

                        {/* PLAYER SWITCHER FOR EDITORS */}
                        {currentPage !== 'coach' && (
                            <select 
                                value={currentUserId || ''}
                                onChange={(e) => setCurrentUserId(Number(e.target.value))}
                                className="bg-gray-800 border border-gray-600 text-white text-[10px] rounded-md px-2 py-1 outline-none pr-6 font-oswald uppercase tracking-wider cursor-pointer text-right w-32"
                            >
                                {players.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
            </div>
        </div>
      </header>

      {userRole === 'editor' && (
          <div className="bg-neon-magenta/20 border-b border-neon-magenta text-neon-magenta text-center text-xs font-bold uppercase py-1 font-oswald tracking-widest animate-pulse">
              Modo Editor Activado - {user.name}
          </div>
      )}

      <main className="p-4 container mx-auto max-w-2xl relative z-10">
        {renderContent()}
      </main>

      {userRole === 'player' && (
        <button 
            onClick={() => setShowCheckIn(true)}
            className="fixed bottom-24 right-4 z-30 w-14 h-14 bg-gradient-to-br from-neon-red to-neon-magenta rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(227,6,19,0.6)] hover:scale-110 transition-transform active:scale-95 animate-bounce-subtle"
        >
            <HeartPulse size={28} className="text-black" />
        </button>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-graphite/95 backdrop-blur-xl border-t border-neon-red/20 pb-safe z-40">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto">
            {[
                { id: 'inicio', icon: Home, label: 'Inicio', allowed: ['player', 'coach', 'editor'] },
                { id: 'arena', icon: Gamepad2, label: 'Arena', allowed: ['player', 'coach', 'editor'] },
                { id: 'micarta', icon: User, label: 'Mi Carta', allowed: ['player', 'editor'] },
                { id: 'lab', icon: BarChart2, label: 'Lab', allowed: ['player', 'coach', 'editor'] },
                { id: 'coach', icon: Briefcase, label: 'Coach', allowed: ['coach', 'editor'] }
            ].map(item => {
                if (!item.allowed.includes(userRole)) return null;

                return (
                    <button 
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`flex flex-col items-center justify-center w-full h-full transition-colors ${currentPage === item.id ? 'text-neon-red' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <item.icon size={24} className={currentPage === item.id ? 'drop-shadow-[0_0_5px_rgba(227,6,19,0.8)]' : ''} />
                        <span className="text-[10px] font-oswald uppercase mt-1 tracking-wider">{item.label}</span>
                    </button>
                );
            })}
        </div>
      </nav>

      {/* MODALS */}
      
      {editingField && (
          <EditModal 
            title={`Editar: ${editingField.key}`}
            initialValue={editingField.value}
            type={editingField.type}
            onSave={handleSaveEdit}
            onClose={() => setEditingField(null)}
          />
      )}

      {activeCommentPostId && (
          <EditModal 
            title="Añadir Comentario"
            initialValue=""
            type="text"
            confirmLabel="Publicar"
            onSave={(val) => handleFeedInteraction(activeCommentPostId, 'comment', val as string)}
            onClose={() => setActiveCommentPostId(null)}
          />
      )}

      {showNewPostModal && (
          <Modal onClose={() => setShowNewPostModal(false)} title="Nuevo Post">
              <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1 font-oswald">Contenido del Post</label>
                      <textarea 
                          value={newPostData.text}
                          onChange={(e) => setNewPostData({ ...newPostData, text: e.target.value })}
                          className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-neon-red outline-none min-h-[100px]"
                          placeholder="Escribe tu mensaje..."
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1 font-oswald">URL Multimedia (Opcional)</label>
                      <input 
                          type="text" 
                          value={newPostData.videoUrl}
                          onChange={(e) => setNewPostData({ ...newPostData, videoUrl: e.target.value })}
                          className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-neon-red outline-none"
                          placeholder="https://..."
                      />
                  </div>
                  <button 
                      onClick={handleCreatePost}
                      className="w-full py-3 bg-neon-magenta text-black font-bold uppercase font-oswald rounded-lg hover:bg-white transition-colors shadow-lg shadow-neon-magenta/20"
                  >
                      Publicar
                  </button>
              </div>
          </Modal>
      )}

      {showMambaModal && (
          <EditModal 
            title="Solicitud Mamba"
            initialValue=""
            type="text"
            confirmLabel="Enviar Solicitud"
            onSave={(val) => {
                handleAddReps(val as string);
                setShowMambaModal(false);
            }}
            onClose={() => setShowMambaModal(false)}
          />
      )}

      {showCheckIn && (
          <CheckInModal 
            user={user} 
            steps={checkInSteps}
            isEditor={userRole === 'editor'}
            onEditStep={(stepId, newTitle) => handleTriggerEdit('checkin', 'title', stepId, newTitle, 'text')}
            onClose={() => setShowCheckIn(false)} 
            onComplete={(xp) => {
                handleStatIncrease('XP', xp);
            }} 
          />
      )}
      
      {showBadgeSelector && (
          <Modal onClose={() => setShowBadgeSelector(false)} title="Seleccionar Insignia">
              <div className="grid grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto p-1">
                  {BADGE_CATALOG.map(badge => (
                      <button 
                        key={badge.id}
                        onClick={() => handleAddBadge(badge)}
                        className="flex flex-col items-center p-3 rounded-lg border border-gray-700 hover:border-neon-magenta hover:bg-gray-800 transition-all text-center"
                      >
                          <badge.icon size={24} className="text-neon-magenta mb-2" />
                          <span className="text-[10px] font-bold text-white uppercase">{badge.title}</span>
                          <span className="text-[9px] text-gray-400">{badge.xp} XP</span>
                      </button>
                  ))}
              </div>
          </Modal>
      )}

      {showStatSelector && (
          <Modal onClose={() => setShowStatSelector(null)} title={`Editar Stats ${showStatSelector.type === 'tactical' ? 'Tácticos' : 'Psicológicos'}`}>
              <div className="space-y-2">
                  {(showStatSelector.type === 'tactical' ? ['Precisión', 'Resolución', 'Defensa', 'Rebote', 'Asistencia'] : ['Compromiso', 'Disciplina', 'Liderazgo', 'Esfuerzo', 'Adaptación', 'Foco', 'Cohesión', 'Resiliencia']).map((label, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                            // Trigger edit for this specific stat index
                            // We pass 'stat' as target, and the index as the key. 
                            // We use 'id' param to pass the type (psico vs tactical) for the handler
                            const currentVal = showStatSelector.type === 'tactical' ? user.stats[idx] : user.psicoStats[idx];
                            handleTriggerEdit('stat', idx.toString(), showStatSelector.type === 'tactical' ? 'tactical' : 'psico', currentVal, 'number');
                            setShowStatSelector(null);
                        }}
                        className="w-full text-left p-3 rounded bg-gray-800 hover:bg-neon-magenta/20 flex justify-between items-center"
                      >
                          <span className="font-oswald uppercase text-sm">{label}</span>
                          <span className="font-bold text-neon-red">{showStatSelector.type === 'tactical' ? user.stats[idx] : user.psicoStats[idx]}</span>
                      </button>
                  ))}
              </div>
          </Modal>
      )}

      {showArenaModal && (
          <ArenaProgressionModal 
            currentUserXp={user.points} 
            onClose={() => setShowArenaModal(false)} 
          />
      )}

      {showCapsuleModal && (
          <Modal onClose={() => setShowCapsuleModal(false)} title="Cápsula del Tiempo">
              <div className="text-center space-y-4 py-4">
                  <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center mx-auto border-2 border-neon-red shadow-[0_0_15px_rgba(227,6,19,0.4)]">
                      <Lock size={32} className="text-neon-red" />
                  </div>
                  <h3 className="text-xl font-bold font-oswald uppercase text-white">Mensaje Encriptado</h3>
                  <p className="text-gray-400 text-sm">
                      Tu mensaje está guardado y seguro. Se desbloqueará automáticamente al final de la temporada.
                  </p>
                  <div className="p-3 bg-neon-red/10 border border-neon-red/30 rounded-lg">
                      <p className="text-xs font-mono text-neon-red">STATUS: LOCKED</p>
                      <p className="text-xs font-mono text-gray-500">KEY: *****************</p>
                  </div>
              </div>
          </Modal>
      )}

      {modalMessage && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-fade-in pointer-events-none">
              <div className="bg-black/80 backdrop-blur-md border border-neon-red px-8 py-6 rounded-xl text-center shadow-[0_0_40px_rgba(227,6,19,0.5)]">
                  <p className="text-3xl font-bold font-oswald text-white uppercase tracking-widest text-shadow-neon-glow">{modalMessage}</p>
              </div>
          </div>
      )}
    </div>
  );
};