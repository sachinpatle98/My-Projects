import React from "react";
import { FaSearch } from "react-icons/fa";
import appIcon from "/assets/img/icon.png";
import userIcon from "/assets/img/user1.avif";
import GoogleImg from "/assets/img/google.svg";
import mic from "/assets/img/mic.svg";
import camera from "/assets/img/camera.svg";
import gmail from "/assets/img/gmail.png";
import linkedin from "/assets/img/linkedin.svg";
import github from "/assets/img/github.png";
import GPT from "/assets/img/chatgpt.svg";
import youtube from "/assets/img/youtube.png";
import watsapp from "/assets/img/whatsapp.svg";
import deepseek from "/assets/img/deepseek.svg";
import './Google.css'

const usedApps = [
    { img: gmail, name: "Gmail" },
    { img: linkedin, name: "LinkedIn" },
    { img: github, name: "GitHub" },
    { img: GPT, name: "GPT" },
    { img: youtube, name: "YouTube" },
    { img: watsapp, name: "WhatsApp" },
    { img: deepseek, name: "DeepSeek" },
];

const Google = () => {
    return (
        <div>
            <div className="d-flex justify-content-end p-3">
                <ul className="list-unstyled d-flex align-items-center gap-3 m-0">
                    <li>Gmail</li>
                    <li>Images</li>
                    <li>
                        <i className="fa-solid fa-flask"></i>
                    </li>
                    <li>
                        <img src={appIcon} alt="appIcon" style={{ width: "26px" }} />
                    </li>
                    <li>
                        <img
                            src={userIcon}
                            alt="userIcon"
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                            }}
                        />
                    </li>
                </ul>
            </div>
            <div className="p-5 d-flex align-items-center justify-content-center">
                <img className="width-92px height-272px" src={GoogleImg} alt="" />
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4">
                <div className="google-search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search Google or type a URL"
                        className="google-search-input"
                    />
                    <div className="icon-container">
                        <img src={mic} className="mic-icon" />
                        <img src={camera} className="camera-icon" />
                    </div>
                </div>

            </div>
            <div className="d-flex align-items-center justify-content-center pt-4 flex-wrap gap-4" style={{ maxWidth: "340px", margin: "0 auto" }}>
                {usedApps.map((item, index) => (
                    <React.Fragment key={index}>
                        {index === 5 && <div className="w-100"></div>}
                        <div key={index} className=" d-flex flex-column align-items-center">
                            <div style={{ background: "#D3D3D3", borderRadius: "50%", width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img width={35} height={35} src={item.img} alt={item.name} />
                            </div>
                            <span style={{ fontSize: "13px" }} className="mt-2 text-center">{item.name}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Google;
