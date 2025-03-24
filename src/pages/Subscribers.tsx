import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import SubscriberTable from "../containers/Subscribers/Table";
import Toolbar from "../containers/Subscribers/Toolbar";
import DeleteDialog from "../containers/Subscribers/Modal/delete";
import SubscriberDialog from "../containers/Subscribers/Modal/subscriber";
import { Subscriber, SubscriberStatus } from "../types/subscriber";
import { fetchSubscribers, deleteSubscriber, upsertSubscriber } from "../api/subscriber";

const Subscribers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Subscriber[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadSubscribers();
    }, 1000);
  
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const subscribers = await fetchSubscribers(searchQuery);
      setData(subscribers);
    } catch (error) {
      console.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (subscriber?: Subscriber) => {
    setEditingSubscriber(subscriber || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveSubscriber = async (subscriber: Subscriber) => {
    try {
      await upsertSubscriber(subscriber);
      await loadSubscribers();
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to save subscriber:", error);
    }
  };

  const handleDelete = (phoneNumber: string) => {
    setDeleteTarget(phoneNumber);
  };

  const confirmDelete = async (hardDelete: boolean) => {
    if (deleteTarget) {
      try {
        await deleteSubscriber(deleteTarget, hardDelete);
        await loadSubscribers();
        setOpenDialog(false);
        setDeleteTarget(null);
      } catch (error) {
        console.error("Failed to delete subscriber");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Subscribers List</Typography>
      <Paper sx={{ padding: 2 }}>
        <Toolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onAdd={handleOpenDialog} />
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <SubscriberTable data={data} onEdit={handleOpenDialog} onDelete={handleDelete} />
        )}
      </Paper>
      <SubscriberDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSaveSubscriber}
        subscriber={editingSubscriber || undefined}
      />
      <DeleteDialog open={!!deleteTarget} phoneNumber={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
    </Container>
  );
};

export default Subscribers;
