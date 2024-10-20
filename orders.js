// Function to generate a unique order ID
function generateOrderId() {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Function to validate form inputs
function validateForm(customerName, product, quantity) {
    if (customerName.trim() === '' || product.trim() === '' || quantity.trim() === '') {
        alert('Please fill in all fields');
        return false;
    }
    if (isNaN(quantity) || parseInt(quantity) <= 0) {
        alert('Please enter a valid quantity');
        return false;
    }
    return true;
}

// Function to format date
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Function to update order status
function updateStatus(row, newStatus) {
    row.querySelector('.status').textContent = newStatus;
    row.querySelector('.statusSelect').value = newStatus;
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const customerName = document.getElementById('customerName').value;
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;
    const status = document.getElementById('status').value;

    if (!validateForm(customerName, product, quantity)) {
        return;
    }

    // Create a new order row
    const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    const newRow = ordersTable.insertRow();

    // Generate a unique order ID
    const orderId = generateOrderId();

    // Insert new cells
    const orderIdCell = newRow.insertCell(0);
    const customerNameCell = newRow.insertCell(1);
    const productCell = newRow.insertCell(2);
    const quantityCell = newRow.insertCell(3);
    const dateCell = newRow.insertCell(4);
    const statusCell = newRow.insertCell(5);
    const actionCell = newRow.insertCell(6);

    // Populate cells
    orderIdCell.textContent = orderId;
    customerNameCell.textContent = customerName;
    productCell.textContent = product;
    quantityCell.textContent = quantity;
    dateCell.textContent = formatDate(new Date());
    statusCell.innerHTML = `<span class="status">${status}</span>`;

    // Create status dropdown for editing
    const statusSelect = document.createElement('select');
    statusSelect.classList.add('statusSelect');
    ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        if (option === status) optionElement.selected = true;
        statusSelect.appendChild(optionElement);
    });
    statusSelect.onchange = function() {
        updateStatus(newRow, this.value);
    };
    statusCell.appendChild(statusSelect);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = function() {
        if (confirm('Are you sure you want to delete this order?')) {
            ordersTable.deleteRow(newRow.rowIndex - 1); // Remove the row
        }
    };
    actionCell.appendChild(deleteButton);

    // Clear the form
    this.reset();

    // Show success message
    alert('Order added successfully!');
});

// Add search functionality
document.getElementById('searchInput').addEventListener('keyup', function() {
    const searchValue = this.value.toLowerCase();
    const rows = document.getElementById('ordersTable').getElementsByTagName('tbody')[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const orderId = rows[i].cells[0].textContent.toLowerCase();
        const customerName = rows[i].cells[1].textContent.toLowerCase();
        const product = rows[i].cells[2].textContent.toLowerCase();

        if (orderId.includes(searchValue) || customerName.includes(searchValue) || product.includes(searchValue)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
});

// Add sorting functionality
document.querySelectorAll('#ordersTable th').forEach(headerCell => {
    headerCell.addEventListener('click', () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains('th-sort-asc');

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-asc', asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-desc', !asc);
}