import React from 'react';
import './proposal.css';

interface Props {
  children: React.ReactNode[];
}

export const Proposal = ({ children }: Props) => (
  <div className="proposal">{children}</div>
);
