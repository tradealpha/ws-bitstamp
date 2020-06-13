import React from "react";

import Utils from "@nexys/utils";
import * as T from "./type";
import * as Util from "./utils";

const Table = (props: { data: T.V[][] }) => {
  return (
    <table>
      <thead>
        <tr>
          {Util.channels.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                style={{
                  backgroundColor: Util.colors[cell.colorIdx],
                  transition: "background-color .4s",
                }}
              >
                {cell.value} ({Utils.number.formatNumber(cell.growth)})
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
