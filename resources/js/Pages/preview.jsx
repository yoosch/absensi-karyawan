import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Preview ({ photo, address, time }) {


    return (
        <div className="preview-container">
            {/* Display the captured photo */}
            <h1>kontol</h1>
            <div className="photo-preview">
                <img src={photo} alt="Captured" />
            </div>

            {/* Display the address with location logo */}
            <div className="address-container">
                <h1>
                    fufufafa : <span>{address}</span>
                </h1>
            </div>

            {/* Display the current time */}
            <div className="time-container">
                <h1>
                Current Time : <span>{time}</span>

                </h1>
            </div>

            {/* Submit button */}
            <button className="submit-button">Submit</button>
        </div>
    );
}


