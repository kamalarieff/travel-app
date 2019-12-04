const value = 60;

const users = [
  {
    name: "Kamal",
    price: 15
  },
  {
    name: "Megat",
    price: 15
  },
  {
    name: "Jimmy",
    price: 30
  },
  {
    name: "Bakar",
    price: 0
  }
];

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
    res.push(
      `${tempX.name} pays RM ${Math.abs(tempX.remaining)} to ${tempY.name} `
    );
    i++;
    j++;
  } else if (remaining < 0) {
    res.push(
      `${tempX.name} pays RM ${Math.abs(tempY.remaining)} to ${tempY.name} `
    );
    j++;
    hasToPay[i].remaining = remaining;
  } else {
    res.push(
      `${tempX.name} pays RM ${Math.abs(tempX.remaining)} to ${tempY.name} `
    );
    i++;
    hasToGet[j].remaining = remaining;
  }
}

console.log("res", res);
