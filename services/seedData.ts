
import { supabase } from './supabaseClient';
import { realPlayers, mockMatches, PLAYBOOK_DATA } from '../constants';

export const seedDatabase = async () => {
  console.log(">>> seedDatabase INICIADA");

  try {
    // 1. Subir Jugadores
    console.log(">>> Intentando subir Players...");
    const { data: pData, error: playersError } = await supabase
      .from('players')
      .upsert(realPlayers.map(p => ({
        id: p.id,
        name: p.name,
        dorsal: p.dorsal.toString(),
        position: p.position,
        height: p.height,
        weight: p.weight,
        points: p.points,
        virtualMoney: p.virtualMoney,
        focus: p.focus,
        anchorWord: p.anchorWord,
        stats: p.stats, // Se guardará como JSONB
        recoveryIndex: p.recoveryIndex,
        cognitiveLoad: p.cognitiveLoad,
        anchorCompliance: p.anchorCompliance,
        psicoStats: p.psicoStats, // Se guardará como JSONB
        mambaXp: p.mambaXp || 0,
        trustXp: p.trustXp || 0,
        password: p.password 
      })))
      .select();

    if (playersError) {
        console.error(">>> Error Supabase Players:", JSON.stringify(playersError));
        return { success: false, message: `Error subiendo JUGADORES: ${playersError.message || JSON.stringify(playersError)}` };
    }
    console.log(">>> Jugadores subidos correctamente. Rows:", pData?.length);

    // 2. Subir Partidos
    console.log(">>> Intentando subir Matches...");
    const { error: matchesError } = await supabase
      .from('matches')
      .upsert(mockMatches.map(m => ({
        id: m.id,
        opponent: m.opponent,
        time: m.time,
        location: m.location,
        fantasyNudge: m.fantasyNudge,
        league: m.league
      })));

    if (matchesError) {
        console.error(">>> Error Supabase Matches:", JSON.stringify(matchesError));
        return { success: false, message: `Error subiendo PARTIDOS: ${matchesError.message || JSON.stringify(matchesError)}` };
    }
    console.log(">>> Partidos subidos correctamente.");

    // 3. Crear un feed inicial (opcional)
    console.log(">>> Intentando subir Feed...");
    // CORRECCIÓN: Eliminado el campo 'title' que no existe en la base de datos
    const feedData = [
       { id: 1, type: 'post', user: 'Coach Mike', text: 'Base de datos sincronizada. ¡Bienvenidos a la temporada!', likes: 50 },
       { id: 2, type: 'video', user: 'Analista', text: 'Video de prueba de carga.', likes: 10 }
    ];

    const { error: feedError } = await supabase
      .from('feed_items')
      .upsert(feedData);

    if (feedError) {
        console.error(">>> Error Supabase Feed:", JSON.stringify(feedError));
        return { success: false, message: `Error subiendo FEED: ${feedError.message || JSON.stringify(feedError)}` };
    }
    console.log(">>> Feed inicial subido.");

    return { success: true, message: "Base de datos poblada con éxito." };

  } catch (error: any) {
    console.error(">>> EXCEPCIÓN en seedDatabase:", error);
    return { success: false, message: "Error de red o configuración: " + (error.message || JSON.stringify(error)) };
  }
};
