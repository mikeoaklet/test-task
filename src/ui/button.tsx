import React from 'react';
import './button.css';

interface Props {
  children: string;
}

export const Button = ({ children }: Props) => (
  <button className="btn">{children}</button>
);
