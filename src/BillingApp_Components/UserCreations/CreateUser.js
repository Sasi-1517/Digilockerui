import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {
 
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [mobile_number, setmobile_number] = useState("");
    const [value, setvalue] = useState("");
    const [data, setData] = useState('');

    const [document, setdocument] = useState("");
    const [file, setFile] = useState(null);

    const [disable,setdisable]=useState(false)


    console.log(props);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onloadend = () => {
            const base64Data = reader.result;
            setData(base64Data);
        };
    };
    const upload = () => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'pdf_formet');
        data.append('cloud_name','')
        try {
            // Fixed the typo in the Cloudinary API URL
            fetch('https://api.cloudinary.com/v1_1/dvyjguliy/image/upload', {
                method: "POST",
                body: data
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.url);
                setvalue(data.url)
                setdisable(true)
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    
    return (
        <Aux>
            <Row>
                <Col>
                    <Card>

                        <Card.Body>
                            <h5>CREATE NEW DOCUMENT </h5>
                            <hr />
                            <Row>
                            <Col md={6}>
                                   
                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>DOCUMENT NAME *</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Enter Document Name"
                                           value={username}
                                           onChange={(event) => { setusername(event.target.value) }}
                                       />
                                   </Form.Group>

                                   
                                   <Form.Group controlId="formBasicEmail">
                                        <Form.Label> DESCRIPTION *</Form.Label>
                                        <Form.Control
                                            
                                            placeholder="Enter Document Description"
                                            value={password}
                                            onChange={(event) => { setpassword(event.target.value) }}
                                        />
                                    </Form.Group>
                               </Col>


                                <Col md={6}>
                                   
                                <Form.Group controlId="formBasicEmail">
                                       <Form.Label>MOBILE NUMBER *</Form.Label>
                                       <Form.Control
                                           type="number"
                                           placeholder="Enter Phone Number"
                                           value={mobile_number}
                                           onChange={(event) => { setmobile_number(event.target.value) }}
                                       />
                                   </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                       <Form.Label>DOCUMENT TYPE *</Form.Label>
                                       <Form.Control
                                           
                                           placeholder="Enter Document Type"
                                           value={document}
                                           onChange={(event) => { setdocument(event.target.value) }}
                                       />
                                        
                                   </Form.Group>

                                   <Form.Group>
                                        <Form.File
                                            id="exampleFormControlFile1"
                                            label="Choose file"
                                            onChange={handleFileChange}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" onClick={upload}>Upload File</Button>

                                 

                                </Col>
                                <div style={{ marginLeft: 15 }}>
                                    <Button disabled={disable==false} variant="primary"
                                        onClick={() => {
                                            if ( username !== "" && password !== "" ) {
                                                
                                             

                                                const options = {
                                                    url:'http://localhost:5008/document_create',
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                    },
                                                    data: {
                                                        "doc_name": username,
                                                        "description": password, 
                                                        "pho_no":mobile_number,
                                                        "doc_type":document,
                                                        "doc_file":value, 
                                                        "user_id":String(localStorage.getItem('user_id'))

                                                    }
                                                };
                                                console.log(options);


                                                axios(options)
                                                    .then(response => {

                                                        console.log (response)
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

                                    <Button variant="primary"
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