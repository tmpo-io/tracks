
// flattens a {key:{}} to a [{}] given a sorted [keys]
// [keys]::{key:{}} => [{}]
const toList = (keys, obj) => keys.map(k => obj[k]);

const day = 3600 * 1000 * 24;

export const today = () => (new Date()).setHours(0, 0, 0, 0);
export const yesterday = () => today() - day;
export const week = () => today() - 7 * day;

const sum = (a, b) => a + b.amount;

const filterTime = (from, to) => (l) =>
  l.time > from && l.time < to;

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
    .reduce((a, b) => a + b.amount, 0);

  return Object
    .assign({}, state.tracksEntities[id], {
      logs,
      today: t,
      yesterday: logs.filter(filterTime(today(), yesterday())).reduce(sum, 0),
      week: logs.filter(filterTime(today(), week())).reduce(sum, 0)
    });

};


const trace = (l) => {
  console.log('[trace]', l); return l;
};
