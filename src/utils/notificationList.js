export const NOTIFICATION_PAGE_SIZE = 20;

export function notificationKey(item) {
  if (!item) return "";
  if (item.notificationId != null && item.notificationId !== "") {
    return `n:${item.notificationId}`;
  }
  return `s:${item.id}`;
}

export function sortNotificationsNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = new Date(a?.created_at || 0).getTime();
    const bTime = new Date(b?.created_at || 0).getTime();
    return bTime - aTime;
  });
}

/** Refresh the newest page without dropping older pages already loaded. */
export function mergeFirstPage(existing, incoming) {
  const current = Array.isArray(existing) ? existing : [];
  const latest = Array.isArray(incoming) ? incoming : [];
  if (!latest.length) return sortNotificationsNewestFirst(current);

  const incomingKeys = new Set(latest.map(notificationKey));
  const oldestIncoming = Math.min(
    ...latest.map((item) => new Date(item?.created_at || 0).getTime())
  );

  const olderKept = current.filter((item) => {
    if (incomingKeys.has(notificationKey(item))) return false;
    return new Date(item?.created_at || 0).getTime() < oldestIncoming;
  });

  const merged = new Map();
  [...olderKept, ...latest].forEach((item) => {
    merged.set(notificationKey(item), item);
  });

  return sortNotificationsNewestFirst([...merged.values()]);
}

/** Append an older page and overlay any rows that were already loaded. */
export function appendOlderPage(existing, incoming) {
  const merged = new Map(
    (Array.isArray(existing) ? existing : []).map((item) => [
      notificationKey(item),
      item,
    ])
  );
  (Array.isArray(incoming) ? incoming : []).forEach((item) => {
    const key = notificationKey(item);
    const previous = merged.get(key);
    merged.set(key, previous ? { ...previous, ...item } : item);
  });
  return sortNotificationsNewestFirst([...merged.values()]);
}

export function unreadLoadedIds(items) {
  return (Array.isArray(items) ? items : [])
    .filter((item) => item && !item.read_at && item.notificationId != null)
    .map((item) => item.notificationId);
}

export function isPendingFundingItem(item) {
  return item?._notificationType === "funding" && item?.status === "pending";
}

/** Loaded rows are ready to mark, except pending funding still below the fold. */
export function idsToMarkRead(items, seenPendingFundingIds) {
  const seen =
    seenPendingFundingIds instanceof Set
      ? seenPendingFundingIds
      : new Set(
          Array.isArray(seenPendingFundingIds)
            ? seenPendingFundingIds.map(String)
            : []
        );
  const list = Array.isArray(items) ? items : [];
  return unreadLoadedIds(list).filter((id) => {
    const item = list.find(
      (row) => String(row?.notificationId) === String(id)
    );
    if (!isPendingFundingItem(item)) return true;
    return seen.has(String(id));
  });
}

export function isCaughtUp({ hasMore, itemCount, loading = false }) {
  return !loading && !hasMore && Number(itemCount) > 0;
}
