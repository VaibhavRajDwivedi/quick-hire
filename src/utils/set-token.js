export function setTokenWithExpiry(token, ttlInMs) {
  const item = {
    value: token,
    expiry: new Date().getTime() + ttlInMs,
  };
  localStorage.setItem('token', JSON.stringify(item));
}

export function getTokenWithExpiry() {
  const itemStr = localStorage.getItem('token');
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  if (new Date().getTime() > item.expiry) {
    localStorage.removeItem('token');
    return null;
  }
  return item.value;
}

export function clearToken() {
  localStorage.removeItem('token');
}
