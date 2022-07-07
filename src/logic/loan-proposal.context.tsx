import React, { createContext, useEffect, useState } from 'react';
import { ConstraintsHttpResponse } from '../types/constraints.http-response';
import { ProposalHttpResponse } from '../types/proposal.http-response';
import { LoanNetworkCacheStore } from './network-cache-store';

export const LoanProposalContext = createContext<
  | {
      amount?: number;
      setAmount: React.Dispatch<number>;
      term?: number;
      setTerm: React.Dispatch<number>;
      constraints?: ConstraintsHttpResponse;
      proposal?: ProposalHttpResponse;
    }
  | undefined
>(undefined);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const cacheStore = new LoanNetworkCacheStore(5);

export const LoanProposalProvider = ({ children }: Props) => {
  const [amount, setAmount] = useState<number>();
  const [term, setTerm] = useState<number>();
  const [constraints, setConstraints] = useState<ConstraintsHttpResponse>();
  const [proposal, setProposal] = useState<ProposalHttpResponse>();

  useEffect(() => {
    const loadConstraints = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URL + '/application/constraints',
      );

      if (response.ok) {
        const responseJson: ConstraintsHttpResponse = await response.json();
        setConstraints(responseJson);
        setAmount(responseJson.amountInterval.defaultValue);
        setTerm(responseJson.termInterval.defaultValue);
      }
    };

    loadConstraints();

    return () => {
      setAmount(constraints?.amountInterval.defaultValue);
      setTerm(constraints?.termInterval.defaultValue);
    };
  }, []);

  useEffect(() => {
    const loadProposal = async () => {
      if (!amount || !term) return;
      if (cacheStore.has([amount, term])) {
        setProposal(cacheStore.get([amount, term]));
        return;
      }

      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/application/real-first-loan-offer?amount=${amount}&term=${term}`,
      );

      if (response.ok) {
        const responseJson: ProposalHttpResponse = await response.json();
        cacheStore.put([amount, term], responseJson);
        setProposal(responseJson);
      }
    };

    loadProposal();
  }, [amount, term]);

  return (
    <LoanProposalContext.Provider
      value={{ amount, setAmount, term, setTerm, constraints, proposal }}>
      {children}
    </LoanProposalContext.Provider>
  );
};
