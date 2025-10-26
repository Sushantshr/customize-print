"use client";

import React from "react";

const HoodiePrintOrderPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-order-container">
      <div className="print-btn">
        <button onClick={handlePrint}>🖨️ Print Hoodie Orders</button>
      </div>

      <div className="bill-container">
        {/* Order 1 - Hoodie */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="order-container">
            <div className="inside-container">
              <div className="left">
                <div className="section-title">Order Details</div>
                <div>Color: ______________________</div>

                <div className="section-title">Product Type</div>
                <ul className="product-type-list">
                  <li>[ ] Full Zip Hoodie</li>
                  <li>[ ] Sweat Shirt</li>
                  <li>[ ] Drop/Crop Hoodie</li>
                  <li>[ ] Hoodie</li>
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
                  <img src="/hoodie_front.png" alt="Hoodie Front" />
                  <img src="/hoodie_back.png" alt="Hoodie Back" />
                </div>
              </div>
            </div>
            <div className="section-title">Notes</div>
            <div className="notes"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoodiePrintOrderPage;
