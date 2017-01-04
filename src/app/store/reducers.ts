import { Action } from '@ngrx/store';
import {
  initialState, State, Track,
  TrackLog, LogAction
} from './model';
import * as actions from './actions';

let id = 0;

export function getId(): string {
  return (new Date()).getTime() + '-' + ++id;
}

const defaultTrack = (counter) => ({
  id: getId(),
  kind: 'time',
  desc: 'Track ' + counter,
  state: 'stopped',
  amount: 0,
  lastRecord: 0,
});

const assign = Object.assign;


export function reducerTracks(state = initialState, action: Action): State {

  switch (action.type) {
    case actions.TRACK_ADD: {
      let track = assign(
        defaultTrack(state.counter), action.payload
      );
      return assign({}, state, {
        tracks: [...state.tracks, track.id],
        tracksEntities: assign({}, state.tracksEntities, {
          [track.id]: track
        }),
        counter: state.counter++
      });
    }

    case actions.TRACK_START: {

      let time = (new Date()).getTime();
      let track = state.tracksEntities[action.payload];
      let log = logTrack(time, track.id, 'recording');
      let newTrack = setTrackStart(track, time);
      return assign({}, state, {
        tracksEntities: assign({}, state.tracksEntities, {
          [action.payload]: newTrack
        }),
        logs: [...state.logs, log.id],
        logsEntities: assign({}, state.logsEntities, {
          [log.id]: log
        })
      });
    }

    case actions.TRACK_STOP: {
      let track = state.tracksEntities[action.payload];
      let time = (new Date()).getTime();
      let newTrack = assign({}, track, {
        state: 'stopped',
        amount: track.amount + (time - track.lastRecord),
        lastRecord: time
      });
      let log = logTrack(time, action.payload, 'stop', newTrack.amount);
      return assign({}, state, {
        tracksEntities: assign({}, state.tracksEntities, {
          [action.payload]: newTrack
        }),
        logs: [...state.logs, log.id],
        logsEntities: assign({}, state.logsEntities, {
          [log.id]: log
        })
      });
    }
    case actions.TRACK_COUNT: {
      let track = state.tracksEntities[action.payload];
      //let newTrack = assign({})

    }

  }
  return state;
}

function logTrack(
  time: number, trackId: string, action: LogAction, amount = 0): TrackLog {
    return {
      id: getId(),
      action,
      trackId,
      time,
      amount
    };
}


function setTrackStart(track: Track, lastRecord: number): Track {
  let state = 'recording';
  return assign({}, track, { lastRecord, state });
}
