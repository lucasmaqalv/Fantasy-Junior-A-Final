
import React, { useState } from 'react';
import { ClubLogo } from './ClubLogo';
import { Lock, User, ArrowRight, Shield } from 'lucide-react';
import { Player, UserRole } from '../types';
import { realPlayers } from '../constants';
import { supabase } from '../services/supabaseClient';

interface LoginScreenProps {
  onLogin: (role: UserRole, player?: Player) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulación de retraso de red
    setTimeout(async () => {
      // 1. Check for Admin/Editor
      if (id.toLowerCase() === 'admin' && password === 'adminmaster') {
        onLogin('editor');
        setLoading(false);
        return;
      }

      // 2. Check for Coach
      if (id.toLowerCase() === 'coach' && password === 'coachpro') {
        onLogin('coach');
        setLoading(false);
        return;
      }

      // 3. Intento con Supabase (Prioridad Base de Datos)
      try {
        const { data, error: dbError } = await supabase
            .from('players')
            .select('*')
            // Supabase filter syntax: column, value
            // Note: dorsal is stored as TEXT in DB based on previous script
            .eq('dorsal', id) 
            .single();

        if (data && !dbError) {
             // Verificar password
             // Nota: En producción real, esto debería usar Auth de Supabase, 
             // pero para este prototipo comparamos el campo texto plano.
             if (data.password === password) {
                 onLogin('player', data as Player);
                 setLoading(false);
                 return;
             } else {
                 // Si encontró usuario pero pass incorrecta
                 setError('Contraseña incorrecta (DB).');
                 setLoading(false);
                 return;
             }
        }
      } catch (err) {
          console.log("Error conectando a Supabase, intentando local...", err);
      }

      // 4. Fallback: Verificación en Datos Locales (si falla DB o no hay internet)
      const foundPlayer = realPlayers.find(p => p.dorsal.toString() === id);
      
      if (foundPlayer) {
          const validPassword = foundPlayer.password || "1234";
          
          if (password === validPassword) {
              onLogin('player', foundPlayer);
              setLoading(false);
              return;
          } else {
              setError('Contraseña incorrecta.');
              setLoading(false);
              return;
          }
      }

      // Login Failed
      setError('Usuario no encontrado o credenciales inválidas.');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-graphite flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_rgba(227,6,19,0.15),_transparent_70%)] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-graphite-light/80 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 animate-fade-in">
        
        <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-28 mb-4 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <ClubLogo />
            </div>
            <h1 className="text-3xl font-bold font-oswald uppercase text-white tracking-widest text-center leading-none">
                Fantasy <span className="text-neon-red">Junior A</span>
            </h1>
            <p className="text-gray-400 text-xs font-oswald uppercase tracking-widest mt-2">Acceso Restringido</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 font-oswald tracking-wider">Identificador (Dorsal / ID)</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                        type="text" 
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full bg-black/50 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neon-red focus:ring-1 focus:ring-neon-red outline-none transition-all font-oswald tracking-wide"
                        placeholder="Ej: 13, Coach, Admin"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 font-oswald tracking-wider">Contraseña</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neon-red focus:ring-1 focus:ring-neon-red outline-none transition-all"
                        placeholder="••••"
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-xs text-center flex items-center justify-center gap-2">
                    <Shield size={14} /> {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-neon-red hover:bg-red-600 text-white font-bold font-oswald uppercase py-3 rounded-lg shadow-[0_0_15px_rgba(227,6,19,0.4)] transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <span className="animate-pulse">Verificando...</span>
                ) : (
                    <>Entrar al Sistema <ArrowRight size={18} /></>
                )}
            </button>
        </form>
        
        <div className="mt-6 text-center">
            <p className="text-[10px] text-gray-600 uppercase font-oswald tracking-widest">Fundación CB Granada © 2025/26</p>
        </div>
      </div>
    </div>
  );
};
