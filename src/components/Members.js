import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Members.css";
import { useState } from "react";
import member_list from "../components/Member_list";

function Member({ id, name, handy }) {
  const add_result = () => {
    const index = member_list.findIndex(x => x.name === name);
    member_list[index].result = 72 - handy + item;
  };
  useEffect(add_result);
  const [item, setItem] = useState(0);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  return (
    <div className="member">
      <table>
        <th>
          <h3 className="member__name">{name}</h3>
        </th>
        <th>
          <h3 className="member__handy">{handy}</h3>
        </th>
        <th>
          <h3 className="member__item">{item}</h3>
        </th>
        <th>
          <button onClick={incrementItem}>+</button>
          <button onClick={decrementItem}>-</button>
        </th>
        <th>
          <h3 className="member__result">{72 + item - handy}</h3>
        </th>
      </table>
    </div>
  );
}

Member.propTypes = {
  id: PropTypes.number.isRequired,
  handy: PropTypes.number.isRequired,
  score: PropTypes.string.isRequired,
  ranking: PropTypes.string.isRequired
};

export default Member;
