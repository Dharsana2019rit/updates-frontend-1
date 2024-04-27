
// Function to create a table booking
export const createTableBooking = async (bookingData) => {
  try {
    console.log('Creating table booking:', bookingData); // Add logging statement
    const response = await fetch(`https://localhost:44384/api/TableBookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include authentication headers if required
        // Example: 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    console.log('Response:', response); // Add logging statement
    
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    // Parse the response if needed
    const responseData = await response.json();

    console.log('Created booking data:', responseData); // Add logging statement
    
    return responseData; // Return the created booking data
  } catch (error) {
    console.error('Error creating booking:', error); // Add logging statement
    throw new Error('Failed to create booking');
  }
};



