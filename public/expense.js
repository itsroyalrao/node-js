const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('userId');
if (userID) localStorage.setItem('userID', userID);

const form = document.getElementById('form');
const items = document.getElementById('items');

form.addEventListener('submit', addExpense);

async function createExpense(amount, description, category) {
  try {
    const userID = localStorage.getItem('userID');
    console.log(userID);
    const obj = { amount, description, category, userID };
    await axios.post('/expense', obj);
    getAllExpenses();
  } catch (error) {
    console.log(error);
  }
}

async function getAllExpenses() {
  items.innerHTML = '';
  const userID = localStorage.getItem('userID');
  const result = await axios.get('/expense', {
    params: { userID: userID }
  });
  const data = result.data.expense;
  data.forEach(element => {
    appendData(element.amount, element.description, element.category, element._id);
  });
}
getAllExpenses();

async function deleteExpense(expenseID) {
  try {
    await axios.delete(`/expense`, {
      params: { expenseID: expenseID.target.id }
    });
    await getAllExpenses();
  } catch (error) {
    console.log(error);
  }
}

function appendData(amount, description, category, expenseID) {
  const trData = document.createElement('tr');

  const tdAmount = document.createElement('td');
  tdAmount.textContent = amount;
  const tdDescription = document.createElement('td');
  tdDescription.textContent = description;
  const tdCategory = document.createElement('td');
  tdCategory.textContent = category;

  trData.appendChild(tdAmount);
  trData.appendChild(tdDescription);
  trData.appendChild(tdCategory);

  items.appendChild(trData);
}

function addExpense() {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('desc').value;
  const category = document.getElementById('category').value;

  createExpense(amount, description, category)

  form.reset();
}