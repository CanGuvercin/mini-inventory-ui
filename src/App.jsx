import { useEffect, useState } from 'react'
import ItemTable from "./components/ItemTable";
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);

  // önce tanımla
  const fetchItems = () => {
    fetch("http://localhost:8080/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  };

  // sonra kullan
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <ItemForm onItemAdded={fetchItems} />
      <div style={{ padding: '2rem' }}>
        <h1>Mini Inventory</h1>
        <ItemTable items={items} />
      </div>
    </>
  );
}
export default App;