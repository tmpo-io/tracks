import { range } from './utils';


// flattens a {key:{}} to a [{}] given a sorted [keys]
// [keys]::{key:{}} => [{}]
export const toList = (keys, obj) => keys.map(k => obj[k]);

export const day = 3600 * 1000 * 24;

export const now = () => (new Date()).getTime();
export const today = () => (new Date()).setHours(0, 0, 0, 0);
export const yesterday = (t = today()) => t - day;
export const week = (t = today()) => t - 7 * day;

export const sum = (a, b) => a + b.amount;

export const filterTime = (from, to) => (l) =>
  l.time >= from && l.time <= to;


// returns the unix time at 00:00:00 for a given time
export const calcDay = (val) => (new Date(val)).setHours(0, 0, 0, 0);

// @returns amount time grouped by day
const amountByDay = list => {
  const first = calcDay(list[0].time);
  const last = calcDay(list[list.length - 1].time);
  // we want to fill day by day..
  const days = range(last, first + day, day).reduce((o, b) => {
      o[b] = 0;
      return o;
      }, {});

  return list.reduce((acc, el) => {
    let d = calcDay(el.time);
    acc[d] = acc[d] + el.amount;
    return acc;
  }, days);

};

//
const toArray = (obj) => Object.keys(obj)
  .map(k => ({day: k, value: obj[k]}));


export const getTimeToday = (logsEntities, track) => {
  return Object.keys(logsEntities)
    .map(obj => logsEntities[obj])
    .filter(el => el.time >= today() &&
      el.trackId === track.id &&
      (el.action === 'stop' || el.action === 'track'))
    .reduce((a, b) => a + b.amount, 0);
};

export const dataForTrack = (id) => (state) => {

  let logs = toList(state.logs, state.logsEntities)
    .filter(l => l.trackId === id)
    .reverse();

  let t = logs.filter(l => l.time > today())
    .reduce(sum, 0);

  return Object
    .assign({}, state.tracksEntities[id], {
      logs,
      today: t,
      weekStats: toArray(amountByDay(logs)),
      yesterday: logs.filter(filterTime(yesterday(), today())).reduce(sum, 0),
      week: logs.filter(filterTime(week(), now())).reduce(sum, 0)
    });

};




const trace = (l) => {
  console.log('[trace]', l); return l;
};























