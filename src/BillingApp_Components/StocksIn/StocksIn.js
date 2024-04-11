import React, { useState, useEffect, useRef } from 'react';
import MaterialTable from 'material-table';
import Modal from 'react-modal';
import CreateStocks from './CreateStocks';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as api from '../Configurations/Api_Details'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import windowSize from 'react-window-size';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";
import QRCode from "react-qr-code";
import {
    Button,
} from 'react-bootstrap';
import Edit_Stocks_Data from './Edit_Stocks_Data';
import Webcam from 'react-webcam';
import QrReader from 'react-qr-scanner';
import * as API from '../Configurations/Api_Details'
const customStyles = {
    content: {
        top: '45%',
        left: '58%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '90%',

    },
    overlay: { zIndex: 1000 }
};

const customStyles2 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '80%',

    },
    overlay: { zIndex: 1000 }
};

Modal.setAppElement('#root')

function CustomEditComponent(props) {

    const [loader, setloader] = useState(1);
    const [flag, setflag] = useState('');
    const [datas, setdata] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [qropen, setqropen] = useState(false);
    const [editmodalIsOpen, seteditmodalIsOpen] = useState(false);
    const [editstockdata, seteditstockdata] = useState([]);
    const [student_name, setstudent_name] = useState('');
    const [collage, setcollage] = useState('');
    const [start_date, setstart_date] = useState('');
    const [end_date, setend_date] = useState('');
    const [start_time, setstart_time] = useState('');
    const [end_time, setend_time] = useState('');
    const [mobile_number, setmobile_number] = useState('');
    const [dep, setdep] = useState('');
    const [license, setlicense] = useState("")
    const [insurance, setinsurance] = useState("")
    const [cam1, setcam1] = useState(false)
    const [result, setResult] = useState('');
    const [_id, setid] = useState('')
    const [model, setmodel] = useState(false)
    const [val, setval] = useState([])
    const [valerror, setvalerror] = useState([])
    const [error, seterror] = useState(false)
    const [flag1, setflag1] = useState(false)
    const [store, setstore] = useState([])
    const [req, setreq] = useState([])
    const [flag3, setflag3] = useState([])


    useEffect(() => {
        const fatchapi = async () => {
            const options = {
                url: api.ATTENDANCE,
                method: "POST",
                data: {
                    "id": "admin",
                }
            }
            await axios(options)
                .then(res => {
                    console.log(res);

                    if (Array.isArray(res.data)) {
                        console.log(res.data);

                        const IdsArray = res.data.map(item => item.request_id);
                        setstore(IdsArray)

                        const requestIdsArray = res.data.map(item => item);
                        setreq(requestIdsArray)


                        console.log("request_id values:", requestIdsArray);
                    } else {
                        console.error("Invalid array format or empty array");
                    }
                })

        }
        fatchapi()
    }, [flag3])

    console.log(store, 'store');






    useEffect(() => {

        const getStocksDataid = {
            "client_id": localStorage.getItem("Client_Id")
        }
        const getStocksData = {
            url: localStorage.getItem('org_name') !== 'ADMIN' ? api.GETSTOCKS_BY_USER_ID : api.GETSTOCKS,
            method: localStorage.getItem('org_name') !== 'ADMIN' ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(getStocksDataid)
        }

        axios(getStocksData)
            .then(response => {
                setdata(response.data)
                console.log(response.data, 'AKAL')
            })
            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }
                else {
                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                }

            });




    }, [flag]
    )





    const handleScan = (data) => {

        if (data) {
            const keyValuePairs = data.text.split(/\s*,\s*/);


            const extractedValues = {};


            const keysToExtract = ['NAME', 'DEPARTMENT', 'MOBILE_NUMBER', 'COLLAGE', 'START_DATE', 'END_DATE', 'START_TIME', 'END_TIME', 'INSURANCE', 'LICENSE', 'id'];


            keyValuePairs.forEach(pair => {
                const [key, value] = pair.split('=');

                const trimmedKey = key.trim();
                const trimmedValue = value.trim();
                // console.log(trimmedKey)
                // console.log(trimmedValue);




                if (keysToExtract.includes(trimmedKey)) {

                    extractedValues[trimmedKey] = trimmedValue;
                }
            });
            console.log(extractedValues);
            console.log(datas);


            // const enddate=datas.map(item=>item.end_date).filter(Boolean)
            // const endtime=datas.map(item=>item.end_time).filter(Boolean)
            // const id = dat

            const today = new Date();





            // console.log(endHours, 'endHours');
            // console.log(endMinutes, 'endMinutes');
            // console.log(currentHours, 'currentHours');
            // console.log(currentMinutes, 'currentMinutes');
            // console.log(currentHours > endHours);
            // console.log(currentHours === endHours && currentMinutes >= endMinutes);

            const startTime = extractedValues.START_TIME.split(':');
            const startHours = parseInt(startTime[0], 10);
            const startMinutes = parseInt(startTime[1], 10);
            const endTime = extractedValues.END_TIME.split(':');
            const endHours = parseInt(endTime[0], 10);
            const endMinutes = parseInt(endTime[1], 10);
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();

            const isStartDateToday = extractedValues.START_DATE == `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
            // console.log(isStartDateToday);

            // console.log(extractedValues.START_DATE);


            const isendDateToday = extractedValues.END_DATE == `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

            const isEndTimeReached1 = currentHours < endHours || (currentHours === endHours && currentMinutes <= endMinutes);
            const isEndTimeReached = currentHours === endHours && (currentMinutes <= endMinutes);
            const isEndTimeReached2 = (currentHours === endHours && currentMinutes === endMinutes);
            const isstarttTimeReached1 = currentHours === startHours && (currentMinutes <= startMinutes);
            const isstartTimeReached = (currentHours === startHours && currentMinutes === startMinutes)
            const isTimeInRange = (currentHours > startHours || (currentHours === startHours && currentMinutes >= startMinutes)) &&
                      (currentHours < endHours || (currentHours === endHours && currentMinutes <= endMinutes));
            console.log(isstartTimeReached);
            console.log(currentHours, 'currentHours');
            console.log(startHours, 'startHours');
            console.log(currentMinutes, 'currentMinutes');
            console.log(startMinutes, 'startMinutes');


            // if (isEndTimeReached) {
            //     console.log('The end time has been reached.,pppp');
            // } else {
            //     console.log('The end time has not been reached yet.');
            // }
            var hours = today.getHours();
            var minutes = today.getMinutes();
            console.log(`${hours}:${minutes}`);
            console.log(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`);








            console.log('kgakgdkjgskjdgkjaskjdkaj');
            console.log(extractedValues.id);
            console.log(store);

            // console.log(id);

            if (isStartDateToday && isTimeInRange && !store.includes(extractedValues.id)) {
                const option = {
                    url: API.TIME,
                    method: "POST",
                    data: {
                        "user_name": extractedValues.NAME,
                        "vehicle_number": extractedValues.DEPARTMENT,
                        "insurance_number": extractedValues.INSURANCE,
                        "admin_id": 'admin',
                        "request_id": extractedValues.id,
                        "in_date": `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
                        "out_date": null,
                        "in_time": `${hours}:${minutes}`,
                        "out_time": null,


                    }
                }
                console.log(option);
                axios(option)

                    .then(response => {
                        console.log(response, 'res');

                        console.log("Response:", response.data);
                        console.log(response.data.in_date, 'in_date');
                        console.log(response.data.in_time, 'in_time');
                        // setintime(response.data.in_time)
                        // setindate(response.data.in_date)
                        // localStorage.setItem(response.data.in_time,'in_time')
                        // localStorage.setItem(response.data.in_date,'in_date')

                    })
                    .catch(error => {

                        console.error("Error:", error);

                    });
                setval(prevVal => [...prevVal, extractedValues]);


                setmodel(true)
                // setcam(false)
                console.log(extractedValues);




            }





            else if (isendDateToday && isEndTimeReached && store.includes(extractedValues.id)) {

                let arr = ''

                req.map((val) => {
                    if (val.request_id === extractedValues.id) {
                        arr = val._id
                    }
                })

                console.log(arr);
                // console.log(indate,'indate');
                console.log(extractedValues.id, 'lkashdkjashdkjadhskja');
                console.log(store);



                console.log('daskjg');



                const url = API.TIME + arr;
                const data = {
                    "user_name": extractedValues.NAME,
                    "vehicle_number": extractedValues.DEPARTMENT,
                    "insurance_number": extractedValues.INSURANCE,
                    "admin_id": 'admin',
                    "request_id": extractedValues.id,
                    "out_date": `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
                    "out_time": `${hours}:${minutes}`,
                };
                console.log(data);

                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(response => {
                        console.log(response, 'res');

                        console.log("Response:", response.data);

                    })
                    .catch(error => console.error('Error:', error));

                setval(prevVal => [...prevVal, extractedValues]);





                setmodel(true)
                // setcam(false)
                console.log(extractedValues);

            }
            else {
                setvalerror(prevVal => [...prevVal, extractedValues]);
                seterror(true)

                // setcam(false)
            }





            // if (id.includes(extractedValues.id) &&  isendDateToday &&  isEndTimeReached  ) {
            //     setval(prevVal => [...prevVal, extractedValues]);


            //     setmodel(true)
            //     // setcam(false)
            //     console.log(extractedValues);




            // }
            // else {
            //     setvalerror(prevVal => [...prevVal, extractedValues]);
            //     seterror(true)
            //     // setcam(false)
            // }









            console.log(extractedValues);

            const renderedValues = Object.entries(extractedValues).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {value}
                </div>
            ));


            setResult(renderedValues);
        }
    };


    useEffect(() => {
        handleScan()
        console.log('skslslsk');
    }, [flag1])


    const handleError = (error) => {
        console.error(error);
    };




    function closeModal() {
        setIsOpen(false);

    }


    function closeMo() {
        setmodel(false);

    }

    function errorMo() {
        seterror(false);

    }

    function getResponse(result) {
        setIsOpen(false);
        seteditmodalIsOpen(false)
        setflag(!flag)
    }



    console.log(val);




    if (loader == 0) {

        return (
            <div>
                <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" style={{ backgroundColor: 'white' }}>
                    <CircularProgress color="secondary" size={70} />
                    <h1 style={{ marginLeft: 40 }}>Loading...</h1>
                </Box>
            </div>
        )
    }

    else {
        return (
            <div>
                {model == true ? (
                    <Modal
                        isOpen={model}
                        onRequestClose={closeMo}
                        style={props.windowWidth >= 700 ? customStyles : customStyles2}
                        contentLabel="Example Modal"
                        backdrop="static"
                        shouldCloseOnOverlayClick={false}
                    >
                        <h2>YOUR DETAILS</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '25px 0', fontSize: '18px', textAlign: 'left' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>DRIVER NAME</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>VACHECIAL NUMBER</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>START DATE</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>END DATE</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>START TIME</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>END TIME</th>
                                  
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>MOBILE_NUMBER</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>INSURANCE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(val, 'lsl')}
                                {val.map((item, index) => (

                                    <tr key={index}>
                                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>{item.NAME}</td>
                                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>{item.DEPARTMENT}</td>
                                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>{item.START_DATE}</td>
                                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>{item.END_DATE}</td>
                                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>{item.START_TIME}</td>
                                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>{item.END_TIME}</td>
                                    
                                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>{item.MOBILE_NUMBER}</td>
                                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>{item.INSURANCE}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Button onClick={() => { setmodel(false); setval([]); setcam1(false); setflag1(!flag); setflag3(!flag3) }}>CLEAR</Button>


                    </Modal>
                ) : (
                    null

                )

                }

                {
                    error === true ? (
                        <Modal
                            isOpen={error}
                            onRequestClose={errorMo}
                            style={props.windowWidth >= 700 ? customStyles : customStyles2}
                            contentLabel="Example Modal"
                            backdrop="static"
                            shouldCloseOnOverlayClick={false}
                        >
                            <h2>YOUR DETAILS</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '25px 0', fontSize: '18px', textAlign: 'left' }}>
                                <thead>
                                    <tr>
                                     <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>DRIVER NAME</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>VACHECIAL NUMBER</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>START DATE</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>END DATE</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>START TIME</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>END TIME</th>
                                  
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>MOBILE_NUMBER</th>
                                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>INSURANCE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(valerror, 'lsl')}
                                    {valerror.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#ed9c8c'  }}>{item.NAME}</td>
                                            <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#ed9c8c' }}>{item.DEPARTMENT}</td>
                                            <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#ed9c8c' }}>{item.START_DATE}</td>
                                            <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#ed9c8c' }}>{item.END_DATE}</td>
                                            <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#ed9c8c' }}>{item.START_TIME}</td>
                                            <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#ed9c8c' }}>{item.END_TIME}</td>
                                     
                                            <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#ed9c8c' }}>{item.MOBILE_NUMBER}</td>
                                            <td style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', backgroundColor: '#ed9c8c' }}>{item.INSURANCE}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>

                            <Button onClick={() => { seterror(false); setvalerror([]); setcam1(false); setflag3(!flag3) }}>CLEAR</Button>
                        </Modal>


                    ) : (
                        null
                    )
                }

                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <CreateStocks
                        callback={getResponse}
                    />
                </Modal>

                <Modal
                    isOpen={editmodalIsOpen}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <Edit_Stocks_Data
                        callback={getResponse}
                        data={editstockdata}
                    />
                </Modal>

                <Modal
                    isOpen={qropen}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <div style={{ height: "auto", maxWidth: 500, width: "100%", margin: "0 auto" }}>
                        <p style={{ fontSize: '20px', fontWeight: 'bolder ', textAlign: 'center' }}>APPROVED QR</p>
                        <QRCode
                            size={500}
                            style={{ height: "auto", margin: "0 auto", maxWidth: "100%", width: "100%" }}
                            value={`NAME = ${student_name.toUpperCase()} , DEPARTMENT = ${dep} , MOBILE_NUMBER = ${mobile_number} ,  COLLAGE = ${collage} , START_DATE = ${start_date} , END_DATE = ${end_date} , START_TIME = ${start_time} , END_TIME = ${end_time} , INSURANCE = ${insurance} , LICENSE = ${license} , id = ${_id}`}
                            viewBox={`0 0 256 256`}
                        />

                        <Button
                            variant={"success"}
                            color="#08A045"
                            style={{ fontWeight: 'bold', fontSize: 17, marginLeft: '40%', marginRight: 'auto', marginTop: '20px' }}
                            onClick={(e) => {
                                setqropen(false)

                            }}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>
                {
                    localStorage.getItem('org_name') !== 'ADMIN' ?
                        <div style={{ display: "flex", justifyContent: 'center' }}>
                            <Button
                                variant={"success"}
                                color="#08A045"
                                style={{ fontWeight: 'bold', fontSize: 17 }}
                                onClick={(e) => {
                                    setIsOpen(true);

                                }}
                            >
                                + ADD REQUEST
                            </Button>
                        </div>
                        : ''
                }
                {
                    localStorage.getItem('org_name') === 'ADMIN' ?
                        <div style={{

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                            <Button
                                variant={"success"}
                                color="#08A045"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,

                                }}
                                onClick={() => {
                                    setcam1(true);
                                    setflag1(!flag1)
                                }}
                            >
                                IN  Scan
                            </Button>

                            
                        </div> : null
                }
                {cam1 === true ? (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <QrReader
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                legacyMode={false}
                                facingMode={'environment'}
                                style={{ width: '50%' }}
                            />
                            <button
                                onClick={() => {
                                    setcam1(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: "14vh",
                                    right: "46vh",
                                    padding: '8px 16px',
                                    background: '#21965E',
                                    color: 'white',
                                    borderRadius: '100px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                X
                            </button>
                        </div>



                    </>
                ) : (


                    <MaterialTable
                        title="USER MANAGEMENT"
                        columns={[
                            { title: 'DRIVER NAME', field: 'student_name', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.student_name.toUpperCase()}</h5>) } },
                            { title: 'VACHECIAL NUMBER', field: 'department', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.department}</h5>) } },
                            { title: 'MOBILE NUMBER', field: 'mobile_number', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.mobile_number}</h5>) } },
                            { title: 'PORT ADDRESS', field: 'collage', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.collage.toUpperCase()}</h5>) } },
                            { title: 'START DATE', field: 'start_date', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.start_date}</h5>) } },
                            { title: 'START TIME', field: 'start_time', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.start_time}</h5>) } },
                            { title: 'END DATE', field: 'end_date', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.end_date}</h5>) } },
                            { title: 'END TIME', field: 'end_time', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.end_time}</h5>) } },
                            { title: 'INSURANCE', field: 'insurance', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.insurance}</h5>) } },
                            { title: 'LICENSE', field: 'license', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.license}</h5>) } },

                            { title: 'STATUS', field: 'status', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium', color: rowData.status === 'false' ? 'red' : rowData.status === 'true' ? 'green' : 'blue' }}>{rowData.status === 'false' ? 'Rejected' : rowData.status === 'true' ? 'Accepted' : 'Pending'}</h5>) } },

                            {
                                title: 'QR', field: 'qr', render: rowData => {
                                    // {
                                    //     console.log(rowData,'662')
                                    // }
                                    return (
                                        rowData.status === 'false' ? <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium', color: 'red' }}>Rejected</h5> : rowData.status === 'true' ?
                                            <div style={{ height: "auto", maxWidth: 64, width: "100%", cursor: 'pointer' }} onClick={() => {
                                                setstudent_name(rowData.student_name)
                                                setdep(rowData.department)
                                                setmobile_number(rowData.mobile_number)
                                                setcollage(rowData.collage)
                                                setstart_date(rowData.start_date)
                                                setend_date(rowData.end_date)
                                                setstart_time(rowData.start_time)
                                                setend_time(rowData.end_time)
                                                setinsurance(rowData.insurance)
                                                setlicense(rowData.license)
                                                setqropen(true)
                                                setid(rowData._id)
                                            }}>
                                                <QRCode
                                                    size={256}
                                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                    value={`NAME = ${rowData.student_name.toUpperCase()} , DEPARTMENT = ${rowData.department} , MOBILE_NUMBER = ${rowData.mobile_number} ,  COLLAGE = ${rowData.collage} , START_DATE = ${rowData.start_date} , END_DATE = ${rowData.end_date} , START_TIME = ${rowData.start_time} , END_TIME = ${rowData.end_time}  , INSURANCE = ${rowData.insurance} , LICENSE = ${rowData.license}  ,DRIVER_NAME = ${rowData.student_name}`}
                                                    viewBox={`0 0 256 256`}
                                                />
                                            </div>
                                            :
                                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium', color: 'blue' }}>Pending</h5>
                                    )
                                }
                            },

                        ]}
                        data={datas}

                        key={datas._id}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Food',
                                iconProps: { style: { color: "#575580" } },
                                onClick: (event, rowData) => {
                                    seteditstockdata(rowData)
                                    seteditmodalIsOpen(true)
                                }
                            },
                            localStorage.getItem('org_name') !== 'ADMIN' ?
                                rowData => ({
                                    icon: 'delete',
                                    tooltip: 'Delete User',
                                    iconProps: { style: { color: "#575580" } },
                                    onClick: (event, rowData) => {
                                        confirmAlert({
                                            title: 'Delete',
                                            message: 'Are you want to remove ' + rowData["student_name"],
                                            buttons: [
                                                {
                                                    label: 'Yes',
                                                    onClick: () => {
                                                        const options = {
                                                            url: api.CREATE_STOCK + rowData._id,
                                                            method: 'DELETE',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                            }
                                                        };

                                                        axios(options)
                                                            .then(response => {
                                                                // console.log(response);
                                                                setflag(!flag)

                                                            })

                                                            .catch(function (e) {


                                                                if (e.message === 'Network Error') {
                                                                    alert("No Internet Found. Please check your internet connection")
                                                                }

                                                                else {

                                                                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                                                                }


                                                            });


                                                    }
                                                },
                                                {
                                                    label: 'No',
                                                    onClick: () => {

                                                    }
                                                }
                                            ]
                                        });

                                    }
                                }) : ''
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            sorting: true,
                            exportButton: true,
                            pageSize: 10
                        }}
                        localization={{
                            header: {
                                actions: "ACTIONS"
                            }
                        }}
                    />
                )}
            </div>
        )
    }

}



const mapStateToProps = state => {
    return {
        login_indicator: state.loginIndicator
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onloginIndicatorChange: (loginIndicator) => dispatch({ type: actionTypes.BILLING_DATA, loginIndicator: loginIndicator }),

    }
};

export default windowSize(connect(mapStateToProps, mapDispatchToProps)(CustomEditComponent));

