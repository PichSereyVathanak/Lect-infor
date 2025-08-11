"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AdminDashboard } from "@/components/admin-dashboard"
import { LecturerManagement } from "@/components/lecturer-management"
import { ContractManagement } from "@/components/contract-management"
import { LecturerLogin } from "@/components/lecturer-login"
import { LecturerProfile } from "@/components/lecturer-profile"
import { LecturerContracts } from "@/components/lecturer-contracts"
import { Recruitment } from "@/components/recruitment"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Users } from "lucide-react"

export type UserRole = "admin" | "lecturer"
export type ActivePage =
  | "dashboard"
  | "recruitment"
  | "lecturer-management"
  | "contract-management"
  | "login"
  | "profile"
  | "contracts"

export default function LecturerContractSystem() {
  const [userRole, setUserRole] = useState<UserRole>("admin")
  const [activePage, setActivePage] = useState<ActivePage>("dashboard")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleRoleSwitch = (role: UserRole) => {
    setUserRole(role)
    if (role === "admin") {
      setActivePage("dashboard")
      setIsLoggedIn(true)
    } else {
      setActivePage("login")
      setIsLoggedIn(false)
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setActivePage("profile")
  }

  const renderContent = () => {
    if (userRole === "lecturer" && !isLoggedIn) {
      return <LecturerLogin onLogin={handleLogin} />
    }

    switch (activePage) {
      case "dashboard":
        return <AdminDashboard />
      case "recruitment":
        return <Recruitment />
      case "lecturer-management":
        return <LecturerManagement />
      case "contract-management":
        return <ContractManagement />
      case "profile":
        return <LecturerProfile />
      case "contracts":
        return <LecturerContracts />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">UC</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">University Contract System</h1>
              <p className="text-sm text-gray-500">Academic Contract Management Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={userRole === "admin" ? "default" : "secondary"}>
              {userRole === "admin" ? <UserCheck className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
              {userRole === "admin" ? "Administrator" : "Lecturer"}
            </Badge>

            <div className="flex gap-2">
              <Button
                variant={userRole === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => handleRoleSwitch("admin")}
              >
                Admin View
              </Button>
              <Button
                variant={userRole === "lecturer" ? "default" : "outline"}
                size="sm"
                onClick={() => handleRoleSwitch("lecturer")}
              >
                Lecturer View
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {(userRole === "admin" || (userRole === "lecturer" && isLoggedIn)) && (
          <SidebarProvider>
            <AppSidebar userRole={userRole} activePage={activePage} onPageChange={setActivePage} />
            <main className="flex-1 p-6">
              <div className="mb-4">
                <SidebarTrigger />
              </div>
              {renderContent()}
            </main>
          </SidebarProvider>
        )}

        {userRole === "lecturer" && !isLoggedIn && <main className="flex-1">{renderContent()}</main>}
      </div>
    </div>
  )
}
