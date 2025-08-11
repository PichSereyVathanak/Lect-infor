"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, FileText, User, History, GraduationCap, Building } from "lucide-react"
import type { UserRole, ActivePage } from "@/app/page"

interface AppSidebarProps {
  userRole: UserRole
  activePage: ActivePage
  onPageChange: (page: ActivePage) => void
}

export function AppSidebar({ userRole, activePage, onPageChange }: AppSidebarProps) {
  const adminMenuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      page: "dashboard" as ActivePage,
    },
    {
      title: "Recruitment",
      icon: Users,
      page: "recruitment" as ActivePage,
    },
    {
      title: "Lecturer Management",
      icon: Users,
      page: "lecturer-management" as ActivePage,
    },
    {
      title: "Contract Management",
      icon: FileText,
      page: "contract-management" as ActivePage,
    },
  ]

  const lecturerMenuItems = [
    {
      title: "My Profile",
      icon: User,
      page: "profile" as ActivePage,
    },
    {
      title: "My Contracts",
      icon: History,
      page: "contracts" as ActivePage,
    },
  ]

  const menuItems = userRole === "admin" ? adminMenuItems : lecturerMenuItems

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-gray-600">
            {userRole === "admin" ? (
              <>
                <Building className="w-4 h-4" />
                Administration
              </>
            ) : (
              <>
                <GraduationCap className="w-4 h-4" />
                Lecturer Portal
              </>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.page}>
                  <SidebarMenuButton
                    isActive={activePage === item.page}
                    onClick={() => onPageChange(item.page)}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
