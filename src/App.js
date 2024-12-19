import React, { useState } from "react";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

// Utility to format numbers with fixed decimal precision
const toFixedDecimal = (num, precision = 10) => {
  return parseFloat(num.toFixed(precision));
};

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      const newNum = calc.num === 0 && value === "0" ? "0" : calc.num + value;
      setCalc({
        ...calc,
        num:
          removeSpaces(newNum) % 1 === 0
            ? toLocaleString(Number(removeSpaces(newNum)))
            : toLocaleString(toFixedDecimal(Number(newNum), 10)),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const periodClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        let result;
        if (sign === "+") {
          result = a + b;
        } else if (sign === "-") {
          result = a - b;
        } else if (sign === "X") {
          result = a * b;
        } else if (sign === "/") {
          result = b !== 0 ? a / b : "Can't divide by 0";
        }
        return toFixedDecimal(result, 10);
      };

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide by 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(toFixedDecimal(removeSpaces(calc.num) * -1)) : 0,
      res: calc.res ? toLocaleString(toFixedDecimal(removeSpaces(calc.res) * -1)) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc,
      num: toFixedDecimal(num / 100),
      res: toFixedDecimal(res / 100),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? periodClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
