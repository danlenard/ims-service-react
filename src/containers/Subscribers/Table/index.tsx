import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Subscriber, SubscriberStatus } from "../../../types/subscriber";

interface Props {
    data: Subscriber[];
    onEdit: (subscriber: Subscriber) => void;
    onDelete: (phoneNumber: string) => void;
  }

const SubscriberTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Phone Number</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((subscriber) => (
              <TableRow key={subscriber.phoneNumber}>
                <TableCell>{subscriber.phoneNumber}</TableCell>
                <TableCell>{subscriber.username}</TableCell>
                <TableCell>{subscriber.domain}</TableCell>
                <TableCell>
                  <Chip
                    label={subscriber.status}
                    color={
                    subscriber.status === SubscriberStatus.Active
                        ? "success"
                        : subscriber.status === SubscriberStatus.Inactive
                        ? "default" 
                        : subscriber.status === SubscriberStatus.Suspended
                        ? "warning" : "error"
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={()=> onEdit(subscriber)}>
                    <EditIcon />
                  </IconButton>
                <IconButton color="error" onClick={() => onDelete(subscriber.phoneNumber)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
            <TableCell colSpan={5} align="center">
                No subscribers found.
            </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriberTable;