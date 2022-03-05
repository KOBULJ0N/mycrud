import React, { useState } from 'react';
import Data from './Mock';

export const App = () => {
  const storage = localStorage.getItem('dataa');

  const [item, setItem] = useState('');
  const [select, setSelect] = useState(null);
  const [title, setTitle] = useState('');
  const [age, setAge] = useState('');

  const [data, setData] = useState(storage ? JSON.parse(storage) : Data);


  localStorage.setItem('dataa', JSON.stringify(data));

  

  /* --------------Delete-----------------*/

  const onDelete = (ids) => {
    const newData = data.filter((value) => value.id !== ids);
    setData(newData);
  };

  /* --------------Delete-----------------*/

  /* --------------Create-----------------*/

  const getSave = () => {
    const created = [
      ...data,
      {
        id: data.length + 1,
        name: item,
        age: Math.floor(Math.random() * 100),
      },
    ];

    item && setData(created);
    setItem('');
  };

  /* --------------Create-----------------*/

  /* --------------edit-----------------*/

  const getEdit = (value) => {
    setSelect(value.id);
    setTitle(value.name);
    setAge(value.age) 
   
  };

  const saveEdit = () => {
    const newEditData = data.map((value) =>
      select == value.id ? { ...value, name: title, age: age } : value
    );
    setData(newEditData);
    setSelect(null);
  };
  /* --------------edit-----------------*/

  return (
    <>
      <div>
        <table border='1' width={'50%'}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Age</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {data.length === 0 ? (
            <h3>There's no Data</h3>
          ) : (
            data.map((value) => (
              <tbody key={value.id}>
                <tr>
                  <td>{value.id}</td>
                  <td>
                    {select == value.id ? (
                      <input
                        type='text'
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                      />
                    ) : (
                      value.age
                    )}
                  </td>
                  <td>
                    {select == value.id ? (
                      <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    ) : (
                      value.name
                    )}
                  </td>
                  <td>
                    <button onClick={() => onDelete(value.id)}>delete</button>

                    {select == value.id ? (
                      <button onClick={saveEdit}>save</button>
                    ) : (
                      <button onClick={() => getEdit(value)}>edit</button>
                    )}
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
        <input
          placeholder='write your data'
          onChange={(e) => setItem(e.target.value)}
          type='text'
          value={item}
        />
        <button onClick={getSave}>save</button>
      </div>

      <>
      
      </>
    </>
  );
};
export default App;
