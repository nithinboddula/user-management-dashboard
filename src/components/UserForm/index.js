// Importing necessary hooks and components from React and react-bootstrap
import { useState, useEffect } from "react"; // React hooks for state and effect management
import { Modal, Button } from "react-bootstrap"; // Modal and Button components from react-bootstrap
import "./index.css"; // Importing CSS for styling the component

// Defining the UserForm component, accepting props like show, onClose, data, onUpdate, onCreate, and createBtn
const UserForm = ({ show, onClose, data, onUpdate, onCreate, createBtn }) => {
  // Initializing state variables to manage form fields
  const [newUserId, setNewUserId] = useState(data?.id || ""); // To store and update User ID
  const [updatedUserFirstName, setUpdatedUserFirstName] = useState(
    data?.firstName || ""
  ); // To store and update First Name
  const [updatedUserLastName, setUpdatedUserLastName] = useState(
    data?.lastName || ""
  ); // To store and update Last Name
  const [updatedEmail, setUpdatedEmail] = useState(data?.email || ""); // To store and update Email
  const [updatedDepartmentName, setUpdatedDepartmentName] = useState(
    data?.department || ""
  ); // To store and update Department
  const [errors, setErrors] = useState({}); // To store and track validation errors
  const [isSubmitting, setIsSubmitting] = useState(false); // To track if form is currently submitting

  // useEffect hook to reset form fields when creating a new user or when data is updated
  useEffect(() => {
    if (createBtn) {
      // If creating a new user, reset all fields
      setNewUserId("");
      setUpdatedUserFirstName("");
      setUpdatedUserLastName("");
      setUpdatedEmail("");
      setUpdatedDepartmentName("");
      setErrors({});
    } else if (data) {
      // If editing an existing user, fill the form with user data
      setNewUserId(data.id || "");
      setUpdatedUserFirstName(data.firstName || "");
      setUpdatedUserLastName(data.lastName || "");
      setUpdatedEmail(data.email || "");
      setUpdatedDepartmentName(data.department || "");
      setErrors({});
    }
  }, [data, createBtn]); // Dependency array - triggers effect when data or createBtn changes

  // Function to validate the form before submission
  const validateForm = () => {
    let newErrors = {}; // Object to hold validation errors

    // Checking if the first name is provided
    if (!updatedUserFirstName) {
      newErrors.firstName = "First Name is required";
    }
    // Checking if the last name is provided
    if (!updatedUserLastName) {
      newErrors.lastName = "Last Name is required";
    }
    // Checking if the email is provided and if it follows valid format
    if (!updatedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(updatedEmail)) {
      newErrors.email = "Invalid email format";
    }
    // Checking if the department is provided
    if (!updatedDepartmentName) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      // Only proceed if the form is valid
      setIsSubmitting(true); // Disable form submission while processing

      // Collect the data to be sent to API for either creating or updating the user
      const userData = {
        id: createBtn ? undefined : data.id, // If creating a new user, id should be undefined
        firstName: updatedUserFirstName,
        lastName: updatedUserLastName,
        email: updatedEmail,
        department: updatedDepartmentName,
      };

      try {
        if (createBtn) {
          // If creating a new user, call onCreate method
          await onCreate(userData);
        } else {
          // If updating an existing user, call onUpdate method
          await onUpdate(userData);
        }
      } catch (error) {
        console.error("Error submitting form:", error); // Log any errors encountered during submission
      } finally {
        setIsSubmitting(false); // Re-enable the form submission button
      }
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setErrors({}); // Clear errors when closing modal
    onClose(); // Close the modal by calling onClose prop function
  };

  return (
    <Modal
      show={show} // Controls the visibility of the modal
      onHide={handleCloseModal} // Trigger modal close on hide
      backdrop="static" // Prevent modal from closing by clicking outside
      keyboard={false} // Prevent modal from closing when pressing the escape key
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {createBtn ? "Create New User" : "Edit User Data"}{" "}
          {/* Modal title changes based on createBtn */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!createBtn && ( // If not creating a new user, show the ID field
          <div className="container">
            <label htmlFor="id">User Id</label>
            <input
              id="id"
              type="number"
              placeholder="User Id"
              className="input"
              value={newUserId}
              readOnly // ID is read-only for editing
            />
          </div>
        )}

        {/* Form input for First Name */}
        <div className="container">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            onChange={(e) => setUpdatedUserFirstName(e.target.value)} // Update first name state
            placeholder="First Name"
            className={`input ${errors.firstName ? "is-invalid" : ""}`} // Add invalid class if there's an error
            value={updatedUserFirstName}
          />
          {errors.firstName && ( // Display error message if there's a validation error
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        {/* Form input for Last Name */}
        <div className="container">
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            onChange={(e) => setUpdatedUserLastName(e.target.value)} // Update last name state
            placeholder="Last Name"
            className={`input ${errors.lastName ? "is-invalid" : ""}`} // Add invalid class if there's an error
            value={updatedUserLastName}
          />
          {errors.lastName && ( // Display error message if there's a validation error
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        {/* Form input for Email */}
        <div className="container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setUpdatedEmail(e.target.value)} // Update email state
            placeholder="Email"
            className={`input ${errors.email ? "is-invalid" : ""}`} // Add invalid class if there's an error
            value={updatedEmail}
          />
          {errors.email && ( // Display error message if there's a validation error
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Form input for Department */}
        <div className="container">
          <label htmlFor="department-name">Department Name</label>
          <input
            id="department-name"
            type="text"
            onChange={(e) => setUpdatedDepartmentName(e.target.value)} // Update department name state
            placeholder="Department Name"
            className={`input ${errors.department ? "is-invalid" : ""}`} // Add invalid class if there's an error
            value={updatedDepartmentName}
          />
          {errors.department && ( // Display error message if there's a validation error
            <div className="invalid-feedback">{errors.department}</div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Close button */}
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        {/* Submit button (Create or Update) */}
        <Button
          variant="primary"
          onClick={handleSubmit} // Trigger form submission
          disabled={isSubmitting} // Disable button while submitting
        >
          {createBtn ? "Create" : "Update"}{" "}
          {/* Button label changes based on createBtn */}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm; // Exporting the UserForm component for use in other parts of the app
