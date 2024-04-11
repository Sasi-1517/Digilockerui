import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import windowSize from 'react-window-size';
import MaterialTable from 'material-table';
import axios from 'axios';

function FormsElements(props) {
    const [document, setDocument] = useState(props.data);
    const [relation, setRelation] = useState(props.relation_datas);
    const [selectedIds, setSelectedIds] = useState([]);

    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    }
    
    console.log('====================================');
    console.log(selectedIds);
    console.log('====================================');
    console.log(props.data._id);

    
    return (
<Row style={{height:"500px"}}>
            <Col >
                <Card style={{width:'100%'}}>
                    <Card.Body>
                        <h5>SHARE THE DOCUMENT</h5>
                        <hr />
                        <Row>
                            <MaterialTable style={{width:"100%"}}
                                title="RELATION LIST"
                                columns={[
                                    {
                                        title: 'SHARE',
                                        render: rowData => (
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(rowData._id)}
                                                onChange={() => handleCheckboxChange(rowData._id)}
                                            />
                                        )
                                    },
                                    {
                                        title: 'NAME',
                                        field: 'user_name',
                                        render: rowData => (
                                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.name}</h5>
                                        ),
                                    },
                                    {
                                        title: 'EMAIL',
                                        field: 'vehicle_number',
                                        render: rowData => (
                                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.email}</h5>
                                        ),
                                    },
                                    {
                                        title: 'AGE',
                                        field: 'insurance_number',
                                        render: rowData => (
                                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.age}</h5>
                                        ),
                                    },
                                    {
                                        title: 'RELATION TYPE',
                                        field: 'in_date',
                                        render: rowData => (
                                            <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.relation_type}</h5>
                                        ),
                                    },
                                ]}
                                data={relation}
                                options={{
                                    actionsColumnIndex: -1,
                                    sorting: true,
                                    exportButton: true,
                                    pageSize: 6,
                                }}
                                localization={{
                                    header: {
                                        actions: 'ACTIONS',
                                    },
                                }}
                            />
                              <div style={{ marginLeft: 15 ,marginTop:20}}>
                                <Button variant="primary" onClick={()=>{
                                    const option ={
                                        url:'http://localhost:5008/document_send_relation',
                                        method:"PUT",
                                        data:{
                                            "relation_ids":selectedIds,
                                            "id":String(props.data._id),
                                        }
                                        
                                    }
                                    console.log(option);
                                    axios(option).then((res)=>{
                                        console.log(res.data);
                                        props.callback()
                                    }).catch((e)=>{
                                        console.log(e);
                                    })
                                    
                                }}>SHARE</Button>
                            </div>
                            <div style={{ marginLeft: 15 ,marginTop:20}}>
                                <Button variant="primary" onClick={props.callback}>CANCEL</Button>
                            </div>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default windowSize(FormsElements);
