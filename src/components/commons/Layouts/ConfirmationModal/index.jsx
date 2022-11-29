import React, { useRef, useState } from 'react';
import "./style.css"
import { FaTimesCircle } from 'react-icons/fa';

function ConfirmationModal({ onPopup,id,action }) {
  const [isVisible,setIsVisible] = useState(onPopup)
  console.log('show',onPopup);
  const refModal=useRef()
  const handleClosePopup=(e)=>{
   refModal.current.style.display="none";
    setIsVisible(false)
  }
  console.log('handlePopup',isVisible)
  const handleDelete=(id)=>{

  }
  return (
    <div id="myModal" ref={refModal} className='modal' style={{display: onPopup?'block': 'none'}}
    >
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header flex-column">
            <div className="icon-box">
              <FaTimesCircle />
            </div>
            <h4 className="modal-title w-100">Are you sure?</h4>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div className="modal-body">
            <p>Do you really want to delete these records? This process cannot be undone.</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-secondary"
                    onClick={(e)=>handleClosePopup(e)}
                    data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger"
                    onClick={()=>handleDelete(id)}
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;