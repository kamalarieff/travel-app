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
      case "DELETE_USER": {
        delete draft.users.byId[action.id];
        draft.users.allIds = R.reject(R.equals(action.id), state.users.allIds);
        break;
      }
      case "CLEAR_ALL": {
        draft.users.byId = {};
        draft.users.allIds = [];
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

  const handleDelete = () => {
    dispatch({ type: "DELETE_USER", id });
  };

  return (
    <div className="flex userform">
      <div className="mr-1">
        <TextField
          data-testid="username"
          label="Name"
          variant="filled"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      <div className="mr-1">
        <TextField
          data-testid="debt"
          label="Debt"
          variant="filled"
          onChange={handleDebtChange}
          value={debt}
        />
      </div>
      <Button
        data-testid={`delete-user-${id}`}
        variant="contained"
        color="primary"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
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

  const handleClear = () => {
    dispatch({ type: "CLEAR_ALL" });
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
      <div className="flex flex-col max-w-xs justify-center items-center mx-auto">
        <div className="my-1">
          <TextField label="Item" variant="filled" id="item" />
        </div>
        <div className="my-1">
          <TextField
            id="item-value"
            label="Value"
            variant="filled"
            type="number"
            value={itemValue}
            error={isNaN(itemValue)}
            onChange={e => setItemvalue(parseInt(e.target.value))}
          />
        </div>
        <div className="flex justify-around my-1 w-5/6">
          <Button
            id="add-user"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            ADD USER
          </Button>
          <Button
            id="clear"
            variant="contained"
            color="primary"
            onClick={handleClear}
          >
            CLEAR
          </Button>
        </div>
        {allIds.map(userId => {
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
        <div className="my-1">
          <Button
            id="calculate"
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={handleCalculate}
          >
            CALCULATE
          </Button>
        </div>

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
      </div>
    </Container>
  );
};

export default Debt;
