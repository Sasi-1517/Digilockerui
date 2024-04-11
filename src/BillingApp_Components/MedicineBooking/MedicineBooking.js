import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "./Medicine.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import * as api from "../Configurations/Api_Details";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import { Cart } from "react-bootstrap-icons";

function BasicExample() {
  const [flag, setflag] = useState(false);
  const [loader, setloader] = useState(true);

  const [data, setdata] = useState([]);
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
    if (loader) {
      const getStocksData = {
        url: api.GETSTOCKS,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // data: JSON.stringify(getStocksDataid)
      };
      axios(getStocksData)
        .then((response) => {
          setdata(response.data);
          console.log(response.data);
          setloader(false);
        })
        .catch(function (e) {
          if (e.message === "Network Error") {
            alert("No Internet Found. Please check your internet connection");
          } else {
            alert(
              "Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support."
            );
          }
        });
    }
  }, [flag]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
        className="sdjhfg"
      >
        <Button
          variant="primary"
          onClick={async () => {
            if (cardData.length > 0) {
              await localStorage.setItem("cardData", JSON.stringify(cardData));

              window.history.replaceState(
                null,
                null,
                "/MedicineBooking/CartDetails"
              );
              window.location.reload();
            } else {
              alert("Please Select Ateast One Product for Checkout");
            }
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <h2 style={{ color: "white" }}>Cart List</h2>
            <Badge color="secondary" badgeContent={cardData.length}>
              <Cart style={{ width: 50, height: 50 }} />
            </Badge>
          </div>
        </Button>
      </div>
      <div>
        <Container>
          <Row>
            {data.map((medicine, Index) => {
              return (
                <Col md="4">
                  <Card
                    style={{ width: "20rem", margin: 20, borderRadius: 20 }}
                    md="4"
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
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default BasicExample;
