import React from "react";
import { TextField } from "@mui/material";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchField: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      fullWidth
      label="Search Subscriber"
      variant="outlined"
      size="small"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchField;