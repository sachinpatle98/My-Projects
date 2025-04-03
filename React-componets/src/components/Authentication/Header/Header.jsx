import React from 'react'
import { Col, Row } from 'react-bootstrap'
import UserMenu from '../Dashboard/UserMenu'
import { logout } from '../../../apiServices/apiService';
import { useNavigate } from 'react-router-dom';
import showAlert from '../utils/showAlert';

const Header = () => {
    const navigate = useNavigate();


    const handleLogout = async () => {
        const response = await logout();
        if (response.statusCode === 200) {
            localStorage.removeItem("token");
            showAlert("success", "Logout Successful", "Logged out successfully!");
            navigate("/project/1/auth/login");
        } else {
            console.error(response.message);
        }
    };

    return (

        <Row className="py-3 bg-primary text-white d-flex align-items-center">
            <Col className="d-flex justify-content-start">
                <img src="/assets/img/dash-logo1.png" alt="dash-logo" width={65} height={50} />
                <h5 className="text-black pt-2 ">Auth</h5>
            </Col>
            <Col className="d-flex justify-content-end">
                <UserMenu handleLogout={handleLogout} />
            </Col>
        </Row>

    )
}

export default Header
