/**
 * Sort table rows alphabetically based on the values in a column
 *
 * @param {Number} col column index (zero based)
 * @param {HTMLTableElement} table the table to be sorted
 */
function sortTableByColumn(col, table) {
  // Get all rows in the tbody
  const tbody = table.querySelector('tbody');
  const rowsArray = Array.from(tbody.querySelectorAll('tr'));

  // Sort rows based on the text content of the cells in the specified column
  rowsArray.sort((rowA, rowB) => {
    // Get the text content of the cells in the current column for both rows
    const cellA = rowA.cells[col].textContent.trim();
    const cellB = rowB.cells[col].textContent.trim();

    // Compare the cell values using localeCompare for alphabetical sorting
    return cellA.localeCompare(cellB);
  });

  // Append the sorted rows back to the tbody (this moves the rows in the DOM)
  rowsArray.forEach(row => tbody.appendChild(row));
}

/**
 * DO NOT EDIT THE CODE BELOW!
 *
 * The code below is there just to make it easier to test the code.
 *
 * If your function works correctly you should be able to sort the table
 * simply by clicking any column heading and the table should be immediately
 * sorted by values in that column.
 */

// find the table element
const table = document.getElementById('sortable');

// attach an event listener to each th element's click event
table.querySelectorAll('thead th').forEach((th, i) =>
  th.addEventListener('click', () => {
    sortTableByColumn(i, table);
  })
);