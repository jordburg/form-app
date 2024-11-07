// ShippingForm.js
import React, { useState } from "react";
import TextInput from "./TextInput";
import CheckboxInput from "./CheckboxInput";
import TextArea from "./TextArea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ThreeDForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    stateSuffix: "",
    zipCode: "",
    email: "",
    phone: "",
    productDimensions: "",
    acknowledgeShippingCosts: false,
    scheduleFreightPickup: false,
    acknowledgeClaims: false,
  });

  const [loadingForm, setLoadingForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoadingForm(true);

    // Frontend validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.");
      setLoadingForm(false);
      return;
    }

    try {
      const formDataPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataPayload.append(key, formData[key]);
      });
      formDataPayload.append("action", "submitForm");

      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbz4fgIe-W37Kvqz5ryZEReK2ZqHufIFcPXv78kfGiJGpwrDfuaKQkRNNQeC2E3rHT-WAw/exec"; // Replace with actual URL

      const response = await fetch(googleScriptUrl, {
        method: "POST",
        body: formDataPayload,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === "success") {
          toast.success("Form submitted successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            company: "",
            streetAddress1: "",
            streetAddress2: "",
            city: "",
            stateSuffix: "",
            zipCode: "",
            email: "",
            phone: "",
            productDimensions: "",
            acknowledgeShippingCosts: false,
            scheduleFreightPickup: false,
            acknowledgeClaims: false,
          });
        } else {
          toast.error("Form submission failed: " + responseData.message);
        }
      } else {
        toast.error("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <>
      {/* Shipping Form */}
      <form onSubmit={handleSubmitForm}>
        <h1>3D Printed Item Shipping Form</h1>
        <h2>PART I - Contact</h2>

        {/* Contact Information */}
        <TextInput
          label="First Name:"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Last Name:"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Company:"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
        <TextInput
          label="Street Address (Line 1):"
          name="streetAddress1"
          value={formData.streetAddress1}
          onChange={handleInputChange}
        />
        <TextInput
          label="Street Address (Line 2):"
          name="streetAddress2"
          value={formData.streetAddress2}
          onChange={handleInputChange}
        />
        <TextInput
          label="City:"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
        <TextInput
          label="State Suffix:"
          name="stateSuffix"
          value={formData.stateSuffix}
          onChange={handleInputChange}
        />
        <TextInput
          label="Zip Code:"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
        />
        <TextInput
          label="Email:"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Phone:"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <h2>PART II - Product Information</h2>
        {/* Product Information */}
        <TextArea
          label="Product Dimensions (list all products individually in inches):"
          name="productDimensions"
          value={formData.productDimensions}
          onChange={handleInputChange}
          rows={4}
        />

        <h2>PART III Shipping Acknowledgements</h2>
        <h3>A. Billing & Shipping through Artek</h3>
        <p>
          3D printed items are often fragile and high-dollar items. Because of
          this, our standard shipping procedure aims to mitigate the risk of
          damage during shipping. <br /> <br />
          3D printed items ship in a Uline Standard Wood Crate (may include an
          attached pallet depending on product size). These crates range from
          $60-$600 depending on size. The cost of shipping materials will be
          included in the final freight bill.
        </p>
        <CheckboxInput
          label="I acknowledge that the cost of freight and shipping materials is variable and will be included in the final invoice."
          name="acknowledgeShippingCosts"
          checked={formData.acknowledgeShippingCosts}
          onChange={handleInputChange}
        />
        <h3>B. Bill of Lading</h3>
        <p>
          If you have a freight broker or carrier you prefer to use, you may
          schedule your own pick up using this information. Shipping materials
          will still be included in the final invoice.
        </p>

        <CheckboxInput
          label="I prefer to schedule my own freight pick up."
          name="scheduleFreightPickup"
          checked={formData.scheduleFreightPickup}
          onChange={handleInputChange}
        />
        <p>Artek LLC</p>
        <p>5300 SE Johnson Creek Blvd. Suite B</p>
        <p>Milwaukie, OR 97222</p>
        <p>Shipping/Receiving Hours: 9:00am and 5:00pm M-F</p>

        <h3>C. Claims</h3>
        <p>
        All shipments automatically include insurance. Please inspect any freight shipments for damage upon arrival. Damage must be reported to and recorded by the driver to be eligible for claims. If this incident is not logged by the driver, then a claim cannot be filed. Artek does not cover damages incurred during shipping that are not recognized or covered by the freight carrier’s insurance. 
        </p>
        <CheckboxInput
          label="I acknowledge that any damage must be reported to and recorded by the delivery driver in order to file a claim."
          name="acknowledgeClaims"
          checked={formData.acknowledgeClaims}
          onChange={handleInputChange}
        />
        <br />

        <button type="submit" disabled={loadingForm}>
          {loadingForm ? "Submitting..." : "Submit Shipping Form"}
        </button>
      </form>

      <ToastContainer />
    </>
  );
};

export default ThreeDForm;
