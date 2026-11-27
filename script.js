/* ---------- Product data ---------- */
const PRODUCTS = [
  {id:1, name:'Royal Chicken Dog Food 3kg', pet:'dog', cat:'Food', price:899, mrp:1199, rating:4.5, icon:'🍗'},
  {id:2, name:'Puppy Starter Milk Biscuits', pet:'dog', cat:'Food', price:249, mrp:349, rating:4.3, icon:'🍪'},
  {id:3, name:'Rubber Chew Bone Toy', pet:'dog', cat:'Toys', price:199, mrp:299, rating:4.1, icon:'🦴'},
  {id:4, name:'Adjustable Dog Collar & Leash', pet:'dog', cat:'Accessories', price:349, mrp:599, rating:4.4, icon:'🦮'},
  {id:5, name:'Anti-Tick Herbal Shampoo', pet:'dog', cat:'Grooming', price:279, mrp:399, rating:4.2, icon:'🧴'},
  {id:6, name:'Soft Orthopedic Dog Bed', pet:'dog', cat:'Accessories', price:1499, mrp:2299, rating:4.6, icon:'🛏️'},
  {id:7, name:'Tuna Delight Cat Food 1.2kg', pet:'cat', cat:'Food', price:549, mrp:749, rating:4.5, icon:'🐟'},
  {id:8, name:'Kitten Crunchy Treats', pet:'cat', cat:'Food', price:149, mrp:199, rating:4.2, icon:'🍘'},
  {id:9, name:'Feather Wand Teaser Toy', pet:'cat', cat:'Toys', price:129, mrp:249, rating:4.0, icon:'🪶'},
  {id:10, name:'Scratching Post with Ball', pet:'cat', cat:'Toys', price:799, mrp:1199, rating:4.4, icon:'🧶'},
  {id:11, name:'Clumping Cat Litter 5kg', pet:'cat', cat:'Grooming', price:399, mrp:549, rating:4.3, icon:'🪣'},
  {id:12, name:'Cozy Cat Cave Bed', pet:'cat', cat:'Accessories', price:999, mrp:1499, rating:4.6, icon:'🏠'}
];

/* ---------- Storage helpers (localStorage, safe) ---------- */
// Saves to localStorage AND window.name, so the cart still moves between
// pages when the browser does not share localStorage between local files.
function readName() {
  try { return JSON.parse(window.name) || {}; } catch (e) { return {}; }
}
const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      if (v !== null) return JSON.parse(v);
    } catch (e) {}
    const w = readName();
    return key in w ? w[key] : fallback;
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    const w = readName();
    w[key] = value;
    try { window.name = JSON.stringify(w); } catch (e) {}
  }
};
const getCart = () => store.get('lc_cart', {});
const saveCart = c => store.set('lc_cart', c);
const getUser = () => store.get('lc_user', null);
const cartCount = () => Object.values(getCart()).reduce((a, b) => a + b, 0);
const money = n => '₹' + n.toLocaleString('en-IN');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---------- Shared header / footer ---------- */
const page = document.body.dataset.page;

function renderHeader() {
  const user = getUser();
  document.getElementById('header').innerHTML = `
    <header class="top"><div class="wrap bar">
      <a class="logo" href="index.html">Love and Care<small>Everything for dogs &amp; cats</small></a>
      ${page === 'home'
        ? '<input id="search" class="search" type="search" placeholder="Search for food, toys, beds…">'
        : '<span class="grow"></span>'}
      <nav class="nav">
        ${user
          ? `<span>Hi, ${esc(user.name)}</span><button id="logout">Logout</button>`
          : '<a href="login.html">Login</a>'}
        <a class="cartlink" href="cart.html">Cart <b id="cartCount">${cartCount()}</b></a>
      </nav>
    </div></header>`;
  document.getElementById('footer').innerHTML =
    `<footer class="foot"><div class="wrap">© ${new Date().getFullYear()} Love and Care · Made with love for pets</div></footer>`;
  const lo = document.getElementById('logout');
  if (lo) lo.onclick = () => { store.set('lc_user', null); location.href = 'index.html'; };
}
renderHeader();

