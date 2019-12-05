import calculate from "../../src/pages/Debt/utils";

describe("Unit Test Application Code", () => {
  context("Debt calculator", () => {
    it("can add numbers", () => {
      const value = 30;
      const users = [
        {
          name: "kamal",
          price: 30
        },
        {
          name: "arieff",
          price: 0
        }
      ];
      expect(calculate({ value, users })).to.deep.eq([
        {
          payee: "arieff",
          receiver: "kamal",
          value: 15
        }
      ]);
    });

    it("can add numbers2", () => {
      const value = 60;
      const users = [
        {
          name: "bakar",
          price: 0
        },
        {
          name: "jimmy",
          price: 30
        },
        {
          name: "kamal",
          price: 10
        },
        {
          name: "megat",
          price: 20
        }
      ];
      expect(calculate({ value, users })).to.deep.eq([
        {
          payee: "bakar",
          receiver: "jimmy",
          value: 15
        },
        {
          payee: "kamal",
          receiver: "megat",
          value: 5
        }
      ]);
    });
  });
});
