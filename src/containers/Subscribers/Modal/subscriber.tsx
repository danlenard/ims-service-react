import React, { useState, useEffect } from "react";
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, 
  FormControlLabel, Checkbox, MenuItem 
} from "@mui/material";
import { Subscriber, DEFAULT_SUBSCRIBER } from "../../../types/subscriber";

interface SubscriberFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Subscriber) => void;
  subscriber?: Subscriber;
}

const SubscriberForm: React.FC<SubscriberFormProps> = ({ open, onClose, onSubmit, subscriber }) => {
  const isEditMode = !!subscriber;

  const [formData, setFormData] = useState<Subscriber>(DEFAULT_SUBSCRIBER);

  useEffect(() => {
    if (isEditMode && subscriber) {
      setFormData(subscriber);
    } else {
      setFormData(DEFAULT_SUBSCRIBER);
    }
  }, [subscriber, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        callForwardNoReply: {
          ...prev.features.callForwardNoReply,
          provisioned: e.target.checked,
          destination: e.target.checked ? prev.features.callForwardNoReply.destination : "",
        },
      },
    }));
  };

  const handleFeatureDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        callForwardNoReply: {
          ...prev.features.callForwardNoReply,
          destination: e.target.value,
        },
      },
    }));
  };

  const isFormValid =
    formData.phoneNumber.trim() !== "" &&
    formData.username.trim() !== "" &&
    formData.domain.trim() !== "" &&
    (!formData.features.callForwardNoReply.provisioned ||
      formData.features.callForwardNoReply.destination.trim() !== "");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? "Edit Subscriber" : "Add Subscriber"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          disabled={isEditMode}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          required
        />
        <TextField
          select
          fullWidth
          margin="dense"
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={!isEditMode}
        >
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="INACTIVE">Inactive</MenuItem>
          <MenuItem value="SUSPENDED">Suspended</MenuItem>
          <MenuItem value="DELETED">Deleted</MenuItem>
        </TextField>

        {/* Features Section */}
        <FormControlLabel
          control={<Checkbox checked={formData.features.callForwardNoReply.provisioned} onChange={handleFeatureChange} />}
          label="Enable Call Forward No Reply"
        />
        {formData.features.callForwardNoReply.provisioned && (
          <TextField
            fullWidth
            margin="dense"
            label="Destination"
            name="destination"
            value={formData.features.callForwardNoReply.destination}
            onChange={handleFeatureDestinationChange}
            required
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSubmit(formData)} color="primary" variant="contained" disabled={!isFormValid}>
          {isEditMode ? "Save Changes" : "Add Subscriber"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriberForm;
