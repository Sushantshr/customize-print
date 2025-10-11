"use client";

import React from "react";

const PrintOrderPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-order-container">
      <div className="print-btn">
        <button onClick={handlePrint}>🖨️ Print</button>
      </div>

      <div className="bill-container">
        {/* Order 1 */}
        <div className="order-container">
          <div className="inside-container">
            <div className="left">
              <div className="section-title">Order Details</div>
              <div>Color: ______________________</div>

              <div className="section-title">Product Type</div>
              <ul className="product-type-list">
                <li>[ ] Tshirt</li>
                <li>[ ] Polo</li>
                <li>[ ] Lycra</li>
                <li>[ ] Cotton</li>
                <li>[ ] 20's com</li>
                <li>[ ] 24's com</li>
                <li>[ ] Ibud</li>
                <li>[ ] 300 GSM</li>
                <li>[ ] Chinese Terry</li>
              </ul>
              <div>Other: _______________________</div>

              <div className="section-title">Sizes</div>
              <ul className="sizes-list">
                <li>[ ] S: ____</li>
                <li>[ ] M: ____</li>
                <li>[ ] L: ____</li>
                <li>[ ] XL: ____</li>
                <li>[ ] XXL: ____</li>
                <li>[ ] 3XL: ____</li>
                <li style={{ width: "100%" }}>
                  {" "}
                  [ ] Other: _______________________
                </li>
              </ul>
            </div>

            <div className="right">
              <div>Customer: ________________________</div>
              <div>Delivery Date: _____________________</div>
              <div className="pb-3">Phone: ____________________________</div>

              <div className="section-title">Sketch</div>
              <div className="sketch">
                <img src="tshirt-outline.png" alt="T-shirt Outline" />
                <img src="tshirt-outline-back.png" alt="T-shirt Outline Back" />
              </div>
            </div>
          </div>
          <div className="section-title">Notes</div>
          <div className="notes"></div>
        </div>
        {/* Order 2 */}
        <div className="order-container">
          <div className="inside-container">
            <div className="left">
              <div className="section-title">Order Details</div>
              <div>Color: ______________________</div>

              <div className="section-title">Product Type</div>
              <ul className="product-type-list">
                <li>[ ] Hoodie</li>
                <li>[ ] Sweat Shirt</li>
                <li>[ ] Trouser</li>
              </ul>
              <div>Other: _______________________</div>

              <div className="section-title">Sizes</div>
              <ul className="sizes-list">
                <li>[ ] S: ____</li>
                <li>[ ] M: ____</li>
                <li>[ ] L: ____</li>
                <li>[ ] XL: ____</li>
                <li>[ ] XXL: ____</li>
                <li>[ ] 3XL: ____</li>
                <li style={{ width: "100%" }}>
                  {" "}
                  [ ] Other: _______________________
                </li>
              </ul>
            </div>

            <div className="right">
              <div>Customer: ________________________</div>
              <div>Delivery Date: _____________________</div>
              <div className="pb-3">Phone: ____________________________</div>

              <div className="section-title">Sketch</div>
              <div className="sketch">
                <img src="tshirt-outline.png" alt="T-shirt Outline" />
                <img src="tshirt-outline-back.png" alt="T-shirt Outline Back" />
              </div>
            </div>
          </div>
          <div className="section-title">Notes</div>
          <div className="notes"></div>
        </div>
        {/* Order 3 */}
        <div className="order-container">
          <div className="inside-container">
            <div className="left">
              <div className="section-title">Order Details</div>
              <div>Color: ______________________</div>

              <div className="section-title">Product Type</div>
              <ul className="product-type-list">
                <li>[ ] Hoodie</li>
                <li>[ ] Sweat Shirt</li>
                <li>[ ] Trouser</li>
              </ul>
              <div>Other: _______________________</div>

              <div className="section-title">Sizes</div>
              <ul className="sizes-list">
                <li>[ ] S: ____</li>
                <li>[ ] M: ____</li>
                <li>[ ] L: ____</li>
                <li>[ ] XL: ____</li>
                <li>[ ] XXL: ____</li>
                <li>[ ] 3XL: ____</li>
                <li style={{ width: "100%" }}>
                  {" "}
                  [ ] Other: _______________________
                </li>
              </ul>
            </div>

            <div className="right">
              <div>Customer: ________________________</div>
              <div>Delivery Date: _____________________</div>
              <div className="pb-3">Phone: ____________________________</div>

              <div className="section-title">Sketch</div>
              <div className="sketch">
                <img src="tshirt-outline.png" alt="T-shirt Outline" />
                <img src="tshirt-outline-back.png" alt="T-shirt Outline Back" />
              </div>
            </div>
          </div>
          <div className="section-title">Notes</div>
          <div className="notes"></div>
        </div>
      </div>
    </div>
  );
};

export default PrintOrderPage;
