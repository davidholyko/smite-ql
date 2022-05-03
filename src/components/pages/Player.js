import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';

import { smiteConnector } from '../../api';
import { Header } from '../header';
import { WinLossBar } from '../player';

export const Player = () => {
  const [playerInfo, setPlayerInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await smiteConnector.getPlayerInfo('dhko');
      setPlayerInfo(data);
    };

    fetchData();

    return () => {};
  }, []);

  const { overall, ranked, normal } = playerInfo;

  return (
    <div>
      <Header />
      {!isEmpty(playerInfo) && <WinLossBar overall={overall} ranked={ranked} normal={normal} />}
    </div>
  );
};
