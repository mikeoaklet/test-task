import React from 'react';
import './proposal-row.css';

interface Props<T> {
  title: string;
  note?: string;
  value?: T;
}

export const ProposalRow = function <T>({ title, note, value }: Props<T>) {
  return (
    <div className="proposal--row">
      <span>{title}</span>

      <div className="proposal--row--2nd-cell">
        {value ? (
          <strong>
            {typeof value === 'number'
              ? moneyFormat(value)
              : (value as unknown as Date).toLocaleDateString()}
          </strong>
        ) : (
          <strong>-</strong>
        )}
        <small>{note}</small>
      </div>
    </div>
  );
};

const moneyFormat = (value: number) =>
  `\$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`; // Adds commas between digits.
