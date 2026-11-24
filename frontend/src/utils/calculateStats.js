export function getTotalExpenses(allExpense = []) {
  return allExpense.reduce((accumulator, item) => {
    const amount = Number(item.amount) || 0;
    return accumulator + amount;
  }, 0);
}
