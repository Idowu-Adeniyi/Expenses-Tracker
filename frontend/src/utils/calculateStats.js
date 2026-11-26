/* Get total expense*/
export function getTotalExpenses(allExpense = []) {
  return allExpense.reduce((accumulator, item) => {
    const amount = Number(item.amount) || 0;
    return accumulator + amount;
  }, 0);
}

/* Get top category*/
export function getTopSpendingCategory(allExpense = []){
//creating the empty object before i loop
  const totals = {};
//looping through and fill the object
  allExpense.forEach((catItem) => {
  const category = catItem.category;
  const amount = Number(catItem.amount);

  // if the category is not in the totals yet, start with 0, add then add the amount
  totals[category] = (totals[category] || 0) + amount;
  })
   //find which category has the highest number
   let topCategory = "No Spending Yet!";
   let highestAmount = 0;

   for(const [category, total] of Object.entries(totals)) {
    if (total > highestAmount){
      highestAmount = total;
      topCategory = category;
    }
   }
   return {topCategory, highestAmount};
}

