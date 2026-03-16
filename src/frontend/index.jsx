import React, { useEffect, useState } from 'react';
import ForgeReconciler, {Button, DynamicTable, Inline, Lozenge, Text, Textfield} from '@forge/react';
import { conferenceExpenses } from './data';
import { invoke } from '@forge/bridge';

const App = () => {
  let expenseDescriptionValue = null;
  let expenseAmountValue = null;

    const validate = (data) => {
    console.log(data)
    if(data.target.id === "expense-description") expenseDescriptionValue = data.target.value;
    if(data.target.id === "expense-amount") expenseAmountValue = data.target.value;
  }


  const [data, setData] = useState(null);
  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  const inputRow = ({
  cells: [
     {
        content: <Textfield appearance="subtle"  spacing="compact" id="expense-description" placeholder="Add an expense +" onBlur={validate}/>,
      },
      {
        content: <Textfield appearance="subtle"  spacing="compact" id="expense-amount" placeholder="0" onBlur={validate}/>,
      },
      {
        content: <Button appearance="subtle" spacing="compact" id="add-expense" onClick={create}>Add</Button>,
      },
  ],
})

  
  const fillTable = ( expenses ) => {
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
      rows.push(inputRow)
      return rows;
    }
    else return [inputRow];
  };
  
  const getTotal = (expenses) => {
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  };

  const create = (data) => {
  invoke('create', {data});
}


  
  
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

  ForgeReconciler.render(
    <React.StrictMode>
    <App />
  </React.StrictMode>
);
