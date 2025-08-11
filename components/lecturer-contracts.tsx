"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  RefreshCw,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Send,
} from "lucide-react"

export function LecturerContracts() {
  const contracts = [
    {
      id: "CNT-2024-001",
      title: "Associate Professor Contract",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      salary: "$75,000",
      status: "active",
      signedDate: "2023-12-15",
      department: "Computer Science",
      workload: "100%",
      type: "Full-time",
    },
    {
      id: "CNT-2023-001",
      title: "Assistant Professor Contract",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      salary: "$65,000",
      status: "expired",
      signedDate: "2022-12-10",
      department: "Computer Science",
      workload: "100%",
      type: "Full-time",
    },
    {
      id: "CNT-2025-001",
      title: "Associate Professor Renewal",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      salary: "$78,000",
      status: "pending_renewal",
      signedDate: null,
      department: "Computer Science",
      workload: "100%",
      type: "Full-time",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending_renewal":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "expired":
        return <AlertCircle className="w-4 h-4 text-gray-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending_renewal":
        return "destructive"
      case "expired":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const activeContracts = contracts.filter((c) => c.status === "active")
  const pendingContracts = contracts.filter((c) => c.status === "pending_renewal")
  const expiredContracts = contracts.filter((c) => c.status === "expired")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Contracts</h1>
          <p className="text-gray-600 mt-2">View and manage your employment contracts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="w-4 h-4 mr-2" />
          Request Renewal
        </Button>
      </div>

      {/* Contract Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                <p className="text-2xl font-bold text-green-600">{activeContracts.length}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Renewals</p>
                <p className="text-2xl font-bold text-orange-600">{pendingContracts.length}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contract History</p>
                <p className="text-2xl font-bold text-gray-600">{contracts.length}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="active">Active Contracts</TabsTrigger>
          <TabsTrigger value="pending">Pending Renewals</TabsTrigger>
          <TabsTrigger value="history">Contract History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeContracts.length > 0 ? (
            activeContracts.map((contract) => (
              <Card key={contract.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                          <Badge variant={getStatusColor(contract.status) as any}>
                            {getStatusIcon(contract.status)}
                            <span className="ml-1">{contract.status.replace("_", " ")}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Contract ID: {contract.id}</p>
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
                          <div>
                            {contract.type} ({contract.workload})
                          </div>
                          <div>{contract.department}</div>
                        </div>
                        {contract.signedDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Signed: {new Date(contract.signedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No active contracts found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingContracts.length > 0 ? (
            <div className="space-y-4">
              {pendingContracts.map((contract) => (
                <Card key={contract.id} className="border-0 shadow-sm border-l-4 border-l-orange-500">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                            <Badge variant="destructive">
                              <Clock className="w-4 h-4 mr-1" />
                              Pending Renewal
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Contract ID: {contract.id}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Starts: {new Date(contract.startDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              {contract.salary}
                            </div>
                            <div>
                              {contract.type} ({contract.workload})
                            </div>
                          </div>
                          <div className="mt-2 p-3 bg-orange-50 rounded-lg">
                            <p className="text-sm text-orange-800">
                              <strong>Action Required:</strong> This contract renewal is pending your review and
                              signature.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <Send className="w-4 h-4 mr-2" />
                          Sign Contract
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-0 shadow-sm bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need a Contract Renewal?</h3>
                    <p className="text-gray-600 mb-4">
                      If you don't see a pending renewal and your contract is expiring soon, you can request one.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Request Contract Renewal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pending renewals</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          contract.status === "active"
                            ? "bg-green-100"
                            : contract.status === "pending_renewal"
                              ? "bg-orange-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <FileText
                          className={`w-6 h-6 ${
                            contract.status === "active"
                              ? "text-green-600"
                              : contract.status === "pending_renewal"
                                ? "text-orange-600"
                                : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                          <Badge variant={getStatusColor(contract.status) as any}>
                            {getStatusIcon(contract.status)}
                            <span className="ml-1">{contract.status.replace("_", " ")}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Contract ID: {contract.id}</p>
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
                          <div>
                            {contract.type} ({contract.workload})
                          </div>
                          <div>{contract.department}</div>
                        </div>
                        {contract.signedDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Signed: {new Date(contract.signedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
