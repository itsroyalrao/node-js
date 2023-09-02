const userID = localStorage.getItem('userID');

const download = document.getElementById('download-button');

download.addEventListener('click', downloadExpense);

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

async function downloadExpense(e) {
  const url = await axios.put(`/expense/download?userID=${userID}`)

  const key = url.data.key;
  const userExpenses = await axios.get(`/expense/download?key=${key}`);

  downloadFile(userExpenses.data.url);
}

async function downloadFile(url) {
  try {
    const response = await fetch(url);

    const blob = await response.blob();
    const filename = 'userExpenses.txt';

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}