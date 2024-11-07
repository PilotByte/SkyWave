'use client'

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link";

const Header = () => {
  const { setTheme } = useTheme()
  return (
    <div className="flex h-14 items-center justify-center border-b border-grey">

      <div className="flex justify-center w-full md:w-auto">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="flex justify-center w-full">
            {/* Header items */}
            <TabsTrigger value="dashboard" className="flex-1 text-center font-bold">Dashboard</TabsTrigger>
            <TabsTrigger value="test" className="flex-1 text-center font-bold">Test</TabsTrigger>
            <TabsTrigger value="statistics" className="flex-1 text-center font-bold">Lorem</TabsTrigger>
            <TabsTrigger value="bla" className="flex-1 text-center font-bold">Ipsum</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>


      <div className="absolute right-10 flex justify-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="font-bold">
          <Link href="/login">Logout</Link>
        </Button>
      </div>

    </div>
  )
}

export { Header }
