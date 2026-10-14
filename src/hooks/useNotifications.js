import { useCallback, useEffect, useRef, useState } from "react";
import {
  ApiFetchNotifications,
  ApiMarkNotificationsRead,
} from "../API/API";
import { mapNotificationToDisplayItem } from "../components/Notification";
import {
  NOTIFICATION_PAGE_SIZE,
  appendOlderPage,
  mergeFirstPage,
  idsToMarkRead,
} from "../utils/notificationList";

function pageMeta(data) {
  const raw = Array.isArray(data?.notifications) ? data.notifications : [];
  return {
    items: raw.map(mapNotificationToDisplayItem),
    unreadCount: Number(data?.unreadCount) || 0,
    hasMore: Boolean(data?.pagination?.hasMore),
    nextCursor: data?.pagination?.hasMore
      ? data.pagination.nextCursor || null
      : null,
  };
}

export function useNotifications({ isOpen = false } = {}) {
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const cursorRef = useRef(null);
  const beyondFirstPageRef = useRef(false);
  const itemsRef = useRef([]);
  const markingRef = useRef(false);
  const loadingMoreRef = useRef(false);
  const [seenPendingFundingIds, setSeenPendingFundingIds] = useState(
    () => new Set()
  );

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const refreshFirstPage = useCallback(async () => {
    const data = await ApiFetchNotifications({ limit: NOTIFICATION_PAGE_SIZE });
    const page = pageMeta(data);
    setItems((current) => mergeFirstPage(current, page.items));
    setUnreadCount(page.unreadCount);
    if (!beyondFirstPageRef.current) {
      cursorRef.current = page.nextCursor;
      setHasMore(page.hasMore);
    }
    setError(null);
    return page;
  }, []);

  const loadMore = useCallback(async () => {
    if (!cursorRef.current || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    setError(null);
    try {
      const data = await ApiFetchNotifications({
        limit: NOTIFICATION_PAGE_SIZE,
        before: cursorRef.current,
      });
      const page = pageMeta(data);
      setItems((current) => appendOlderPage(current, page.items));
      setUnreadCount(page.unreadCount);
      cursorRef.current = page.nextCursor;
      setHasMore(page.hasMore);
      beyondFirstPageRef.current = true;
    } catch (err) {
      console.log("Error loading more notifications:", err);
      setError("more");
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, []);

  const retry = useCallback(async () => {
    if (error === "more") {
      await loadMore();
      return;
    }
    setLoading(true);
    try {
      await refreshFirstPage();
    } catch (err) {
      console.log("Error fetching notification data:", err);
      setError("refresh");
    } finally {
      setLoading(false);
    }
  }, [error, loadMore, refreshFirstPage]);

  const wasOpenRef = useRef(false);
  useEffect(() => {
    const justOpened = isOpen && !wasOpenRef.current;
    wasOpenRef.current = isOpen;
    if (!justOpened) return undefined;
    refreshFirstPage().catch((err) => {
      console.log("Error fetching notification data:", err);
    });
    return undefined;
  }, [isOpen, refreshFirstPage]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        await refreshFirstPage();
      } catch (err) {
        if (!cancelled) {
          console.log("Error fetching notification data:", err);
          setError("refresh");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    const interval = setInterval(() => {
      refreshFirstPage().catch((err) => {
        console.log("Error fetching notification data:", err);
      });
    }, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [refreshFirstPage]);

  useEffect(() => {
    if (!isOpen || markingRef.current) return undefined;
    const ids = idsToMarkRead(itemsRef.current, seenPendingFundingIds);
    if (!ids.length) return undefined;

    let cancelled = false;
    markingRef.current = true;
    ApiMarkNotificationsRead(ids)
      .then((data) => {
        if (cancelled) return;
        const marked = new Set(ids.map(String));
        setItems((current) =>
          current.map((item) =>
            marked.has(String(item.notificationId))
              ? { ...item, read_at: item.read_at || new Date().toISOString() }
              : item
          )
        );
        if (data && data.unreadCount != null) {
          setUnreadCount(Number(data.unreadCount) || 0);
        }
      })
      .catch((err) => {
        console.log("Mark notifications read:", err);
      })
      .finally(() => {
        markingRef.current = false;
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, items, seenPendingFundingIds]);

  const notePendingFundingSeen = useCallback((ids) => {
    const incoming = Array.isArray(ids) ? ids : [];
    if (!incoming.length) return;
    setSeenPendingFundingIds((current) => {
      const next = new Set(current);
      let changed = false;
      incoming.forEach((id) => {
        const key = String(id);
        if (!next.has(key)) {
          next.add(key);
          changed = true;
        }
      });
      return changed ? next : current;
    });
  }, []);

  const markAllRead = useCallback(async () => {
    const data = await ApiMarkNotificationsRead();
    setUnreadCount(Number(data?.unreadCount) || 0);
    setItems((current) =>
      current.map((item) => ({
        ...item,
        read_at: item.read_at || new Date().toISOString(),
      }))
    );
  }, []);

  const updateItem = useCallback((sourceOrNotificationId, patch) => {
    setItems((current) =>
      current.map((item) =>
        String(item.id) === String(sourceOrNotificationId) ||
        String(item.notificationId) === String(sourceOrNotificationId)
          ? { ...item, ...patch }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((sourceOrNotificationId) => {
    setItems((current) =>
      current.filter(
        (item) =>
          String(item.id) !== String(sourceOrNotificationId) &&
          String(item.notificationId) !== String(sourceOrNotificationId)
      )
    );
  }, []);

  return {
    items,
    unreadCount,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    retry,
    refresh: refreshFirstPage,
    markAllRead,
    updateItem,
    removeItem,
    notePendingFundingSeen,
  };
}
