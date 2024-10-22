// Author: Devany Walker
// ID#: 2300064
// Occurence: UM2 




document.addEventListener('DOMContentLoaded', function() {
    const invoiceDetailsContainer = document.getElementById('invoice-details');
    const cancelButton = document.getElementById('cancelButton');
    const exitButton = document.getElementById('exitButton');

    function loadInvoiceDetails() {
        const details = localStorage.getItem('invoiceDetails');
        return details ? JSON.parse(details) : null;
    }

    function displayInvoiceDetails() {
        const invoiceDetails = loadInvoiceDetails();
        
        if (invoiceDetails) {
            let itemsHtml = '<ul>';
            invoiceDetails.items.forEach(item => {
                itemsHtml += `
                    <li>
                        <p>${item.name}</p>
                        <p>${item.price} x ${item.quantity}</p>
                    </li>
                `;
            });
            itemsHtml += '</ul>';

            invoiceDetailsContainer.innerHTML = `
                <div>
                    ${itemsHtml}
                    <p>Subtotal: $${invoiceDetails.subtotal.toFixed(2)}</p>
                    <p>Tax (5%): $${invoiceDetails.tax.toFixed(2)}</p>
                    <p>Total: $${invoiceDetails.total.toFixed(2)}</p>
                </div>
            `;
        }
    }

    // Add event listener for cancel button
    cancelButton.addEventListener('click', function() {
        localStorage.removeItem('invoiceDetails');
        window.location.href = 'cart.html';
    });

    // Add event listener for exit button
    exitButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    displayInvoiceDetails();
});
