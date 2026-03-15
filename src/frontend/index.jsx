import React, { useEffect, useState } from 'react';
import ForgeReconciler, {Button, DynamicTable, Inline, Lozenge, Text, Textfield} from '@forge/react';
import { conferenceExpenses } from './data';
import { invoke } from '@forge/bridge';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);
  return (
    <>
      <DynamicTable 
        caption="Expenses"
        rows={fillTable(conferenceExpenses)} />
      <Inline spread='space-between'>
        <Text>Total:  ${getTotal(conferenceExpenses)}</Text>
        <Button>Delete All</Button>
      </Inline>
    </>
  );
};

  const fillTable = ( expenses ) => {
    console.log(expenses)
    if (expenses.length > 0) {
      const rows = expenses.map((item) => ({
        cells: [
          {
              content: <Textfield appearance="subtle"  spacing="compact" id="expense-description" defaultValue={item.description}/>,
          },
          {
              content: <Textfield appearance="subtle"  spacing="compact" id="expense-amount" defaultValue={item.amount}/>,
          },
          { 
              content: <Button appearance="subtle" iconBefore="trash" spacing="compact"/>
          },
        ],
      }))
    return rows;
    }
    else return null;
  };

  const getTotal = (expenses) => {
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  };


ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
