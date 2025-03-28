import { useEffect, useState } from "react";

function useGameInfo() {
  const [data, setData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchData = async () => {
      const api_url = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
      try {
        const response = await fetch(api_url); // Fetch the data
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const jsonData = await response.json(); // Parse JSON

        setData(jsonData); // Update state with parsed data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, data };
}

export default useGameInfo;