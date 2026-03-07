import { useState, useEffect } from "react";
import StorageService from "../utils/StorageService";

function InputForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: "",
    occupation: "",
    income: "",
    state: "",
    language: ""
  });

  useEffect(() => {
    const savedData = StorageService.getEligibilityData();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={styles.outerContainer}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formHeader}>
          <h2 style={styles.heading}>ELIGIBILITY CHECK</h2>
          <p style={styles.subheading}>PROVIDE ACCURATE INFORMATION TO ACCESS GOVERNMENT BENEFITS</p>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>APPLICANT AGE</label>
          <input
            type="number"
            name="age"
            placeholder="Enter age in years"
            value={formData.age}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>PRIMARY OCCUPATION</label>
          <input
            type="text"
            name="occupation"
            placeholder="e.g. Farmer, Student"
            value={formData.occupation}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>ANNUAL FAMILY INCOME</label>
          <select
            name="income"
            value={formData.income}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">SELECT INCOME RANGE</option>
            <option value="low">BELOW ₹2,50,000</option>
            <option value="medium">₹2,50,000 - ₹5,00,000</option>
            <option value="high">ABOVE ₹5,00,000</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>RESIDENT STATE</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">SELECT STATE</option>
            <option value="maharashtra">MAHARASHTRA</option>
            <option value="karnataka">KARNATAKA</option>
            <option value="uttarpradesh">UTTAR PRADESH</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>PREFERRED LANGUAGE</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">SELECT LANGUAGE</option>
            <option value="english">ENGLISH</option>
            <option value="hindi">HINDI</option>
            <option value="marathi">MARATHI</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          FIND SCHEMES
        </button>
      </form>
    </div>
  );
}

const styles = {
  outerContainer: {
    padding: "40px 20px"
  },
  form: {
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "2px",
    border: "1px solid #CBD5E1",
    borderTop: "8px solid #11486B"
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "12px",
    borderBottom: "1px solid #E2E8F0",
    paddingBottom: "20px"
  },
  heading: {
    color: "#11486B",
    fontSize: "24px",
    fontWeight: "900",
    margin: "0 0 8px 0",
    letterSpacing: "2px"
  },
  subheading: {
    color: "#64748B",
    fontSize: "11px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "1px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#334155",
    letterSpacing: "1px"
  },
  input: {
    padding: "12px 14px",
    borderRadius: "2px",
    border: "1px solid #CBD5E1",
    fontSize: "14px",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box"
  },
  button: {
    padding: "16px",
    borderRadius: "2px",
    border: "none",
    backgroundColor: "#FF9933",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "900",
    fontSize: "14px",
    letterSpacing: "1px",
    marginTop: "12px",
    boxShadow: "0 4px 0 #CC7A29"
  }
};

export default InputForm;
