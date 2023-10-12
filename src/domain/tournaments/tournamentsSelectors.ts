import { RootState } from '../../reducers';

export const getTournamentsInitialLoad = (state: RootState) => {
  return getTournaments(state).initialLoad;
};

export const getTournamentsNetworkStatus = (state: RootState) => {
  return getTournaments(state).networkRequestStatus;
};

export const getTournamentsData = (state: RootState) => {
  return getTournaments(state).tournaments;
};

export const getIsListEnd = (state: RootState) => {
  return getTournaments(state).listEnd;
};

const getTournaments = (state: RootState) => {
  return state.tournaments;
};
