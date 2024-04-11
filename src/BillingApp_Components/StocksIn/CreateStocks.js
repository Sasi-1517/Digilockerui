import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {
    const [student_name, setstudent_name] = useState("");
    const [department, setdepartment] = useState("");
    const [mobile_number, setmobile_number] = useState("");
    const [collage, setcollage] = useState("");
    const [start_date, setstart_date] = useState("");
    const [end_date, setend_date] = useState("");
    const [start_time, setstart_time] = useState("");
    const [end_time, setend_time] = useState("");
    const [status, setstatus] = useState(false);
    const [size, setsize] = useState("1");
    const [client_id, setclient_id] = useState(localStorage.getItem("Client_Id"));
    const [expiry_date, setexpiry_date] = useState("");
    const [uri, seturi] = useState("");
    const [license,setlicense]=useState("")
    const [insurance,setinsurance]=useState("")

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>

                        <Card.Body>
                            <h5>ADD REQUEST </h5>
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>DRIVER NAME *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Product Name"
                                                value={student_name}
                                                onChange={(event) => { setstudent_name(event.target.value) }}

                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>START DATE</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Enter request_date"
                                                value={start_date}
                                                onChange={(event) => { setstart_date(event.target.value) }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>START TIME *</Form.Label>
                                            <Form.Control
                                                type="time"
                                                placeholder="Enter start_time"
                                                value={start_time}
                                                onChange={(event) => { setstart_time(event.target.value) }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>MOBILE NUMBER *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter the mobile number"
                                                value={mobile_number}
                                                onChange={(event) => { setmobile_number(event.target.value) }}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Col>


                                <Col md={6}>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>PORT ADDRESS *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter port address"
                                            value={collage}
                                            onChange={(event) => {
                                                setcollage(event.target.value)

                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>END DATE</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Enter end_date"
                                            value={end_date}
                                            onChange={(event) => { setend_date(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>END TIME *</Form.Label>
                                        <Form.Control
                                            type="time"
                                            placeholder="Enter end_time"
                                            value={end_time}
                                            onChange={(event) => { setend_time(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>VACHECIAL NUMBER *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter the VACHECIAL NUMBER "
                                            value={department}
                                            onChange={(event) => { setdepartment(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>LICENSE  NUMBER *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter the LICENSE  NUMBER"
                                            value={license}
                                            onChange={(event) => { setlicense (event.target.value) }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>INSURANCE  NUMBER *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter the INSURANCE  NUMBER "
                                            value={insurance}
                                            onChange={(event) => { setinsurance (event.target.value) }}
                                        />
                                    </Form.Group>
                                    {/* <Form.Group controlId="formBasicEmail">
                                        <Form.Label>status *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter status"
                                            value={status}
                                            onChange={(event) => { setstatus(event.target.value) }}
                                        />
                                    </Form.Group> */}

                                    {/* <Form.Group controlId="formBasicEmail">
                                        <Form.Label>IMAGE *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter status"
                                            value={uri}
                                            onChange={(event) => { seturi(event.target.value) }}
                                        />
                                    </Form.Group> */}


                                </Col>
                                

                                <div style={{ marginLeft: 15 }}>
                                    <Button variant="success"
                                        onClick={() => {
                                            if (client_id !== "" && department !== "" && mobile_number !== "" && start_date !== "" && start_time !== "" && status !== "" && client_id !== "" && end_date !== "" && end_time !== ""&& insurance !==""&& license !== "") {
                                                const stock_details = {
                                                    "student_name": student_name,
                                                    "department": department,
                                                    "mobile_number": mobile_number,
                                                    "collage": collage,
                                                    "start_date": start_date,
                                                    "end_date": end_date,
                                                    "start_time": start_time,
                                                    "end_time": end_time,
                                                    "client_id": client_id,
                                                    "insurance":insurance,
                                                    "license":license,

                                                };

                                                const options = {
                                                    url: api.CREATE_STOCK,
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                    },
                                                    data: JSON.stringify(stock_details)
                                                };

                                                axios(options)
                                                    .then(response => {

                                                        console.log(response.data)

                                                        if (response.data.status == "status already exist") {

                                                            alert("This status(" + status + ") is already exist.")
                                                        }

                                                        else {

                                                            props.callback()

                                                        }


                                                    })
                                                    .catch(function (e) {
                                                        props.callback()
                                                        console.log(e);
                                                        if (e.message === 'Network Error') {
                                                            alert("No Internet Found. Please check your internet connection")
                                                        }
                                                        else {

                                                            alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                                                        }


                                                    });
                                            }

                                            else {

                                                alert("Please fill out all required fields.")

                                            }


                                        }}
                                    >
                                        SUBMIT
                                    </Button>

                                    <Button variant="outline-dark"
                                        onClick={() => {
                                            props.callback()
                                        }}>
                                        CANCEL
                                    </Button>

                                </div>


                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default windowSize(FormsElements);