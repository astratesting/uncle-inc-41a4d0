'use client';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score, label: 'Weak', color: '#EF4444' };
    if (score <= 2) return { score, label: 'Fair', color: '#F59E0B' };
    if (score <= 3) return { score, label: 'Good', color: '#4A90D9' };
    return { score, label: 'Strong', color: '#22C55E' };
  };

  if (!password) return null;

  const strength = getStrength(password);
  const percent = Math.min((strength.score / 5) * 100, 100);

  return (
    <div className="mt-2 animate-in fade-in duration-200">
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${percent}%`,
              backgroundColor: strength.color,
            }}
          />
        </div>
        <span
          className="text-xs font-medium"
          style={{ color: strength.color }}
        >
          {strength.label}
        </span>
      </div>
      {strength.score < 3 && (
        <p className="text-xs text-gray-500">
          {strength.score <= 1 && 'Add at least 8 characters with a mix of letters and numbers.'}
          {strength.score === 2 && 'Almost there — add a number or special character for extra security.'}
        </p>
      )}
    </div>
  );
}
