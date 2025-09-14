// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import YouthEducation from "./pages/YouthEducation";
import CourseRegistration from "./pages/CourseRegistration";
import TeacherDetails from "./pages/TeacherDetails";
import { CourseDetails } from "./pages/CourseDetails";
import CourseList from "./pages/CourseList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <TooltipProvider> */}
      {/* <Toaster /> */}
      {/* <Sonner /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/youth-education" element={<YouthEducation />} />
          <Route path="/course-registration" element={<CourseRegistration />} />
          <Route path="/teacher-details" element={<TeacherDetails />} />
          <Route path="/course-details/:courseId" element={<CourseDetails />} />
          <Route path="/courses/" element={<CourseList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    {/* </TooltipProvider> */}
  </QueryClientProvider>
);

export default App;
