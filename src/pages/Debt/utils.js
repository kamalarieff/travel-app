const calculateDebt = ({ value, users }) => {
  const perPerson = value / users.length;

  const newUsers = users.map(({ name, price }) => {
    return {
      name,
      remaining: price - perPerson
    };
  });

  const hasToPay = newUsers.filter(({ remaining }) => remaining < 0);
  const hasToGet = newUsers.filter(({ remaining }) => remaining > 0);

  let i = 0,
    j = 0,
    res = [];

  while (i < hasToPay.length && j < hasToGet.length) {
    const tempX = hasToPay[i];
    const tempY = hasToGet[j];

    const remaining = tempY.remaining + tempX.remaining;

    if (remaining == 0) {
      res.push({
        payee: tempX.name,
        receiver: tempY.name,
        value: Math.abs(tempX.remaining)
      });
      i++;
      j++;
    } else if (remaining < 0) {
      res.push({
        payee: tempX.name,
        receiver: tempY.name,
        value: Math.abs(tempY.remaining)
      });
      j++;
      hasToPay[i].remaining = remaining;
    } else {
      res.push({
        payee: tempX.name,
        receiver: tempY.name,
        value: Math.abs(tempX.remaining)
      });
      i++;
      hasToGet[j].remaining = remaining;
    }
  }

  return res;
};

export default calculateDebt;
