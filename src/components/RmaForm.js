import React, { useState } from "react";
import TextInput from "./TextInput";
import RadioButton from "./RadioButton";
import CheckboxInput from "./CheckboxInput";
import TextArea from "./TextArea";
import IFrame from "./IFrame";
import FileUpload from "./FileUpload"; // Adjust import if needed

const RmaForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    shippingAddress: "",
    serialNumber: "",
    installationDate: "",
    failureDate: "",
    firmwareUpdated: "",
    firmwareVersion: "",
    failureDescription: "",
    acknowledgeShippingCosts: false,
  });

  const [selectedFile, setSelectedFile] = useState(null); // State for the uploaded file
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file) => setSelectedFile(file); // Update the selected file in state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const proxyUrlRma = "https://pure-escarpment-89857-457aa3cad0c8.herokuapp.com/";
    const googleScriptUrlRma = "https://script.google.com/macros/s/AKfycbxiQt12_JbMFFchDp7byXml9vqqQYtrbkTGlius-eIw99Twr-Bffc_YhLUy4jfe09C8/exec";
    const proxiedGoogleScriptUrlRma = proxyUrlRma + googleScriptUrlRma;

    const formDataPayload = new FormData();

    // Append form data fields
    Object.keys(formData).forEach((key) => {
      formDataPayload.append(key, formData[key]);
    });

    // Attach the uploaded file
    if (selectedFile) {
      formDataPayload.append("file", selectedFile, selectedFile.name);
    }

    try {
      const response = await fetch(proxiedGoogleScriptUrlRma, {
        method: "POST",
        body: formDataPayload,
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>RMA Form</h1>
      <h2>PART I - Contact</h2>

      <TextInput
        label="First Name:"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <TextInput
        label="Last Name:"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />

      <TextInput
        label="Company:"
        name="company"
        value={formData.company}
        onChange={handleChange}
      />

      <TextInput
        label="Email:"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <TextInput
        label="Phone:"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <TextInput
        label="Shipping Address:"
        name="shippingAddress"
        value={formData.shippingAddress}
        onChange={handleChange}
      />

      <CheckboxInput
        label="I acknowledge that Artek does not cover shipping costs for replacement products or shipping to and from repair centers."
        name="acknowledgeShippingCosts"
        checked={formData.acknowledgeShippingCosts}
        onChange={handleChange}
      />

      <h2>PART II - Product Information</h2>

      <TextInput
        label="Serial Number (beginning in HQ):"
        name="serialNumber"
        value={formData.serialNumber}
        onChange={handleChange}
      />

      <TextInput
        label="Installation Date (MM/DD/YY):"
        name="installationDate"
        value={formData.installationDate}
        onChange={handleChange}
      />

      <TextInput
        label="Failure Date (MM/DD/YY):"
        name="failureDate"
        value={formData.failureDate}
        onChange={handleChange}
      />

      <h3>Firmware Updated?</h3>
      <RadioButton
        name="firmwareUpdated"
        value={formData.firmwareUpdated}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
          { label: "Not Applicable", value: "na" },
        ]}
        onChange={handleChange}
      />

      {formData.firmwareUpdated === "yes" && (
        <TextInput
          label="Specify Firmware Version:"
          name="firmwareVersion"
          value={formData.firmwareVersion}
          onChange={handleChange}
        />
      )}

      <TextArea
        label="Brief description of failure:"
        name="failureDescription"
        value={formData.failureDescription}
        onChange={handleChange}
        rows={4}
      />

      <h2>PART III - Pre-RMA Bench Test Instructions </h2>
      <p>
        To file an RMA for any of the following product categories, you will
        need to complete the associated form. Once the form is completed online,
        download the completed form as a PDF and attach it below.
      </p>
      <div className="rmaProductList">
        <ul>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---inverter.html" 
        title="Inverter" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form-sun-inverter.html" 
        title="Sun Inverter" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---inverter-charger.html" 
        title="Inverter/Charger" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---smart-charger.html" 
        title="Smart Charger" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---mppt-solar-charger.html" 
        title="MPPT Solar Charger" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---smartsolar-mppt-rs.html" 
        title="SmartSolar MPPT RS Charger" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---bmv-battery-monitor.html" 
        title="BMV Battery Monitors" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---batteryprotect.html" 
        title="Battery Protect" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---orion-tr-dc-dc-converter.html" 
        title="Orion-Tr DC-DC Converter" 
        width="100%" 
        height="80%" 
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---lead-acid-battery.html" 
        title="Lead Acid Battery" 
        width="100%" 
        height="80%"  
      />
        </li>
        <li>
        <IFrame
        url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---lithium-battery-smart.html" 
        title="Smart Lithium Battery" 
        width="100%" 
        height="80%"  
      />
        </li>
        </ul>
      </div>

      {/* Add file upload component */}
      <FileUpload onFileChange={handleFileChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit RMA Request"}
      </button>
    </form>
  );
};

export default RmaForm;