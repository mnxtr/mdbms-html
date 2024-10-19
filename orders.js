document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const customerName = document.getElementById('customerName').value;
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;
    const status = document.getElementById('status').value;

    // Create a new order row
    const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    const newRow = ordersTable.insertRow();

    // Insert new cells
    const orderIdCell = newRow.insertCell(0);
    const customerNameCell = newRow.insertCell(1);
    const productCell = newRow.insertCell(2);
    const quantityCell = newRow.insertCell(3);
    const statusCell = newRow.insertCell(4);
    const actionCell = newRow.insertCell(5);

    // Populate cells
    orderIdCell.textContent = ordersTable.rows.length; // Auto-increment order ID
    customerNameCell.textContent = customerName;
    productCell.textContent = product;
    quantityCell.textContent = quantity;
    statusCell.textContent = status;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = function() {
        ordersTable.deleteRow(newRow.rowIndex - 1); // Remove the row
    };
    actionCell.appendChild(deleteButton);

    // Clear the form
    this.reset();
});
