export const STATUS_BADGE = {
  NEW:'blue', READ:'gray', REPLIED:'green', CLOSED:'gray',
  PENDING:'yellow', REVIEWING:'blue', QUOTED:'green',
  ACCEPTED:'green', REJECTED:'red', EXPIRED:'red',
};

export const badgeClass = (status) =>
  `admin-badge admin-badge-${STATUS_BADGE[status] || 'gray'}`;
