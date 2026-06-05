import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export default function CancellationAndRefunds() {
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
        Cancellation & Refund Policy
      </h1>

      <div className="space-y-6">
        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">1. Order Cancellation</h2>
          <p className="text-gray-600 mt-2">
            Orders can only be canceled within 5 minutes of placing them. Once the order is being prepared, cancellation is not allowed.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">2. Refund Eligibility</h2>
          <p className="text-gray-600 mt-2">
            Refunds will only be processed if the order was canceled within the allowed timeframe or if the canteen fails to fulfill the order.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">3. Refund Process</h2>
          <p className="text-gray-600 mt-2">
            Refunds, if applicable, will be processed within 5-7 business days and credited to the original payment method.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">4. Non-Refundable Items</h2>
          <p className="text-gray-600 mt-2">
            Food items that have been prepared and delivered are not eligible for refunds unless there is an issue with quality or incorrect items were provided.
          </p>
        </section>

        <section className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">5. Dispute Resolution</h2>
          <p className="text-gray-600 mt-2">
            If you have concerns regarding your order, please contact the canteen administration within 24 hours for resolution.
          </p>
        </section>
      </div>

      <p className="mt-6 text-center text-gray-500">
        For any queries, reach out to the college canteen administration.
      </p>
    </div>
  );
}


