import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {
    const [student_name, setstudent_name] = useState(props.data.student_name);
    const [department, setdepartment] = useState(props.data.department);
    const [mobile_number, setmobile_number] = useState(props.data.mobile_number);
    const [collage, setcollage] = useState(props.data.collage);
    const [start_date, setstart_date] = useState(props.data.start_date);
    const [end_date, setend_date] = useState(props.data.end_date);
    const [start_time, setstart_time] = useState(props.data.start_time);
    const [end_time, setend_time] = useState(props.data.end_time);
    const [status, setstatus] = useState(props.data.status);
    const [size, setsize] = useState("1");
    const [client_id, setclient_id] = useState(props.data.client_id);
    const [expiry_date, setexpiry_date] = useState(props.data.expiry_date);
    const [uri, seturi] = useState(props.data.uri);
    const [license,setlicense]=useState(props.data.license)
    const [insurance,setinsurance]=useState(props.data.insurance)



    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        {/* <Card.Header>
                                <Card.Title as="h5">CREATE NEW AGENCY </Card.Title>
                                <hr/>

                            </Card.Header> */}
                        <Card.Body>
                            <h5>EDIT REQUEST DETAILS </h5>
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
                                                disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                                onChange={(event) => { setstudent_name(event.target.value) }}

                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>START DATE</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Enter start_date"
                                                value={start_date}
                                                disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                                onChange={(event) => { setstart_date(event.target.value) }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>START TIME *</Form.Label>
                                            <Form.Control
                                                type="time"
                                                placeholder="Enter end_time"
                                                disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                                value={start_time}
                                                onChange={(event) => { setstart_time(event.target.value) }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>MOBILE NUMBER *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter the stock available"
                                                value={mobile_number}
                                                disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                                onChange={(event) => { setmobile_number(event.target.value) }}
                                            />
                                        </Form.Group>

                                        {
                                            localStorage.getItem('org_name') === 'ADMIN' ?
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>STATUS *</Form.Label>
                                                    <select onChange={(e) => { setstatus(e.target.value) }} style={{ width: '100%', padding: '10px', borderRadius: '3px' }}>
                                                        <option value='none' selected={status === 'none' ? true : false}>SELECT STATUS</option>
                                                        <option value="true" selected={status === 'true' ? true : false}>APPROVED</option>
                                                        <option value="false" selected={status === 'false' ? true : false}>REJECTED</option>
                                                    </select>
                                                </Form.Group>
                                                : ''
                                        }
                                    </Form>
                                </Col>

                                <Col md={6}>


                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>PORT ADDRESS *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter port address"
                                            value={collage}
                                            disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
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
                                            disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                            onChange={(event) => { setend_date(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>END TIME *</Form.Label>
                                        <Form.Control
                                            type="time"
                                            placeholder="Enter end_time"
                                            value={end_time}
                                            disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                            onChange={(event) => { setend_time(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>VACHECIAL NAME *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="ENTER THE VACHECIAL NAME"
                                            value={department}
                                            disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                            onChange={(event) => { setdepartment(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>LICENSE NUMBER *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="ENTER THE LICENSE NUMBER"
                                            value={license}
                                            disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                            onChange={(event) => { setlicense(event.target.value) }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>INSURANCE NAME *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="ENTER THE INSURANCE NAME "
                                            value={insurance}
                                            disabled={status !== 'none' ? true : localStorage.getItem('org_name') === 'ADMIN' ? true : false}
                                            onChange={(event) => { setinsurance(event.target.value) }}
                                        />
                                    </Form.Group>
                                    {/* <Form.Group controlId="formBasicEmail">
                                        <Form.Label>STATUS *</Form.Label>
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
                                            if (client_id !== "" && department !== "" && mobile_number !== "" && start_date !== "" && start_time !== "" && status !== "" && client_id !== "" && end_date !== "" && end_time !== "" && insurance !=="" && license !=="") {
                                                const stock_details = {
                                                    "student_name": student_name,
                                                    "department": department,
                                                    "mobile_number": mobile_number,
                                                    "collage": collage,
                                                    "start_date": start_date,
                                                    "end_date": end_date,
                                                    "start_time": start_time,
                                                    "end_time": end_time,
                                                    "status": status,
                                                    "client_id": client_id,
                                                    "insurance":insurance,
                                                    "license":license,


                                                };

                                                const options = {
                                                    url: api.CREATE_STOCK + props.data._id,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                    },
                                                    data: JSON.stringify(stock_details)
                                                };
                                                axios(options)
                                                    .then(response => {
                                                        props.callback()

                                                    })

                                                    .catch(function (e) {
                                                        props.callback()
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