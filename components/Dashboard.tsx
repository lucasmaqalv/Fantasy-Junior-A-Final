
import React from 'react';
import { FeedItem, Match, Player } from '../types';
import { Flame, MessageSquare, ThumbsUp, PlayCircle, Edit3, Plus, Video, Calendar, MapPin } from 'lucide-react';

interface DashboardProps {
  user: Player;
  feedItems: FeedItem[];
  matches: Match[];
  teamMission: string;
  isEditor?: boolean;
  onTriggerEdit?: (target: 'mission' | 'match' | 'feedItem', key: string, id: number | string | undefined, value: string, type: 'text' | 'number') => void;
  onInteraction?: (id: number | string, type: 'like' | 'comment', payload?: string) => void;
  onNewPost?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, feedItems, matches, teamMission, isEditor = false, onTriggerEdit, onInteraction, onNewPost }) => {
  return (
    <div className="space-y-6 pb-20 animate-fade-in">
        {/* Objectives Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team Mission Card */}
            <div className="bg-graphite-light p-4 rounded-xl border border-gray-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Flame size={60} />
                </div>
                <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400 font-oswald mb-1">Misión de Equipo</h3>
                    {isEditor && onTriggerEdit && (
                        <button 
                            onClick={() => onTriggerEdit('mission', 'title', undefined, teamMission, 'text')}
                            className="text-neon-magenta hover:text-white transition-colors bg-black/20 p-1 rounded hover:bg-neon-magenta/20"
                            title="Editar Misión"
                        >
                            <Edit3 size={14} />
                        </button>
                    )}
                </div>
                <p className="text-lg font-bold text-white mb-3">"{teamMission}"</p>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-400 h-full w-[75%] shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                </div>
                <p className="text-right text-xs text-gray-400 mt-1">75% Completado</p>
            </div>
            
            {/* Next Match Card */}
            <div className="bg-graphite-light p-4 rounded-xl border border-gray-700 relative">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neon-red font-oswald mb-1">Próximo Partido</h3>
                </div>
                {matches[0] ? (
                    <div className="space-y-2">
                        {/* Opponent Edit */}
                        <div className="flex items-center justify-between group/opp">
                            <p className="text-lg font-bold text-white leading-none">{matches[0].opponent}</p>
                            {isEditor && onTriggerEdit && (
                                <button 
                                    onClick={() => onTriggerEdit('match', 'opponent', matches[0].id, matches[0].opponent, 'text')}
                                    className="text-neon-magenta hover:text-white opacity-50 group-hover/opp:opacity-100 transition-opacity"
                                >
                                    <Edit3 size={12} />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            {/* Time Edit */}
                            <div className="flex items-center text-sm text-gray-400 group/time">
                                <Calendar size={12} className="mr-2" />
                                <span className="mr-2">{matches[0].time}</span>
                                {isEditor && onTriggerEdit && (
                                    <button 
                                        onClick={() => onTriggerEdit('match', 'time', matches[0].id, matches[0].time, 'text')}
                                        className="text-neon-magenta hover:text-white opacity-50 group-hover/time:opacity-100 transition-opacity"
                                    >
                                        <Edit3 size={10} />
                                    </button>
                                )}
                            </div>

                            {/* Location Edit */}
                            <div className="flex items-center text-sm text-gray-400 group/loc">
                                <MapPin size={12} className="mr-2" />
                                <span className="mr-2">{matches[0].location}</span>
                                {isEditor && onTriggerEdit && (
                                    <button 
                                        onClick={() => onTriggerEdit('match', 'location', matches[0].id, matches[0].location, 'text')}
                                        className="text-neon-magenta hover:text-white opacity-50 group-hover/loc:opacity-100 transition-opacity"
                                    >
                                        <Edit3 size={10} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No hay partidos programados.</p>
                )}
            </div>
        </div>

        {/* Social Feed */}
        <div>
            <div className="flex justify-between items-center mb-4 border-l-4 border-neon-red pl-3">
                 <h2 className="text-xl font-bold font-oswald text-white uppercase">Pulso del Equipo</h2>
                 {isEditor && onNewPost && (
                     <button 
                        onClick={onNewPost}
                        className="flex items-center gap-1 bg-neon-magenta text-black px-3 py-1 rounded text-xs font-bold uppercase hover:bg-white transition-colors shadow-lg shadow-neon-magenta/20"
                     >
                         <Plus size={12} /> Nuevo Post
                     </button>
                 )}
            </div>
            
            <div className="space-y-4">
                {feedItems.length > 0 ? feedItems.map((item, idx) => {
                    const isLiked = item.likedBy?.includes(user.id);
                    return (
                        <div key={idx} className="bg-graphite-light/80 backdrop-blur-sm p-5 rounded-xl border border-gray-800 shadow-lg relative group">
                            
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold font-oswald text-neon-red border border-gray-600">
                                        {item.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{item.user}</p>
                                        <p className="text-xs text-gray-500">hace 2 horas</p>
                                    </div>
                                </div>
                                
                                {isEditor && onTriggerEdit && (
                                    <div className="flex gap-2">
                                         {/* Edit Video Button */}
                                         <button 
                                            onClick={() => onTriggerEdit('feedItem', 'videoUrl', item.id, item.videoUrl || '', 'text')}
                                            className="text-gray-500 hover:text-neon-magenta transition-colors"
                                            title="Añadir/Editar Multimedia"
                                        >
                                            <Video size={14} />
                                        </button>
                                        {/* Edit Text Button */}
                                        <button 
                                            onClick={() => onTriggerEdit('feedItem', 'text', item.id, item.text || '', 'text')}
                                            className="text-gray-500 hover:text-neon-magenta transition-colors"
                                            title="Editar Texto"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Content */}
                            <div className="mb-4">
                                {/* Text */}
                                <p className="text-gray-300 text-sm mb-3 leading-relaxed whitespace-pre-wrap">{item.text || `Nuevo contenido publicado.`}</p>
                                
                                {/* Video (if present) */}
                                {item.videoUrl && item.videoUrl.length > 0 && (
                                    <div className="rounded-lg overflow-hidden border border-gray-700 relative bg-black aspect-video flex items-center justify-center group cursor-pointer">
                                        {/* In a real app, this would be a video player. For demo, a placeholder */}
                                        <PlayCircle size={40} className="text-white/50 group-hover:text-neon-red transition-colors" />
                                        <span className="absolute bottom-2 right-2 text-[10px] text-gray-400 bg-black/50 px-1 rounded">VIDEO</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                {/* Comments Section (Visible if any) */}
                                {item.comments && item.comments.length > 0 && (
                                    <div className="bg-black/30 p-2 rounded-lg space-y-1 mb-2">
                                        {item.comments.map((comment, cIdx) => (
                                            <p key={cIdx} className="text-xs text-gray-300">
                                                <span className="font-bold text-gray-500 mr-1">{comment.user}:</span>
                                                {comment.text}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                <div className="flex gap-4 border-t border-gray-700 pt-3">
                                    <button 
                                        onClick={() => onInteraction && onInteraction(item.id, 'like')}
                                        className={`flex items-center gap-1 text-xs transition-colors ${isLiked ? 'text-neon-red' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <ThumbsUp size={14} className={isLiked ? 'fill-neon-red' : ''} /> 
                                        {item.likes ? `${item.likes} ` : ''} Me gusta
                                    </button>
                                    <button 
                                        onClick={() => onInteraction && onInteraction(item.id, 'comment')}
                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                                    >
                                        <MessageSquare size={14} /> Comentar
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="p-8 text-center text-gray-500 bg-black/20 rounded-xl">No hay actualizaciones.</div>
                )}
            </div>
        </div>
    </div>
  );
};
