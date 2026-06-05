import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
export default function TermsAndConditions() {
  const navigate = useNavigate();
  return (
    <div className="max-w-8xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <div
        className="cursor-pointer mr-4"
        onClick={() => navigate("/HomePage")}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-gray-600 text-xl hover:text-gray-800 transition-colors"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Terms and Conditions
      </h1>

      <div className="space-y-6">
        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mt-2">
            By using our college canteen app, you agree to abide by these Terms and Conditions. If you do not agree, please do not use the service.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">2. User Responsibilities</h2>
          <p className="text-gray-600 mt-2">
            Users must provide accurate information while registering and must not engage in fraudulent or abusive activities on the platform.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">3. Ordering & Payments</h2>
          <p className="text-gray-600 mt-2">
            All orders must be placed through the app. Payments should be made via the available payment methods. The canteen reserves the right to refuse or cancel any order.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">4. Refunds & Cancellations</h2>
          <p className="text-gray-600 mt-2">
            Refunds and cancellations are subject to the canteen’s policies. Orders once prepared cannot be refunded or canceled.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">5. Privacy Policy</h2>
          <p className="text-gray-600 mt-2">
            Your personal data is handled as per our Privacy Policy. By using the app, you consent to data collection and processing practices.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">6. Modifications</h2>
          <p className="text-gray-600 mt-2">
            We reserve the right to modify these Terms and Conditions at any time. Continued use of the app constitutes acceptance of the revised terms.
          </p>
        </section>
      </div>

      <p className="mt-6 text-center text-gray-500">
        If you have any questions, contact the college canteen administration.
      </p>
    </div>
  );
}