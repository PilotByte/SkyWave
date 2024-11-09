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

      {/* Navbar items */}
      <div className="flex justify-center w-full md:w-auto">
        <Tabs defaultValue="account" className="w-[350px]">
          <TabsList className="flex justify-center w-full">
            {/* Header items */}
            <Link href="/dashboard" passHref>
              <TabsTrigger value="dashboard" className="flex-1 text-center font-bold">Dashboard</TabsTrigger>
            </Link>
            <Link href="/test" passHref>
              <TabsTrigger value="test" className="flex-1 text-center font-bold">Test</TabsTrigger>
            </Link>
            <Link href="/helpdesk" passHref>
              <TabsTrigger value="statistics" className="flex-1 text-center font-bold">Helpdesk</TabsTrigger>
            </Link>
            <Link href="/support" passHref>
              <TabsTrigger value="support" className="flex-1 text-center font-bold">Support us</TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </div>

      {/*Darkmode toggle */}
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
        <Button variant="outline" className="font-bold text-red-500">
          <Link href="/login">Logout</Link>
        </Button>
      </div>

    </div>
  )
}

export { Header }
