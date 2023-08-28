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
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', async function (response) {
    await axios.post('/payment', { status: 'failed', orderId });
    alert('Something went wrong. Please try again!');
  });

  rzp1.open();
}