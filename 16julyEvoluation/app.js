// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYO4PbzjJgi4B9hr7G2nDMEYnGcw5TajU",
  authDomain: "pai-app-fdc41.firebaseapp.com",
  databaseURL: "https://pai-app-fdc41-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pai-app-fdc41",
  storageBucket: "pai-app-fdc41.firebasestorage.app",
  messagingSenderId: "246726802041",
  appId: "1:246726802041:web:bf1661d1fecf2340fa72a8",
  measurementId: "G-S5DG7Q9L7G"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const form = document.getElementById('itemForm');
const listEl = document.getElementById('list');
const toast = document.getElementById('undoToast');
let allItems = [];
let filter = 'All';

// Add Item
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const item = {
    name: form.name.value.trim(),
    qty: +form.qty.value,
    price: +form.price.value,
    category: form.category.value,
  };
  form.reset();
  form.name.focus();

  const ref = db.ref('items').push();
  const save = () => ref.set(item).catch(() => queueItem(item));
  navigator.onLine ? save() : queueItem(item);
});

function queueItem(item) {
  const pending = JSON.parse(localStorage.getItem('pending') || '[]');
  pending.push(item);
  localStorage.setItem('pending', JSON.stringify(pending));
}

window.addEventListener('online', () => {
  const pending = JSON.parse(localStorage.getItem('pending') || '[]');
  pending.forEach(item => db.ref('items').push(item).catch(() => {}));
  localStorage.removeItem('pending');
});

db.ref('items').on('value', (snapshot) => {
  allItems = [];
  listEl.innerHTML = '';
  snapshot.forEach(child => {
    const item = child.val();
    item.id = child.key;
    allItems.push(item);
  });
  renderItems();
});

function renderItems() {
  const items = filter === 'All' ? allItems : allItems.filter(i => i.category === filter);
  listEl.innerHTML = '';
  let totalQty = 0, totalCost = 0;
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `${item.name} × ${item.qty} — ₹${item.price * item.qty}
      <button onclick="deleteItem('${item.id}')">🗑️</button>`;
    listEl.appendChild(li);
    totalQty += item.qty;
    totalCost += item.qty * item.price;
  });
  document.getElementById('summary').textContent =
    `Total Items: ${totalQty} | Grand Total: ₹${totalCost.toFixed(2)}`;
}

function deleteItem(id) {
  const item = allItems.find(i => i.id === id);
  localStorage.setItem('lastDeleted', JSON.stringify({ id, item }));
  db.ref('items/' + id).remove();
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 5000);
}

function undoDelete() {
  const data = JSON.parse(localStorage.getItem('lastDeleted'));
  if (data) db.ref('items/' + data.id).set(data.item);
  toast.style.display = 'none';
}

function filterCategory(cat) {
  filter = cat;
  renderItems();
}
