import React, { useEffect, useState } from 'react';
import "../CardDetails.css";
import MaterialTable from 'material-table';
import axios from 'axios';
import fileDownload from "js-file-download";

const App = () => {
    const [data, setData] = useState([]);

    const handleDownload = (url) => {
        // Extract filename from the URL
        const filename = url.substring(url.lastIndexOf('/') + 1);
        
        // Use axios to fetch the file as a blob
        axios.get(url, { responseType: 'blob' })
            .then((response) => {
                // Determine the content type based on the file extension
                const contentType = response.headers['content-type'];

                // Use js-file-download to initiate the download
                fileDownload(response.data, filename, contentType);
            })
            .catch((error) => {
                console.error('Error downloading file:', error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5008/document_create_id', {
                    user_id: String(localStorage.getItem('relation_user_id'))
                });
                console.log(response.data);
                const filteredData = response.data.filter(item => item.relation_ids.includes(localStorage.getItem('relation_id')));
                setData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <MaterialTable
            title="DOCUMENT LIST"
            columns={[
                { title: 'DOCUMENT NAME', field: 'name', render: rowData => <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.doc_name}</h5> },
                { title: 'DOCUMENT IMAGE', field: 'doc_file', render: rowData => {
                    const fileExtension = rowData.doc_file.split('.').pop(); 
                    if (fileExtension === 'pdf') {
                        return <iframe style={{ width: "100px", height: "100px" }} src={rowData.doc_file} />;
                    } else if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
                        return <img style={{ width: "100px", height: "100px" }} src={rowData.doc_file} />;
                    } else {
                        return <span>Unsupported file type</span>; // Handle unsupported file types
                    }
                }},
                { title: 'MOBILE NUMBER', field: 'mobile_number', render: rowData => <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.pho_no}</h5> },
                { title: 'DESCRIPTION', field: 'password', render: rowData => <h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.description}</h5> },
                {
                    title: 'DOWNLOAD',
                    field: 'password',
                    render: rowData => (
                        <a
                            href={rowData.doc_file}
                            style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}
                            onClick={(e) => {
                                e.preventDefault();
                                handleDownload(rowData.doc_file);
                            }}
                        >
                            Download
                        </a>
                    )
                }
            ]}
            // actions={[
            //     // {
            //     //     icon: 'visibility',
            //     //     tooltip: 'View Document',
            //     //     iconProps: { style: { color: "#575580" } },
            //     //     onClick: (event, rowData) => {
            //     //         rowData.doc_file
            //     //     }
            //     // },
            //     // {
            //     //     icon: 'cloud_download',
            //     //     tooltip: 'Download Document',
            //     //     iconProps: { style: { color: "#575580" } },
            //     //     onClick: (event, rowData) => {
            //     //         handleDownload(rowData.doc_file);
            //     //     }
            //     // }
            // ]}
            data={data}
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
    );
};

export default App;
