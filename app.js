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
