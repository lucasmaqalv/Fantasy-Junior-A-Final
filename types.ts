
import React from 'react';
import { LucideIcon } from "lucide-react";

export type UserRole = 'player' | 'coach' | 'editor';

export type EditTarget = 'user' | 'player' | 'mission' | 'match' | 'play' | 'feedItem' | 'badge' | 'stat' | 'checkin' | 'bet';

export interface Player {
  id: number;
  name: string;
  dorsal: number | string; 
  photoFile?: string;
  position: string;
  height: string;
  weight: string;
  points: number;
  virtualMoney: number;
  focus: string;
  anchorWord: string;
  stats: number[]; 
  recoveryIndex: 'Óptimo' | 'Medio' | 'Bajo';
  cognitiveLoad: 'Bajo' | 'Medio' | 'Alto';
  anchorCompliance: 'Alta' | 'Media' | 'Baja';
  psicoStats: number[]; 
  badges?: Badge[];
  mambaXp?: number;
  trustXp?: number;
  password?: string; // Nuevo campo para autenticación individual
}

export interface Badge {
  id: number;
  badgeId: string;
  icon: any; 
  title: string;
  description?: string;
  earned: boolean;
}

export interface BadgeDefinition {
    id: string;
    title: string;
    icon: any;
    xp: number;
}

export interface Challenge {
  id: number;
  text: string;
  completed: boolean;
  streak?: number;
  xp?: number;
}

export interface FeedComment {
    user: string;
    text: string;
}

export interface FeedItem {
  id: number | string;
  type: 'post' | 'video' | 'trust';
  user: string;
  title?: string;
  text?: string;
  videoUrl?: string;
  timestamp?: any;
  likes?: number;
  likedBy?: number[]; 
  fires?: number;
  from?: string;
  to?: string;
  amount?: number;
  challenge?: string;
  comments?: FeedComment[];
}

export interface Play {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  quiz?: { q: string; opts: string[]; ans: number }[];
}

export interface Match {
  id: number;
  opponent: string;
  time: string;
  location: string;
  fantasyNudge: boolean;
  league: 'junior' | 'provincial';
}

export interface Exercise {
    name: string;
    details: string;
    icon: any;
}

export interface Session {
    id: string;
    name: string;
    focus: string;
    xp: number;
    completed: boolean;
    exercises: Exercise[];
}

export interface ArenaData {
    id: number;
    name: string;
    xpRequired: number;
    icon: any;
    color: string;
    graphicComponent?: React.FC<any>; 
}

export interface EditFieldData {
    target: EditTarget;
    id?: number | string; 
    key: string;
    value: string | number;
    type: 'text' | 'number' | 'textarea';
}

export type BetType = 'custom' | 'join' | 'combine' | 'teach';

export interface Bet {
    id: number;
    type: BetType;
    authorId: number;
    authorName: string;
    title: string;
    description: string;
    amount: number;
}

export interface CheckInStep {
    id: string;
    title: string;
    icon: any;
    field: string;
    type: 'scale' | 'number';
    options?: number[];
    labels?: string[];
    min?: number;
    max?: number;
    compact?: boolean;
}

export interface CoachPanelProps {
  players: Player[];
  onClose: () => void;
  isEditor?: boolean;
  onTriggerEdit?: (target: 'player', key: string, id: number, value: string, type: 'text') => void;
  onLogout?: () => void;
}

export interface ArenaProps {
  user: Player;
  players: Player[];
  isEditor?: boolean;
  onTriggerEdit?: (target: 'player' | 'bet', key: string, id: number, value: number | string, type: 'number' | 'text') => void;
  onTrust?: (targetPlayerId: number, amount: number, type: 'mission' | 'essential', aspect?: string) => void;
  onTeamAction?: (action: 'join' | 'combine' | 'teach') => void; 
  bets?: Bet[];
  onAddBet?: (bet: Omit<Bet, 'id' | 'authorId' | 'authorName'>) => void;
  onDeleteBet?: (id: number) => void;
}

export interface DashboardProps {
  user: Player;
  feedItems: FeedItem[];
  matches: Match[];
  teamMission: string;
  isEditor?: boolean;
  onTriggerEdit?: (target: 'mission' | 'match' | 'feedItem', key: string, id: number | string | undefined, value: string, type: 'text' | 'number') => void;
  onInteraction?: (id: number | string, type: 'like' | 'comment', payload?: string) => void;
  onNewPost?: () => void;
}

export interface CheckInState {
    [key: string]: number;
}

export interface PlayerCardProps {
  user: Player;
  onShowArenaModal: () => void;
  onShowCapsuleModal: () => void;
  onAddReps: (reason?: string) => void;
  isEditor?: boolean;
  onTriggerEdit?: (key: keyof Player, value: string | number, type: 'text' | 'number' | 'textarea') => void;
  onAddBadge?: () => void;
  onEditStat?: (type: 'tactical' | 'psico') => void;
}
