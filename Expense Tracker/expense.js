const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addExpenseButton = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");
const totalAmountElement = document.getElementById("totalAmount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.description}: $${expense.amount}
      <button onclick="removeExpense(${index})">Remove</button>
    `;
    expenseList.appendChild(li);
  });

  totalAmountElement.textContent = total.toFixed(2);
}

function addExpense() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description && !isNaN(amount)) {
    expenses.push({ description, amount });
    saveExpenses();
    renderExpenses();
    descriptionInput.value = "";
    amountInput.value = "";
  }
}

function removeExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

addExpenseButton.addEventListener("click", addExpense);
renderExpenses();
