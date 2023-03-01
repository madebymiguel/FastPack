export default function convertWeight(
  weight: number,
  weightUnit: string,
  targetUnit: string
) {
  // Convert to grams as a base unit
  let grams;
  switch (weightUnit) {
    case "g":
      grams = weight;
      break;
    case "kg":
      grams = weight * 1000;
      break;
    case "lb":
      grams = weight * 453.592;
      break;
    case "oz":
      grams = weight * 28.3495;
      break;
    default:
      throw new Error("Invalid weight unit: " + weightUnit);
  }

  // Convert from grams to the target unit
  switch (targetUnit) {
    case "g":
      return grams;
    case "kg":
      return grams / 1000;
    case "lb":
      return grams / 453.592;
    case "oz":
      return grams / 28.3495;
    default:
      throw new Error("Invalid target unit: " + targetUnit);
  }
}
