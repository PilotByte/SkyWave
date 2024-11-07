'use client'

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const Header = () => {
  const { setTheme } = useTheme()
  return (
    <div className="flex h-14 items-center justify-center border-b border-grey">
      <div className="flex justify-center w-full md:w-auto">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="flex justify-center w-full">
            <TabsTrigger value="dashboard" className="flex-1 text-center font-bold">Dashboard</TabsTrigger>
            <TabsTrigger value="test" className="flex-1 text-center font-bold">Test</TabsTrigger>
            <TabsTrigger value="statistics" className="flex-1 text-center font-bold">Statistics</TabsTrigger>
            <TabsTrigger value="bla" className="flex-1 text-center font-bold">Bla</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="relative right-5">
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
      </div>
      <div className="absolute right-10">
        <Button variant="default">Logout</Button>
      </div>
    </div>
  )
}

export { Header }
