import { StyleSelectorProps, StyleInfo, HeadshotStyle } from "@/lib/types";
import { Check } from "lucide-react";

export function StyleSelector({
  selectedStyles,
  onStylesChange,
  maxStyles = 5,
  availableStyles,
}: StyleSelectorProps & { availableStyles: StyleInfo[] }) {
  const handleToggleStyle = (styleKey: HeadshotStyle) => {
    if (selectedStyles.includes(styleKey)) {
      // Remove style
      onStylesChange(selectedStyles.filter((s) => s !== styleKey));
    } else {
      // Add style (if under max limit)
      if (selectedStyles.length < maxStyles) {
        onStylesChange([...selectedStyles, styleKey]);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">
          Select Styles ({selectedStyles.length}/{maxStyles})
        </h3>
        {selectedStyles.length >= maxStyles && (
          <p className="text-xs text-muted-foreground">
            Maximum {maxStyles} styles selected
          </p>
        )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {availableStyles.map((style) => {
            const isSelected = selectedStyles.includes(style.key);
            const isDisabled =
              !isSelected && selectedStyles.length >= maxStyles;

            return (
              <button
                key={style.key}
                onClick={() => handleToggleStyle(style.key)}
                disabled={isDisabled}
                className={`
                relative rounded-lg border p-4 text-left transition-all
                ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary hover:bg-accent"
                }
                ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              `}
              >
                {isSelected && (
                  <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
                <div className="pr-8">
                  <h4 className="font-medium text-foreground">{style.name}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {style.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {selectedStyles.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Select at least one style to continue
          </p>
        )}
      </div>
   
  );
}
