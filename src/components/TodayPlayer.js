import React, { useState } from "react";
import "./Player.css";

const TodayPlayer = ({ player, onIncrease, onDecrease }) => {
  return (
    <div className="titleTable">
      <th>{player.playerName}</th>
      <th>{player.handy}</th>
      <div>
        <th>
          <button onClick={() => onIncrease(player.id)}>+1</button>
        </th>
        <th>
          <button onClick={() => onDecrease(player.id)}>-1</button>
        </th>
      </div>
    </div>
  );
};

const TodayPlayerList = ({ players, onIncrease, onDecrease }) => {
  return (
    <>
      <div className="titleTable">
        <th>이름</th>
        <th>핸디</th>
        <th>핸디설정</th>
      </div>
      <div>
        {players.map((player) => (
          <TodayPlayer
            player={player}
            key={player.id}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))}
      </div>
    </>
  );
};

export default TodayPlayerList;
