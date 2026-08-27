export const formatMonthlyRent = (amount: number) =>
  `$${amount.toLocaleString("en-US")}/month`;

export const SITE_DESCRIPTION =
  "Quality affordable housing at Cassell Ridge Apartments in Knoxville, Tennessee. LIHTC community offering 2 & 3 bedroom apartments with modern amenities. Income limits and availability apply.";

export const getRentPriceRange = (
  floorPlans: Array<{ startingPrice: number; available?: boolean | null }>,
) => {
  const prices = floorPlans
    .filter((plan) => plan.available !== false)
    .map((plan) => plan.startingPrice);
  if (prices.length === 0) return undefined;
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  return lowest === highest
    ? `$${lowest.toLocaleString("en-US")}`
    : `$${lowest.toLocaleString("en-US")}-$${highest.toLocaleString("en-US")}`;
};