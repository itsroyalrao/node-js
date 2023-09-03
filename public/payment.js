const lb = document.getElementById('leaderboard');
const userId = localStorage.getItem('userID');

document.getElementById('rzp-button1').onclick = async function (e) {
  e.preventDefault();

  const response = await axios.get('/payment');
  const orderId = response.data.order.id;
  const amount = response.data.amount;

  var options = {
    "key": response.data.key_id,
    "amount": amount,
    "currency": "INR",
    "order_id": response,
    "handler": async function (response) {
      await axios.post('/payment', { status: 'success', paymentId: response.razorpay_payment_id, orderId });

      alert('Success - You are now a Premium user');
      localStorage.setItem(userId, true);
      premium();
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', async function (response) {
    await axios.post('/payment', { status: 'failed', orderId });
    alert('Something went wrong. Please try again!');
  });

  rzp1.open();
}

function premium() {
  const div = document.getElementById('premium');
  div.appendChild(document.createTextNode('You are now a Premium user : '));
  const btn = document.createElement('button');
  btn.id = 'premium-btn';
  btn.appendChild(document.createTextNode('Show Leaderboard'));
  btn.onclick = () => leaderboards();
  div.appendChild(btn);
}

async function leaderboards() {
  try {
    const result = await axios.get('/payment/leaderboard');
    const data = result.data.userData;

    const visibi = document.getElementById('visibi');
    visibi.style.display = "";
    lb.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      appendLeaderboard(i + 1, data[i].name, data[i].totalExpense);
    }
  } catch (error) {
    console.log(error);
  }
}

function appendLeaderboard(id, name, amount) {
  const trData = document.createElement('tr');

  const tdId = document.createElement('td');
  tdId.textContent = id;
  const tdName = document.createElement('td');
  tdName.textContent = name;
  const tdAmount = document.createElement('td');
  tdAmount.textContent = amount;

  trData.appendChild(tdId);
  trData.appendChild(tdName);
  trData.appendChild(tdAmount);

  lb.appendChild(trData);
}

if (userId) premium();



// function appendLeaderboard(id, name, amount) {
//   const table = document.createElement('table');
//   const thead = document.createElement('thead');
//   const tbody = document.createElement('tbody');
//   const tr = document.createElement('tr');
//   const thId = document.createElement('th');
//   thId.appendChild(document.createTextNode('Id'));
//   const thName = document.createElement('th');
//   thName.appendChild(document.createTextNode('Name'));
//   const thAmount = document.createElement('th');
//   thAmount.appendChild(document.createTextNode('Amount'));
//   tr.appendChild(thId);
//   tr.appendChild(thName);
//   tr.appendChild(thAmount);
//   thead.appendChild(tr);

//   const trData = document.createElement('tr');

//   const tdId = document.createElement('td');
//   tdId.textContent = id;
//   const tdName = document.createElement('td');
//   tdName.textContent = name;
//   const tdAmount = document.createElement('td');
//   tdAmount.textContent = amount;

//   trData.appendChild(tdId);
//   trData.appendChild(tdName);
//   trData.appendChild(tdAmount);

//   tbody.appendChild(trData);
//   table.appendChild(thead);
//   table.appendChild(tbody);

//   lb.appendChild(table);
// }