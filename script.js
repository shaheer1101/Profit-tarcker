const form = document.getElementById('entryForm');
const tableBody = document.getElementById('entryTable');
const confirmModal = document.getElementById('confirmModal');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

let deleteIndex = null;

let entries = JSON.parse(localStorage.getItem('entries')) || [];
renderTable();

form.addEventListener('submit', e => {
  e.preventDefault();
  const product = document.getElementById('product').value.trim();
  const originalPrice = parseFloat(document.getElementById('originalPrice').value);
  const salePrice = parseFloat(document.getElementById('salePrice').value);
  if(!product || isNaN(originalPrice) || isNaN(salePrice)) return;

  const profitLoss = salePrice - originalPrice;
  const percentage = ((profitLoss / originalPrice) * 100).toFixed(2);

  const entry = {
    date: new Date().toLocaleDateString(),
    product,
    originalPrice,
    salePrice,
    profitLoss,
    percentage
  };

  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));
  renderTable();
  form.reset();
});

function renderTable(){
  tableBody.innerHTML = '';
  entries.forEach((entry, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.product}</td>
      <td>${entry.originalPrice}</td>
      <td>${entry.salePrice}</td>
      <td>${entry.profitLoss}</td>
      <td>${entry.percentage}%</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    tableBody.appendChild(tr);
  });
}

tableBody.addEventListener('click', e => {
  if(e.target.classList.contains('delete-btn')){
    deleteIndex = e.target.getAttribute('data-index');
    confirmModal.style.display = 'block';
  }
});

confirmYes.addEventListener('click', () => {
  if(deleteIndex !== null){
    entries.splice(deleteIndex,1);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderTable();
    confirmModal.style.display = 'none';
    deleteIndex = null;
  }
});
confirmNo.addEventListener('click', () => {
  confirmModal.style.display = 'none';
  deleteIndex = null;
});
