// Navigation
const toggleEl = document.querySelector('.main-navigation_toggle'),
  navigationCloseBtn = document.querySelector('.main-navigation_list button'),
  navigationList = document.querySelector('.main-navigation_list')

toggleEl.addEventListener('click', (e) =>
  navigationList.classList.toggle('expanded')
)

navigationCloseBtn.addEventListener('click', (e) =>
  navigationList.classList.toggle('expanded')
)

// Cart
const cartEl = document.querySelector('.cart_btn-box'),
  cartBtn = document.getElementById('cart-panel'),
  cartListEl = document.querySelector('.cart_items')
cart = []

let id = -1

function getId() {
  id++
  return id
}

function addToCart(item) {
  cart.push(item)
  updateCart()
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id != id)
  updateCart()
}

function updateCart() {
  showCartNotification()

  // update cart
  let listItems = cart.map((item) => makeCartItem(item)).join('')

  cartListEl.innerHTML = listItems
}

function showCartNotification() {
  const itemCount = cart.reduce((sum, item) => sum + item.amount, 0)

  if (itemCount) {
    cartBtn.style.setProperty('--items-amount', `"${itemCount}"`)
  } else {
    // remove notification
    cartBtn.style.setProperty('--items-amount', none)
  }
}

// show hide panel
cartBtn.addEventListener('click', (e) =>
  e.target
    .closest('.cart')
    .querySelector('.cart_box')
    .classList.toggle('expanded')
)

function makeCartItem({ id, imgSrc, itemName, price, amount }) {
  price = parseFloat(price.replace('$', ''))

  return `
    <li class="cart_item flex">
      <div class="cart_item-img">
        <img src="${imgSrc}" alt="" />
      </div>

      <div class="cart_details">
        <p class="cart_item-name">${itemName}</p>
        <p class="char_item-price">
          <span>$${price}</span> x
          <span>${amount}</span>
          <span>$${price * amount}</span>
        </p>
      </div>

      <button class="btn btn-no-border" id="delete-item">
        <img src="images/icon-delete.svg" alt="" />
      </button>
    </li>
  `
}

// Add to chart
cartEl.addEventListener('click', (e) => {
  const textEl = cartEl.querySelector('span')
  let amount = +textEl.innerText

  if (e.target.closest('button').id == 'cart-add') {
    amount++
    textEl.innerText = amount
  } else if (e.target.closest('button').id == 'cart-sub') {
    amount--

    if (amount < 0) {
      amount = 0
    }

    textEl.innerText = amount
  } else if (e.target.closest('button').id == 'add-to-cart') {
    const itemName = e.target.closest('article').querySelector('h1').innerText,
      price = e.target.closest('article').querySelector('#price').innerText

    addToCart({ id: getId(), imgSrc: '', itemName, price, amount })
    textEl.innerText = 0
  }
})

// Lightbox
const nextBtn = document.getElementById('lightbox-next'),
  prevBtn = document.getElementById('lightbox-prev'),
  modalNextBtn = document.getElementById('modal-next'),
  modalPrevBtn = document.getElementById('modal-prev'),
  modalCloseBtn = document.querySelector('.modal_close'),
  lightboxGalleryEl = document.querySelector('.lightbox-galery'),
  bigImg = document.getElementById('big-img'),
  modalEl = document.querySelector('.modal'),
  modalBigImg = document.getElementById('modal-big-img')

let currentSlide = 1

// Event listeners
nextBtn.addEventListener('click', (e) => {
  nextImage(bigImg)
})

prevBtn.addEventListener('click', (e) => {
  prevImage(bigImg)
})

modalNextBtn.addEventListener('click', (e) => nextImage(modalBigImg))

modalPrevBtn.addEventListener('click', (e) => prevImage(modalBigImg))

modalCloseBtn.addEventListener('click', (e) => {
  e.target.closest('.modal').classList.add('hide')

  // set same image when leave lightbox
  currentSlide--
  nextImage(bigImg)
})

bigImg.addEventListener('click', (e) => {
  modalEl.classList.remove('hide')

  const currentImgSrc = e.target.getAttribute('src')

  modalEl.querySelector('.modal_big-img img').setAttribute('src', currentImgSrc)
})

// Listener for thumbnails

modalEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('thumbnail')) {
    setImageSource(modalEl.querySelector('#modal-big-img'), e.target)

    currentSlide = +e.target.dataset.index
  }
})

lightboxGalleryEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('thumbnail')) {
    setImageSource(lightboxGalleryEl.querySelector('#big-img'), e.target)

    currentSlide = +e.target.dataset.index
  }
})

// Set source of big image based on thumbnail source
function setImageSource(imgEl, thumbnailEl) {
  imgEl.setAttribute(
    'src',
    thumbnailEl.getAttribute('src').slice(0, -14) + '.jpg'
  )
}

// Slider
function nextImage(bigImgEl) {
  currentSlide++

  if (currentSlide > 4) {
    currentSlide = 1
  }

  bigImgEl.setAttribute('src', `images/image-product-${currentSlide}.jpg`)
}

function prevImage(bigImgEl) {
  currentSlide--

  if (currentSlide == 0) {
    currentSlide = 4
  }

  bigImgEl.setAttribute('src', `images/image-product-${currentSlide}.jpg`)
}
