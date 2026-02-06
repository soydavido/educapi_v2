export function formatAmountNumber(amount: any): number {
  const num = Number(amount) || 0;
  return Number(num.toFixed(3));
}
