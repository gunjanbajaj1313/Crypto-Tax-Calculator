import React from "react";
import styles from "./Faqs.module.css";
import { faq } from "./data";

const Faqs = () => {
  return (
    <div className={styles.faqWrapper}>
      <div className={styles.contentContainer}>
        <h2>Frequently Asked Questions</h2>
        {faq.map((item) => (
          <div key={item.id}>
            <h3>
              {item.id}. {item.question}
            </h3>
            <p>{item.answer}</p>
            {item.answer2 && <p>{item.answer2}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
