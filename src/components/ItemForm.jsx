import { useEffect, useState } from "react";

function ItemForm({ onItemSaved, selectedItem, clearSelection }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: ""
  });

  // Eğer editlenecek item varsa formu onunla doldur
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        name: selectedItem.name,
        description: selectedItem.description,
        quantity: selectedItem.quantity
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = selectedItem ? "PUT" : "POST";
    const url = selectedItem
      ? `http://localhost:8080/items/${selectedItem.id}`
      : "http://localhost:8080/items";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => {
        onItemSaved(); // tabloyu güncelle
        setFormData({ name: "", description: "", quantity: "" });
        clearSelection(); // seçimi temizle
      });
      props.onItemSaved(); // zaten çağırıyor olman gerekiyor
    props.clearSelection(); // edit moddan çıkmak için

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedItem ? "Edit Item" : "Add New Item"}</h2>
      <div>
        <label>Name: </label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description: </label>
        <input name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Quantity: </label>
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
      </div>
      <button type="submit">{selectedItem ? "Update Item" : "Add Item"}</button>
    </form>
  );
}

export default ItemForm;
