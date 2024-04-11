import React, { useEffect, useState } from 'react';
import * as api from '../Configurations/Api_Details';
import axios from 'axios';
import MaterialTable from 'material-table';

function Attendance() {
    const [duplicatesArray, setDuplicatesArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    url: api.ATTENDANCE,
                    method: 'POST',
                    data: {
                        id: 'admin',
                    },
                };

                const res = await axios(options);

                if (Array.isArray(res.data) && res.data.length > 0) {
                    const uniqueItems = new Map();
                    const tempDuplicatesArray = [];

                    res.data.forEach(item => {
                        const requestId = item.request_id;

                        if (uniqueItems.has(requestId)) {
                            const originalItem = uniqueItems.get(requestId);
                            tempDuplicatesArray.push(originalItem, item);
                        } else {
                            uniqueItems.set(requestId, item);
                        }
                    });

                    setDuplicatesArray(tempDuplicatesArray);
                } else {
                    console.error('Invalid array format or empty array');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <MaterialTable
            title="USER MANAGEMENT"
            columns={[
                {
                    title: 'DRIVER NAME',
                    field: 'user_name',
                    render: rowData => (
                        <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>
                            {rowData.user_name.toUpperCase()}
                        </h5>
                    ),
                },
                // Add more columns as needed
            ]}
            data={duplicatesArray}
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
    );
}

export default Attendance;
