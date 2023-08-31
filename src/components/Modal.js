import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'

function Modal({open, onClose, content}) {
  return (
    <div>
        <Dialog open={open} 
        >
            <div className="w-96">
                <DialogContent>
                    <div className='font-semibold text-xl'>
                        {content}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    </div>
  )
}

export default Modal