import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Input from '../../components/Input';
import {
  getIsListEnd,
  getTournamentsData,
  getTournamentsInitialLoad,
  getTournamentsNetworkStatus,
} from '../../domain/tournaments/tournamentsSelectors';
import { useTypedSelector } from '../../store';
import { NetworkRequestStatus } from '../../store/networkRequestModel';
import { TournamentModel } from '../../domain/tournaments/tournamentsModel';
import { useDispatch } from 'react-redux';
import { loadTournamentsDataAction } from '../../domain/tournaments/tournamentsActions';

const Tournaments = () => {
  return (
    <Container>
      <H4>Faceit Tournaments</H4>
      <TournamentsData />
    </Container>
  );
};

const TournamentsData = () => {
  const [page, setPage] = useState(1);

  const loading = useTypedSelector((state) =>
    getTournamentsNetworkStatus(state)
  );
  const initialLoad = useTypedSelector((state) =>
    getTournamentsInitialLoad(state)
  );
  const tournamentsData = useTypedSelector((state) =>
    getTournamentsData(state)
  );
  const isListEnd = useTypedSelector((state) => getIsListEnd(state));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTournamentsDataAction(page));
  }, [dispatch, page]);

  if (initialLoad) {
    return (
      <>
        <ActivityIndicator />
        <Input>Loading tournaments ...</Input>
      </>
    );
  }

  if (loading === NetworkRequestStatus.Fail) {
    return <Input>Something went wrong.</Input>;
  }

  if (tournamentsData.length === 0) {
    return <Input> No tournaments found.</Input>;
  }

  return (
    <FlatList
      data={tournamentsData}
      renderItem={(tournament) => <Input>{tournament.item.id}</Input>}
      keyExtractor={keyExtractor}
      onEndReached={fetchMoreData}
    />
  );

  function fetchMoreData() {
    if (!isListEnd && loading !== NetworkRequestStatus.InProgress) {
      console.log(`${loading}?_page=${page}`);
      setPage(page + 1);
    }
  }
};

function keyExtractor(item: TournamentModel) {
  return item.id;
}

export default Tournaments;