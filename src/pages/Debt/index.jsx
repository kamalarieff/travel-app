import React, { useState, useReducer } from "react";
import Container from "../../components/Container";
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
  console.log("TCL: reducer -> action", action);
  return produce(state, draft => {
    switch (action.type) {
      case "ADD_USER": {
        draft.users.byId[action.id] = {
          id: action.id
        };
        draft.users.allIds.push(action.id);
      }
      case "UPDATE_USER_NAME": {
        draft.users.byId[action.id].name = action.name;
      }
      case "UPDATE_USER_DEBT": {
        draft.users.byId[action.id].debt = action.debt;
      }
    }
  });
};

const UserForm = ({ id, dispatch }) => {
  const handleNameChange = e => {
    dispatch({ type: "UPDATE_USER_NAME", id, name: e.target.value });
  };

  const handleDebtChange = e => {
    dispatch({ type: "UPDATE_USER_DEBT", id, debt: e.target.value });
  };

  return (
    <>
      <div className="mr-1">
        <TextField label="Name" variant="filled" onChange={handleNameChange} />
      </div>
      <TextField label="Debt" variant="filled" onChange={handleDebtChange} />
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

  console.log("state", state);

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
            onChange={e => setItemvalue(e.target.value)}
          />
        </div>
        <div className="my-1">
          <Button variant="contained" color="primary" onClick={handleClick}>
            ADD USER
          </Button>
        </div>
        {allIds.map(userId => (
          <div key={userId} className="flex my-1">
            <UserForm id={userId} dispatch={dispatch} />
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        disabled={allIds.length < 2}
        onClick={handleCalculate}
      >
        CALCULATE
      </Button>
      {result &&
        result.map((item, index) => (
          <div key={index}>
            <p>Payee: {item.payee}</p>
            <p>Receiver: {item.receiver}</p>
            <p>Value: {item.value}</p>
          </div>
        ))}
    </Container>
  );
};

export default Debt;
