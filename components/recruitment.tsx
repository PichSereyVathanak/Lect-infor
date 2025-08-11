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
  Star,
  Trash2,
  MessageCircle,
  DollarSign,
  CheckCircle,
  XCircle,
  User,
  GraduationCap,
  Clock,
  AlertCircle,
} from "lucide-react"

interface Candidate {
  id: string
  fullName: string
  email: string
  phone: string
  positionAppliedFor: string
  interviewDate: string
  status: "pending" | "interview" | "discussion" | "rate_setting" | "accepted" | "rejected"
  interviewScore?: number
  rejectionReason?: string
  hourlyRate?: number
  rateReason?: string
  evaluator?: string
}

interface InterviewQuestion {
  id: string
  question: string
  rating: number
}

export function Recruitment() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      fullName: "Dr. Alice Smith",
      email: "alice.smith@email.com",
      phone: "+1 (555) 123-4567",
      positionAppliedFor: "Assistant Professor",
      interviewDate: "2024-01-15",
      status: "interview",
    },
    {
      id: "2",
      fullName: "Prof. John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 234-5678",
      positionAppliedFor: "Associate Professor",
      interviewDate: "2024-01-20",
      status: "accepted",
      interviewScore: 4.2,
      hourlyRate: 85,
    },
  ])

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [activeStep, setActiveStep] = useState<"add" | "interview" | "discussion" | "final">("add")
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([
    { id: "1", question: "Teaching experience and methodology", rating: 0 },
    { id: "2", question: "Subject matter expertise", rating: 0 },
    { id: "3", question: "Communication skills", rating: 0 },
    { id: "4", question: "Research background", rating: 0 },
  ])

  // Form states
  const [newCandidate, setNewCandidate] = useState({
    fullName: "",
    email: "",
    phone: "",
    positionAppliedFor: "",
    interviewDate: "",
  })

  const [finalDecision, setFinalDecision] = useState({
    hourlyRate: "",
    rateReason: "",
    evaluator: "",
  })

  const [rejectionReason, setRejectionReason] = useState("")

  const addNewCandidate = () => {
    const candidate: Candidate = {
      id: Date.now().toString(),
      ...newCandidate,
      status: "pending",
    }
    setCandidates([...candidates, candidate])
    setNewCandidate({
      fullName: "",
      email: "",
      phone: "",
      positionAppliedFor: "",
      interviewDate: "",
    })
  }

  const addInterviewQuestion = () => {
    const newQuestion: InterviewQuestion = {
      id: Date.now().toString(),
      question: "",
      rating: 0,
    }
    setInterviewQuestions([...interviewQuestions, newQuestion])
  }

  const updateQuestionRating = (id: string, rating: number) => {
    setInterviewQuestions(interviewQuestions.map((q) => (q.id === id ? { ...q, rating } : q)))
  }

  const updateQuestionText = (id: string, question: string) => {
    setInterviewQuestions(interviewQuestions.map((q) => (q.id === id ? { ...q, question } : q)))
  }

  const removeQuestion = (id: string) => {
    setInterviewQuestions(interviewQuestions.filter((q) => q.id !== id))
  }

  const calculateAverageScore = () => {
    const validRatings = interviewQuestions.filter((q) => q.rating > 0)
    if (validRatings.length === 0) return 0
    return validRatings.reduce((sum, q) => sum + q.rating, 0) / validRatings.length
  }

  const submitInterview = () => {
    if (!selectedCandidate) return

    const averageScore = calculateAverageScore()
    const updatedCandidate = {
      ...selectedCandidate,
      interviewScore: averageScore,
      status: averageScore > 2.5 ? ("discussion" as const) : ("rejected" as const),
      rejectionReason: averageScore <= 2.5 ? rejectionReason : undefined,
    }

    setCandidates(candidates.map((c) => (c.id === selectedCandidate.id ? updatedCandidate : c)))
    setSelectedCandidate(updatedCandidate)

    if (averageScore > 2.5) {
      setActiveStep("discussion")
    }
  }

  const addToLecturerManagement = (candidate: Candidate) => {
    const newLecturer = {
      id: Date.now(),
      name: candidate.fullName,
      email: candidate.email,
      department: getDepartmentFromPosition(candidate.positionAppliedFor),
      position: candidate.positionAppliedFor,
      phone: candidate.phone,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      contractStatus: "pending",
      cvUploaded: false,
    }

    // Dispatch event to notify lecturer management
    const event = new CustomEvent("lecturerAdded", { detail: newLecturer })
    window.dispatchEvent(event)

    console.log("Adding to lecturer management:", newLecturer)
  }

  // Helper function to determine department from position
  const getDepartmentFromPosition = (position: string) => {
    // In a real app, this might be more sophisticated
    const departmentMap: { [key: string]: string } = {
      "Assistant Professor": "Computer Science",
      "Associate Professor": "Computer Science",
      Professor: "Computer Science",
      Lecturer: "General Studies",
      "Visiting Professor": "Visiting Faculty",
    }
    return departmentMap[position] || "To be assigned"
  }

  const acceptCandidate = () => {
    if (!selectedCandidate) return

    const updatedCandidate = {
      ...selectedCandidate,
      status: "accepted" as const,
      hourlyRate: Number.parseFloat(finalDecision.hourlyRate),
      rateReason: finalDecision.rateReason,
      evaluator: finalDecision.evaluator,
    }

    setCandidates(candidates.map((c) => (c.id === selectedCandidate.id ? updatedCandidate : c)))

    // Auto-add to lecturer management
    addToLecturerManagement(updatedCandidate)

    setSelectedCandidate(null)
    setActiveStep("add")
    setFinalDecision({ hourlyRate: "", rateReason: "", evaluator: "" })
  }

  const rejectCandidate = () => {
    if (!selectedCandidate) return

    const updatedCandidate = {
      ...selectedCandidate,
      status: "rejected" as const,
      rejectionReason,
    }

    setCandidates(candidates.map((c) => (c.id === selectedCandidate.id ? updatedCandidate : c)))
    setSelectedCandidate(null)
    setActiveStep("add")
    setRejectionReason("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "default"
      case "rejected":
        return "destructive"
      case "discussion":
        return "secondary"
      case "interview":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "discussion":
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case "interview":
        return <Clock className="w-4 h-4 text-orange-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 rounded ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-400 transition-colors`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruitment</h1>
          <p className="text-gray-600 mt-2">Manage lecturer recruitment process</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recruitment Process Steps */}
        <div className="lg:col-span-2">
          <Tabs value={activeStep} onValueChange={(value) => setActiveStep(value as any)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="add">Add Candidate</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="final">Final Decision</TabsTrigger>
            </TabsList>

            {/* Step 1: Add New Candidate */}
            <TabsContent value="add">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Step 1: Add New Lecturer Candidate
                  </CardTitle>
                  <CardDescription>Enter candidate information for the recruitment process</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={newCandidate.fullName}
                        onChange={(e) => setNewCandidate({ ...newCandidate, fullName: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newCandidate.email}
                        onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                        placeholder="candidate@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newCandidate.phone}
                        onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position Applied For</Label>
                      <Select
                        value={newCandidate.positionAppliedFor}
                        onValueChange={(value) => setNewCandidate({ ...newCandidate, positionAppliedFor: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                          <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                          <SelectItem value="Professor">Professor</SelectItem>
                          <SelectItem value="Lecturer">Lecturer</SelectItem>
                          <SelectItem value="Visiting Professor">Visiting Professor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="interviewDate">Interview Date</Label>
                      <Input
                        id="interviewDate"
                        type="datetime-local"
                        value={newCandidate.interviewDate}
                        onChange={(e) => setNewCandidate({ ...newCandidate, interviewDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={addNewCandidate} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Candidate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Interview Evaluation */}
            <TabsContent value="interview">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    Step 2: Interview Evaluation
                  </CardTitle>
                  <CardDescription>
                    {selectedCandidate ? `Evaluating: ${selectedCandidate.fullName}` : "Select a candidate to evaluate"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedCandidate ? (
                    <>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-medium">Interview Questions</h4>
                          <Button onClick={addInterviewQuestion} variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Question
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {interviewQuestions.map((question) => (
                            <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-start gap-4">
                                <div className="flex-1">
                                  <Input
                                    value={question.question}
                                    onChange={(e) => updateQuestionText(question.id, e.target.value)}
                                    placeholder="Enter interview question"
                                    className="mb-3"
                                  />
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium">Rating:</span>
                                    <StarRating
                                      rating={question.rating}
                                      onRatingChange={(rating) => updateQuestionRating(question.id, rating)}
                                    />
                                    <span className="text-sm text-gray-600">({question.rating}/5)</span>
                                  </div>
                                </div>
                                <Button
                                  onClick={() => removeQuestion(question.id)}
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Average Score:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-blue-600">
                                {calculateAverageScore().toFixed(1)}
                              </span>
                              <span className="text-gray-600">/5.0</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {calculateAverageScore() > 2.5
                              ? "✅ Candidate meets minimum requirements (>2.5)"
                              : "❌ Candidate does not meet minimum requirements (≤2.5)"}
                          </p>
                        </div>

                        {calculateAverageScore() <= 2.5 && (
                          <div className="space-y-2">
                            <Label htmlFor="rejectionReason">Rejection Reason</Label>
                            <Textarea
                              id="rejectionReason"
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              placeholder="Enter reason for rejection..."
                              rows={3}
                            />
                          </div>
                        )}

                        <div className="flex justify-end">
                          <Button onClick={submitInterview} className="bg-green-600 hover:bg-green-700">
                            Submit Interview Evaluation
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Select a candidate from the list to start the interview evaluation
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 3: External Discussion */}
            <TabsContent value="discussion">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    Step 3: External Discussion
                  </CardTitle>
                  <CardDescription>
                    {selectedCandidate ? `Discussing: ${selectedCandidate.fullName}` : "Candidate under review"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Candidate Under Review</h3>
                    <p className="text-gray-600 mb-6">
                      The candidate is currently being discussed in Telegram or external discussion channels.
                      <br />
                      Please proceed to final decision when discussion is complete.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button onClick={() => setActiveStep("final")} className="bg-purple-600 hover:bg-purple-700">
                        Proceed to Final Decision
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 4: Final Decision */}
            <TabsContent value="final">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Step 4: Hourly Rate & Final Acceptance
                  </CardTitle>
                  <CardDescription>
                    {selectedCandidate ? `Final decision for: ${selectedCandidate.fullName}` : "Make final decision"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedCandidate ? (
                    <>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Candidate Summary</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <span className="ml-2 font-medium">{selectedCandidate.fullName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Position:</span>
                            <span className="ml-2 font-medium">{selectedCandidate.positionAppliedFor}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Interview Score:</span>
                            <span className="ml-2 font-medium">{selectedCandidate.interviewScore?.toFixed(1)}/5.0</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>
                            <Badge variant={getStatusColor(selectedCandidate.status) as any} className="ml-2">
                              {getStatusIcon(selectedCandidate.status)}
                              <span className="ml-1">{selectedCandidate.status}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={finalDecision.hourlyRate}
                            onChange={(e) => setFinalDecision({ ...finalDecision, hourlyRate: e.target.value })}
                            placeholder="85"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="evaluator">Name of Evaluator</Label>
                          <Input
                            id="evaluator"
                            value={finalDecision.evaluator}
                            onChange={(e) => setFinalDecision({ ...finalDecision, evaluator: e.target.value })}
                            placeholder="Dr. John Smith"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rateReason">Reason for Rate</Label>
                        <Textarea
                          id="rateReason"
                          value={finalDecision.rateReason}
                          onChange={(e) => setFinalDecision({ ...finalDecision, rateReason: e.target.value })}
                          placeholder="Explain the reasoning for the hourly rate..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="finalRejectionReason">Rejection Reason (if rejecting)</Label>
                        <Textarea
                          id="finalRejectionReason"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="Enter reason for rejection..."
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end gap-4">
                        <Button
                          onClick={rejectCandidate}
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Candidate
                        </Button>
                        <Button onClick={acceptCandidate} className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept Candidate
                        </Button>
                      </div>
                      {selectedCandidate?.status === "accepted" && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <p className="text-green-800 font-medium">
                              Candidate accepted and automatically added to Lecturer Management!
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Select a candidate to make final decision</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Candidates List */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Candidates</CardTitle>
              <CardDescription>All recruitment candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedCandidate?.id === candidate.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedCandidate(candidate)
                      if (candidate.status === "pending") setActiveStep("interview")
                      else if (candidate.status === "discussion") setActiveStep("discussion")
                      else if (candidate.status === "rate_setting") setActiveStep("final")
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{candidate.fullName}</h4>
                        <p className="text-xs text-gray-600">{candidate.positionAppliedFor}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={getStatusColor(candidate.status) as any} className="text-xs">
                            {getStatusIcon(candidate.status)}
                            <span className="ml-1">{candidate.status}</span>
                          </Badge>
                        </div>
                        {candidate.interviewScore && (
                          <p className="text-xs text-gray-500 mt-1">Score: {candidate.interviewScore.toFixed(1)}/5.0</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
