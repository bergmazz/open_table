import React, { useState } from 'react';
import './DeleteRestaurant.css'



export default function DeleteRestaurantModal ({isOpen, onCancel, onDelete, onClose}) {
    if (!isOpen) return null;


const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
}

return (
    <div className="delete-modal-overlay" onClick={handleOverlayClick}>
        <div className="delete-modal">
            <div className="delete-modal-header">
                <h2>Are you sure you want to remove your restaurant?</h2>
                <div className='delete-modal-buttons'>
                    <button className='delete-modal-cancel' onClick={onCancel}>Cancel</button>
                    <button className='delete-modal-delete' onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    </div>
)
}
