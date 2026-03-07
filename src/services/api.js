const ANALYZE_ENDPOINT = "/api/analyze";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export async function analyzeEligibility(profile) {
  const payload = {
    age: Number(profile.age),
    state: profile.state,
    occupation: profile.occupation,
    income: profile.income,
  };

  let response;
  try {
    response = await fetch(ANALYZE_ENDPOINT, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Network connection issue. Please try again in a moment.");
  }

  if (!response.ok) {
    let errorMessage = "Unable to analyze eligibility right now.";

    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
      // Keep default message if response is not valid JSON
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

const apiService = {
  analyzeEligibility,
};

export default apiService;
