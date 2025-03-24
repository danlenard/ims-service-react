export interface Subscriber {
  phoneNumber: string;
  username: string;
  domain: string;
  status: SubscriberStatus;
  features: {
    callForwardNoReply: {
      provisioned: boolean;
      destination: string;
    };
  };
}

export enum SubscriberStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Suspended = "SUSPENDED",
  Deleted = "DELETED",
}

export const DEFAULT_SUBSCRIBER: Subscriber = {
  phoneNumber: "",
  username: "",
  domain: "",
  status: SubscriberStatus.Inactive,
  features: {
    callForwardNoReply: {
      provisioned: false,
      destination: "",
    },
  },
};