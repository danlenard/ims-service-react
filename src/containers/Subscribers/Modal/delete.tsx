import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Checkbox, FormControlLabel } from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  phoneNumber: string | null;
  onClose: () => void;
  onConfirm: (hardDelete: boolean) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, phoneNumber, onClose, onConfirm }) => {
  const [hardDelete, setHardDelete] = useState(false);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete subscriber <strong>{phoneNumber}</strong>?
        </DialogContentText>
        <FormControlLabel
          control={<Checkbox checked={hardDelete} onChange={(e) => setHardDelete(e.target.checked)} />}
          label="Permanently delete subscriber (hard delete)"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={() => onConfirm(hardDelete)} color="error" variant="contained">
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
