import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
const MedicineBooking = React.lazy(() => import('./BillingApp_Components/StocksIn/StocksIn'));
const DoctorBooking = React.lazy(() => import('./BillingApp_Components/DoctorBooking/DoctorBooking'));
const LabTest = React.lazy(() => import('./BillingApp_Components/LabTest/LabTest'));
const Account = React.lazy(() => import('./BillingApp_Components/Account/Account'));
const Login = React.lazy(() => import('./BillingApp_Components/Authentication/SignIn/SignIn1'));
const CartDetails = React.lazy(() => import('./BillingApp_Components/MedicineBooking/CartDetails'));

const routes = [
    { path: '/MedicineBooking/MedicineBooking', exact: true, name: 'Default', component:MedicineBooking },
    { path: '/MedicineBooking/CartDetails', exact: true, name: 'Default', component:CartDetails },
    { path: '/DoctorBooking/DoctorBooking', exact: true, name: 'Default', component:DoctorBooking },
    { path: '/LabTest/LabTest', exact: true, name: 'Default', component:LabTest },
    { path: '/Account/Account', exact: true, name: 'Default', component:Account },
    { path: '/Login', exact: true, name: 'Default', component:Login } ,


];

export default routes;