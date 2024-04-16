import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Modal from 'react-modal';
import CreateUser from './CreateUser';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as api from '../Configurations/Api_Details'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import windowSize from 'react-window-size';
import { Switch } from '@material-ui/core';

import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";
import {
    Button,

} from 'react-bootstrap';
import Edit_User_Data from './Edit_User_Data';

const customStyles = {
    content: {
        top: '35%',
        left: '58%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '70%',
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

    },
    overlay: { zIndex: 1000 }
};

Modal.setAppElement('#root')

function CustomEditComponent(props) {
       

    const [loader, setloader] = useState(1);
    const [flag, setflag] = useState('');

    const [modalIsOpen, setIsOpen] = useState(false);
    const [editmodalIsOpen, seteditmodalIsOpen] = useState(false);
    const [editstockdata, seteditstockdata] = useState([]);
    const [datas, setdatas] = useState([]);

        
    const [data, setData] = useState(null);

    useEffect(() => {
        let isMounted = true; // Variable to track if the component is mounted

        async function fetchData() {
            const user_id = localStorage.getItem('user_id');
            const option = {
                url: "http://localhost:5008/document_create_id",
                method: "POST",
                data: {
                    "user_id": String(user_id)
                }
            };
            console.log(option);
            setloader(0);
            try {
                const res = await axios(option);
                console.log(res.data);
                if (isMounted) {
                    setData(res.data); // Update state only if component is mounted
                    setloader(1);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        return () => {
            isMounted = false; // Cleanup function to set isMounted to false when component unmounts
        };
    },[flag])


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
            console.log(res.data);
            setdatas(res.data)

        }).catch((e)=>{
            console.log(e);
        })
    },[flag])

   


    
    
    function closeModal() {
        setIsOpen(false);

    }

    function getResponse(result) {
        setIsOpen(false);
        seteditmodalIsOpen(false)
        setflag(!flag)
    }


    


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
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <CreateUser
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
                    <Edit_User_Data
                        callback={getResponse}
                        data={editstockdata}
                        relation_datas={datas}

                    />
                </Modal>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <Button
                        variant={"primary"}
                        style={{ fontWeight: 'bold', fontSize: 17 }}
                        onClick={(e) => {
                            setIsOpen(true)
                        }}
                    >
                        + ADD DOCUMENT
                    </Button>
                </div>
                <MaterialTable
                    title="DOCUMENT  CREATIONS"
                    columns={[
                        { title: 'DOCUMENT NAME', field: 'name', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.doc_name}</h5>) } },
                        { title: 'DOCUMENT IMAGE', field: 'doc_file', render: rowData => {
                            const fileExtension = rowData.doc_file.split('.').pop(); 
                            if (fileExtension === 'pdf') {
                                return <iframe style={{ width: "200px", height: "200px" }} src={rowData.doc_file} />;
                            } else if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
                                return <img style={{ width: "200px", height: "200px" }} src={rowData.doc_file} />;
                            } else {
                                return <span>Unsupported file type</span>; // Handle unsupported file types
                            }
                        }},
                        

                        { title: 'DOCUMENT TYPE', field: 'mobile_number', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.doc_type}</h5>) } },
                        { title: 'DESCRIPTION', field: 'password', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.description}</h5>) } },
                    ]}


                    data={data}
                    // key={data._id}
                    
                    actions={[
                        {
                            icon: 'share',
                            tooltip: 'Share the Document',
                            iconProps: { style: { color: "#575580" } },
                            onClick: (event, rowData) => {
                                seteditstockdata(rowData)
                                seteditmodalIsOpen(true)



                            }
                        },
                    //     rowData => ({
                    //         icon: 'delete',
                    //         tooltip: 'Delete User',
                    //         iconProps: { style: { color: "#575580" } },
                    //         onClick: (event, rowData) => {
                    //             confirmAlert({
                    //                 title: 'Delete',
                    //                 message: 'Are you sure to do this ?',
                    //                 buttons: [
                    //                     {
                    //                         label: 'Yes',
                    //                         onClick: () => {
                    //                             const options = {
                    //                                 url: api.CREATE_CLIENT_USER + rowData._id,
                    //                                 method: 'DELETE',
                    //                                 headers: {
                    //                                     'Content-Type': 'application/json',
                    //                                     // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                    //                                 }
                    //                             };

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


                    //                         }
                    //                     },
                    //                     {
                    //                         label: 'No',
                    //                         onClick: () => {

                    //                         }
                    //                     }
                    //                 ]
                    //             });

                    //         }
                    //     })
                    ]}
                    options={{
                        search: false,
                        pageSize: 10
                    }}
                    localization={{
                        header: {
                            actions: "SHARE"
                        }
                    }}
                />
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

