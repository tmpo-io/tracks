
// flattens a {key:{}} to a [{}] given a sorted [keys]
// [keys]::{key:{}} => [{}]
const toList = (keys, obj) => keys.map(k => obj[k]);


export const today = () =>
  (new Date()).setHours(0, 0, 0, 0);


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
      today: t
    });

  };


const trace = (l) => {
  console.log('[trace]', l); return l;
};
