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
  CommandDialog,

} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import slugify from "slugify"
import { ScrollArea } from "./scroll-area"
import useSWR from 'swr'


interface Item {
  value: string,
  label: string
}

interface MultiSelectProps {
  onChange?: (selectedItems: Item[]) => void;
  value?: Item[];
  defaultValue?: Item[];
  placeholder?: string;
  max?: number;
  className?: string;
  getFetchURL?: (search: string) => string;
  formatItem?: (item: any) => ({label: string; value: string})
}


const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


function useGetResource(url?: string) {
  const { data, error, isLoading } = useSWR(() => url ?? null, async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.json()
  })

  return {
    data,
    isLoading,
    error
  }

}


export function MultiSelectAsync({ getFetchURL, formatItem, onChange, value, className, defaultValue, max = 1000, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState(defaultValue || []);
  const [search, setSearch] = React.useState('');
  
  const debouncedSearch = useDebounce(search, 500);

  const {data: _items, isLoading} = useGetResource(getFetchURL?.(debouncedSearch))
  const items = _items?.map(formatItem)

  React.useEffect(() => {
    if (defaultValue?.length) {
      setSelectedItems(defaultValue)
    }
  }, [defaultValue])


  // const filteredItems = React.useMemo(() => {
  //   let foundItems: any = []
  //   items?.map(item => {
  //     const itemSearchText = `${slugify(item?.label ?? '', { lower: true, locale: 'vi' })}`;
  //     if(itemSearchText.includes(search)){
  //       console.log(itemSearchText)
  //       foundItems.push(item)
  //     }
  //   })
  //   return foundItems
  
  // }, [items, search]);


 


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
      <PopoverContent className="w-auto p-0">
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput  placeholder="Search ..." value={search} onValueChange={setSearch} 
          />
          <ScrollArea >
          <CommandList  className="scrollbar-hide max-w-[96vw]">
          {items?.length === 0 && <CommandEmpty>Không tìm thấy.</CommandEmpty>} 
            <div  className="overflow-scroll scrollbar-hide max-w-[96vw]">
              {items?.map?.((item, id) => (
                <div
                  key={`${id}`}
                  // value={item.value}
                  className="w-full py-2 px-4 hover:bg-secondary text-sm cursor-pointer rounded-sm"
                  onClick={(currentValue) => {
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
                </div>
              ))}
            </div>
            </CommandList>
          </ScrollArea>
       
        </CommandDialog>
      </PopoverContent>
    </Popover>
  )
}
