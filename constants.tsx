
import {
  Activity, Dumbbell, Target, Zap, TrendingUp, Home, BarChart, Award, Flame, Timer, Droplet, Shield, Crosshair, Users,
  Brain, Heart, Star, Medal, Crown, Flag, Anchor, Compass, Map, Globe, Sun, Moon, Cloud, Wind, Umbrella,
  Music, Video, Camera, Mic, Speaker, Radio, Tv, Monitor, Smartphone, Tablet, Laptop, Watch, Headphones,
  Battery, Plug, Wifi, Bluetooth, Signal, Server, Database, HardDrive, Cpu, MemoryStick, Mouse, Keyboard,
  Gamepad, Joystick, Ticket, Film,
  StopCircle, Hand, Magnet, Snowflake, Apple, ArrowUp, Key, Lightbulb, CloudLightning, Mountain, Settings, Lock
} from 'lucide-react';
import React from 'react';
import { Player, Challenge, FeedItem, Play, Match, Session, ArenaData, BadgeDefinition, CheckInStep } from './types';
import { SvgArenaAsfalto, SvgArenaPabellon, SvgArenaPalacio, SvgArenaElite, SvgArenaLegado } from './components/ArenaGraphics';

// Stats Metadata
export const STAT_NAMES = ["PRECISIÓN", "RESOLUCIÓN", "DEFENSA", "REBOTE", "ASISTENCIA"];
export const PSICO_STAT_NAMES = ["Compromiso", "Disciplina", "Liderazgo", "Esfuerzo", "Adaptación", "Foco", "Cohesión", "Resiliencia"];

