import { Action } from '@ngrx/store';
import {
  initialState, State, Track,
  TrackLog, LogAction
} from './model';
import * as actions from './actions';
import { loadStore } from './storage';

let id = 0;

export function getId(): string {
  return (new Date()).getTime() + '-' + ++id;
}

export const today = () =>
  (new Date()).setHours(0, 0, 0, 0);

export const getTimeToday = (logsEntities, track) =>
  {
    return Object.keys(logsEntities)
      .map(obj => logsEntities[obj])
      .filter(el => el.time >= today() && el.trackId === track.id && el.action === 'stop')
      .reduce((a, b) => a + b.amount, 0);
  };


const defaultTrack = (counter) => ({
  id: getId(),
  kind: 'time',
  desc: 'Track ' + counter,
  state: 'stopped',
  amount: 0,
  lastRecord: 0,
});

const cl = (obj: any, props: any) => Object.assign({}, obj, props);

export function reducerTracks(state = initialState, action: Action): State {
  // let lastRecord = (new Date()).getTime();

  switch (action.type) {
    case actions.LOAD_STORE: {
      return loadStore();
    }
    case actions.TRACK_ADD: {
      let track = cl(
        defaultTrack(state.counter), action.payload
      );
      return cl(state, {
        tracks: [...state.tracks, track.id],
        tracksEntities: cl(state.tracksEntities, {
          [track.id]: track
        }),
        counter: state.counter++
      });
    }

    case actions.TRACK_START: {
      let lastRecord = action.payload.time;
      let track = state.tracksEntities[action.payload.id];
      return newState(
        state,
        cl(track, { lastRecord, state: 'recording' }),
        logTrack(lastRecord, track.id, 'recording')
      );
    }

    case actions.TRACK_STOP: {
      let lastRecord = action.payload.time;
      let track = state.tracksEntities[action.payload.id];
      let amount = track.amount + (lastRecord - track.lastRecord);
      return newState(
        state,
        cl(track, { state: 'stopped', amount, lastRecord }),
        logTrack(lastRecord, track.id, 'stop', (lastRecord - track.lastRecord))
      );
    }

    case actions.TRACK_COUNT: {
      let lastRecord = action.payload.time;
      let track = state.tracksEntities[action.payload.id];
      let amount = track.amount + 1;
      return newState(
        state,
        cl(track, { lastRecord, amount }),
        logTrack(lastRecord, track.id, 'track', amount)
      );
    }
  }
  return state;
}


function logTrack(
  time: number, trackId: string,
  action: LogAction, amount = 0): TrackLog {
  return {
    id: getId(),
    action,
    trackId,
    time,
    amount
  };
}


// Computes a new state
function newState(state: State, track: Track, log: TrackLog): State {
  return Object.assign({}, state, {
    tracksEntities: Object.assign({}, state.tracksEntities, {
      [track.id]: track
    }),
    logs: [...state.logs, log.id],
    logsEntities: Object.assign({}, state.logsEntities, {
      [log.id]: log
    }),
  });
}

