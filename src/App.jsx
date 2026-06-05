import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Login from "./Pages/Login/page";
import StatsPage from "./Pages/Stats/page.jsx";
import HomePage from "./Pages/HomePage/page.jsx";
import PrivateRoute from "./contexts/authContext/PrivateRoute";
import Beverages from "./Pages/Food/Beverages/Beverages.jsx";
import Meal from "./Pages/Food/Meal/Meal.jsx";
import Snacks from "./Pages/Food/Snacks/Snacks.jsx";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./Pages/Cart/Cart.jsx";
import SavedItems from "./Pages/Saved/SavedItems.jsx";
import ContactUs from "./Pages/ContactUs/ContactUs.jsx";
import StudentStats from "./Pages/Stats/page.jsx";
import Combos from "./Pages/Combos/index";
// import { useEffect } from "react";
// import { setupNotifications, setupMessageListener } from './firebase/firebase';
import { Provider } from "react-redux";
import store from "./redux/store";
import Receipts from "./Pages/Receipts/Receipts";
import TandC from "./Pages/TandC/page";
import CancellationAndRefund from "./Pages/CancellationAndRefund/page";
import PrivacyPolicy from "./Pages/PrivacyPolicy/page";
import { Toaster } from "react-hot-toast";
import ReceiptDetails from "./Pages/Receipts/ReceiptDetails";
import Navbar from "./Pages/Navbar/page";
import AuthenticatedLayout from "./Pages/Navbar/AuthenticatedLayout";
const App = () => {
  // useEffect(() => {
  //   setupNotifications()
  //     .then(() => console.log('Notifications setup complete'))
  //     .catch(error => console.error('Notifications setup failed:', error));

  //   setupMessageListener();
  // }, []);
  return (
    <Provider store={store}>
      <CartProvider>
        <Router>
          <AuthProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={8}
              toastOptions={{
                // Default options for all toasts
                duration: 5000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                // Default options for specific types
                success: {
                  duration: 3000,
                  theme: {
                    primary: "green",
                  },
                },
                error: {
                  duration: 6000,
                  theme: {
                    primary: "red",
                  },
                },
              }}
            />
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route
                element={
                  <PrivateRoute>
                    <AuthenticatedLayout />
                  </PrivateRoute>
                }
              >
                <Route
                  path="/homepage"
                  element={
                    <PrivateRoute>
                      <HomePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Combos"
                  element={
                    <PrivateRoute>
                      <Combos />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/statspage"
                  element={
                    <PrivateRoute>
                      <StatsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Food/Beverages"
                  element={
                    <PrivateRoute>
                      <Beverages />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Food/Meal"
                  element={
                    <PrivateRoute>
                      <Meal />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Food/Snacks"
                  element={
                    <PrivateRoute>
                      <Snacks />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/saved-items"
                  element={
                    <PrivateRoute>
                      <SavedItems />
                    </PrivateRoute>
                  }
                />

                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/TandC" element={<TandC />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route
                  path="/CancellationAndRefund"
                  element={<CancellationAndRefund />}
                />
                <Route
                  path="/receipts"
                  element={
                    <PrivateRoute>
                      <Receipts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/receipt/:orderId"
                  element={
                    <PrivateRoute>
                      <ReceiptDetails />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/contact-us"
                element={
                  <PrivateRoute>
                    <ContactUs />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      </CartProvider>
    </Provider>
  );
};

export default App;
