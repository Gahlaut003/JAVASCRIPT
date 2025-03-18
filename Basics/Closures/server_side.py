from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL connection configuration
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'employees',
    'port': 3306
}

# Establish a connection to MySQL
connection = mysql.connector.connect(**mysql_config)
cursor = connection.cursor()
print(connection)
print(mysql_config)

# Create operation
@app.route('/api/item', methods=['POST'])
def create_item():
    try:
        data = request.json
        ip_fname = data['first_name']
        ip_lname = data['last_name']
        gender = data['gender']
        print(ip_fname)
        print(ip_lname)
        print(gender)
        # Call the stored procedure for create operation
        cursor.callproc('create_item', [ip_fname,ip_lname,gender],)
        cursor.close()
        connection.commit()
        return jsonify({'message': 'Item created successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Read operation
@app.route('/api/items', methods=['GET'])
def read_items():
    try:
        # Call the stored procedure for read operation
        cursor.callproc('CalculateSum')
        # Fetch the results after calling the stored procedure  
        result = list(cursor.stored_results())[0]
        items = [{'id': row[0], 'name': row[1]} for row in result]
        return jsonify(items)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Update operation
@app.route('/api/item/<int:id>', methods=['PUT'])
def update_item(id):
    try:
        data = request.json
        name = data['name']
        # Call the stored procedure for update operation
        cursor.callproc('update_item', [id, name])
        connection.commit()
        return jsonify({'message': 'Item updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Delete operation
@app.route('/api/item/<int:id>', methods=['DELETE'])
def delete_item(id):
    try:
        # Call the stored procedure for delete operation
        cursor.callproc('delete_item', [id])
        connection.commit()
        return jsonify({'message': 'Item deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=8000)
