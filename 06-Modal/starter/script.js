'use strict';

let modal = document.querySelector('.modal')
let overlay = document.querySelector('.overlay')
let closeBtn = document.querySelector('.close-modal')
let elements = [closeBtn, overlay]

document.querySelectorAll('.show-modal').forEach(modalBtn => {
  modalBtn.addEventListener('click', function revealModal() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')

  })
})

function hideModal() {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

elements.forEach(element =>
  element.addEventListener('click', function () {
    hideModal()
  }
  )
)

document.addEventListener('keydown', function (e) {
  console.log(e.key)
  if (e.key === 'Escape') {
    hideModal()
  }
})
