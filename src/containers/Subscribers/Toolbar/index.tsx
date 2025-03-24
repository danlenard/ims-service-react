import React from "react";
import { Box } from "@mui/material";
import SearchField from "./SearchField";
import AddButton from "./AddButton";

interface Props {
  searchQuery: string;
  onAdd: () => void;
  setSearchQuery: (query: string) => void;
}

const Toolbar: React.FC<Props> = ({ searchQuery, onAdd, setSearchQuery }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "2fr 1fr" }}
      gap={2}
      alignItems="center"
      sx={{ marginBottom: 2 }}
    >
      <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box sx={{ textAlign: "right" }}>
        <AddButton onAdd={onAdd}/>
      </Box>
    </Box>
  );
};

export default Toolbar;