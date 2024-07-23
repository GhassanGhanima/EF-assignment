import React from 'react';
export interface ApproveDeleteProps {
    onSubmit:  () => void;
    onClose: () => void;
  
  }
const ApproveDelete:React.FC<ApproveDeleteProps>  = ({ onSubmit ,onClose}) => {
    return (
        <>
            <h4 className='mb-3'> Are you sure you went to delete ?</h4>
               <div className='modal-actions'>
               <button className='btn btn-secondary' title="close"  type='button' onClick={onClose}>close</button>
               <button className='btn btn-primary' type="button" title="Submit" onClick={onSubmit}>Submit</button>
           </div>
           </>
    );
}

export default ApproveDelete;
