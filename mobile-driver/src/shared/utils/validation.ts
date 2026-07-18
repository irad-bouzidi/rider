export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[\d\s-]{7,15}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  return phoneRegex.test(phone);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidOtp(otp: string): boolean {
  return /^\d{4,6}$/.test(otp);
}

export function isValidCardNumber(number: string): boolean {
  const cleaned = number.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
}

export function isValidCvc(cvc: string): boolean {
  return /^\d{3,4}$/.test(cvc);
}

export function isValidExpiry(month: number, year: number): boolean {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (month < 1 || month > 12) return false;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}
