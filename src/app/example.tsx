'use client';

import { useEffect, useState } from 'react';
import { IconPicker, type IconPickerData } from '@/components/icon-picker';
import { getRandomIcon } from '@/lib/get-random-item';

export default function Example() {
  const [selectedIcon, setSelectedIcon] = useState<IconPickerData>();

  useEffect(() => {
    setSelectedIcon(getRandomIcon());
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="rounded-lg border bg-card size-24 flex justify-center items-center my-8">
        {selectedIcon && (
          <IconPicker onSelect={setSelectedIcon} selectedIcon={selectedIcon} />
        )}
      </div>

      {selectedIcon?.name && (
        <div className="text-center text-sm text-muted-foreground flex gap-2">
          <code className="bg-muted px-2 py-1 rounded">
            {selectedIcon.name}
          </code>
          <code
            className="px-2 py-1 rounded"
            style={{ backgroundColor: selectedIcon.color }}
          >
            {selectedIcon.color}
          </code>
        </div>
      )}
    </div>
  );
}