// Players (Updated Roster 2025/26)
// Contraseñas asignadas formato: basket + dorsal
export const realPlayers: Player[] = [
  { 
    id: 0, 
    name: "Rafael Díaz", 
    dorsal: 0, 
    position: "Alero/Escolta", 
    height: "1.85m", 
    weight: "78kg", 
    points: 1200, 
    virtualMoney: 450, 
    focus: "Lectura de ventajas", 
    anchorWord: "Visión", 
    stats: [75, 85, 75, 60, 80], 
    recoveryIndex: 'Bajo', 
    cognitiveLoad: 'Alto', 
    anchorCompliance: 'Baja', 
    psicoStats: [80, 75, 60, 85, 70, 75, 80, 65], 
    mambaXp: 120,
    trustXp: 50,
    password: "basket0"
  },
  { 
    id: 1, 
    name: "Iván Vargas", 
    dorsal: 1, 
    position: "Base/Escolta", 
    height: "1.82m", 
    weight: "76kg", 
    points: 1300, 
    virtualMoney: 600, 
    focus: "Dirección de juego", 
    anchorWord: "Calma", 
    stats: [78, 88, 80, 55, 90], 
    recoveryIndex: 'Medio', 
    cognitiveLoad: 'Medio', 
    anchorCompliance: 'Media', 
    psicoStats: [88, 85, 75, 92, 78, 80, 85, 80], 
    mambaXp: 300,
    trustXp: 120,
    password: "basket1"
  },
  { 
    id: 6, 
    name: "Marco Guirado", 
    dorsal: 6, 
    position: "Ala-Pívot", 
    height: "1.92m", 
    weight: "85kg", 
    points: 1150, 
    virtualMoney: 550, 
    focus: "Juego sin balón", 
    anchorWord: "Ritmo", 
    stats: [80, 75, 75, 85, 65], 
    recoveryIndex: 'Óptimo', 
    cognitiveLoad: 'Bajo', 
    anchorCompliance: 'Alta', 
    psicoStats: [90, 95, 70, 90, 80, 85, 90, 85], 
    mambaXp: 450,
    trustXp: 80,
    password: "basket6"
  }, 
  { 
    id: 8, 
    name: "Pedro Martín", 
    dorsal: 8, 
    position: "Base/Escolta", 
    height: "1.80m", 
    weight: "75kg", 
    points: 1100, 
    virtualMoney: 400, 
    focus: "Presión defensiva", 
    anchorWord: "Intenso", 
    stats: [70, 75, 90, 60, 85], 
    recoveryIndex: 'Bajo', 
    cognitiveLoad: 'Medio', 
    anchorCompliance: 'Media', 
    psicoStats: [75, 80, 65, 88, 70, 70, 75, 70], 
    mambaXp: 80,
    trustXp: 40,
    password: "basket8"
  }, 
  { 
    id: 10, 
    name: "Rodrigo Balderas", 
    dorsal: 10, 
    position: "Escolta/Alero", 
    height: "1.86m", 
    weight: "79kg", 
    points: 1250, 
    virtualMoney: 520, 
    focus: "Tiro tras bote", 
    anchorWord: "Fluir", 
    stats: [85, 80, 72, 60, 75], 
    recoveryIndex: 'Óptimo', 
    cognitiveLoad: 'Bajo', 
    anchorCompliance: 'Alta', 
    psicoStats: [92, 90, 72, 85, 82, 90, 90, 88], 
    mambaXp: 600,
    trustXp: 200,
    password: "basket10"
  },
  {
    id: 11,
    name: "Daniel Gea",
    dorsal: 11,
    position: "Alero/Escolta",
    height: "1.88m",
    weight: "80kg", 
    points: 1050,
    virtualMoney: 350,
    focus: "Corte lado débil",
    anchorWord: "Atento",
    stats: [75, 78, 80, 70, 65],
    recoveryIndex: 'Medio',
    cognitiveLoad: 'Medio',
    anchorCompliance: 'Alta', 
    psicoStats: [85, 88, 70, 85, 75, 80, 85, 80],
    mambaXp: 150,
    trustXp: 60,
    password: "basket11"
  },
  {
    id: 12,
    name: "Miguel Callejón",
    dorsal: 12,
    position: "Escolta/Alero",
    height: "1.85m",
    weight: "77kg",
    points: 980,
    virtualMoney: 300,
    focus: "Salida de bloqueos",
    anchorWord: "Rápido",
    stats: [82, 70, 75, 55, 60],
    recoveryIndex: 'Óptimo',
    cognitiveLoad: 'Bajo',
    anchorCompliance: 'Media',
    psicoStats: [80, 82, 65, 80, 70, 75, 78, 75],
    mambaXp: 100,
    trustXp: 30,
    password: "basket12"
  },
  { 
    id: 13, 
    name: "Jorge Zamora", 
    dorsal: 13, 
    position: "Base", 
    height: "1.92m", 
    weight: "85kg", 
    points: 1280, 
    virtualMoney: 580, 
    focus: "Selección de tiro", 
    anchorWord: "Líder", 
    stats: [82, 85, 78, 70, 95], 
    recoveryIndex: 'Óptimo', 
    cognitiveLoad: 'Bajo', 
    anchorCompliance: 'Alta', 
    psicoStats: [95, 92, 80, 90, 85, 90, 92, 90], 
    mambaXp: 550,
    trustXp: 180,
    password: "basket13"
  },
  {
    id: 15,
    name: "Julián Higueras",
    dorsal: 15,
    position: "Base/Escolta",
    height: "1.83m",
    weight: "76kg", 
    points: 1020,
    virtualMoney: 320,
    focus: "Defensa 1c1",
    anchorWord: "Pegas",
    stats: [70, 75, 88, 50, 82],
    recoveryIndex: 'Bajo',
    cognitiveLoad: 'Alto',
    anchorCompliance: 'Media',
    psicoStats: [85, 80, 70, 90, 75, 78, 82, 80],
    mambaXp: 180,
    trustXp: 70,
    password: "basket15"
  },
  {
    id: 16,
    name: "Gonzalo Pérez",
    dorsal: 16,
    position: "Pívot",
    height: "1.98m",
    weight: "92kg",
    points: 1100,
    virtualMoney: 380,
    focus: "Sellado zona",
    anchorWord: "Grande",
    stats: [65, 70, 75, 92, 50],
    recoveryIndex: 'Medio',
    cognitiveLoad: 'Bajo',
    anchorCompliance: 'Alta',
    psicoStats: [80, 85, 60, 85, 70, 75, 80, 75],
    mambaXp: 220,
    trustXp: 90,
    password: "basket16"
  },
  {
    id: 22,
    name: "Cristian Ortiz",
    dorsal: 22,
    position: "Alero",
    height: "1.90m",
    weight: "83kg",
    points: 1080,
    virtualMoney: 360,
    focus: "Rebote defensivo",
    anchorWord: "Caja",
    stats: [72, 75, 78, 85, 60],
    recoveryIndex: 'Óptimo', 
    cognitiveLoad: 'Medio',
    anchorCompliance: 'Media',
    psicoStats: [82, 80, 68, 85, 75, 78, 80, 78],
    mambaXp: 210,
    trustXp: 85,
    password: "basket22"
  },
  { 
    id: 32, 
    name: "Ian Romera", 
    dorsal: 32, 
    position: "Pívot", 
    height: "1.98m", 
    weight: "95kg", 
    points: 1050, 
    virtualMoney: 350, 
    focus: "Finalización contacto", 
    anchorWord: "Duro", 
    stats: [75, 70, 65, 88, 50], 
    recoveryIndex: 'Medio', 
    cognitiveLoad: 'Medio', 
    anchorCompliance: 'Alta', 
    psicoStats: [85, 80, 65, 85, 75, 75, 80, 80], 
    mambaXp: 250,
    trustXp: 110,
    password: "basket32"
  },
  { 
    id: 33, 
    name: "J.M. Torres", 
    dorsal: 33, 
    position: "Ala-Pívot", 
    height: "1.96m", 
    weight: "92kg", 
    points: 1000, 
    virtualMoney: 300, 
    focus: "Rebote ofensivo", 
    anchorWord: "Roca", 
    stats: [60, 60, 80, 90, 40], 
    recoveryIndex: 'Medio', 
    cognitiveLoad: 'Bajo', 
    anchorCompliance: 'Alta', 
    psicoStats: [80, 80, 60, 90, 70, 70, 80, 80], 
    mambaXp: 200,
    trustXp: 100,
    password: "basket33"
  },
  {
    id: 88,
    name: "Daniel Souza",
    dorsal: 88,
    position: "Pívot/Ala-Pívot",
    height: "1.97m",
    weight: "94kg",
    points: 1120,
    virtualMoney: 410,
    focus: "Defensa ayudas",
    anchorWord: "Muro",
    stats: [68, 72, 85, 88, 55],
    recoveryIndex: 'Óptimo',
    cognitiveLoad: 'Medio',
    anchorCompliance: 'Media',
    psicoStats: [85, 82, 65, 88, 72, 75, 82, 78],
    mambaXp: 280,
    trustXp: 140,
    password: "basket88"
  }
];

