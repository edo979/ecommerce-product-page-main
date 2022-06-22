const nextBtn = document.getElementById('lightbox-next'),
  prevBtn = document.getElementById('lightbox-prev'),
  modalNextBtn = document.getElementById('modal-next'),
  modalPrevBtn = document.getElementById('modal-prev'),
  modalCloseBtn = document.querySelector('.modal_close'),
  lightboxGalleryEl = document.querySelector('.lightbox-galery'),
  bigImg = document.getElementById('big-img'),
  modalEl = document.querySelector('.modal'),
  modalBigImg = document.getElementById('modal-big-img')

// Event listeners
nextBtn.addEventListener('click', (e) => {
  console.log('next')
})

prevBtn.addEventListener('click', (e) => {
  console.log('prev')
})

modalNextBtn.addEventListener('click', (e) => {
  console.log('next')
})

modalPrevBtn.addEventListener('click', (e) => {
  console.log('prev')
})

modalCloseBtn.addEventListener('click', (e) => {
  e.target.closest('.modal').classList.add('hide')
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
  }
})

lightboxGalleryEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('thumbnail')) {
    setImageSource(lightboxGalleryEl.querySelector('#big-img'), e.target)
  }
})

// Set source of big image based on thumbnail source
function setImageSource(imgEl, thumbnailEl) {
  imgEl.setAttribute(
    'src',
    thumbnailEl.getAttribute('src').slice(0, -14) + '.jpg'
  )
}
