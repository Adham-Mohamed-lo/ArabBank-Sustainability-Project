"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, PlusCircle, Users, FileText, SettingsIcon } from 'lucide-react';
import { ArabBankLogo } from '../arab-bank-logo';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/add-project', label: 'Add New Project', icon: PlusCircle },
    { href: '/clients', label: 'View Clients', icon: Users },
    { href: '/reports', label: 'Reports', icon: FileText },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <ArabBankLogo className="h-10 w-auto text-primary-foreground" />
            <h1 className="text-lg font-semibold text-primary-foreground">Sustainability Hub</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/settings" passHref>
                <SidebarMenuButton
                  isActive={pathname === '/settings'}
                  tooltip="Settings"
                >
                  <SettingsIcon />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center px-4 md:hidden">
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
