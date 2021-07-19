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

// Initial values
const init = () => {
  reset.setAttribute('disabled', 'true')
  totalAmount.textContent = '0.00€'
  tipAmount.textContent = '0.00€'
  billInput.value = ''
  peopleInput.value = ''
  customInput.value = ''
}

// Get the total and tip amount for each person
const getTotalAndTipAmount = (amount, event, custom = false) => {
  let amountPerPerson
  if (amount === totalAmount) {
    amountPerPerson = +billInput.value / +peopleInput.value
  }
  if (amount === tipAmount) {
    const tipPercentage = event && event.target.textContent.replace('%', '') / 100
    amountPerPerson = custom
      ? +customInput.value / +peopleInput.value
      : (+billInput.value * tipPercentage) / +peopleInput.value
  }

  amount.textContent = amountPerPerson.toFixed(2) + '€'
}

// Show error for invalid input
const showError = input => {
  input.classList.remove('hideError')
  input.classList.add('showError')
}

// Hide error for invalid input
const hideError = input => {
  input.classList.remove('showError')
  input.classList.add('hideError')
}

// Reset the class for each button
const buttonClassHandler = () => {
  tipButtons.forEach(btn => {
    btn.classList.remove('active')
    btn.classList.add('main__tip-btn')
  })
}

// Only numbers are accepted as values
const regexBill = /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/
const regexPeople = /^[1-9][0-9]*$/

// Check if the input is a number
const isValidNum = (input, regex) => input.match(regex)

// Check if all inputs are valid to continue
const formValidationHandler = () =>
  isValidNum(billInput.value, regexBill) && isValidNum(peopleInput.value, regexPeople)
    ? true
    : false

// Check each input field if is valid
const inputValidationHandler = () => {
  if (!isValidNum(billInput.value, regexBill)) showError(billRequiredMsg)
  if (!isValidNum(peopleInput.value, regexPeople)) showError(peopleRequiredMsg)

  if (isValidNum(billInput.value, regexBill)) hideError(billRequiredMsg)
  if (isValidNum(peopleInput.value, regexPeople)) hideError(peopleRequiredMsg)
}

// Calculation Handler
const tipCalculationHandler = event => {
  event.preventDefault()

  buttonClassHandler()
  inputValidationHandler()

  const isValid = formValidationHandler()

  if (isValid) {
    reset.removeAttribute('disabled')

    hideError(billRequiredMsg)
    hideError(peopleRequiredMsg)

    // Add class for the active button
    event.target.classList.remove('main__tip-btn')
    event.target.classList.add('active')

    getTotalAndTipAmount(totalAmount)
    getTotalAndTipAmount(tipAmount, event)
  }
}

const customCalculationHandler = event => {
  tipButtons.forEach(btn => btn.removeEventListener('click', tipCalculationHandler, true))

  inputValidationHandler()
  const isValid = formValidationHandler()

  if (event.key === 'Enter' && isValid) {
    event.preventDefault()
    reset.removeAttribute('disabled')
    buttonClassHandler()

    getTotalAndTipAmount(totalAmount)
    getTotalAndTipAmount(tipAmount, undefined, true)

    const getTipAmount = +customInput.value / +peopleInput.value
    tipAmount.textContent = getTipAmount.toFixed(2) + '€'
  }
}

// Buttons event listeners
tipButtons.forEach(btn => btn.addEventListener('click', tipCalculationHandler))
customInput.addEventListener('keypress', customCalculationHandler)

// Reset calculator
reset.addEventListener('click', event => {
  event.preventDefault()
  buttonClassHandler()
  init()
})
