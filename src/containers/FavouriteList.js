/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Favourite from '../components/Favourite';
import {
  selectAllGames,
  selectAllFavourites,
  fetchFavourites,
} from '../reducers/gameSlice';

const FavouriteList = () => {
  const dispatch = useDispatch();
  let games = useSelector(selectAllGames);
  const favourites = useSelector(selectAllFavourites);

  const { status, error } = useSelector((state) => state.game);

  useEffect(() => {
    if (status === 'games' || status === 'game-info') {
      dispatch(fetchFavourites());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = (
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    );
  } else if (status === 'favourites') {
    games = games.filter((game) =>
      favourites.some((favourite) => game.id === favourite.game_id),
    );
    content = games.map((game) => <Favourite key={game.id} game={game} />);
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <section className="games-list">{content}</section>;
};

export default FavouriteList;
