let setDate = (date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

let fillData = (state, stateSetter, key, value) => {
  state[key] = value;
  stateSetter({ ...state });
};

export { fillData, setDate };
