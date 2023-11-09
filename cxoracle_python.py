import cx_Oracle

# Set the Oracle connection details
username = 'your_username'
password = 'your_password'
dsn = 'your_connection_string'

# Connect to the Oracle database
connection = cx_Oracle.connect(username, password, dsn)

# Create a cursor
cursor = connection.cursor()

# Execute paginated query
paginated_query = 'SELECT * FROM your_table OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY'
cursor.execute(paginated_query)
paginated_result = cursor.fetchall()
print('Paginated Result:', paginated_result)

# Execute all-at-once query
all_at_once_query = 'SELECT * FROM your_table'
cursor.execute(all_at_once_query)
all_at_once_result = cursor.fetchall()
print('All-at-Once Result:', all_at_once_result)

# Close the cursor and connection
cursor.close()
connection.close()
