import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import axios from 'axios';
import * as api from '../../Configurations/Api_Details'
import windowSize from 'react-window-size';
// import image from './ADMIN-2.jpg'
import image from './ww.jpg'
function SignUp1(props) {
    const [username, setusername] = useState("");
    const [usertype, setusertype] = useState("User");
    const [oprator_id, setoprator_id] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [login, setlogin] = useState("login");
    const [flag, setflag] = useState(0);

    useEffect(() => {
        if (flag == 0) {
            localStorage.clear();
        }

    }, [flag])



    const signup = (e) => {
        e.preventDefault();
        if(username =='' && password =='' && email ==''){
            alert('please enter the username and password')
        }
        else{
            const options={
                url:"http://192.168.1.122:5000/",
                method:"post",
                data:{
                    "username":username,
                    "password":password,
                    "email":email,

                }
            }
            axios(options).then((res)=>{
                console.log(res.data);
            }).catch((e)=>{
                console.log(e);
            })
        }

    }
    function Login(e) {
        e.preventDefault();
        if (username == "" && password == "") {
            alert("Please Enter Valid Username and Password");
        }
        // else if (username == "admin" && password == "admin" && usertype == "Admin") {
        //     localStorage.setItem('dfudfkj', "SA");
        //     localStorage.setItem('org_name', "ADMIN");
        //     localStorage.setItem('&s47$sfblm#5dfn', "88iifjd&^*^ddsd*^*sdffdf9987**assjsdjsd xxshddfkjdkfieru");
        //     localStorage.setItem('Client_Id', "1");
        //     localStorage.setItem('435dfsduduf', "4v3fr42dnsdhc_sfjh7_3449rgdjgfgjdfitdgkljdfgneret874sdfsd5574758wer8er)sddfgdffewr");
        //     localStorage.setItem('945d5fsdudu', "447v4dnsdhc_sfjh7_34@f4II88ert3f54654*&%*&&^4esdfkjert58345*(&wesdfrdd845345rge");
        //     localStorage.setItem('47rufjheh55', "4672dnsdhc_sfjh7_34@f4II888**3dfbdfe" + "1" + "sdfkjfsd4488745)((*57475" + "1" + "8wer8er89789erbf8vb");
        //     localStorage.setItem('435ererdscf', "4v3fr42dnsdhc_sfjh7_34@slfkj88*4357nfkhseadminf9934k448874sdfsd5574758weradmin8er)sddfgdff");
        //     localStorage.setItem('*sfk38f458e', "4v3fr42dnsdhc_sfjh7_34@slfkj8s8*4357nfkhsef99admin34k448874sdfsd557475dfgfdgdfgfdgdfg");
        //     window.history.replaceState(null, null, "/UserManagement/UserManagement");
        //     setflag(1)
        //     window.location.reload();
        // }


        else if (usertype == 'User') {

            const option = {
                "username": username,
                "password": password,

            }
            axios(option).then((res) => {
                if (res.status == true) {

                }
            })

        }

        else if (usertype == "Relation") {

            // localStorage.setItem('dfudfkj', "CA");
            // localStorage.setItem('org_name', "STUDENT");

            // localStorage.setItem('&s47$sfblm#5dfn', "347fbxsdf*&^h&98sf*sdhfni*BDgdd&^%sdfg78&sdfHDje7574");
            // localStorage.setItem('Client_Id', username);
            // localStorage.setItem('435dfsduduf', "4v3fr42dnsdhc_sfjh7_3449rgdjgfgjdfitdgkljdfgneret874sdfsd5574758wer8er)sddfgdffewr");
            // localStorage.setItem('945d5fsdudu', "447v4dnsdhc_sfjh7_34@f4II88ert3f54654*&%*&&^4esdfkjert58345*(&wesdfrdd845345rge");
            // localStorage.setItem('47rufjheh55', "4672dnsdhc_sfjh7_34@f4II888**3dfbdfe" + username + "sdfkjfsd4488745)((*57475" + username + "8wer8er89789erbf8vb");
            // localStorage.setItem('435ererdscf', "4v3fr42dnsdhc_sfjh7_34@slfkj88*4357nfkhsef9934k448874sdfsd5574758wer8er)sddfgdff");
            // localStorage.setItem('*sfk38f458e', "4v3fr42dnsdhc_sfjh7_34@slfkj8s8*4357nfkhsef9934k448874sdfsd557475dfgfdgdfgfdgdfg");
            // window.history.replaceState(null, null, "/MedicineBooking/MedicineBooking");
            // setflag(1)
            // window.location.reload();

            const userDetails = {
                "user_name": username,
                "password": password
            }
            const validateUser = {
                url: api.LOGIN,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(userDetails)
            }

            console.log(userDetails)
            axios(validateUser)
                .then(response => {
                    console.log(response.data)

                    if (response.data.success == true) {
                        localStorage.setItem('dfudfkj', "CA");
                        localStorage.setItem('org_name', "STUDENT");

                        localStorage.setItem('&s47$sfblm#5dfn', "347fbxsdf*&^h&98sf*sdhfni*BDgdd&^%sdfg78&sdfHDje7574");
                        localStorage.setItem('Client_Id', username);
                        localStorage.setItem('435dfsduduf', "4v3fr42dnsdhc_sfjh7_3449rgdjgfgjdfitdgkljdfgneret874sdfsd5574758wer8er)sddfgdffewr");
                        localStorage.setItem('945d5fsdudu', "447v4dnsdhc_sfjh7_34@f4II88ert3f54654*&%*&&^4esdfkjert58345*(&wesdfrdd845345rge");
                        localStorage.setItem('47rufjheh55', "4672dnsdhc_sfjh7_34@f4II888**3dfbdfe" + username + "sdfkjfsd4488745)((*57475" + username + "8wer8er89789erbf8vb");
                        localStorage.setItem('435ererdscf', "4v3fr42dnsdhc_sfjh7_34@slfkj88*4357nfkhsef9934k448874sdfsd5574758wer8er)sddfgdff");
                        localStorage.setItem('*sfk38f458e', "4v3fr42dnsdhc_sfjh7_34@slfkj8s8*4357nfkhsef9934k448874sdfsd557475dfgfdgdfgfdgdfg");
                        window.history.replaceState(null, null, "/MedicineBooking/MedicineBooking");
                        setflag(1)
                        window.location.reload();
                    }
                    else {
                        alert("Give User Name and Password is Incorrect")
                    }
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

        else {
            alert("Give User Name and Password is Incorrect")


        }


    }

    return (
        <Aux>
            <div className="auth-wrapper" style={{
                backgroundImage: `url(${image})`,
                // backgroundImage: 'linear-gradient(to right, #57b578, #4ad47a)',
                // backgroundColor:'line',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh'
            }}>
                <div className="auth-content">

                    {login == 'login' ? <div className="card">
                        <form onSubmit={Login}>
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" />
                                    {/* <img src={logo} alt="" style={{width:70,height:70}}/> */}

                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <select className="form-control" value={usertype} onChange={(e) => setusertype(e.target.value)}>
                                        <option className="form-control" value="User" >User</option>
                                        <option className="form-control" value="Relation">Relation </option>
                                    </select>
                                </div>


                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="User Name" value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>


                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                </div>
                                <div style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <button className="btn btn-primary shadow-2 mb-4" onClick={Login} type="submit">Login</button>
                                    <p style={{ textDecoration: 'underline', cursor: "pointer" }} onClick={() => { setlogin('sign-up');setusername('');setpassword('') }}>Sign-up</p>

                                </div>

                            </div>
                        </form>
                    </div> :

                        <div style={{ backgroundColor: "white" }} className="auth-content">
                            <form onSubmit={signup}>
                                <div className="card-body text-center">
                                    <div className="mb-4">
                                        <i className="feather icon-unlock auth-icon" />
                                        {/* <img src={logo} alt="" style={{width:70,height:70}}/> */}

                                    </div>
                                    <h3 className="mb-4">Sign-Up</h3>



                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="User Name" value={username} onChange={(e) => setusername(e.target.value)} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
                                    </div>


                                    <div className="input-group mb-4">
                                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    </div>
                                    <button className="btn btn-primary shadow-2 mb-4" onClick={signup} type="submit">sign-up</button>
                                    <p style={{ textDecoration: 'underline', cursor: "pointer" }} onClick={() => { setlogin('login');setusername('');setpassword('');setemail('') }}>login</p>
                                </div>
                            </form>
                        </div>
                    }
                </div>

            </div>
        </Aux>
    );

}

export default windowSize(SignUp1);
