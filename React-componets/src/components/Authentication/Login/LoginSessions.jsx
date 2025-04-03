import React, { useEffect, useState } from "react";
import { getUserLoginSessions } from "../../../apiServices/apiService";
import { formatDate } from './../utils/utilities';
import * as XLSX from "xlsx";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const LoginSessions = () => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(8);

    // Filter sessions based on date range
    const filterSessionsByDate = () => {
        if (startDate && endDate) {
            return sessions.filter(session => {
                const sessionDate = new Date(session.timestamp);
                return sessionDate >= new Date(startDate) && sessionDate <= new Date(endDate);
            });
        }
        return sessions;
    };

    const getDeviceType = (userAgent) => {
        if (!userAgent) return "Unknown";
        if (/windows/i.test(userAgent)) return "Windows";
        if (/android/i.test(userAgent)) return "Android";
        if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
        if (/macintosh|mac os x/i.test(userAgent)) return "MacOS";
        if (/linux/i.test(userAgent)) return "Linux";
        return "Unknown";
    };

    const handleExport = () => {
        const filteredSessions = filterSessionsByDate();
        const formattedData = filteredSessions.map((session, index) => ({
            SrNo: index + 1,
            Device: getDeviceType(session.device),
            "IP Address": session.ip,
            "Date & Time": formatDate(session.timestamp),
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Login Sessions");
        XLSX.writeFile(wb, "Login_Sessions.xlsx");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchSessions = async () => {
            try {
                if (!token) {
                    setError("User not authenticated");
                    setLoading(false);
                    return;
                }

                const sessionData = await getUserLoginSessions(token);
                setSessions(sessionData);

                if (Array.isArray(sessionData.data)) {
                    setSessions(sessionData.data);
                } else {
                    setError("Invalid session data format");
                }
            } catch (err) {
                setError("Failed to fetch login sessions");
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const currentSessions = filterSessionsByDate().slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    // Handle page click
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <div className="container mt-4">
            <p className="bg-primary" style={{ position: "absolute", top: "10px", left: "10px", borderRadius: "2px", cursor: "pointer" }}>
                <span onClick={() => navigate("/project/1/auth/dashboard")} className="text-decoration-none me-1 text-white">
                    <i className="fas fa-long-arrow-alt-left" style={{ color: "white" }}></i> Back
                </span>{" "}
            </p>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Login Sessions</h2>

                {/* Export Button on the right */}
                <button
                    onClick={handleExport}
                    className="btn btn-primary"
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                    Export to Excel
                </button>
            </div>

            {/* Date Filter (horizontally aligned) */}
            <div className="mb-3 d-flex align-items-center">
                <label htmlFor="startDate" className="form-label me-2">From</label>
                <input
                    type="date"
                    id="startDate"
                    className="form-control me-3"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="endDate" className="form-label me-2">To</label>
                <input
                    type="date"
                    id="endDate"
                    className="form-control me-3"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            {/* Table for displaying sessions */}
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Device</th>
                        <th>IP Address</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4" className="text-center">Loading...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan="4" className="text-center text-danger">{error}</td>
                        </tr>
                    ) : currentSessions.length > 0 ? (
                        currentSessions.map((session, index) => (
                            <tr key={index}>
                                <td>{(currentPage * itemsPerPage) + (index + 1)}</td>
                                <td>{getDeviceType(session.device)}</td>
                                <td>{session.ip}</td>
                                <td>{formatDate(session.timestamp)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No login sessions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={Math.ceil(filterSessionsByDate().length / itemsPerPage)}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
            />
        </div>
    );
};

export default LoginSessions;
