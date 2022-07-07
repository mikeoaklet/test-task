import React from 'react';
import { Calc } from './ui/calc';
import { RangeSlider } from './ui/range-slider';
import { Proposal } from './ui/proposal';
import { ProposalRow } from './ui/proposal-row';
import { Button } from './ui/button';
import { useLoanProposalCalculator } from './logic/use-loan-proposal-calculator';
import { dayInMs } from './consts';

function App() {
  const { amount, setAmount, term, setTerm, constraints, proposal } =
    useLoanProposalCalculator();

  return (
    <main>
      <Calc>
        <header className="calc--header">
          <RangeSlider
            title="Amount"
            prefix="$"
            min={constraints?.amountInterval.min || 0}
            max={constraints?.amountInterval.max || 100}
            step={constraints?.amountInterval.step || 1}
            value={amount || 10}
            onChange={setAmount}
          />
          <RangeSlider
            title="Term"
            suffix=" days"
            min={constraints?.termInterval.min || 0}
            max={constraints?.termInterval.max || 100}
            step={constraints?.termInterval.step || 1}
            value={term || 10}
            onChange={setTerm}
          />
        </header>
        <section className="calc--body">
          <Proposal>
            <ProposalRow
              title="Total principal"
              value={Number(proposal?.totalPrincipal)}
            />
            <ProposalRow
              title="Term"
              value={
                proposal?.term
                  ? proposal.term
                    ? new Date( // Add {proposal.term} days to a Date object.
                        new Date().getTime() + Number(proposal.term) * dayInMs,
                      )
                    : new Date()
                  : undefined
              }
              note={proposal?.term ? proposal?.term + ' days' : undefined}
            />
            <ProposalRow
              title="Total cost of credit"
              value={proposal?.totalCostOfCredit}
            />
            <ProposalRow
              title="Total repayable amount"
              value={proposal?.totalRepayableAmount}
            />
            <ProposalRow
              title="Monthly payment"
              value={proposal?.monthlyPayment}
            />
          </Proposal>
        </section>
        <footer className="calc--footer">
          <Button>Půjčit si</Button>
        </footer>
      </Calc>
    </main>
  );
}

export default App;
