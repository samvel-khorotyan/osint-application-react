import { useState, useCallback } from 'react';
import { Scan } from '../types';

export const useDragAndDrop = (
    items: Scan[],
    onOrderUpdate: (scanId: number, newOrder: number) => Promise<void>
) => {
    const [draggedItem, setDraggedItem] = useState<Scan | null>(null);

    const handleDragStart = useCallback((scan: Scan) => {
        setDraggedItem(scan);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    const handleDrop = useCallback(
        async (targetScan: Scan) => {
            if (!draggedItem || draggedItem.id === targetScan.id) {
                return;
            }

            await onOrderUpdate(draggedItem.id, targetScan.displayOrder);
            setDraggedItem(null);
        },
        [draggedItem, onOrderUpdate]
    );

    return {
        draggedItem,
        handleDragStart,
        handleDragOver,
        handleDrop
    };
};
