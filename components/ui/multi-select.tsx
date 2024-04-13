"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Dot, List, Plus, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import slugify from "slugify"
import { ScrollArea } from "./scroll-area"


interface Item {
  value: string,
  label: string
}

interface MultiSelectProps {
  onChange?: (selectedItems: Item[]) => void;
  value?: Item[];
  defaultValue?: Item[];
  items?: Item[];
  placeholder?: string;
  max?: number;
  className?: string;
}

export function MultiSelect({ onChange, value, className, defaultValue, max = 1000, items, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState(defaultValue || []);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    if (defaultValue?.length) {
      setSelectedItems(defaultValue)
    }
  }, [defaultValue])


  const filteredItems = items?.filter(item => {
    let itemSearchText = `${slugify(item?.label ?? '', { lower: true, locale: "vi" })} ${item?.label}`
    return itemSearchText.includes(search)
  }

  ) ?? [];


  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <div className={cn(
        "flex flex-wrap w-full items-center shadow-sm gap-1 rounded-md border border-input bg-transparent px-1 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}>
        {selectedItems?.map((item) => <Button key={item?.value} onClick={() => {
          const updatedList = selectedItems.filter((selectedItem) => selectedItem.value !== item.value);
          setSelectedItems(updatedList);
          onChange?.(updatedList)
        }} className="rounded-sm gap-2 truncate text-accent-foreground border border-input" size={'sm'} variant={'secondary'}>
          <span className="justify-start text-left truncate">  {item.label}</span>
        
          <X className="min-h-4 min-w-4 h-4 w-4 opacity-50" strokeWidth={1.5} />
        </Button>)}
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size={'sm'}
            role="combobox"
            aria-expanded={open}
            className="rounded-sm gap-2 text-muted-foreground"
          >
            <Plus className="h-4 w-4 opacity-50" />
            {placeholder}
          </Button>

        </PopoverTrigger>
      </div>
      <PopoverContent  className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Search ..." value={search} onValueChange={setSearch} />
          <CommandEmpty>Không tìm thấy.</CommandEmpty>
          <ScrollArea >
            <CommandGroup className="h-60 max-w-[96vw] overflow-scroll scrollbar-hide">
              {filteredItems?.map((item) => (
                <CommandItem
                  key={`${item.value}`}
                  value={item.value}
                  onSelect={(currentValue) => {
                    if (selectedItems?.length === max) {
                      return
                    }

                    if (!selectedItems.some((_item) => _item?.value === item.value)) {
                      setSelectedItems([...selectedItems, item]);
                      onChange?.([...selectedItems, item])
                    }
                    setOpen(false)
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
