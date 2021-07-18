// Inputs
const billInput = document.getElementById('bill-input')
const peopleInput = document.getElementById('people-input')
const customInput = document.getElementById('custom-input')

// Tip Amount and Total fields
const tipAmount = document.getElementById('tip-amount')
const totalAmount = document.getElementById('total-amount')

//Buttons
const reset = document.getElementById('reset-btn')
const tipButtons = document.querySelectorAll('.btn')

//Input Messages
const billRequiredMsg = document.getElementById('msg-bill')
const peopleRequiredMsg = document.getElementById('msg-people')

const showError = input => {
  input.classList.remove('hideError')
  input.classList.add('showError')
}

const hideError = () => {
  billRequiredMsg.classList.remove('showError')
  billRequiredMsg.classList.add('hideError')
  peopleRequiredMsg.classList.remove('showError')
  peopleRequiredMsg.classList.add('hideError')
}

tipButtons.forEach(btn =>
  btn.addEventListener('click', event => {
    if (
      billInput.value === '' ||
      billInput.value <= '0' ||
      peopleInput.value === '' ||
      peopleInput.value <= '0'
    ) {
      showError(billRequiredMsg)
      showError(peopleRequiredMsg)
      return
    }
    hideError()
  })
)
