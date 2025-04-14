import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { config } from "../../services/config";

const TestSchedule = () => {
  //   const {id, selectedDate } = useParams();
  const { id, selectedDate } = useParams();
  const [batchdata, setBatchData] = useState(null); // Initialize as null

  useEffect(() => {
    getBatchById();
  }, []);

  const getBatchById = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_TEST}batches/tests?batchId=${id}&startDate=${selectedDate}`
      );
      setBatchData(response.tests);

      console.log("response", response);
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
  };

  return (
    <div style={{ marginTop: "10px", padding: "10px" }}>
      <h3>Test Schedule</h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
            {/* <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Test Name
            </th> */}
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Start Date
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Start Time
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Result Date
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              End Date
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              End Time
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {batchdata?.length > 0 ? (
            batchdata.map((test, index) => (
              <tr key={index}>
                {/* <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {"N/A"}
                </td> */}
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {test.startDate}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {test.startTime}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {test.resultDate}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {test.endDate}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {test.endTime}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  <span
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Active
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                No tests scheduled for {}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TestSchedule;
