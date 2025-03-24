import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QrCode,
  MessageSquare,
  Star,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { t } from "@/lib/i18n";

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: number;
  responses: number;
  createdAt: string;
  status: "active" | "draft" | "closed";
  rating?: number;
}

const CustomerFeedback = () => {
  const [activeTab, setActiveTab] = useState("surveys");
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  // Sample survey data
  const surveys: Survey[] = [
    {
      id: "1",
      title: "Customer Satisfaction Survey",
      description: "General feedback about our products and services",
      questions: 5,
      responses: 124,
      createdAt: "2023-06-15",
      status: "active",
      rating: 4.2,
    },
    {
      id: "2",
      title: "New Product Feedback",
      description: "Feedback on our recently launched products",
      questions: 8,
      responses: 87,
      createdAt: "2023-07-22",
      status: "active",
      rating: 3.8,
    },
    {
      id: "3",
      title: "Service Quality Assessment",
      description: "Evaluation of our customer service quality",
      questions: 6,
      responses: 56,
      createdAt: "2023-08-10",
      status: "active",
      rating: 4.5,
    },
    {
      id: "4",
      title: "Website Usability Survey",
      description: "Feedback on our website experience",
      questions: 10,
      responses: 0,
      createdAt: "2023-09-05",
      status: "draft",
    },
  ];

  // Sample feedback responses
  const feedbackResponses = [
    {
      id: "1",
      surveyId: "1",
      customerName: "John Smith",
      rating: 4,
      comment: "Great service, but the waiting time could be improved.",
      date: "2023-09-10",
    },
    {
      id: "2",
      surveyId: "1",
      customerName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent experience! The staff was very helpful and friendly.",
      date: "2023-09-09",
    },
    {
      id: "3",
      surveyId: "2",
      customerName: "Michael Brown",
      rating: 3,
      comment: "The new coffee blend is good, but I prefer the original one.",
      date: "2023-09-08",
    },
    {
      id: "4",
      surveyId: "3",
      customerName: "Emily Davis",
      rating: 5,
      comment:
        "The customer service representative was extremely helpful in resolving my issue.",
      date: "2023-09-07",
    },
    {
      id: "5",
      surveyId: "1",
      customerName: "David Wilson",
      rating: 4,
      comment: "Good products, competitive prices. Would recommend to others.",
      date: "2023-09-06",
    },
  ];

  const handleCreateSurvey = () => {
    alert("Opening survey creation form...");
  };

  const handleViewSurvey = (survey: Survey) => {
    setSelectedSurvey(survey);
    setActiveTab("view-survey");
  };

  const handleEditSurvey = (survey: Survey) => {
    alert(`Editing survey: ${survey.title}`);
  };

  const handleDeleteSurvey = (survey: Survey) => {
    alert(`Deleting survey: ${survey.title}`);
  };

  const handleGenerateQR = (survey: Survey) => {
    alert(`Generating QR code for survey: ${survey.title}`);
  };

  const handleExportResponses = (survey: Survey) => {
    alert(`Exporting responses for survey: ${survey.title}`);
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("customerFeedback.title")}</h1>
          <p className="text-muted-foreground">
            {t("customerFeedback.subtitle")}
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="surveys" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />{" "}
              {t("customerFeedback.surveys")}
            </TabsTrigger>
            <TabsTrigger value="responses" className="flex items-center">
              <Star className="mr-2 h-4 w-4" />{" "}
              {t("customerFeedback.responses")}
            </TabsTrigger>
            <TabsTrigger value="qr-codes" className="flex items-center">
              <QrCode className="mr-2 h-4 w-4" />{" "}
              {t("customerFeedback.qrCodes")}
            </TabsTrigger>
          </TabsList>

          {/* Surveys Tab */}
          <TabsContent value="surveys" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Feedback Surveys</h2>
              <Button onClick={handleCreateSurvey}>
                <Plus className="mr-2 h-4 w-4" />{" "}
                {t("customerFeedback.createSurvey")}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <Card key={survey.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{survey.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {survey.description}
                        </CardDescription>
                      </div>
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewSurvey(survey)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditSurvey(survey)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSurvey(survey)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Questions:
                        </span>
                        <span>{survey.questions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Responses:
                        </span>
                        <span>{survey.responses}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{survey.createdAt}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${survey.status === "active" ? "bg-green-100 text-green-800" : survey.status === "draft" ? "bg-gray-100 text-gray-800" : "bg-red-100 text-red-800"}`}
                        >
                          {survey.status.charAt(0).toUpperCase() +
                            survey.status.slice(1)}
                        </span>
                      </div>
                      {survey.rating && (
                        <div className="flex justify-between text-sm items-center">
                          <span className="text-muted-foreground">Rating:</span>
                          {renderStarRating(survey.rating)}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0 flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleGenerateQR(survey)}
                    >
                      <QrCode className="mr-2 h-4 w-4" /> QR Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleExportResponses(survey)}
                      disabled={survey.responses === 0}
                    >
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Responses Tab */}
          <TabsContent value="responses" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Feedback</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by survey" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Surveys</SelectItem>
                  {surveys.map((survey) => (
                    <SelectItem key={survey.id} value={survey.id}>
                      {survey.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {feedbackResponses.map((response) => {
                const survey = surveys.find((s) => s.id === response.surveyId);
                return (
                  <Card key={response.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <h3 className="font-semibold">
                              {response.customerName}
                            </h3>
                            <span className="mx-2 text-muted-foreground">
                              •
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {response.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Survey: {survey?.title}
                          </p>
                          {renderStarRating(response.rating)}
                          <p className="mt-2">{response.comment}</p>
                        </div>
                        <div className="flex space-x-2 md:self-start">
                          <Button variant="outline" size="sm">
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* QR Codes Tab */}
          <TabsContent value="qr-codes" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">QR Code Generator</h2>
              <Select defaultValue="1">
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select a survey" />
                </SelectTrigger>
                <SelectContent>
                  {surveys
                    .filter((survey) => survey.status === "active")
                    .map((survey) => (
                      <SelectItem key={survey.id} value={survey.id}>
                        {survey.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Preview</CardTitle>
                  <CardDescription>
                    Scan this code to access the selected survey
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="border p-4 rounded-lg bg-white">
                    <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
                      <QrCode className="h-40 w-40 text-gray-500" />
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0 flex space-x-4">
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Printer className="mr-2 h-4 w-4" /> Print
                  </Button>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customize QR Code</CardTitle>
                  <CardDescription>
                    Adjust settings for your QR code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Size (px)</label>
                      <Select defaultValue="500">
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="300">300 x 300</SelectItem>
                          <SelectItem value="500">500 x 500</SelectItem>
                          <SelectItem value="800">800 x 800</SelectItem>
                          <SelectItem value="1000">1000 x 1000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Format</label>
                      <Select defaultValue="png">
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="svg">SVG</SelectItem>
                          <SelectItem value="jpeg">JPEG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Add Logo</label>
                      <div className="flex space-x-2">
                        <Input type="file" className="flex-1" />
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Custom Text</label>
                      <Textarea placeholder="Scan to provide feedback!" />
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full">
                    <QrCode className="mr-2 h-4 w-4" /> Generate QR Code
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* View Survey Tab */}
          {selectedSurvey && (
            <TabsContent value="view-survey" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveTab("surveys")}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {selectedSurvey.title}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditSurvey(selectedSurvey)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button onClick={() => handleGenerateQR(selectedSurvey)}>
                    <QrCode className="mr-2 h-4 w-4" /> QR Code
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Survey Details</CardTitle>
                  <CardDescription>
                    {selectedSurvey.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Status
                        </h3>
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedSurvey.status === "active" ? "bg-green-100 text-green-800" : selectedSurvey.status === "draft" ? "bg-gray-100 text-gray-800" : "bg-red-100 text-red-800"}`}
                        >
                          {selectedSurvey.status.charAt(0).toUpperCase() +
                            selectedSurvey.status.slice(1)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Created
                        </h3>
                        <p>{selectedSurvey.createdAt}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Responses
                        </h3>
                        <p>{selectedSurvey.responses}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Questions</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <div className="font-medium mb-2">
                            1. How would you rate your overall experience?
                          </div>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div
                                key={rating}
                                className="flex items-center justify-center w-8 h-8 rounded-full border"
                              >
                                {rating}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 border rounded-md">
                          <div className="font-medium mb-2">
                            2. What did you like most about our service?
                          </div>
                          <div className="text-sm text-muted-foreground">
                            [Text response]
                          </div>
                        </div>
                        <div className="p-4 border rounded-md">
                          <div className="font-medium mb-2">
                            3. How likely are you to recommend us to others?
                          </div>
                          <div className="flex space-x-1">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                              (rating) => (
                                <div
                                  key={rating}
                                  className="flex items-center justify-center w-6 h-8 text-xs rounded-sm border"
                                >
                                  {rating}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                        <div className="p-4 border rounded-md">
                          <div className="font-medium mb-2">
                            4. Which products did you purchase today?
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <label>Coffee</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <label>Tea</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <label>Pastries</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <label>Sandwiches</label>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border rounded-md">
                          <div className="font-medium mb-2">
                            5. Any additional comments or suggestions?
                          </div>
                          <div className="text-sm text-muted-foreground">
                            [Text response]
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const Printer = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect width="12" height="8" x="6" y="14" />
  </svg>
);

export default CustomerFeedback;
