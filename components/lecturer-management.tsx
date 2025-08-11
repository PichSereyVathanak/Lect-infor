"use client"

import { useState, useEffect } from "react"
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
  Edit,
  Eye,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Trash2,
  FileText,
  CheckCircle,
} from "lucide-react"

export function LecturerManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false)
  const [selectedLecturerForCV, setSelectedLecturerForCV] = useState<any>(null)

  const [newlyAddedLecturers, setNewlyAddedLecturers] = useState<any[]>([])

  // Add a new state for the view modal and selected lecturer:
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedLecturerForView, setSelectedLecturerForView] = useState<any>(null)

  // In a real app, this would come from a shared state or API
  // For demo purposes, we'll simulate receiving data from recruitment
  useEffect(() => {
    // Listen for new lecturers added from recruitment
    const handleNewLecturer = (event: CustomEvent) => {
      const newLecturer = event.detail
      setNewlyAddedLecturers((prev) => [...prev, newLecturer])
    }

    window.addEventListener("lecturerAdded", handleNewLecturer as EventListener)
    return () => window.removeEventListener("lecturerAdded", handleNewLecturer as EventListener)
  }, [])

  const lecturers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      department: "Computer Science",
      position: "Associate Professor",
      phone: "+1 (555) 123-4567",
      joinDate: "2019-08-15",
      status: "active",
      contractStatus: "active",
      cvUploaded: true,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      department: "Mathematics",
      position: "Professor",
      phone: "+1 (555) 234-5678",
      joinDate: "2015-01-20",
      status: "active",
      contractStatus: "renewal_pending",
      cvUploaded: true,
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@university.edu",
      department: "Physics",
      position: "Assistant Professor",
      phone: "+1 (555) 345-6789",
      joinDate: "2021-09-01",
      status: "active",
      contractStatus: "active",
      cvUploaded: false,
    },
  ]

  const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"]

  const allLecturers = [...lecturers, ...newlyAddedLecturers]

  const filteredLecturers = allLecturers.filter((lecturer) => {
    const matchesSearch =
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || lecturer.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lecturer Management</h1>
          <p className="text-gray-600 mt-2">Manage lecturer profiles and information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Lecturer
        </Button>
      </div>

      {newlyAddedLecturers.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">
                {newlyAddedLecturers.length} new lecturer(s) added from recruitment process
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="list">Lecturer List</TabsTrigger>
          <TabsTrigger value="add">Add New Lecturer</TabsTrigger>
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
                      placeholder="Search lecturers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lecturers List */}
          <div className="grid gap-4">
            {filteredLecturers.map((lecturer) => (
              <Card key={lecturer.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{lecturer.name}</h3>
                          <Badge variant={lecturer.status === "active" ? "default" : "secondary"}>
                            {lecturer.status}
                          </Badge>
                          <Badge variant={lecturer.contractStatus === "active" ? "default" : "destructive"}>
                            {lecturer.contractStatus.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {lecturer.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {lecturer.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {lecturer.department}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Joined {new Date(lecturer.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mt-1">{lecturer.position}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedLecturerForView(lecturer)
                          setViewModalOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      {lecturer.cvUploaded ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedLecturerForCV(lecturer)
                            setCvPreviewOpen(true)
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          View CV
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-orange-600 bg-transparent">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload CV
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Add New Lecturer</CardTitle>
              <CardDescription>Create a new lecturer profile in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="lecturer@university.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assistant">Assistant Professor</SelectItem>
                      <SelectItem value="associate">Associate Professor</SelectItem>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" placeholder="EMP001" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications">Qualifications</Label>
                <Textarea id="qualifications" placeholder="Enter educational qualifications and certifications" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv">Upload CV (PDF)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF files only, max 10MB</p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Create Lecturer Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {cvPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">CV Preview - {selectedLecturerForCV?.name}</h3>
              <Button variant="outline" onClick={() => setCvPreviewOpen(false)}>
                Close
              </Button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">CV Preview would appear here</p>
              <p className="text-sm text-gray-500">PDF viewer integration needed</p>
            </div>
          </div>
        </div>
      )}
      {/* Lecturer Detail View Modal */}
      {viewModalOpen && selectedLecturerForView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-auto w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Lecturer Details</h3>
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Section */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-12 h-12 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedLecturerForView.name}</h2>
                      <p className="text-gray-600 mb-2">{selectedLecturerForView.position}</p>
                      <div className="flex justify-center gap-2 mb-4">
                        <Badge variant={selectedLecturerForView.status === "active" ? "default" : "secondary"}>
                          {selectedLecturerForView.status}
                        </Badge>
                        <Badge
                          variant={selectedLecturerForView.contractStatus === "active" ? "default" : "destructive"}
                        >
                          {selectedLecturerForView.contractStatus.replace("_", " ")}
                        </Badge>
                      </div>

                      <div className="space-y-3 text-left">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{selectedLecturerForView.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{selectedLecturerForView.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{selectedLecturerForView.department}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Joined {new Date(selectedLecturerForView.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                        <p className="text-gray-900">{selectedLecturerForView.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Employee ID</Label>
                        <p className="text-gray-900">EMP{selectedLecturerForView.id.toString().padStart(3, "0")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Email Address</Label>
                        <p className="text-gray-900">{selectedLecturerForView.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Phone Number</Label>
                        <p className="text-gray-900">{selectedLecturerForView.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Department</Label>
                        <p className="text-gray-900">{selectedLecturerForView.department}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Position</Label>
                        <p className="text-gray-900">{selectedLecturerForView.position}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Join Date</Label>
                        <p className="text-gray-900">
                          {new Date(selectedLecturerForView.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <Badge variant={selectedLecturerForView.status === "active" ? "default" : "secondary"}>
                          {selectedLecturerForView.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Information */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Qualifications</Label>
                        <div className="mt-2 space-y-2">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              Ph.D. in {selectedLecturerForView.department} - University (2018)
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              M.S. in {selectedLecturerForView.department} - University (2014)
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              B.S. in {selectedLecturerForView.department} - University (2012)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Research Areas</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">Machine Learning</Badge>
                          <Badge variant="outline">Data Science</Badge>
                          <Badge variant="outline">Artificial Intelligence</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contract Information */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Contract Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Contract Status</Label>
                        <Badge
                          variant={selectedLecturerForView.contractStatus === "active" ? "default" : "destructive"}
                          className="mt-1"
                        >
                          {selectedLecturerForView.contractStatus.replace("_", " ")}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Contract Type</Label>
                        <p className="text-gray-900">Full-time</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Annual Salary</Label>
                        <p className="text-gray-900">$75,000</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Teaching Load</Label>
                        <p className="text-gray-900">100%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CV Information */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedLecturerForView.cvUploaded ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                            <FileText className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              CV_{selectedLecturerForView.name.replace(/\s+/g, "_")}.pdf
                            </p>
                            <p className="text-xs text-gray-500">Uploaded 2 weeks ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">No CV uploaded</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                Generate Contract
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
