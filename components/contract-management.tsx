"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Send,
  Download,
  RefreshCw,
  FileText,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export function ContractManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const contracts = [
    {
      id: "CNT-2024-001",
      lecturerName: "Dr. Sarah Johnson",
      department: "Computer Science",
      position: "Associate Professor",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      salary: "$75,000",
      status: "active",
      sentDate: "2023-12-01",
      signedDate: "2023-12-15",
    },
    {
      id: "CNT-2024-002",
      lecturerName: "Prof. Michael Chen",
      department: "Mathematics",
      position: "Professor",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      salary: "$85,000",
      status: "pending_renewal",
      sentDate: "2024-01-15",
      signedDate: null,
    },
    {
      id: "CNT-2024-003",
      lecturerName: "Dr. Emily Rodriguez",
      department: "Physics",
      position: "Assistant Professor",
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      salary: "$65,000",
      status: "expired",
      sentDate: "2023-11-01",
      signedDate: "2023-11-15",
    },
  ]

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.lecturerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "renewal_pending":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "draft":
        return <AlertCircle className="w-4 h-4 text-gray-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "renewal_pending":
        return "destructive"
      case "draft":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contract Management</h1>
          <p className="text-gray-600 mt-2">Generate, send, and manage lecturer contracts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Generate New Contract
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="list">Contract List</TabsTrigger>
          <TabsTrigger value="generate">Generate Contract</TabsTrigger>
          <TabsTrigger value="renew">Renew Contract</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Search and Filter */}
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search contracts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending_renewal">Pending Renewal</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contracts List */}
          <div className="grid gap-4">
            {filteredContracts.map((contract) => (
              <Card key={contract.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{contract.id}</h3>
                          <Badge variant={getStatusColor(contract.status) as any}>
                            {getStatusIcon(contract.status)}
                            <span className="ml-1">{contract.status.replace("_", " ")}</span>
                          </Badge>
                        </div>
                        <p className="text-base font-medium text-gray-700 mb-2">{contract.lecturerName}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(contract.startDate).toLocaleDateString()} -{" "}
                            {new Date(contract.endDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {contract.salary}
                          </div>
                          <div>{contract.department}</div>
                          <div>{contract.position}</div>
                        </div>
                        {contract.sentDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Sent: {new Date(contract.sentDate).toLocaleDateString()}
                            {contract.signedDate && ` | Signed: ${new Date(contract.signedDate).toLocaleDateString()}`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      {contract.status === "draft" && (
                        <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </Button>
                      )}
                      {contract.status === "renewal_pending" && (
                        <Button variant="outline" size="sm" className="text-green-600 bg-transparent">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Renew
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Generate New Contract</CardTitle>
              <CardDescription>Create a new contract for a lecturer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lecturer">Select Lecturer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose lecturer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Prof. Michael Chen</SelectItem>
                      <SelectItem value="emily">Dr. Emily Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractType">Contract Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="visiting">Visiting</SelectItem>
                      <SelectItem value="adjunct">Adjunct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input id="salary" placeholder="$75,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workload">Teaching Workload (%)</Label>
                  <Input id="workload" placeholder="100" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea id="responsibilities" placeholder="Enter key responsibilities and duties..." rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">Additional Terms</Label>
                <Textarea id="terms" placeholder="Enter any additional terms and conditions..." rows={3} />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renew">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Renew Contract</CardTitle>
              <CardDescription>Renew an existing contract with updated terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="existingContract">Select Existing Contract</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose contract to renew" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cnt-001">CNT-2024-001 - Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="cnt-002">CNT-2024-002 - Prof. Michael Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Current Contract Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Lecturer:</span>
                    <span className="ml-2 font-medium">Dr. Sarah Johnson</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Salary:</span>
                    <span className="ml-2 font-medium">$75,000</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Period:</span>
                    <span className="ml-2 font-medium">Jan 15, 2024 - Dec 31, 2024</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Position:</span>
                    <span className="ml-2 font-medium">Associate Professor</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="newStartDate">New Start Date</Label>
                  <Input id="newStartDate" type="date" defaultValue="2025-01-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newEndDate">New End Date</Label>
                  <Input id="newEndDate" type="date" defaultValue="2025-12-31" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newSalary">New Annual Salary</Label>
                  <Input id="newSalary" placeholder="$78,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryIncrease">Salary Increase (%)</Label>
                  <Input id="salaryIncrease" placeholder="4.0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="renewalNotes">Renewal Notes</Label>
                <Textarea id="renewalNotes" placeholder="Enter any changes or notes for the renewal..." rows={3} />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Renewal Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
