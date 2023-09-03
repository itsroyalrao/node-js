let currentValue = 1;
let expenseLength;
let limit = document.getElementById('page-number').value;
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
  const result = await axios.get('/expense/len');
  console.log(result.data);
  expenseLength = result.data;
  await getExpense();
})();

// const link = document.getElementsByClassName('link');
// async function activeLink(event) {
//   for (const l of link) {
//     l.classList.remove('active');
//   }
//   event.target.classList.add('active');
//   currentValue = event.target.value;

//   await getExpense();
// }

async function backbtn() {
  if (currentValue > 1) {
    // for (const l of link) {
    //   l.classList.remove('active');
    // }
    currentValue--;
    // link[currentValue - 1].classList.add('active');

    await getExpense();
  }
}

async function nextbtn() {
  if (currentValue < expenseLength / limit) {
    currentValue++;
    await getExpense();
  }
}

async function getExpense() {
  try {
    limit = document.getElementById('page-number').value;
    console.log(limit);
    const result = await axios.get(`/expense?userID=${userID}&page=${currentValue}&limit=${limit}`);
    console.log(result);
    const data = result.data.userList;
    items.innerHTML = '';
    data.forEach(element => {
      appendData(element.amount, element.description, element.category, element._id);
    });

    console.log(typeof (expenseLength), typeof (limit), expenseLength);
    // num.appendChild(document.createTextNode('1-' + Number(expenseLength) / Number(limit)) + 'of' + expenseLength)
    num.appendChild(document.createTextNode(Number(expenseLength) / Number(limit)))
  } catch (e) {
    console.log(e.message);
  }
}


// async function getExpense() {
//   try {
//     const result = await axios.get(`/expense?userID=${userID}&page=${currentValue}`);
//     const data = result.data.userList;
//     items.innerHTML = '';
//     data.forEach(element => {
//       appendData(element.amount, element.description, element.category, element._id);
//     });
//   } catch (e) {
//     console.log(e.message);
//   }
// }



// async function nextbtn() {
//   if (currentValue < link.length) {
//     for (const l of link) {
//       l.classList.remove('active');
//     }
//     currentValue++;
//     link[currentValue - 1].classList.add('active');

//     await getExpense();
//   }
// }

// async function backbtn() {
//   if (currentValue > 1) {
//     // for (const l of link) {
//     //   l.classList.remove('active');
//     // }
//     currentValue--;
//     // link[currentValue - 1].classList.add('active');

//     await getExpense();
//   }
// }