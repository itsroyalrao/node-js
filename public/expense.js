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
  let li = document.createElement('li');
  li.appendChild(document.createTextNode(amount + " - " + description + " - " + category + " "));

  let dlt = document.createElement('button');
  dlt.type = 'button';
  dlt.id = expenseID;
  dlt.appendChild(document.createTextNode('Delete Expense'));
  dlt.addEventListener('click', deleteExpense);
  li.appendChild(dlt);

  items.appendChild(li);
}

function addExpense() {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('desc').value;
  const category = document.getElementById('category').value;

  createExpense(amount, description, category)

  form.reset();
}

// async function goPremium(e) {
//   try {
//     const token1 = localStorage.getItem('rzp_device_id');
//     const token2 = localStorage.getItem('rzp_checkout_anon_id');
//     console.log(token1, token2);

//     const response = await axios.get('/payment');

//     // await axios.post('/payment', { name: 'Mohit' });

//     const rzp1 = new Razorpay(options);
//     rzp1.open();
//     e.preventDefault();
//     rzp1.on('payment.failed', response => {
//       console.log(response);
//       alert('Something went wrong!')
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }