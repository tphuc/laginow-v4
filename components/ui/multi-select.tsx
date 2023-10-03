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
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


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
}

export function MultiSelect({ onChange, value, defaultValue, max = 1000, items, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState(defaultValue || []);


  React.useEffect(() => {
    if(defaultValue?.length){
      setSelectedItems(defaultValue)
    }
  }, [defaultValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn(
      "flex flex-wrap w-full items-center shadow-sm gap-1 rounded-md border border-input bg-transparent px-1 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-0 disabled:cursor-not-allowed disabled:opacity-50",
    )}>
      {selectedItems?.map((item) => <Button key={item?.value} onClick={() => {
         const updatedList = selectedItems.filter((selectedItem) => selectedItem.value !== item.value);
         setSelectedItems(updatedList);
         onChange?.(updatedList)
      }} className="rounded-sm gap-2 truncate" size={'sm'} variant={'outline'}>
        {item.label} 
        <X className="h-4 w-4 opacity-50" strokeWidth={1.5}/>
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
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup className="max-h-48 overflow-scroll">
            {items?.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                


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
        </Command>
      </PopoverContent>
    </Popover>
  )
}
