// Navigation
const toggleEl = document.querySelector('.main-navigation_toggle'),
  navigationCloseBtn = document.querySelector('.main-navigation_list button'),
  navigationEl = document.querySelector('.main-navigation')

toggleEl.addEventListener('click', (e) =>
  navigationEl.classList.toggle('expanded')
)

navigationCloseBtn.addEventListener('click', (e) =>
  navigationEl.classList.toggle('expanded')
)

// Cart
const cartEl = document.querySelector('.cart_btn-box'),
  cartBtn = document.getElementById('cart-panel'),
  cartListEl = document.querySelector('.cart_items'),
  cartBoxEl = document.querySelector('.cart_box')
cart = []

let id = -1

function getId() {
  id++
  return id
}

function getImageSource() {
  return './images/image-product-1-thumbnail.jpg'
}

function addToCart(item) {
  cart.push(item)
  updateCart()
}

function makeCartItem({ id, imgSrc, itemName, price, amount }) {
  price = parseFloat(price.replace('$', ''))
  itemName = itemName.substring(0, 20) + '...'

  return `
    <li class="cart_item flex">
      <div class="cart_item-img">
        <img src="${imgSrc}" alt="" />
      </div>

      <div class="cart_details">
        <p class="cart_item-name">${itemName}</p>
        <p class="cart_item-price">
          <span>${numberToCurrency(price)}</span> x
          <span>${amount}</span>
          <span>${numberToCurrency(price * amount)}</span>
        </p>
      </div>

      <button class="btn btn-no-border" id="delete-item" onclick="removeFromCart(${id})">
        <img src="images/icon-delete.svg" alt="" />
      </button>
    </li>
  `
}

function numberToCurrency(num) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(num)
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
    cartBoxEl.classList.remove('empty')
  } else {
    // remove notification
    cartBtn.style.setProperty('--items-amount', 'none')
    // empty cart message
    cartBoxEl.classList.add('empty')
  }
}

// show hide panel
cartBtn.addEventListener('click', (e) =>
  e.target
    .closest('.cart')
    .querySelector('.cart_box')
    .classList.toggle('expanded')
)

// Add to chart buttons
cartEl.addEventListener('click', (e) => {
  e.stopPropagation()

  if (e.target.nodeName == 'DIV') {
    return
  }

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
    // get data fom DOM and create item object
    if (amount == 0) {
      return
    }

    const itemName = e.target.closest('article').querySelector('h1').innerText,
      price = e.target.closest('article').querySelector('#price').innerText

    addToCart({
      id: getId(),
      imgSrc: getImageSource(),
      itemName,
      price,
      amount,
    })

    textEl.innerText = 0
  }
})

// Lightbox
const nextBtn = document.getElementById('lightbox-next'),
  prevBtn = document.getElementById('lightbox-prev'),
  modalNextBtn = document.getElementById('modal-next'),
  modalPrevBtn = document.getElementById('modal-prev'),
  modalCloseBtn = document.querySelector('.modal_close'),
  lightboxGalleryEl = document.querySelector('.lightbox-gallery'),
  bigImg = document.getElementById('big-img'),
  modalEl = document.querySelector('.modal'),
  modalBigImg = document.getElementById('modal-big-img'),
  thumbnailsEls = document.querySelectorAll('.thumbnail')

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

    setActiveImgClass(e.target)
  }
})

lightboxGalleryEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('thumbnail')) {
    setImageSource(lightboxGalleryEl.querySelector('#big-img'), e.target)

    currentSlide = +e.target.dataset.index

    setActiveImgClass(e.target)
  }
})

function setActiveImgClass(el) {
  thumbnailsEls.forEach((thumbEl, index) => {
    thumbEl.parentElement.classList.remove('active-img')
  })

  thumbnailsEls.forEach((thumbEl, index) => {
    if (thumbEl === el) {
      thumbEl.parentElement.classList.add('active-img')
      if (index > 3) {
        thumbnailsEls[index % 4].parentElement.classList.add('active-img')
      } else {
        thumbnailsEls[index + 4].parentElement.classList.add('active-img')
      }
    }
  })
}

// Set source of big image based on thumbnail source
function setImageSource(imgEl, thumbnailEl) {
  imgEl.setAttribute(
    'src',
    thumbnailEl.getAttribute('src').slice(0, -14) + '.jpg'
  )
}

// Slider
// also make change in lightbox galery active slide and big img
function nextImage(bigImgEl) {
  currentSlide++

  if (currentSlide > 4) {
    currentSlide = 1
  }

  bigImgEl.setAttribute('src', `images/image-product-${currentSlide}.jpg`)

  setActiveImgClass(thumbnailsEls[currentSlide - 1])
}

function prevImage(bigImgEl) {
  currentSlide--

  if (currentSlide == 0) {
    currentSlide = 4
  }

  bigImgEl.setAttribute('src', `images/image-product-${currentSlide}.jpg`)

  setActiveImgClass(thumbnailsEls[currentSlide - 1])
}
