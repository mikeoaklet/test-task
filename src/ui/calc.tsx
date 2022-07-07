import React from 'react';
import './calc.css';

interface Props {
  children: React.ReactNode[];
}

export const Calc = ({ children }: Props) => (
  <div className="calc">{children}</div>
);
