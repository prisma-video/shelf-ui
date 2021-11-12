import React from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';

const AdminView = ({ mode }) => {

    
    let targetPage;
    switch(mode) {
        case "howitworks":
            break;
        case "pricing":
            break;
        default:
            targetPage = <AdminDashboard />
    }

    return (
    <>
    {/* <section className="section"></section> */}
    <div className="section">
        {targetPage}
    </div>
    </>

    );
}
export default AdminView;