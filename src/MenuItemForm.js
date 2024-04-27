import React, { useState } from 'react';
import axios from 'axios';
import AdminPanel from './AdminPanel';
import './MenuItemForm.css';

const MenuItemForm = () => {
  const [menuItem, setMenuItem] = useState({
    name: '',
    price: 0,
    Category: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, price, Category } = menuItem;
      const payload = {
        menuItemId: 0,
        name: name,
        price: parseFloat(price), // Ensure price is sent as float
        menuId: 0, // Assuming menuId needs to be provided
        menu: {
          menuId: 0,
          Category: Category,
          menuItems: []
        }
      };
      const response = await axios.post('https://localhost:44384/api/MenuItems', payload);
      console.log(response.data);
      setSuccessMessage('Menu item added successfully!');
      setMenuItem({
        name: '',
        price: 0,
        Category: ''
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
      setError('Failed to add menu item. Please try again later.');
    }
  };

  return (
    <div>
      <AdminPanel/>
      <div className='menu-item-form-container-admin'>
        <h2>Add Menu Item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={menuItem.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Price:</label>
            <input type="number" name="price" value={menuItem.price} onChange={handleChange} required />
          </div>
          <div>
            <label>Category:</label>
            <select name="Category" value={menuItem.Category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <button type="submit">Add Menu Item</button>
        </form>
        {error && <div>{error}</div>}
        {successMessage && <div>{successMessage}</div>}
      </div>
    </div>
  );
};

export default MenuItemForm;
