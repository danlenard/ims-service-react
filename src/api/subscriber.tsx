import client from "./client";
import { Subscriber } from "../types/subscriber";

export const fetchSubscribers = async (searchQuery?: string): Promise<Subscriber[]> => {
  const response = await client.get("/ims/subscriber", {
    params: searchQuery ? { search: searchQuery } : {},
  });
  return response.data;
};

export const fetchSubscriber = async (phoneNumber: string): Promise<Subscriber> => {
  const response = await client.get(`/ims/subscriber/${phoneNumber}`);
  return response.data;
};

export const deleteSubscriber = async (phoneNumber: string, hardDelete: boolean = false): Promise<void> => {
  await client.delete(`/ims/subscriber/${phoneNumber}`, {
    data: hardDelete ? { hardDelete: true } : undefined,
  });
};

export const upsertSubscriber = async (subscriber: Subscriber): Promise<Subscriber> => {
  const response = await client.put(`/ims/subscriber/${subscriber.phoneNumber}`, subscriber);
  return response.data;
};
