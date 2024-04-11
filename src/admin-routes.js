import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
const StocksIn = React.lazy(() => import('./BillingApp_Components/StocksIn/StocksIn'));
const Login = React.lazy(() => import('./BillingApp_Components/Authentication/SignIn/SignIn1'));
const UserCreations = React.lazy(() => import('./BillingApp_Components/UserCreations/UserCreations'));
const Attendance = React.lazy(() => import('./BillingApp_Components/StocksIn/Attendance'));

const routes = [
    { path: '/StocksIn/StocksIn', exact: true, name: 'Default', component:StocksIn },
    { path: '/Login', exact: true, name: 'Default', component:Login } ,
    { path: '/UserManagement/UserManagement', exact: true, name: 'Default', component:UserCreations },
    { path: '/StocksIn/Attendance', exact: true, name: 'Default', component:Attendance },

];

export default routes;