"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Flag, AppWindow, Globe2 } from "lucide-react"

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
import { useParams, useRouter } from "next/navigation"


interface Item {
    value: string;
    label: string;
}

interface Props {
    items: Item[];
}

export function BusinessSelectCombobox({ items }: Props) {

    const { businessId } = useParams() as any;
    const router = useRouter();




    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(businessId);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    size={'sm'}
                    aria-expanded={open}
                    className="min-w-[120px] text-ellipsis gap-2 justify-between"
                >
                    <Globe2 className="w-4 h-4" strokeWidth={1.5}/>
                    {value
                        ? items.find(f => f.value === value)?.label
                        : ""}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto min-w-[140px] max-w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {items.map((item) => (
                            <CommandItem
                                value={item.value}
                                key={item.value}
                                onSelect={(currentValue) => {
                                    setValue(item.value)
                                    router.refresh()
                                    router.push(`business/${item.value}`)
                                    setOpen(false)
                                }}
                                className="text-ellipsis"
                            >
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}