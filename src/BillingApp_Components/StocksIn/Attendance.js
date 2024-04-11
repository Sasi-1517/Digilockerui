import React, { useEffect, useState } from 'react'
import * as api from '../Configurations/Api_Details'
import axios from 'axios';
import MaterialTable from 'material-table';
import { confirmAlert } from 'react-confirm-alert';
import { Button, Form, Modal } from 'react-bootstrap';
function Attendance() {
    const [datas, setdatas] = useState([])
    const [flag, setflag] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [name,setname]=useState('')
    const [password,setpassword]=useState('')
    const [age,setage]=useState('')
    const [email,setemail]=useState('')
    const [relationtype,setrelationtype]=useState('')

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);





    useEffect(()=>{

        const option ={
            url:"http://localhost:5008/reation_get_user_id",
            method:"POST",
            data:{
                "user_id":String(localStorage.getItem('user_id'))
            }
        }
        console.log(option);
        axios(option).then((res)=>{
            console.log(res);
            setdatas(res.data)

        }).catch((e)=>{
            console.log(e);
        })
    },[!showModal])


    // const [duplicatesArray, setDuplicatesArray] = useState([]);
    // useEffect(() => {
    //     const fachdata = async () => {
    //         const options = {
    //             url: api.ATTENDANCE,
    //             method: "POST",
    //             data: {
    //                 "id": "admin",
    //             }
    //         }
    //         await axios(options)
    //             .then(res => {
    //                 console.log(res);
    //                 setdatas(res.data)



    //                 if (Array.isArray(res.data) && res.data.length > 0) {

    //                     const requestIdsArray = res.data.map(item => item.request_id);

    //                     localStorage.setItem('requestIds', JSON.stringify(requestIdsArray));

    //                     console.log("request_id values:", requestIdsArray);
    //                 } else {
    //                     console.error("Invalid array format or empty array");
    //                 }







    //                 if (Array.isArray(res.data) && res.data.length > 0) {
    //                     const uniqueItems = new Map();
    //                     const tempDuplicatesArray = [];

    //                     res.data.forEach(item => {
    //                         const requestId = item.request_id;

    //                         if (uniqueItems.has(requestId)) {
    //                             const originalItem = uniqueItems.get(requestId);
    //                             tempDuplicatesArray.push(originalItem, item);
    //                         } else {
    //                             uniqueItems.set(requestId, item);
    //                         }
    //                     });

    //                     setDuplicatesArray(tempDuplicatesArray);
    //                 } else {
    //                     console.error('Invalid array format or empty array');
    //                 }

    //             })
    //             .catch(error => {
    //                 console.error("Error:", error);
    //             });

    //     }

    //     fachdata()


    // }, [])
    // console.log(duplicatesArray);
    // console.log(datas);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="primary" style={{ fontWeight: 'bold', fontSize: 17 }} onClick={handleShowModal}>
                    + ADD RELATION
                </Button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Relation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} onChange={(e)=>setname(e.target.value)} type="text" placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>age</Form.Label>
                        <Form.Control value={age} onChange={(e)=>setage(e.target.value)} placeholder="Enter age" />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter email" />
                        
                    </Form.Group>
                    <Form.Group controlId="formRelationType">
                        <Form.Label>Relation Type</Form.Label>
                        <Form.Control type="text" value={relationtype} onChange={(e)=>setrelationtype(e.target.value)} placeholder="Enter Relation Type" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                        
                    </Button>
                    <Button variant="primary" onClick={()=>{
                        
                        const option={
                            url:'http://localhost:5008/relation_creation_api',
                            method:"post",
                            data:{
                                "name":name,
                                "password":password,
                                "age":age,
                                "email":email,
                                "relation_type":relationtype,
                                "user_id":localStorage.getItem('user_id'),

                            }

                           
                        }
                        console.log(option);
                        axios(option).then((res)=>{
                            console.log(res.data);
                            // setdatas(res.data)
                            alert('Relation Created Successfully')
                            setname('')
                            setpassword('')
                            setage('')
                            setemail('')
                            setrelationtype('')
                            setShowModal(false)
                        }).catch((e)=>{
                            console.log(e);
                        })
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <MaterialTable
                title="RELATION LIST"
                columns={[

                    {
                        title: 'NAME',
                        field: 'user_name',
                        render: rowData => (
                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>
                               {rowData.name.toUpperCase()}
                            </h5>
                        ),
                    },

                    {
                        title: 'EMAIL',
                        field: 'vehicle_number',
                        render: rowData => (
                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>
                               {rowData.email}
                            </h5>
                        ),
                    },

                    {
                        title: 'AGE',
                        field: 'insurance_number',
                        render: rowData => (
                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>
                             {rowData.age}
                            </h5>
                        ),
                    },
                    {
                        title: 'RELATION TYPE',
                        field: 'in_date',
                        render: rowData => (
                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>
                                {rowData.relation_type}
                            </h5>
                        ),
                    },
                 









                ]}

                data={datas}
                key={datas._id}
                //         actions={[

                //             localStorage.getItem('org_name') == 'ADMIN' ?
                //                 rowData => ({
                //                     icon: 'delete',
                //                     tooltip: 'Delete User',
                //                     iconProps: { style: { color: "#575580" } },
                //                     onClick: (event, rowData) => {



                //                             const options = {
                //                                 url: api.ATTENDANCE + rowData._id,
                //                                 method: 'DELETE',
                //                                 headers: {
                //                                     'Content-Type': 'application/json',
                //                                     // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                //                                 }
                //                             };
                // console.log(options,'191');
                //                             axios(options)
                //                                 .then(response => {
                //                                     // console.log(response);
                //                                     setflag(!flag)

                //                                 })

                //                                 .catch(function (e) {


                //                                     if (e.message === 'Network Error') {
                //                                         alert("No Internet Found. Please check your internet connection")
                //                                     }

                //                                     else {

                //                                         alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                //                                     }


                //                                 });






                //                     }
                //                 }) : ''
                //         ]}


                options={{
                    actionsColumnIndex: -1,
                    sorting: true,
                    exportButton: true,
                    pageSize: 10,
                }}
                localization={{
                    header: {
                        actions: 'ACTIONS',
                    },
                }}
            />
        </>



    )
}

export default Attendance