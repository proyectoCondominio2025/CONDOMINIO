import React from 'react';
import { FaEdit } from 'react-icons/fa';

const ProfileField = ({ label, value }) => {
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center justify-content-between gap-3">
        <div className="flex-grow-1">
          <small className="text-muted" style={{ fontSize: '0.85rem' }}>{label}</small>
          <div className="d-flex align-items-center gap-2 pt-1">
            <input 
              type="text" 
              value={value}
              className="form-control-plaintext p-0 border-0" 
              style={{ color: '#2A3F4F', fontWeight: '500' }}
              readOnly
            />
            <button className="btn btn-link p-0" style={{ color: '#AFD3D1' }}>
              <FaEdit size={16}/>
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-2" style={{ opacity: '0.3' }}/>
    </div>
  );
};

export default ProfileField;