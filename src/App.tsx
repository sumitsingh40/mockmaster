import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import { PublicLayout } from "@/layouts/public-layout";
import HomePage from "@/routes/home";
import AuthenticationLayout from "@/layouts/auth-layout";
import { SignInPage } from "@/routes/sign_in";
import { SignUpPage } from "@/routes/signup";
import { MainLayout } from "./layouts/main-layout";
import ProtectRoutes from "./layouts/protected-routes";
import { Generate } from "./components/generate";
import  Dashboard  from "./routes/dashboard";
import { CreateEditPage } from "./routes/create-edit-page";
import { MockLoadPage } from "./routes/mock-load-page";
import { MockInterviewPage } from "./routes/mock-interview-page";
import { Feedback } from "./routes/feedback";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import ServicesPage from "./routes/services";



const App = () => {
  return(
    <Router>
      <Routes>
        {/*public routes*/}
        <Route element={<PublicLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        </Route>
        {/*authentication layout */}
        <Route element={<AuthenticationLayout/>}>
        <Route path="/signin/*" element={<SignInPage/>} />
        <Route path="/signup/*" element={<SignUpPage/>} />
        </Route>


        {/*protected routes */}
         <Route element={<ProtectRoutes><MainLayout /></ProtectRoutes>
         }
        >
          {/* add all the protect routes */}
          <Route element={<Generate />} path="/generate">
            <Route index element={<Dashboard />} />
            <Route path="new" element={<CreateEditPage />} /> {/* Add this line */}
            <Route path=":interviewId" element={<CreateEditPage />} />
            <Route path="interview/:interviewId" element={<MockLoadPage />} />
            <Route
              path="interview/:interviewId/start"
              element={<MockInterviewPage />}
            />
            <Route path="interview/:interviewId/feedback" element={<Feedback/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};


export default App;
