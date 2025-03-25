import './DeleteSpotModal.css';

const DeleteSpotModal = ({ onCancel, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Confirm Delete</h4>
                    <p>Are you sure you want to remove this spot?</p>
                </div>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>
                        Yes (Delete Spot)
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        No (Keep Spot)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteSpotModal;
