import { useMemo, useRef } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { defaultColors } from '@/lib/default-colors';

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
