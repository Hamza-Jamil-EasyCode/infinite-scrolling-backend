export const generateRandomNumber = (length: number): number => {
  const secret = '0123456789';
  var result = '';

  for (var i = length; i > 0; --i)
    result += secret[Math.round(Math.random() * (secret.length - 1))];

  return Number(result);
};
