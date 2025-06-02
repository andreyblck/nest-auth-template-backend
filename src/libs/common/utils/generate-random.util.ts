export function generateSixDigitNumberInRange(
  min: number = 100000,
  max: number = 999999
): number {
  // Перевіряємо чи числа дійсно шестизначні
  if (min < 100000 || max > 999999 || min > max) {
    throw new Error(
      'Некоректний діапазон. Мін і макс повинні бути шестизначними числами'
    )
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}
