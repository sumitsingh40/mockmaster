import { db } from "@/config/firebase.config";
import type { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoaderPage } from "./loader-page";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Eye, 
  FileText, 
  Trash2, 
  Calendar, 
  Briefcase,
  TrendingUp,
  Star,
  Clock,
  Search,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function Dashboard() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchInterviews();
    }
  }, [userId]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredInterviews(interviews);
    } else {
      const filtered = interviews.filter(
        (interview) =>
          interview.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          interview.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInterviews(filtered);
    }
  }, [searchQuery, interviews]);

  const fetchInterviews = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "interviews"),
        where("createdBy", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      
      const interviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Interview[];
      
      // Sort by creation date (newest first)
      interviewsData.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return dateB - dateA;
      });
      
      console.log("Interviews data:", interviewsData); // Debug log
      
      setInterviews(interviewsData);
      setFilteredInterviews(interviewsData);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error("Failed to load interviews");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (interviewId: string) => {
    try {
      await deleteDoc(doc(db, "interviews", interviewId));
      setInterviews((prev) => prev.filter((i) => i.id !== interviewId));
      toast.success("Interview deleted successfully");
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "N/A";
    }
  };

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create and manage your AI Mock interviews
            </p>
          </div>

          <Button 


 
            onClick={() => navigate("/generate/new")}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-white dark:bg-slate-800 border-t-4 border-blue-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Interviews
              </CardTitle>
              <Briefcase className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {interviews.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                All time
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-t-4 border-emerald-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                This Month
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {interviews.filter(i => {
                  if (!i.createdAt) return false;
                  const date = i.createdAt.toDate ? i.createdAt.toDate() : (i.createdAt ? new Date(i.createdAt as any) : new Date());
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && 
                         date.getFullYear() === now.getFullYear();
                }).length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Interviews created this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-t-4 border-yellow-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Rating
              </CardTitle>
              <Star className="w-5 h-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                4.5
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Out of 5.0
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by position or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </motion.div>

        {/* Interviews Grid */}
        {filteredInterviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white dark:bg-slate-800 p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {searchQuery ? "No interviews found" : "No interviews yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first AI-powered mock interview"}
              </p>
              {!searchQuery && (
                <Button 
                  onClick={() => navigate("/generate/new")}
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Interview
                </Button>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white pb-16">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold mb-2 line-clamp-2">
                          {interview.position}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {(() => {
    const techStack = interview.techStack;
    if (!techStack) {
      return (
        <Badge
          variant="secondary"
          className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
        >
          No tech stack
        </Badge>
      );
    }

    const techArray: string[] = Array.isArray(techStack) ? techStack : [String(techStack)];
    return (
      <>
        {techArray.slice(0, 3).map((tech, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
          >
            {tech}
          </Badge>
        ))}
        {techArray.length > 3 && (
          <Badge
            variant="secondary"
            className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
          >
            +{techArray.length - 3}
          </Badge>
        )}
      </>
    );
  })()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 pb-4 space-y-4">
                    <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[2.5rem]">
                      {interview.description || "No description provided"}
                    </CardDescription>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(interview.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{interview.experience} years experience</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex gap-2">
                        <Link to={`/generate/interview/${interview.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                        <Link to={`/generate/interview/${interview.id}/feedback`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700"
                          >
                            <FileText className="w-4 h-4" />
                            Feedback
                          </Button>
                        </Link>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white dark:bg-slate-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-gray-900 dark:text-white">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                              This action cannot be undone. This will permanently delete
                              your interview and all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(interview.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
