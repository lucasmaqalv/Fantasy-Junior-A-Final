
import React, { useState } from 'react';
import { PLAYBOOK_DATA } from '../constants';
import { Play } from '../types';
import { Brain, Camera, Film, PlayCircle, Eye, Edit3, Plus, Video } from 'lucide-react';
import { Modal } from './shared/Modal';

interface LabProps {
    onStatIncrease: (stat: string, amount: number) => void;
    isEditor?: boolean;
    onTriggerEdit?: (target: 'play', key: string, id: string, value: string, type: 'textarea' | 'text') => void;
    onNewPlay?: () => void;
    plays?: Play[];
}

export const Lab: React.FC<LabProps> = ({ onStatIncrease, isEditor = false, onTriggerEdit, onNewPlay, plays = PLAYBOOK_DATA }) => {
  const [activeTab, setActiveTab] = useState<'tactica' | 'video' | 'tiro'>('tactica');
  const [selectedPlay, setSelectedPlay] = useState<Play | null>(null);

  const isVideo = (url: string) => {
      return url.includes('mp4') || url.includes('webm') || url.includes('mov');
  };

  return (
    <div className="animate-fade-in pb-20">
      <div className="flex justify-center gap-2 mb-6 bg-black/30 p-1 rounded-lg">
        {[
            { id: 'tactica', icon: Brain, label: 'Táctica' },
            { id: 'video', icon: Film, label: 'Vídeo' },
            { id: 'tiro', icon: Camera, label: 'Tiro' }
        ].map((tab) => (
            <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all font-oswald uppercase text-sm ${activeTab === tab.id ? 'bg-neon-red text-black shadow-[0_0_10px_rgba(255,0,110,0.5)]' : 'text-gray-400 hover:bg-white/5'}`}
            >
                <tab.icon size={16} /> {tab.label}
            </button>
        ))}
      </div>

      {activeTab === 'tactica' && (
          <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold font-oswald text-white uppercase flex items-center gap-2">
                      <Brain className="text-neon-red" /> Playbook Táctico
                  </h2>
                  {isEditor && onNewPlay && (
                      <button 
                        onClick={onNewPlay}
                        className="flex items-center gap-1 px-3 py-1 bg-neon-magenta text-black rounded text-xs font-bold uppercase hover:scale-105 transition-transform"
                      >
                          <Plus size={12} /> Nueva Jugada
                      </button>
                  )}
              </div>

              {plays.map(play => (
                  <div key={play.id} className="bg-graphite-light p-4 rounded-xl border border-gray-700 hover:border-neon-red transition-all group flex justify-between items-center relative">
                      {isEditor && onTriggerEdit && (
                          <div className="absolute top-2 right-2 flex gap-2 z-10">
                              <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTriggerEdit('play', 'videoUrl', play.id, play.videoUrl, 'text');
                                }}
                                className="text-gray-500 hover:text-neon-magenta"
                                title="Editar Video URL"
                              >
                                  <Video size={14} />
                              </button>
                              <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTriggerEdit('play', 'description', play.id, play.description, 'textarea');
                                }}
                                className="text-gray-500 hover:text-neon-magenta"
                                title="Editar Descripción"
                              >
                                  <Edit3 size={14} />
                              </button>
                          </div>
                      )}
                      <div>
                          <h3 className="font-bold text-lg text-white font-oswald flex items-center gap-2">
                              {play.name}
                              {isEditor && onTriggerEdit && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onTriggerEdit('play', 'name', play.id, play.name, 'text');
                                    }}
                                    className="text-gray-500 hover:text-neon-magenta opacity-50 hover:opacity-100"
                                >
                                    <Edit3 size={12} />
                                </button>
                              )}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{play.description}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedPlay(play)}
                        className="p-3 rounded-full bg-gray-800 group-hover:bg-neon-red group-hover:text-black transition-colors"
                      >
                          <Eye size={20} />
                      </button>
                  </div>
              ))}
          </div>
      )}

      {activeTab === 'tiro' && (
          <div className="text-center p-8 bg-gray-900 rounded-xl border border-dashed border-gray-700 relative">
              {isEditor && (
                   <div className="absolute top-2 right-2 text-neon-magenta flex items-center gap-1 cursor-pointer">
                       <Edit3 size={12} /> <span className="text-[10px] font-bold uppercase">Configurar</span>
                   </div>
              )}
              <Camera size={48} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-400 font-oswald uppercase">Laboratorio de Tiro</h3>
              <p className="text-gray-500 mt-2">Módulo de análisis biomecánico actualmente offline.</p>
          </div>
      )}
      
      {activeTab === 'video' && (
          <div className="text-center p-8 bg-gray-900 rounded-xl border border-dashed border-gray-700 relative">
              {isEditor && (
                   <button className="absolute top-4 right-4 bg-neon-magenta text-black p-2 rounded-full hover:scale-110 transition-transform">
                       <Plus size={16} />
                   </button>
              )}
              <Film size={48} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-400 font-oswald uppercase">Análisis de Vídeo</h3>
              <p className="text-gray-500 mt-2">Sube tus clips para análisis.</p>
          </div>
      )}

      {selectedPlay && (
          <Modal onClose={() => setSelectedPlay(null)} title={selectedPlay.name}>
              <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-700 relative overflow-hidden">
                      {selectedPlay.videoUrl && isVideo(selectedPlay.videoUrl) ? (
                          <video src={selectedPlay.videoUrl} controls className="w-full h-full object-cover" />
                      ) : selectedPlay.videoUrl ? (
                          <img src={selectedPlay.videoUrl} alt={selectedPlay.name} className="w-full h-full object-cover" />
                      ) : (
                          <div className="flex flex-col items-center">
                              <PlayCircle size={48} className="text-gray-500 mb-2" />
                              <span className="text-xs text-gray-500">Sin multimedia</span>
                          </div>
                      )}
                  </div>
                  <p className="text-gray-300 text-sm relative whitespace-pre-wrap">
                      {selectedPlay.description}
                  </p>
                  <button 
                    onClick={() => {
                        onStatIncrease('RESOLUCIÓN', 2);
                        setSelectedPlay(null);
                    }}
                    className="w-full py-3 bg-neon-red hover:bg-neon-magenta text-black font-bold uppercase font-oswald rounded-lg transition-all shadow-[0_0_15px_rgba(255,0,110,0.4)]"
                  >
                      Completar Quiz (+2 IQ)
                  </button>
              </div>
          </Modal>
      )}
    </div>
  );
};
