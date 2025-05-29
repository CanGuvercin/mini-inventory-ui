import { useEffect, useState } from 'react'


function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  }
  , []);


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mini Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.description} ({item.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
