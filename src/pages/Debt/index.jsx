import React, { useState, useReducer } from "react";
import Container from "../../components/Container";
import { ResultTable, ResultRow } from "./result";
import calculate from "./utils";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import produce from "immer";
import * as R from "ramda";

const initialState = {
  users: {
    byId: {},
    allIds: []
  }
};

const reducer = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case "ADD_USER": {
        draft.users.byId[action.id] = {
          id: action.id,
          name: "",
          debt: 0
        };
        draft.users.allIds.push(action.id);
        break;
      }
      case "UPDATE_USER_NAME": {
        draft.users.byId[action.id].name = action.name;
        break;
      }
      case "UPDATE_USER_DEBT": {
        draft.users.byId[action.id].debt = action.debt;
        break;
      }
      default: {
        break;
      }
    }
  });
};

const UserForm = ({ id, dispatch, name, debt }) => {
  const handleNameChange = e => {
    dispatch({ type: "UPDATE_USER_NAME", id, name: e.target.value });
  };

  const handleDebtChange = e => {
    dispatch({
      type: "UPDATE_USER_DEBT",
      id,
      debt: parseInt(e.target.value) || 0
    });
  };

  return (
    <>
      <div className="mr-1">
        <TextField
          label="Name"
          variant="filled"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      <TextField
        label="Debt"
        variant="filled"
        onChange={handleDebtChange}
        value={debt}
      />
    </>
  );
};

const Debt = () => {
  const [itemValue, setItemvalue] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [result, showResult] = useState(null);

  const {
    users: { allIds, byId }
  } = state;

  const lastId = R.defaultTo(0, R.last(allIds));

  console.log("state", state.users.byId);

  const handleClick = () => {
    dispatch({ type: "ADD_USER", id: lastId + 1 });
  };

  const handleCalculate = () => {
    const res = allIds.map(id => {
      return {
        name: byId[id].name,
        price: byId[id].debt
      };
    });

    const res1 = calculate({ value: itemValue, users: res });
    showResult(res1);
  };

  const lessThan2 = R.pipe(R.length, R.lt(R.__, 2));

  const itemValueEqualToTotal = R.curry((total, ids) =>
    R.pipe(
      R.map(id => byId[id].debt),
      R.sum,
      R.equals(total)
    )(ids)
  );

  const isDisabled =
    lessThan2(allIds) || !itemValueEqualToTotal(itemValue, allIds);

  return (
    <Container>
      <div className="flex flex-col">
        <div className="my-1">
          <TextField label="Item" variant="filled" />
        </div>
        <div className="my-1">
          <TextField
            label="Value"
            variant="filled"
            value={itemValue}
            onChange={e => setItemvalue(parseInt(e.target.value))}
          />
        </div>
        <div className="my-1">
          <Button variant="contained" color="primary" onClick={handleClick}>
            ADD USER
          </Button>
        </div>
        {allIds.map(userId => {
          console.log("TCL: Debt -> byId[userId]", byId[userId]);
          return (
            <div key={userId} className="flex my-1">
              <UserForm
                id={userId}
                dispatch={dispatch}
                name={byId[userId].name}
                debt={byId[userId].debt}
              />
            </div>
          );
        })}
      </div>
      <Button
        variant="contained"
        color="primary"
        disabled={isDisabled}
        onClick={handleCalculate}
      >
        CALCULATE
      </Button>
      {result && (
        <ResultTable>
          {result.map((item, index) => (
            <ResultRow
              key={index}
              payee={item.payee}
              receiver={item.receiver}
              value={item.value}
            />
          ))}
        </ResultTable>
      )}
    </Container>
  );
};

export default Debt;
