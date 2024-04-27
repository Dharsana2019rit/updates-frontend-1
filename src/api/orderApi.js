// api.js

// Function to fetch menu items from the backend
export const getMenuItems = async () => {
  try {
    const response = await fetch('https://localhost:44384/api/MenuItems'); // Assuming the endpoint for fetching menu items is '/api/menuItems'
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const menuItems = await response.json();
    return menuItems;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch('https://localhost:44384/api/Orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    const createdOrder = await response.json();
    return createdOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
