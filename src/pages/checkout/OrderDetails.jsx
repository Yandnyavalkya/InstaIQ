import React from "react";
import { useAppContext } from "../../context/AppContext";

const OrderDetails = ({ orderData, onNext }) => {
  const { state } = useAppContext();
  
  console.log("OrderDetails - Component mounted");
  console.log("OrderDetails - Cart state:", state.cart);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Cart Items:</strong> {state.cart ? state.cart.length : 0}</p>
      </div>

      {state.cart && state.cart.length > 0 ? (
        <div>
          <h3>Items in Cart:</h3>
          {state.cart.map((item, index) => (
            <div key={index} style={{ 
              display: "flex",
              padding: "15px", 
              border: "1px solid #ddd", 
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa"
            }}>
              <img 
                src={item.imageUrl || item.img || "/assets/images/courses/course1.jpg"} 
                alt={item.title}
                style={{ 
                  width: "80px", 
                  height: "60px", 
                  objectFit: "cover", 
                  borderRadius: "6px",
                  marginRight: "15px"
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div style={{ flex: 1 }}>
                <h5 style={{ margin: "0 0 5px 0", color: "#333", fontSize: "16px" }}>{item.title}</h5>
                <p style={{ margin: "0 0 5px 0", color: "#666", fontSize: "14px" }}>
                  {item.instructor || item.provider || "Insta Education"}
                </p>
                <p style={{ margin: 0, fontWeight: "bold", color: "#4c1864", fontSize: "14px" }}>Price: {item.price}</p>
              </div>
            </div>
          ))}
          
          {/* Cart Total Display */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}>
              <h4 style={{ color: "#333", marginBottom: "10px" }}>Cart Summary</h4>
              <p style={{ margin: "5px 0", color: "#333", fontSize: "14px" }}>
                <strong>Total Items:</strong> {state.cart.length}
              </p>
              <p style={{ margin: "5px 0", color: "#4c1864", fontSize: "16px", fontWeight: "bold" }}>
                <strong>Cart Total:</strong> ₹5,000
              </p>
            </div>
          </div>

          <button
            onClick={() => onNext({ 
              items: state.cart, 
              cartTotal: 5000
            })}
            style={{
              padding: "15px 30px",
              backgroundColor: "#4c1864",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Next
          </button>
        </div>
      ) : (
        <div>
          <p>No items in cart</p>
          <button
            onClick={() => onNext({ items: [], cartTotal: 0 })}
            style={{
              padding: "15px 30px",
              backgroundColor: "#4c1864",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Continue Anyway
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
