import React, { useEffect, useState } from "react";
import styles from "./Calculator.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import getStarted from "../images/Frame.png";

const Calculator = () => {
  const [selectedYear, setSelectedYear] = useState("FY 2023-24");
  const [selectedCountry, setSelectedCountry] = useState("Australia");
  const [selectedIncome, setSelectedIncome] = useState("$45,001 - $120,000");
  const [taxRate, setTaxRate] = useState(
    "$5,092 + 32.5% of the excess over $45,000"
  );
  const [capitalGains, setCapitalGains] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(19);
  const [activeInvestment, setActiveInvestment] = useState(1);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleIncomeSelect = (income) => {
    setSelectedIncome(income);

    switch (income) {
      case "$0 - $18,200":
        setTaxRate("0%");
        setTax(0);
        break;
      case "$18,201 - $45,000":
        setTaxRate("Nil + 19% of the excess over $18,200");
        setTax(19);
        break;
      case "$45,001 - $120,000":
        setTaxRate("$5,092 + 32.5% of the excess over $45,000");
        setTax(32.5);
        break;
      case "$120,001 - $180,000":
        setTaxRate("$29,467 + 37% of the excess over $45,000");
        setTax(37);

        break;
      case "$180,001+":
        setTaxRate("$51,667 + 45% of the excess over $180,000");
        setTax(45);
        break;
      default:
        setTaxRate(0);
        setTax(0);
    }
  };

  const handleSalePriceChange = (event) => {
    const salePrice = parseFloat(event.target.value);
    setSalePrice(event.target.value);
    updateCapitalGains(salePrice);
  };

  const handlePurchasePriceChange = (event) => {
    const purchasePrice = parseFloat(event.target.value);
    console.log("price", purchasePrice);
    setPurchasePrice(event.target.value);
    updateCapitalGains(undefined, purchasePrice);
  };

  const handleExpensesChange = (event) => {
    const expenses = parseFloat(event.target.value);
    setExpenses(event.target.value);
    updateCapitalGains(undefined, undefined, expenses);
  };
  const updateCapitalGains = (newSalePrice, newPurchasePrice, newExpenses) => {
    const salePriceValue =
      newSalePrice !== undefined ? newSalePrice : parseFloat(salePrice);
    const purchasePriceValue =
      newPurchasePrice !== undefined
        ? newPurchasePrice
        : parseFloat(purchasePrice);
    const expensesValue =
      newExpenses !== undefined ? newExpenses : parseFloat(expenses);

    if (salePriceValue >= 0 && purchasePriceValue >= 0 && expensesValue >= 0) {
      const newCapitalGains =
        salePriceValue - purchasePriceValue - expensesValue;

      if (newCapitalGains > 0) {
        setCapitalGains(newCapitalGains);
        setDiscount(newCapitalGains / 2);
      } else {
        setCapitalGains(newCapitalGains);
        setDiscount(0);
      }
    } else {
      setCapitalGains(0);
      setDiscount(0);
    }
  };

  useEffect(() => {}, [activeInvestment]);
  const handleInvestment = (value) => {
    setActiveInvestment(value);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainWrapper}>
        <h2>Free Crypto Tax Calculator Australia</h2>
        <div className={styles.yearCountry}>
          <div className={styles.financialYear}>
            <div className={styles.yearText}>
              <span
                style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
              >
                Financial Year
              </span>
            </div>
            <div className={styles.yearItem}>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant="none"
                  size="100"
                  className={styles.dropdownIncome}
                  style={{ width: "100%" }}
                >
                  {selectedYear}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleYearSelect("FY 2023-24")}
                    style={{ border: "none", outline: "none" }}
                  >
                    FY 2023-24
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className={styles.country}>
            <div className={styles.countryText}>
              <span
                style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
              >
                Country
              </span>
            </div>
            <div className={styles.countryItem}>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant="none"
                  size="100"
                  className={styles.dropdownIncome}
                  style={{ width: "100%" }}
                >
                  {selectedCountry}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleCountrySelect("Australia")}
                  >
                    Australia
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className={styles.salePurchaseContainer}>
          <div className={styles.purchaseContainer}>
            <div
              style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
            >
              Enter purchase price of Crypto
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.dollar}>$</span>
              <input
                onChange={handlePurchasePriceChange}
                value={purchasePrice}
                type="text"
              />
            </div>
          </div>
          <div className={styles.salePriceContainer}>
            <div
              style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
            >
              Enter sale price of Crypto
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.dollar}>$</span>
              <input
                onChange={handleSalePriceChange}
                value={salePrice}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className={styles.expensesInvestmentContainer}>
          <div className={styles.expensesContainer}>
            <div
              style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
            >
              Enter your Expenses
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.dollar}>$</span>
              <input
                onChange={handleExpensesChange}
                value={expenses}
                type="text"
              />
            </div>
          </div>
          <div className={styles.investmentContainer}>
            <div
              style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
            >
              Investment Type
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "100%" }}>
                <div
                  className={
                    activeInvestment === 0
                      ? styles.investmentActive
                      : styles.investment
                  }
                  onClick={() => handleInvestment(0)}
                >
                  {activeInvestment === 0 ? <span> ✓</span> : ""}
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div
                  className={
                    activeInvestment === 1
                      ? styles.investmentActive
                      : styles.investment
                  }
                  onClick={() => handleInvestment(1)}
                >
                  {activeInvestment === 1 ? <span> ✓</span> : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.monthContainer}>
          <div className={styles.monthItems}>
            <div>{"<"}12 months</div>
            <div>{">"}12 months</div>
          </div>
        </div>

        <div className={styles.incomeTaxRateContainer}>
          <div className={styles.incomeContainer}>
            <div
              style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
            >
              Select Your Annual Income
            </div>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                variant="none"
                size="100"
                className={styles.dropdownIncome}
                style={{ width: "100%" }}
              >
                {selectedIncome}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleIncomeSelect("$0 - $18,200")}
                >
                  $0 - $18,200
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleIncomeSelect("$18,201 - $45,000")}
                >
                  $18,201 - $45,000
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleIncomeSelect("$45,001 - $120,000")}
                >
                  $45,001 - $120,000
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleIncomeSelect("$120,001 - $180,000")}
                >
                  $120,001 - $180,000
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleIncomeSelect("$180,001+")}>
                  $180,001+
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className={styles.taxRateContainer}>
            <div
              style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
            >
              Tax Rate
            </div>
            <input
              style={{}}
              value={`${taxRate}`}
              readOnly
              className={styles.taxInput}
            />
          </div>
        </div>

        {activeInvestment === 1 ? (
          <div className={styles.capitalGainLongTermGainContainer}>
            <div className={styles.capitalGainContainer}>
              <div
                style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
              >
                Capital gains amount
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.dollar}>$</span>
                <input value={capitalGains} readOnly type="text" />
              </div>
            </div>
            <div className={styles.longTermGainContainer}>
              <div
                style={{ fontSize: "16px", fontWeight: "400", color: "black" }}
              >
                Discount for long term gains
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.dollar}>$</span>
                <input type="text" value={discount} />
              </div>
            </div>
          </div>
        ) : null}

        <div className={styles.taxContainer}>
          <div className={styles.capitalTaxContainer}>
            <span>Net Capital gains tax amount</span>
            <h3
              style={{
                color: "#0fba83",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              ${" "}
              {activeInvestment === 1 ? capitalGains - discount : capitalGains}
            </h3>
          </div>
          <div className={styles.taxPayContainer}>
            <span>The tax you need to pay*</span>
            <h3
              style={{
                color: "#0141CF",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              $
              {activeInvestment === 1
                ? ((capitalGains - discount) * tax) / 100
                : (capitalGains * tax) / 100}
            </h3>
          </div>
        </div>
      </div>
      <div className={styles.getStartedWrapper}>
        <h4>Get Started with KoinX for FREE</h4>
        <p>
          With our range of features that you can equip for free, KoinX allows
          you to be more educated and aware of your tax reports.
        </p>
        <div className={styles.getStartedImage}>
          <img src={getStarted} alt="getStarted img" />
        </div>

        <button className={styles.btn}>Get Started for Free →</button>
      </div>
    </div>
  );
};

export default Calculator;
