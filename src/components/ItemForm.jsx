import { useState } from "react";

function ItemForm({ onItemAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({ name: "", description: "", quantity: "" });
        onItemAdded(); // tabloyu güncelle
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
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
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;
