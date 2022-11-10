function checkRegNum(password: string) {
  return /\d/.test(password);
}

function checkRegLet(password: string) {
  return /[a-zA-Z]/.test(password);
}

export function verPassword(password: string) {
  if (checkRegNum(password) && checkRegLet(password)) return true;
}
