import React from 'react';
import '../Spots/DeleteSpotModal.css';

export const DeleteReviewModal = ({ onCancel, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Confirm Delete</h4>
                    <p>Are you sure you want to delete this review?</p>
                </div>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>
                        Yes (Delete Review)
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        No (Keep Review)
                    </button>
                </div>
            </div>
        </div>
    );
};
