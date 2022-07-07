import React, { useCallback, useContext } from 'react';
import { LoanProposalContext } from './loan-proposal.context';
import { useDebounceCallback } from '../helpers/use-debounce-callback.hook';

export const useLoanProposalCalculator = () => {
  const context = useContext(LoanProposalContext);

  const setAmount = useDebounceCallback(
    (amount: number) => {
      context && context.setAmount(amount);
    },
    [],
    50,
  );

  const setTerm = useDebounceCallback(
    (term: number) => {
      context && context.setTerm(term);
    },
    [],
    50,
  );

  return {
    amount: context && context.amount,
    setAmount,
    term: context && context.term,
    setTerm,
    constraints: context && context.constraints,
    proposal: context && context.proposal,
  };
};
