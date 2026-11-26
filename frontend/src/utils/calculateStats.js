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

/* Spending Summary*/
export function getSpendingSummary(allExpense = []) {
  let todayTotal = 0;
  let weekTotal = 0;
  let monthTotal = 0;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // +1 because JS months are 0-11
  const currentDay = now.getDate();

  // Rewind to Sunday at midnight (00:00:00)
  const startOfWeek = new Date(currentYear, now.getMonth(), currentDay - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  allExpense.forEach((item) => {
    if (!item.date) return;

    const cleanDate = item.date.split("T")[0]; // Grabs "2026-11-24"
    const parts = cleanDate.split("-");        // ["2026", "11", "24"]
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    const amount = Number(item.amount) || 0;

    // 1. Check This Month & Today
    if (year === currentYear && month === currentMonth) {
      monthTotal += amount;

      if (day === currentDay) {
        todayTotal += amount;
      }
    }

    // 2. Check This Week (from Sunday midnight up to right now)
    const expenseDate = new Date(year, month - 1, day);
    if (expenseDate >= startOfWeek && expenseDate <= now) {
      weekTotal += amount;
    }
  });

  return { todayTotal, weekTotal, monthTotal };
}

