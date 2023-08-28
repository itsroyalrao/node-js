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
  div.appendChild(document.createTextNode('You are now a Premium user '));
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
    for (let i = 0; i < data.length; i++) {
      leaderboard(data[i].id, data[i].name, data[i].amount);
    }
  } catch (error) {
    console.log(error);
  }
}

function leaderboard(id, name, amount) {
  const ul = document.getElementById('leaderboard');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(id + ' - ' + name + " - " + amount));
  ul.appendChild(li);
}

const bool = localStorage.getItem(userId);
if (bool) premium();