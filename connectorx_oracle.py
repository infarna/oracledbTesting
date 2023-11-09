import connectorx as cx

# Set the Oracle connection details
username = 'your_username'
password = 'your_password'
dsn = 'your_connection_string'

# Create a connection
connection = cx.connect({
    "user": username,
    "password": password,
    "host": dsn,
    "dialect": "oracle"
})

# Create a cursor
cursor = connection.cursor()

# Execute paginated query
paginated_query = 'SELECT * FROM your_table OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY'
paginated_result = cursor.execute(paginated_query).fetchall()
print('Paginated Result:', paginated_result)

# Execute all-at-once query
all_at_once_query = 'SELECT * FROM your_table'
all_at_once_result = cursor.execute(all_at_once_query).fetchall()
print('All-at-Once Result:', all_at_once_result)

# Close the cursor and connection
cursor.close()
connection.close()
