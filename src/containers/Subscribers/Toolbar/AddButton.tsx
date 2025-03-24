import React from "react";
import { Button } from "@mui/material";

interface Props {
  onAdd: () => void;
}

const AddButton: React.FC<Props> = ({onAdd}) => {
  return (
    <Button variant="contained" color="primary" onClick={()=> onAdd()}>
      Add Subscriber
    </Button>
  );
};

export default AddButton;