/**
 * Definições de tipos usados nas funções de serviço.
 */

import { Moment } from "moment";

export interface Activity {
  id: number;
  name: string;
  shortName: string;
}

export interface Auth {
  code: string;
  token: string;
  permission: string;
}

export type Card = {
  patient?: Patient;
  activity?: string;
  role?: string;
  technology?: string;
  time?: number;
  executionState: ExecutionStatus;
};

export type CardExecutionType = {
  idPatient?: string;
  role?: number;
  activity?: number;
};

export type CarouselType = {
  data: Card[];
  selectedCard: Card | undefined;
  selectedCardIndex: number;
};

export type Doc = {
  id: number;
  name: string;
  type?: string;
};

export enum ExecutionStatus {
  Initialized,
  Paused,
  Finished,
  Uninitialized,
}

export type FinishedExecution = {
  activity: number;
  role: number;
  date: string; // ISO8601
  duration: number;
  endDate: string;
};

export interface LocalData {
  institution?: { name: string };
  roles?: Role[];
  technologies?: Technology[];

  institutions?: { id: number; name: string }[];
}

export type OngoingExecution = {
  startTime: string;
  elapsedTime: number;
  latestStartTime: Moment;
  idPatient: string;
  role: number;
  activity: number;
  currentState: ExecutionStatus;
};

export type Patient = {
  id: string;
  name: string;
  sex: string;
};

/** Tipos de código de acesso. */
export type Permission =
  | "time-tracking"
  | "administration-hospital"
  | "administration-app";

export interface Preferences {
  technology?: number;
  role?: number;
  roleName?: string;
}

export interface Role {
  id: number;
  name: string;
  activities: Activity[];
}

export interface Session {
  technology?: number;
  role?: number;
  roleName?: string;
}

export interface Technology {
  id: number;
  name: string;
  activities: Activity[];
}

export interface Reports {
  activityID: number;
  activity: string;
  roleID: number;
  role: string;
  minimumDuration: number;
  medianDuration: number;
  maximumDuration: number;
  lastUpdate: string;
}

export interface Metrics {
  activity: string;
  minimumDuration: number;
  medianDuration: number;
  maximumDuration: number;
}