export const BADGE_CATALOG: BadgeDefinition[] = [
    // Performance
    { id: 'mvp', title: "MVP de la Semana", icon: Award, xp: 100 },
    { id: 'score_king', title: "Rey de la Pista", icon: Crown, xp: 100 },
    { id: 'clutch', title: "Sangre Fría", icon: Activity, xp: 90 },
    { id: 'efficiency', title: "Máquina Perfecta", icon: Settings, xp: 80 },
    { id: 'rookie_star', title: "Rookie del Mes", icon: Star, xp: 80 },
    
    // Defense
    { id: 'defender', title: "Cerrojo Defensivo", icon: Shield, xp: 75 },
    { id: 'wall', title: "El Muro", icon: StopCircle, xp: 70 },
    { id: 'thief', title: "Ladrón de Guante Blanco", icon: Hand, xp: 65 },
    { id: 'rebound_king', title: "Imán de Rebotes", icon: Magnet, xp: 70 },
    { id: 'hustle', title: "Esfuerzo Máximo", icon: Flame, xp: 50 },
    
    // Shooting
    { id: 'sniper', title: "Francotirador", icon: Crosshair, xp: 75 },
    { id: 'hot_hand', title: "Mano Caliente", icon: Flame, xp: 60 },
    { id: 'free_throw', title: "Seguro de Vida", icon: Target, xp: 50 },
    { id: 'range', title: "Desde el Parking", icon: Map, xp: 55 },
    
    // Team & Mental
    { id: 'teammate', title: "Mejor Compañero", icon: Users, xp: 50 },
    { id: 'leader', title: "General en Pista", icon: Flag, xp: 80 },
    { id: 'brain', title: "Cerebro del Equipo", icon: Brain, xp: 70 },
    { id: 'heart', title: "Corazón de León", icon: Heart, xp: 60 },
    { id: 'ice', title: "Hielo en las Venas", icon: Snowflake, xp: 65 },
    
    // Discipline
    { id: 'punctual', title: "Siempre a Tiempo", icon: Timer, xp: 25 },
    { id: 'hydrated', title: "Hidratación Pro", icon: Droplet, xp: 25 },
    { id: 'nutrition', title: "Combustible Limpio", icon: Apple, xp: 25 },
    { id: 'sleep', title: "Descanso Total", icon: Moon, xp: 25 },
    { id: 'early_bird', title: "Madrugador", icon: Sun, xp: 30 },
    
    // Physical
    { id: 'beast', title: "Bestia Física", icon: Dumbbell, xp: 60 },
    { id: 'flash', title: "Velocidad de la Luz", icon: Zap, xp: 60 },
    { id: 'endurance', title: "Pulmones de Acero", icon: Wind, xp: 55 },
    { id: 'jump', title: "Muelles", icon: ArrowUp, xp: 60 },
    
    // Miscellaneous
    { id: 'anchor', title: "Ancla del Equipo", icon: Anchor, xp: 40 },
    { id: 'compass', title: "Norte Magnético", icon: Compass, xp: 40 },
    { id: 'global', title: "Visión Global", icon: Globe, xp: 45 },
    { id: 'umbrella', title: "Protector", icon: Umbrella, xp: 40 },
    { id: 'medal_gold', title: "Medalla de Oro", icon: Medal, xp: 100 },
    { id: 'medal_silver', title: "Medalla de Plata", icon: Medal, xp: 75 },
    { id: 'medal_bronze', title: "Medalla de Bronce", icon: Medal, xp: 50 },
    { id: 'media_star', title: "Estrella Mediática", icon: Video, xp: 30 },
    { id: 'photo_finish', title: "Photo Finish", icon: Camera, xp: 35 },
    { id: 'loudspeaker', title: "Voz Cantante", icon: Speaker, xp: 30 },
    { id: 'analyst', title: "Analista", icon: Monitor, xp: 40 },
    { id: 'connector', title: "Conector", icon: Wifi, xp: 35 },
    { id: 'charged', title: "Batería A tope", icon: Battery, xp: 30 },
    { id: 'key_player', title: "Jugador Clave", icon: Key, xp: 70 },
    { id: 'lockdown', title: "Candado", icon: Lock, xp: 65 },
    { id: 'spark', title: "Chispa", icon: Lightbulb, xp: 45 },
    { id: 'storm', title: "Tormenta", icon: CloudLightning, xp: 55 },
    { id: 'mountain', title: "Inamovible", icon: Mountain, xp: 60 },
    { id: 'rhythm', title: "Ritmo", icon: Music, xp: 35 },
    { id: 'film', title: "Estudioso", icon: Film, xp: 40 },
];

