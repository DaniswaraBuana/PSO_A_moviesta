/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Check if birthday is today
 */
export function isBirthdayToday(birthDate: string): boolean {
  const today = new Date();
  const birth = new Date(birthDate);

  return (
    birth.getMonth() === today.getMonth() &&
    birth.getDate() === today.getDate()
  );
}

/**
 * Format birth date
 */
export function formatBirthDate(birthDate: string): string {
  const birth = new Date(birthDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return birth.toLocaleDateString('id-ID', options);
}
