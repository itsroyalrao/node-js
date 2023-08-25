var form = document.getElementById('product-form');
var itemList = document.getElementById('items');
var total = document.getElementById('total');

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);

const postData = async (itemName, itemPrice) => {
  try {
    const obj = {
      itemName,
      itemPrice,
    }
    const result = await axios.post('/products', obj);
    const totalValue = await getTotal();

    const newItemId = result.data.product._id;
    appendData(itemName, itemPrice, totalValue, newItemId);
  } catch (error) {
    console.log(error);
  }
}

const getData = async () => {
  try {
    var result = await axios.get(`/products`);
    itemList.innerHTML = '';

    const data = result.data.products;
    if (data.length !== 0) {
      const totalValue = await getTotal();
      for (let i = 0; i < data.length; i++) {
        appendData(data[i].itemName, data[i].itemPrice, totalValue, data[i]._id)
      }
    } else {
      total.innerHTML = '';
    }
  } catch (error) {
    console.log(error);
  }
}
getData();

const getTotal = async () => {
  try {
    const result = await axios.get(`/products`);
    const data = result.data.products;
    let totalValue = 0;
    for (let i = 0; i < data.length; i++) {
      totalValue += data[i].itemPrice;
    }
    return totalValue;
  } catch (error) {
    console.log(error);
  }
}

const deleteData = async (itemId) => {
  try {
    await axios.delete(`/products/${itemId}`)
    await getData();
  } catch (error) {
    console.log(error);
  }
}

function appendData(itemName, itemPrice, totalValue, newItemId) {
  var p = document.createElement('p');
  p.appendChild(document.createTextNode(itemName + ' - '));
  p.appendChild(document.createTextNode(itemPrice + ' '));

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-danger delete';
  deleteBtn.id = newItemId;
  deleteBtn.appendChild(document.createTextNode('Delete Product'));
  p.appendChild(deleteBtn);

  itemList.appendChild(p);

  total.innerHTML = '';
  total.appendChild(document.createTextNode(totalValue));
}

function addItem(e) {
  e.preventDefault();

  var itemName = document.getElementById('item').value;
  var itemPrice = document.getElementById('price').value;

  postData(itemName, itemPrice);

  form.reset();
}

function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    var p = e.target.parentElement;
    var itemId = e.target.id;
    itemList.removeChild(p);
    deleteData(itemId);
  }
}