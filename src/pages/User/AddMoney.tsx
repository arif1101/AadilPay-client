export default function AddMoney() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full bg-white shadow-md rounded-2xl p-6 border border-orange-200">
        <h2 className="text-xl font-semibold text-orange-600 text-center mb-3">
          Deposit via Agent
        </h2>
        <p className="text-gray-600 text-center text-sm mb-6">
          For security and compliance, deposits (cash-in) must be completed
          through an agent. You cannot add money directly from your account.
        </p>

        <div className="flex justify-center gap-3 mb-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium">
            Find Nearby Agents
          </button>
          <button className="border border-orange-400 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium">
            Copy Request (share with agent)
          </button>
        </div>

        <div className="text-center">
          <button className="text-orange-600 hover:underline text-sm font-medium">
            How to deposit?
          </button>
        </div>
      </div>
    </div>
  );
}
