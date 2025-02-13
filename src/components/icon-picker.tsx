import type { Range } from '@tanstack/react-virtual';
import type { IconName } from 'lucide-react/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual';
import Fuse from 'fuse.js';
import { DynamicIcon } from 'lucide-react/dynamic';

import type { IconData } from '@/lib/icons-data';
import { iconsData } from '@/lib/icons-data';

import { useDebounce } from '@/lib/use-debounce';
import { cn } from '@/lib/utils';
import { ColorPicker } from '@/components/color-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const ICON_SIZE = 32;
const GRID_GAP = 8;
const ICONS_PER_ROW = 6;

type RowData =
  | { type: 'header'; content: string }
  | { type: 'icons'; content: IconData[] };

export interface IconPickerData {
  name: IconName;
  color?: string;
}

interface IconPickerProps {
  onSelect?: (data: IconPickerData) => void;
  selectedIcon?: IconPickerData;
}

export function IconPicker({ onSelect, selectedIcon }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    selectedIcon?.color
  );
  const debouncedSearch = useDebounce(search, 200);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeStickyIndexRef = useRef(0);

  const fuse = useMemo(() => {
    return new Fuse(iconsData, {
      threshold: 0.4,
      keys: [
        { name: 'name', weight: 3 },
        { name: 'data.categories', weight: 1 },
        { name: 'data.tags', weight: 1 },
      ],
    });
  }, []);

  const filteredIcons = useMemo(() => {
    if (!debouncedSearch) {
      return iconsData;
    }

    return fuse.search(debouncedSearch).map((result) => result.item);
  }, [debouncedSearch, fuse]);

  // Convert grouped icons into a flat array with headers and icon rows
  const { rows, stickyIndexes } = useMemo(() => {
    const flatRows: RowData[] = [];
    const headerIndexes: number[] = [];

    const groupedIcons: Record<string, IconData[]> = {};
    for (const icon of filteredIcons) {
      for (const category of icon.categories) {
        if (!groupedIcons[category]) groupedIcons[category] = [];
        groupedIcons[category].push(icon);
      }
    }

    // Create rows from grouped icons with headers
    for (const [category, icons] of Object.entries(groupedIcons)) {
      headerIndexes.push(flatRows.length);
      flatRows.push({ type: 'header', content: category });

      // Create icon rows
      for (let i = 0; i < icons.length; i += ICONS_PER_ROW) {
        flatRows.push({
          type: 'icons',
          content: icons.slice(i, i + ICONS_PER_ROW),
        });
      }
    }

    return { rows: flatRows, stickyIndexes: headerIndexes };
  }, [filteredIcons]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ICON_SIZE + GRID_GAP,
    rangeExtractor: (range: Range) => {
      activeStickyIndexRef.current =
        [...stickyIndexes]
          .reverse()
          .find((index) => range.startIndex >= index) ?? 0;

      const next = new Set([
        activeStickyIndexRef.current,
        ...defaultRangeExtractor(range),
      ]);

      return [...next].sort((a, b) => a - b);
    },
  });

  /**
   * Trigger the virtualizer to measure the height of the rows
   * when the popover is opened. This prevents of blank list.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(() => rowVirtualizer.measure(), 0);
    }
    return () => clearTimeout(timer);
  }, [isOpen, rowVirtualizer]);

  const isSticky = useCallback(
    (index: number) => stickyIndexes.includes(index),
    [stickyIndexes]
  );

  const isActiveSticky = useCallback(
    (index: number) => activeStickyIndexRef.current === index,
    []
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="[&_svg]:size-10 size-20 bg-transparent border-dashed border-2 border-foreground/20"
        >
          <DynamicIcon
            name={selectedIcon?.name ?? 'image'}
            color={selectedIcon?.color}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex h-96 w-72 flex-col p-2">
        <Input
          type="text"
          size={20}
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => {
            setSelectedColor(color);
            onSelect?.({
              name: selectedIcon?.name ?? 'image',
              color,
            });
          }}
        />

        <div
          ref={containerRef}
          className="h-64 flex-1 overflow-scroll rounded-md border border-input bg-background shadow-sm"
        >
          <div
            className="relative w-full"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];

              if (!row) {
                return null;
              }

              if (row.type === 'header') {
                const sticky = isSticky(virtualRow.index);
                const activeSticky = isActiveSticky(virtualRow.index);

                const stickyStyle = !activeSticky
                  ? { transform: `translateY(${virtualRow.start}px)` }
                  : {};

                return (
                  <div
                    key={virtualRow.index}
                    style={stickyStyle}
                    className={cn(
                      'left-0 top-0 w-full p-1',
                      activeSticky ? 'sticky' : 'absolute',
                      sticky && 'z-10 border-b bg-transparent backdrop-blur-sm'
                    )}
                  >
                    <span className="text-xs font-bold capitalize text-foreground/70">
                      {row.content}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={virtualRow.index}
                  className="absolute left-0 top-0 w-full px-1"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  <div className="grid grid-cols-6">
                    {row.content.map((icon) => (
                      <Button
                        key={icon.name}
                        onClick={() => {
                          onSelect?.({
                            name: icon.name as IconName,
                            color: selectedColor,
                          });
                        }}
                        variant="ghost"
                        size="icon"
                        title={icon.name}
                        className="[&_svg]:size-6"
                      >
                        <DynamicIcon
                          name={icon.name as IconName}
                          color={selectedColor ?? undefined}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-1 px-1 text-xs text-muted-foreground/80">
          {filteredIcons.length > 0 ? (
            <span>
              <span className="font-bold">{filteredIcons.length}</span> icons in{' '}
              <span className="font-bold">{stickyIndexes.length}</span>{' '}
              categories
            </span>
          ) : (
            <span className="font-bold">No icons found</span>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