export const CHECKIN_STEPS: CheckInStep[] = [
        {
            id: 'mood',
            title: "Estado Emocional",
            icon: Zap,
            field: 'mood',
            type: 'scale',
            options: [1, 2, 3, 4, 5],
            labels: ['Pésimo', 'Bajo', 'Normal', 'Bueno', 'Tope']
        },
        {
            id: 'sleep',
            title: "Calidad de Sueño",
            icon: Moon,
            field: 'sleep',
            type: 'scale',
            options: [1, 2, 3, 4, 5],
            labels: ['Insomnio', 'Mal', 'Regular', 'Bien', 'Profundo']
        },
        {
            id: 'stress',
            title: "Estrés / Carga Mental",
            icon: Brain,
            field: 'stress',
            type: 'scale',
            options: [1, 2, 3, 4, 5],
            labels: ['Burnout', 'Alto', 'Medio', 'Bajo', 'Zen']
        },
        {
            id: 'doms',
            title: "Dolor Muscular (DOMS)",
            icon: Activity,
            field: 'doms',
            type: 'scale',
            options: [1, 2, 3, 4, 5],
            labels: ['Sin Dolor', 'Ligero', 'Notorio', 'Alto', 'Lesión']
        },
        {
            id: 'hydration',
            title: "Wellness: Hidratación",
            icon: Droplet,
            field: 'hydration',
            type: 'scale',
            options: [1, 2, 3, 4, 5],
            labels: ['Seco', 'Poca', 'Regular', 'Buena', 'Óptima']
        },
        {
            id: 'nutrition',
            title: "Wellness: Nutrición",
            icon: Apple,
            field: 'nutrition',
            type: 'scale',
            options: [1, 2, 3, 4, 5],
            labels: ['Comida Basura', 'Mal', 'Regular', 'Sana', 'Atleta']
        },
        {
            id: 'fcBasal',
            title: "FC Basal (Pulso)",
            icon: Heart, 
            field: 'fcBasal',
            type: 'number',
            min: 40,
            max: 120
        },
        {
            id: 'rpe',
            title: "Carga Entreno (RPE)",
            icon: Dumbbell,
            field: 'rpe',
            type: 'scale',
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            compact: true
        }
];

