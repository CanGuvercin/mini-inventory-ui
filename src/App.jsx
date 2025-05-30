import { useEffect, useState } from 'react';
import ItemTable from "./components/ItemTable";
import ItemForm from './components/ItemForm';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Tüm item'ları getir
  const fetchItems = () => {
    fetch("http://localhost:8080/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  };

  // Sayfa yüklendiğinde item'ları getir
  useEffect(() => {
    fetchItems();
  }, []);

  // Tablo üzerindeki "Edit" butonuna basıldığında çağrılır
  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  // Form gönderildikten sonra seçimi sıfırla
  const clearSelection = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <ItemForm
        onItemSaved={fetchItems}
        selectedItem={selectedItem}
        clearSelection={clearSelection}
      />
      <div className='container' style={{ padding: '2rem' }}>
        <h1>Mini Inventory</h1>
        <ItemTable
          items={items}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
}

export default App;
