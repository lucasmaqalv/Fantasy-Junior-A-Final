
import React, { useState } from 'react';
import { Player } from '../types';
import { TrendingDown, Brain, Edit3, Save, Database, UploadCloud } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { seedDatabase } from '../services/seedData';

interface CoachPanelProps {
  players: Player[];
  onClose: () => void;
  isEditor?: boolean;
  onTriggerEdit?: (target: 'player', key: string, id: number, value: string, type: 'text') => void;
  onLogout?: () => void;
}

export const CoachPanel: React.FC<CoachPanelProps> = ({ players, onClose, isEditor = false, onTriggerEdit, onLogout }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleAiAnalysis = async (player: Player) => {
      setLoadingAi(true);
      setSelectedPlayer(player);
      setAiAnalysis("");
      const analysis = await geminiService.getPlayerAnalysis(player);
      setAiAnalysis(analysis);
      setLoadingAi(false);
  };

  const handleSeedDatabase = async () => {
      // ELIMINADO: confirm() bloqueante. Ahora la acción es directa.
      console.log(">>> Botón pulsado: Iniciando proceso de carga...");
      
      setUploadStatus("Conectando con Supabase...");
      
      try {
          const result = await seedDatabase();
          console.log(">>> Resultado Seed:", result);
          setUploadStatus(result.message);
          
          if (result.success) {
              alert("✅ BASE DE DATOS ACTUALIZADA\n\nDatos subidos correctamente a Supabase.");
          } else {
              alert("❌ ERROR EN LA CARGA:\n\n" + result.message);
          }
      } catch (e: any) {
          console.error(">>> Error Crítico en Handler:", e);
          setUploadStatus("Error crítico");
          alert("Error inesperado: " + e.message);
      }
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setUploadStatus(null), 5000);
  };

  const getRiskColor = (value: string) => {
    if (value === 'Alto') return 'text-neon-red animate-pulse';
    if (value === 'Medio') return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white font-oswald">Centro de Mando</h2>
            <p className="text-xs text-gray-400 font-oswald uppercase tracking-widest">
                {isEditor ? 'Modo Editor: Acceso Total' : 'Vista Entrenador'}
            </p>
        </div>
        <button 
            onClick={() => {
                if(onLogout) onLogout();
                else onClose();
            }} 
            className="text-sm text-gray-400 underline hover:text-white"
        >
            Salir
        </button>
      </div>
      
      {/* DB Sync Control for Editor */}
      {isEditor && (
          <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 flex justify-between items-center">
              <div>
                  <h3 className="text-sm font-bold uppercase text-blue-400 font-oswald flex items-center gap-2">
                      <Database size={16} /> Configuración Base de Datos
                  </h3>
                  <p className="text-xs text-gray-400">Sincronizar prototipo local con Supabase</p>
              </div>
              <button 
                onClick={handleSeedDatabase}
                disabled={uploadStatus !== null && uploadStatus.includes("Conectando")}
                className={`flex items-center gap-2 px-3 py-2 text-white font-bold uppercase text-xs rounded transition-colors ${uploadStatus ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                  <UploadCloud size={16} /> 
                  {uploadStatus && uploadStatus.includes("Conectando") ? "Cargando..." : "Inicializar DB"}
              </button>
          </div>
      )}
      
      {uploadStatus && (
          <div className={`p-2 rounded text-center text-xs font-bold uppercase ${uploadStatus.includes('Error') || uploadStatus.includes('Fallo') ? 'bg-red-900/50 text-red-300' : 'bg-blue-900/50 text-blue-300'}`}>
              ESTADO: {uploadStatus}
          </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Risk Monitor */}
        <div className="bg-graphite-light/50 p-4 rounded-xl border border-neon-red/30">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold uppercase tracking-wider text-neon-red font-oswald flex items-center gap-2">
                    <TrendingDown size={20}/>
                    <span>Monitor de Riesgo Psicosocial</span>
                </h3>
                {isEditor && (
                    <span className="text-[10px] bg-neon-magenta text-black px-2 py-0.5 rounded font-bold uppercase">
                        Edición Activa
                    </span>
                )}
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {players.map(p => (
                    <div key={p.id} className={`p-3 rounded-lg bg-black/40 border flex justify-between items-center relative group ${isEditor ? 'border-neon-magenta/30' : 'border-gray-700'}`}>
                        {isEditor && onTriggerEdit && (
                            <button 
                                onClick={() => onTriggerEdit('player', 'cognitiveLoad', p.id, p.cognitiveLoad, 'text')}
                                className="absolute -top-2 -right-2 bg-neon-magenta text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Edit3 size={12} />
                            </button>
                        )}
                        <div>
                            <p className="font-semibold text-white">{p.name}</p>
                            <div className="flex items-center gap-2">
                                <p className={`text-sm font-bold font-oswald ${getRiskColor(p.cognitiveLoad)}`}>Carga: {p.cognitiveLoad}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleAiAnalysis(p)}
                            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase text-xs transition-colors"
                        >
                            <Brain size={16}/> <span>Análisis IA</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* AI Analysis Result */}
        {selectedPlayer && (
            <div className="bg-gradient-to-br from-indigo-900/40 to-black p-4 rounded-xl border border-indigo-500/50 animate-fade-in relative">
                {isEditor && (
                    <button className="absolute top-2 right-2 text-indigo-300 hover:text-white flex items-center gap-1 text-xs uppercase font-bold">
                        <Save size={12} /> Guardar Reporte
                    </button>
                )}
                <h4 className="text-indigo-300 font-bold uppercase font-oswald mb-2">
                    Insight IA: {selectedPlayer.name}
                </h4>
                {loadingAi ? (
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                        Generando reporte táctico...
                    </div>
                ) : (
                    <p className="text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">
                        {aiAnalysis}
                    </p>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
