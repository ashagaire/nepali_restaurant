// lib/auth/otp.ts
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
}

export function getOtpExpiry(minutes = 10): Date {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
