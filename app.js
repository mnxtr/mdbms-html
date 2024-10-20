document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('manufacturing-form');
    const tableBody = document.querySelector('#manufacturing-table tbody');

    let records = [];

    // Function to render records to the table
    function renderTable() {
        tableBody.innerHTML = '';

        records.forEach((record, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${record.productName}</td>
                <td>${record.quantity}</td>
                <td>${record.date}</td>
                <td>${record.status}</td>
                <td class="actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to add a new record
    function addRecord(event) {
        event.preventDefault();

        const productName = document.getElementById('product-name').value;
        const quantity = document.getElementById('quantity').value;
        const date = document.getElementById('date').value;
        const status = document.getElementById('status').value;

        records.push({ productName, quantity, date, status });
        renderTable();
        form.reset();
    }

    // Function to handle table actions (edit, delete)
    tableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            records.splice(index, 1);
            renderTable();
        }

        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.getAttribute('data-index');
            const record = records[index];

            document.getElementById('product-name').value = record.productName;
            document.getElementById('quantity').value = record.quantity;
            document.getElementById('date').value = record.date;
            document.getElementById('status').value = record.status;

            records.splice(index, 1);
            renderTable();
        }
    });

    // Add form submission handler
    form.addEventListener('submit', addRecord);
});

function showNotification(message, isSuccess) {
    const notification = document.getElementById("notification");
    notification.className = isSuccess ? 'notification-success' : 'notification-error';
    notification.innerText = message;
    notification.style.display = "block";
    setTimeout(() => { notification.style.display = "none"; }, 3000);
}

document.getElementById('manufacturing-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Assume you process the form here
    showNotification('Record added successfully', true);
});
function addRecordToTable(record) {
    const table = document.getElementById('manufacturing-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell(0).innerText = record.productName;
    row.insertCell(1).innerText = record.quantity;
    row.insertCell(2).innerText = record.date;
    row.insertCell(3).innerText = record.status;
    row.insertCell(4).innerHTML = '<button onclick="deleteRecord(this)">Delete</button>';
}

document.getElementById('manufacturing-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Capture form values
    const record = {
        productName: document.getElementById('product-name').value,
        quantity: document.getElementById('quantity').value,
        date: document.getElementById('date').value,
        status: document.getElementById('status').value
    };

    // Save to localStorage
    let records = JSON.parse(localStorage.getItem('manufacturingRecords')) || [];
    records.push(record);
    localStorage.setItem('manufacturingRecords', JSON.stringify(records));

    addRecordToTable(record);
    showNotification('Record added successfully', true);
});

// Load records from localStorage on page load
window.onload = function() {
    const records = JSON.parse(localStorage.getItem('manufacturingRecords')) || [];
    records.forEach(addRecordToTable);
};

function deleteRecord(btn) {
    const row = btn.parentElement.parentElement;
    const index = row.rowIndex - 1;  // Adjust for header
    let records = JSON.parse(localStorage.getItem('manufacturingRecords')) || [];
    records.splice(index, 1);
    localStorage.setItem('manufacturingRecords', JSON.stringify(records));
    row.remove();
}

