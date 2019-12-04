const calculateDebt = ({ value, users }) => {
  const perPerson = value / users.length;
  console.log("TCL: calculateDebt -> perPerson", perPerson);

  const newUsers = users.map(({ name, price }) => {
    return {
      name,
      remaining: price - perPerson
    };
  });
  console.log("TCL: calculateDebt -> newUsers", newUsers);

  const hasToPay = newUsers.filter(({ remaining }) => remaining < 0);
  console.log("TCL: hasToPay", hasToPay);
  const hasToGet = newUsers.filter(({ remaining }) => remaining > 0);
  console.log("TCL: hasToGet", hasToGet);

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
