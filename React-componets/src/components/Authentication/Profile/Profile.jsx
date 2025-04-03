import React from "react";
import { Modal, Button } from "react-bootstrap";

const Profile = ({ profileData, closeModal }) => {
  return (
    <Modal show={!!profileData} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {profileData ? (
          <div>
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Profile;
