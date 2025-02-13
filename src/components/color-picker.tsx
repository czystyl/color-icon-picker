import { useMemo, useRef } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';

const defaultColors = [
  // Base colors
  { name: 'red', color: '#ef4444' },
  { name: 'orange', color: '#f97316' },
  { name: 'amber', color: '#f59e0b' },
  { name: 'yellow', color: '#eab308' },
  { name: 'lime', color: '#84cc16' },
  { name: 'green', color: '#22c55e' },
  { name: 'emerald', color: '#10b981' },
  { name: 'teal', color: '#14b8a6' },
  { name: 'cyan', color: '#06b6d4' },
  { name: 'lightBlue', color: '#0ea5e9' },
  { name: 'blue', color: '#3b82f6' },
  { name: 'indigo', color: '#6366f1' },
  { name: 'violet', color: '#8b5cf6' },
  { name: 'purple', color: '#a855f7' },
  { name: 'fuchsia', color: '#d946ef' },
  { name: 'pink', color: '#ec4899' },
  { name: 'rose', color: '#f43f5e' },

  // Neutral tones
  { name: 'slate', color: '#64748b' },
  { name: 'stone', color: '#292524' },

  // Additional modern colors
  { name: 'coral', color: '#FF7F50' },
  { name: 'turquoise', color: '#40E0D0' },
  { name: 'mediumPurple', color: '#9370DB' },
  { name: 'goldenrod', color: '#DAA520' },
  { name: 'crimson', color: '#DC143C' },
  { name: 'seaGreen', color: '#2E8B57' },

  // Pastel tones
  { name: 'pastelPink', color: '#FFB6C1' },
  { name: 'pastelBlue', color: '#87CEEB' },
  { name: 'pastelGreen', color: '#98FB98' },
  { name: 'pastelPurple', color: '#DCD0FF' },
  { name: 'pastelYellow', color: '#FFEF96' },
  { name: 'pastelPeach', color: '#FFDAB9' },
  { name: 'pastelMint', color: '#98FF98' },
  { name: 'pastelLavender', color: '#E6E6FA' },
  { name: 'pastelCoral', color: '#FFB7B2' },
  { name: 'pastelTurquoise', color: '#AFEEEE' },
];

interface ColorPickerProps {
  selectedColor?: string;
  setSelectedColor: (color: string | undefined) => void;
}

export function ColorPicker({
  selectedColor,
  setSelectedColor,
}: ColorPickerProps) {
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const isCustomColorSelected = useMemo(() => {
    return (
      selectedColor &&
      !defaultColors.some((color) => color.color === selectedColor)
    );
  }, [selectedColor]);

  return (
    <div className="flex h-11 items-center gap-2 overflow-x-auto p-1">
      <Button
        onClick={() => setSelectedColor(undefined)}
        size="sm"
        title="Default color"
        className={cn('h-6 w-6 shrink-0', {
          'border-input hover:border-primary': selectedColor,
          'border-primary ring-2 ring-primary': !selectedColor,
        })}
      >
        <DynamicIcon name="slash" />
      </Button>

      {defaultColors.map(({ name, color }) => {
        const isSelected = color === selectedColor;

        return (
          <Button
            size="sm"
            key={color}
            onClick={() => setSelectedColor(color)}
            title={`Color: ${color} (${name})`}
            style={{ backgroundColor: color }}
            className={cn('h-6 w-6 shrink-0 hover:border-primary', {
              'border-primary ring-2 ring-primary': isSelected,
              'border-input hover:border-primary': !isSelected,
            })}
          />
        );
      })}

      <div className="relative">
        <Button
          size="sm"
          onClick={() => colorPickerRef.current?.click()}
          className={cn('flex h-6 w-6 items-center justify-center', {
            'border-primary ring-2 ring-primary': isCustomColorSelected,
          })}
          style={{
            backgroundColor: isCustomColorSelected ? selectedColor : '',
          }}
          title={isCustomColorSelected ? 'Custom color' : 'Choose color'}
        >
          <DynamicIcon
            name="palette"
            className="h-4 w-4 text-primary mix-blend-difference"
          />
        </Button>
        <Input
          ref={colorPickerRef}
          type="color"
          className="absolute h-0 w-0 opacity-0"
          value={selectedColor ?? '#000000'}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
      </div>
    </div>
  );
}
