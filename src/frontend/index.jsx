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
    </>
  );
};

  const fillTable = ( expenses ) => {
    console.log(expenses)
    if (expenses.length > 0) {
      const rows = expenses.map((item) => ({
        cells: [
          {
            content: <Text>{item.description}</Text>,
          },
          {
            content: <Text>{item.amount}</Text>,
          },
        ],
      }))
    return rows;
    }
    else return null;
  }


ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
