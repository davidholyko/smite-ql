import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import keys from 'lodash/keys';
import map from 'lodash/map';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import React from 'react';

import { unparseIgn } from '../../helpers';

function toRows(players) {
  const playerValues = values(players);

  return [
    ['God Level', ...map(playerValues, ({ godLevel }) => godLevel)],
    ['K/D/A', ...map(playerValues, ({ kills, deaths, assists }) => `${kills}/${deaths}/${assists}`)],
    ['Gold Earned', ...map(playerValues, ({ gold }) => gold)],
    // ['Gold/Minute', ...map(playerValues, ({ godLevel }) => godLevel)],
    ['Player Damage', ...map(playerValues, ({ damageDone }) => damageDone)],
    // ['Minion Damage', ...map(playerValues, ({ godLevel }) => godLevel)],
    ['Structure Damage', ...map(playerValues, ({ damageStructures }) => damageStructures)],
    ['Damage Taken', ...map(playerValues, ({ damageTaken }) => damageTaken)],
    ['Damage Mitigated', ...map(playerValues, ({ damageMitigated }) => damageMitigated)],
    ['Team', ...map(playerValues, ({ isVictory }) => isVictory.toString())],
  ];
}

export const MatchReportTable = ({ players }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {map(players, (player) => {
              return (
                <TableCell align="right" key={player.rawIgn}>
                  {unparseIgn(player.rawIgn).ign}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {map(toRows(players), ([rowName, ...values]) => {
            return (
              <TableRow key={rowName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {rowName}
                </TableCell>
                {map(values, (value, index) => (
                  <TableCell align="right" key={index}>
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

MatchReportTable.propTypes = {
  players: PropTypes.object,
};
