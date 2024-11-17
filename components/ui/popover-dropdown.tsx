'use client'

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "./button"
import { Check, ChevronsUpDown, Command } from "lucide-react"
import { CommandGroup, CommandItem, CommandList } from "./command"
import { cn } from "@/lib/utils"


const PopoverDropdown = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const subjects = [
        {
            value: "azf",
            label: "AZF",
        },
        {
            value: "bzf",
            label: "BZF",
        },
    ]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? subjects.find((subject) => subject.value === value)?.label
                        : "Select subject..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {subjects.map((subject) => (
                                <CommandItem
                                    key={subject.value}
                                    value={subject.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === subject.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {subject.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>

    )

}