/* ---------- HOME PAGE ---------- */
function initHome() {
  const grid = document.getElementById('grid');
  const search = document.getElementById('search');
  const catSel = document.getElementById('cat');
  let pet = '';

  grid.innerHTML = PRODUCTS.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="pic">${p.icon}</div>
      <h3>${esc(p.name)}</h3>
      <span class="rate">${p.rating} ★</span>
      <div class="price">${money(p.price)} <s>${money(p.mrp)}</s>
        <em>${Math.round((1 - p.price / p.mrp) * 100)}% off</em></div>
      <button class="btn add">Add to cart</button>
    </article>`).join('');

  function filter() {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    grid.querySelectorAll('.card').forEach(card => {
      const p = PRODUCTS.find(x => x.id == card.dataset.id);
      const ok = p.name.toLowerCase().includes(q) &&
                 (!pet || p.pet === pet) && (!catSel.value || p.cat === catSel.value);
      card.hidden = !ok;
      if (ok) shown++;
    });
    document.getElementById('empty').hidden = shown > 0;
  }

  search.addEventListener('input', filter);
  catSel.addEventListener('change', filter);
  document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    pet = btn.dataset.pet;
    filter();
  }));

  grid.addEventListener('click', e => {
    if (!e.target.classList.contains('add')) return;
    const id = e.target.closest('.card').dataset.id;
    const cart = getCart();
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
    document.getElementById('cartCount').textContent = cartCount();
    toast('Added to cart');
  });
}

/* ---------- CART PAGE ---------- */
function initCart() {
  const area = document.getElementById('cartArea');
  const msg = document.getElementById('message');

  function draw() {
    const cart = getCart();
    const items = Object.keys(cart).map(id => {
      const p = PRODUCTS.find(x => x.id == id);
      return p && {...p, qty: cart[id]};
    }).filter(Boolean);
    document.getElementById('cartCount').textContent = cartCount();

    if (!items.length) {
      area.innerHTML = `<div class="emptybox"><div class="big">🛒</div>
        <p>Your cart is empty.</p><br><a class="btn" href="index.html">Shop for your pet</a></div>`;
      return;
    }
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    area.innerHTML = `
      <div class="cartgrid">
        <section class="list">${items.map(i => `
          <div class="row" data-id="${i.id}">
            <div class="pic sm">${i.icon}</div>
            <div class="info">
              <h3>${esc(i.name)}</h3>
              <div class="price">${money(i.price)} <s>${money(i.mrp)}</s></div>
              <div class="qty">
                <button data-act="dec" aria-label="Decrease">−</button>
                <span>${i.qty}</span>
                <button data-act="inc" aria-label="Increase">+</button>
                <button data-act="remove" class="link">Remove</button>
              </div>
            </div>
            <strong>${money(i.price * i.qty)}</strong>
          </div>`).join('')}
        </section>
        <aside class="summary">
          <h3>Price details</h3>
          <p><span>Items (${cartCount()})</span><span>${money(total)}</span></p>
          <p><span>Delivery</span><span class="green">Free</span></p>
          <p class="sum"><span>Total</span><span>${money(total)}</span></p>
          <label for="address">Delivery address</label>
          <textarea id="address" rows="3" placeholder="House no, street, city, pincode"></textarea>
          <button class="btn buy" id="place">Place order</button>
        </aside>
      </div>`;
  }

  area.addEventListener('click', e => {
    const act = e.target.dataset.act;
    if (act) {
      const id = e.target.closest('.row').dataset.id;
      const cart = getCart();
      if (act === 'inc') cart[id]++;
      if (act === 'dec' && --cart[id] <= 0) delete cart[id];
      if (act === 'remove') delete cart[id];
      saveCart(cart);
      return draw();
    }
    if (e.target.id === 'place') placeOrder();
  });

  function placeOrder() {
    const user = getUser();
    if (!user) { toast('Please login to place your order'); setTimeout(() => location.href = 'login.html?next=cart', 1000); return; }
    const address = document.getElementById('address').value.trim();
    if (address.length < 10) { msg.innerHTML = '<div class="note bad">Enter your full delivery address.</div>'; return; }
    const cart = getCart();
    const items = Object.keys(cart).map(id => ({id: +id, qty: cart[id], price: PRODUCTS.find(p => p.id == id).price}));
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const orders = store.get('lc_orders', []);
    const orderId = orders.length + 1001;
    orders.push({id: orderId, email: user.email, address, items, total, date: new Date().toISOString()});
    store.set('lc_orders', orders);
    saveCart({});
    msg.innerHTML = `<div class="note ok">Order #${orderId} placed. Thank you for caring for your pet!</div>`;
    draw();
  }
  draw();
}

/* ---------- LOGIN PAGE ---------- */
function initLogin() {
  let register = false;
  const $ = id => document.getElementById(id);
  const err = t => $('authError').innerHTML = t ? `<div class="note bad">${esc(t)}</div>` : '';

  function setMode(r) {
    register = r;
    $('authTitle').textContent = r ? 'Create your account' : 'Login';
    $('authBtn').textContent = r ? 'Sign up' : 'Login';
    $('nameRow').hidden = !r;
    $('switchText').textContent = r ? 'Already a member?' : 'New here?';
    $('switchLink').textContent = r ? 'Login' : 'Create an account';
    err('');
  }
  $('switchLink').onclick = e => { e.preventDefault(); setMode(!register); };

  $('authForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('email').value.trim().toLowerCase();
    const pass = $('password').value;
    const users = store.get('lc_users', []);
    if (!/^\S+@\S+\.\S+$/.test(email)) return err('Enter a valid email address.');

    if (register) {
      const name = $('name').value.trim();
      if (!name || pass.length < 6) return err('Enter your name and a password of at least 6 characters.');
      if (users.some(u => u.email === email)) return err('This email is already registered. Please log in.');
      users.push({name, email, pass});
      store.set('lc_users', users);
      store.set('lc_user', {name, email});
    } else {
      const u = users.find(u => u.email === email && u.pass === pass);
      if (!u) return err('Email or password is wrong.');
      store.set('lc_user', {name: u.name, email: u.email});
    }
    location.href = location.search.includes('next=cart') ? 'cart.html' : 'index.html';
  });
}

({home: initHome, cart: initCart, login: initLogin})[page]();
