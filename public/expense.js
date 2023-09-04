let start = 0, end = 5;
let page = 1;
let expenseLength;
let limit = document.getElementById('expense-per-page').value;
let num = document.getElementById('num');
const userID = localStorage.getItem('userID');

const form = document.getElementById('form');
const items = document.getElementById('items');

form.addEventListener('submit', addExpense);

async function createExpense(amount, description, category) {
  try {
    const obj = { amount, description, category, userID };
    await axios.post('/expense', obj);

  } catch (error) {
    console.log(error);
  }
}

async function deleteExpense(expenseID) {
  try {
    await axios.delete(`/expense`, {
      params: { expenseID: expenseID.target.id }
    });

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

const active = document.getElementsByClassName('active');
(async () => {
  const result = await axios.get(`/expense/len?userID=${userID}`);
  expenseLength = result.data;
  await getExpense();
})();

async function backbtn() {
  limit = document.getElementById('expense-per-page').value;
  if (end == limit) {
    page--;
    start = 0;
    await getExpense();
  }
  else if (end > limit) {
    page--;
    end = start;
    start -= Number(limit);
    await getExpense();
  }
}

async function nextbtn() {
  limit = document.getElementById('expense-per-page').value;
  if (limit <= expenseLength && end <= expenseLength) {
    page++;
    start = end;
    end = start + Number(limit);
    await getExpense();
  }
}

async function getExpense() {
  try {
    const result = await axios.get(`/expense?userID=${userID}&start=${start}&end=${end}`);
    const data = result.data.expense;

    items.innerHTML = '';
    data.forEach(element => {
      appendData(element.amount, element.description, element.category, element._id);
    });

    if (data.length) {
      let text = start + 1 + ' - ' + (expenseLength > end ? end : expenseLength) + ' of ' + expenseLength;
      num.innerHTML = '';
      num.appendChild(document.createTextNode(text));
    }
  } catch (e) {
    console.log(e.message);
  }
}