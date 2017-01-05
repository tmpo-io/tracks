
export type TrackType = 'time' | 'counter';
export type LogAction = 'recording' | 'stop' | 'track';


export interface Track {
  id: string;
  lastRecord: number;
  kind: TrackType;
  desc?: string;
  amount: number;
  state?: 'stopped' | 'recording';
}


export interface TrackLog {
  trackId: string;
  id: string;
  time: number;
  action: LogAction;
  amount?: number;
  desc?: string;
}

export interface State {
  counter: number;
  tracks: string[];
  tracksEntities: { [id: string]: Track };
  logs: string[];
  logsEntities: {[id: string]: TrackLog };
}

export interface AppState {
  data: State;
}

export const initialState: State = {
  counter: 1,
  tracks: [],
  tracksEntities: {},
  logs: [],
  logsEntities: {}
};


