import { GoogleGenAI } from "@google/genai";
import { Player } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // NOTE: In a real app, do not expose API keys on the client. Proxy through a backend.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'MOCK_KEY_FOR_DEMO' });
  }

  async getPlayerAnalysis(player: Player): Promise<string> {
    try {
        if (!process.env.API_KEY) {
            return "Modo Simulación: Clave API ausente. La IA analizaría las estadísticas de " + player.name + ": " + JSON.stringify(player.stats) + " y sugeriría mejoras tácticas.";
        }

        const model = "gemini-2.5-flash";
        const prompt = `
        Actúa como un entrenador de baloncesto de élite experto en desarrollo de jugadores jóvenes.
        Analiza el siguiente perfil de jugador y proporciona 3 consejos de entrenamiento específicos y accionables (1 frase cada uno) en ESPAÑOL.
        
        Jugador: ${player.name}
        Posición: ${player.position}
        Foco actual: ${player.focus}
        
        Estadísticas Técnicas (0-100):
        - Tiro/Precisión: ${player.stats[0]}
        - Toma de Decisiones: ${player.stats[1]}
        - Defensa: ${player.stats[2]}
        - Rebote: ${player.stats[3]}
        - Asistencias: ${player.stats[4]}
        
        Estado Psicológico:
        - Índice de Recuperación: ${player.recoveryIndex}
        - Carga Cognitiva: ${player.cognitiveLoad}
        `;

        const response = await this.ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text || "No hay insights disponibles.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error conectando con el Coach IA. Inténtalo más tarde.";
    }
  }

  async getDrillRecommendation(focus: string): Promise<string> {
       return `Ejercicio recomendado para ${focus}: 3c2 continua en transición.`;
  }
}

export const geminiService = new GeminiService();