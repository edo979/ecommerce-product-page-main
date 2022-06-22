const nextBtn = document.getElementById('lightbox-next'),
  prevBtn = document.getElementById('lightbox-prev'),
  thumbnailImgs = document.querySelectorAll('.lightbox-galery_thumbnails img'),
  bigImg = document.getElementById('big-img')

// Event listeners
nextBtn.addEventListener('click', (e) => {
  console.log('next')
})

prevBtn.addEventListener('click', (e) => {
  console.log('prev')
})

thumbnailImgs.forEach((imgEl) => {
  imgEl.addEventListener('click', (e) => {
    bigImg.setAttribute(
      'src',
      e.target.getAttribute('src').slice(0, -14) + '.jpg'
    )
  })
})
