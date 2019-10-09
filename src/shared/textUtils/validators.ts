export function isValidEmail(value: string) {
  return value.length > 2 && value.includes("@");
}