export const mockMatches: Match[] = [ 
    { id: 1, opponent: "CB Armilla (Junior)", time: "Sáb 18:00", location: "Casa", fantasyNudge: true, league: 'junior' },
    { id: 2, opponent: "CD Presentación (Prov.)", time: "Dom 12:00", location: "Fuera", fantasyNudge: true, league: 'provincial' } 
];

export const PLAYBOOK_DATA: Play[] = [
  {
    id: 'play_1',
    name: "CIEGOS 5",
    description: "Bloqueo ciego del 5 al 1 para corte por línea de fondo. 2ª opción en el triple.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
    quiz: [
      { q: "¿Dónde va el 5 tras el bloqueo ciego?", opts: ["Línea de fondo", "Pop al triple", "Bloqueo al 2"], ans: 0 },
      { q: "¿Cuál es la 2ª opción si falla el pase al 5?", opts: ["Mano a mano con 2", "Pase al 4 en poste alto", "Invertir para triple de 2"], ans: 2 }
    ]
  },
  {
    id: 'play_2',
    name: "FLOPPY 2",
    description: "Salida del 2 por bloqueos de 4 y 5 para recibir y tirar.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    quiz: [
      { q: "¿Quién pone el bloqueo principal para el 2?", opts: ["El 5", "El 4", "Ambos"], ans: 2 },
    ]
  }
];

export const mockChallenges = { 
  daily: [
    { id: 1, text: "Registrar FC Basal (+5 XP)", completed: true, streak: 7 },
    { id: 2, text: "Completar activación con gomas (+10 XP)", completed: true, streak: 12 },
    { id: 3, text: "Cumplimiento Físico (Intensidad) (+20 XP)", completed: false, streak: 0 },
  ],
  personal: [
    { id: 1, text: "Focus: 5 'close-outs' correctos en defensa", completed: false },
    { id: 2, text: "Mejorar % Tiros Libres (Rutina post-entreno)", completed: false },
  ],
  team: [
    { id: 1, text: "Semanal: Equipo: +80% en Tiros Libres", completed: false },
    { id: 2, text: "Semanal: Equipo: Menos de 10 pérdidas por partido", completed: false },
  ],
  physical: { 
      month: "Octubre",
      sessions: [
            { 
                id: 'A', name: 'Sesión A: Fuerza', focus: 'Movilidad + Fuerza', xp: 50, completed: false,
                exercises: [ 
                    { name: 'Remo invertido con TRX', details: '2x12 | Bajada 2-3s', icon: Activity },
                    { name: 'Squat con barra', details: '2x10 | Bajada 3s, Subida max vel.', icon: Dumbbell },
                    { name: 'Kneeling landmine core rot.', details: '2x16 | Controlado', icon: Target }, 
                ]
            },
      ]
  }
};

export const ARENA_DATA: ArenaData[] = [
  { id: 1, name: "Arena 1: El Asfalto", xpRequired: 0, icon: Home, color: "text-gray-400", graphicComponent: SvgArenaAsfalto },
  { id: 2, name: "Arena 2: El Pabellón", xpRequired: 500, icon: Dumbbell, color: "text-orange-400", graphicComponent: SvgArenaPabellon },
  { id: 3, name: "Arena 3: El Palacio", xpRequired: 1200, icon: BarChart, color: "text-blue-400", graphicComponent: SvgArenaPalacio },
  { id: 4, name: "Arena 4: La Élite", xpRequired: 2500, icon: Award, color: "text-yellow-400", graphicComponent: SvgArenaElite },
  { id: 5, name: "Legado - Cto. España", xpRequired: 5000, icon: Flame, color: "text-neon-red", graphicComponent: SvgArenaLegado } 
];

export const placeholderPhotoUrl = (name = "Jugador", dorsal: number | string = "?") => {
    const firstName = name.split(' ')[0].toUpperCase();
    const cleanFirstName = firstName.replace(/[^a-zA-Z0-9]/g, ''); 
    const text = `${cleanFirstName}%0A${dorsal}`; 
    return `https://placehold.co/300x400/1C1C1C/FF006E/png?text=${text}&font=oswald`;
};
