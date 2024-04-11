import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import * as api from "../Configurations/Api_Details";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import { Cart } from "react-bootstrap-icons";
import { Alert } from "react-bootstrap";

function BasicExample() {
  const [flag, setflag] = useState(false);
  const [loader, setloader] = useState(true);

  const [data, setdata] = useState(
    JSON.parse(localStorage.getItem("cardData"))
  );
  const [cardData, setcardData] = useState([]);

  const addToCart = (medicine, Index) => {
    const updatedcardqty = medicine;
    updatedcardqty.minimum_qty = updatedcardqty.minimum_qty + 1;

    const resultwithoutzero = data.filter(function (el) {
      return el.minimum_qty != 0;
    });

    setcardData(resultwithoutzero);
    setflag(!flag);
  };

  const removeToCart = (medicine, Index) => {
    const updatedcardqty = medicine;
    updatedcardqty.minimum_qty = updatedcardqty.minimum_qty - 1;
    const resultwithoutzero = data.filter(function (el) {
      return el.minimum_qty != 0;
    });

    setcardData(resultwithoutzero);
    setflag(!flag);
  };

  useEffect(() => {
    // if (loader) {
    //   const getStocksData = {
    //     url: api.GETSTOCKS,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     // data: JSON.stringify(getStocksDataid)
    //   };
    //   axios(getStocksData)
    //     .then((response) => {
    //       setdata(response.data);
    //       setloader(false);
    //     })
    //     .catch(function (e) {
    //       if (e.message === "Network Error") {
    //         alert("No Internet Found. Please check your internet connection");
    //       } else {
    //         alert(
    //           "Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support."
    //         );
    //       }
    //     });
    // }
  }, [flag]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>CHECKOUT DETAILS </h1>
        {data.map((medicine, Index) => {
          return (
            <Card
              style={{
                width: "20rem",
                margin: 20,
                borderRadius: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Card.Img variant="top" src={medicine.uri} />
              <Card.Body>
                <Card.Title>{medicine.product_name}</Card.Title>
                <Card.Text>{medicine.description}</Card.Text>

                {medicine.minimum_qty == 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => addToCart(medicine, Index)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => removeToCart(medicine, Index)}
                    >
                      -
                    </Button>
                    <h2 style={{ padding: 8, fontSize: 21 }}>
                      {medicine.minimum_qty}
                    </h2>

                    <Button
                      variant="primary"
                      onClick={() => addToCart(medicine, Index)}
                      style={{ marginLeft: 10 }}
                    >
                      +
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })}

        <Button
          variant="primary"
          onClick={() => {
            localStorage.setItem("cardData", []);
            window.history.replaceState(
              null,
              null,
              "/MedicineBooking/MedicineBooking"
            );
            window.location.reload();
            alert("Order Placed Successfully.");
          }}
          style={{ padding: 20, marginTop: 20, fontWeight: "bold" }}
        >
          CHECKOUT
        </Button>
      </div>
    </>
  );
}

export default BasicExample;
