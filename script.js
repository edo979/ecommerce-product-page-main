const nextBtn = document.getElementById('lightbox-next'),
  prevBtn = document.getElementById('lightbox-prev'),
  modalNextBtn = document.getElementById('modal-next'),
  modalPrevBtn = document.getElementById('modal-prev'),
  modalCloseBtn = document.querySelector('.modal_close'),
  thumbnailImgs = document.querySelectorAll('.lightbox-galery_thumbnails img'),
  bigImg = document.getElementById('big-img')

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
  console.log('close')
})

thumbnailImgs.forEach((imgEl) => {
  imgEl.addEventListener('click', (e) => {
    bigImg.setAttribute(
      'src',
      e.target.getAttribute('src').slice(0, -14) + '.jpg'
    )
  })
})
