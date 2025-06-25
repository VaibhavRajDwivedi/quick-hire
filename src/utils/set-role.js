export function setRoleWithExpiry(role, ttlInMs) {
  const item = {
    value: role,
    expiry: new Date().getTime() + ttlInMs,
  };
  localStorage.setItem('role', JSON.stringify(item));
}

export function getRoleWithExpiry() {
  const itemStr2 = localStorage.getItem('role');
  if (!itemStr2) return null;

  const item = JSON.parse(itemStr2);
  if (new Date().getTime() > item.expiry) {
    localStorage.removeItem('role');
    return null;
  }
  return item.value;
}
