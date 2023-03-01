import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import NotFound from "./NotFound";
import InventoryPage from "./InventoryPage";
import PackListPage from "./PackListPage";
import NewPackListPage from "./NewPackListPage";
import PackList from "./PackList";

export default function App() {
  return (
    <Router>
      <div id="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
          <Route path="/inventory" element={<InventoryPage />} />

          <Route path="/packlist">
            <Route index element={<PackListPage />} />
            <Route path="new" element={<NewPackListPage />} />
            <Route path=":list" element={<PackList />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
