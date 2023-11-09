const oracledb = require('oracledb');

// Set Oracle connection details
const config = {
  user: 'your_username',
  password: 'your_password',
  connectString: 'your_connection_string',
};

// Function to execute queries and return JSON with results and execution time
async function executeQueries() {
  let connection;

  try {
    // Connect to the Oracle database
    connection = await oracledb.getConnection(config);

    // Execute paginated query
    const paginatedQuery = `SELECT * FROM your_table OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY`;
    const paginatedStartTime = Date.now(); // Record start time
    const paginatedResult = await connection.execute(paginatedQuery);
    const paginatedEndTime = Date.now(); // Record end time
    const paginatedExecutionTime = paginatedEndTime - paginatedStartTime; // Calculate execution time

    // Execute all-at-once query
    const allAtOnceQuery = `SELECT * FROM your_table`;
    const allAtOnceStartTime = Date.now(); // Record start time
    const allAtOnceResult = await connection.execute(allAtOnceQuery);
    const allAtOnceEndTime = Date.now(); // Record end time
    const allAtOnceExecutionTime = allAtOnceEndTime - allAtOnceStartTime; // Calculate execution time

    // Create JSON object with results and execution time
    const resultJson = {
      paginatedResult: paginatedResult.rows,
      allAtOnceResult: allAtOnceResult.rows,
      executionTime: {
        paginated: paginatedExecutionTime,
        allAtOnce: allAtOnceExecutionTime,
      },
    };

    // Log the JSON object
    console.log('Result JSON:', resultJson);

    // Return the JSON object
    return resultJson;
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (connection) {
      // Release the connection
      await connection.close();
    }
  }
}

// Call the function
executeQueries();
