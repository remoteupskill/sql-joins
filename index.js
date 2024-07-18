const { Pool } = require('pg');

// Create a connection pool to the Postgres database
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default Postgres port
});

// Function to execute a SQL query with a full join
async function executeFullJoinQuery() {
  try {
    // Establish a client connection from the pool
    const client = await pool.connect();

    // SQL query with a full join
    const query = `
      SELECT
        users.id AS user_id,
        users.name AS user_name,
        orders.id AS order_id,
        orders.total_amount AS order_total
      FROM users
      FULL JOIN orders
      ON users.id = orders.user_id
    `;

    // Execute the query and get the results
    const result = await client.query(query);

    // Process the query results
    console.log('Full Join Query Results:');
    result.rows.forEach((row) => {
      console.log(`User ID: ${row.user_id}, User Name: ${row.user_name}, Order ID: ${row.order_id}, Order Total: ${row.order_total}`);
    });

    // Release the client connection back to the pool
    client.release();
  } catch (error) {
    console.error('Error executing full join query:', error);
  } finally {
    // Close the connection pool
    await pool.end();
  }
}
