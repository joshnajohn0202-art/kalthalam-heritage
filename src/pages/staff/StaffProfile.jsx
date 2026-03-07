import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

const avatar = "/demo/alice-avatar.svg";

const defaultDetails = {
  education: {
    qualification: "Bachelor of Science",
    specialization: "Environmental Science",
    institution: "State University",
    year: "2012",
    gpa: "3.75 / 4.0",
  },
  experience: {
    totalYears: "2 years",
    previousCompany: "City Health Center",
    lastDesignation: "Maintenance Lead",
    keySkills: "Sanitization, Waste Management, Team Coordination",
  },
  family: {
    fatherName: "John Doe",
    motherName: "Jane Doe",
    maritalStatus: "Married",
    spouseName: "Robert Smith",
  },
};

const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const makeFormFromStaff = (data) => ({
  role: data?.role || "Cleaning Staff",
  phone: data?.phone || "",
  gender: data?.gender || "Female",
  dateOfBirth: toDateInput(data?.dateOfBirth) || "1990-01-01",
  age: data?.age ?? 30,
  bloodGroup: data?.bloodGroup || "O+",
  joinDate: data?.joinDate || "2022-03-15",
  permanentAddress: data?.permanentAddress || "123 Main Street, Springfield, USA",
  education: {
    qualification: data?.education?.qualification || defaultDetails.education.qualification,
    specialization: data?.education?.specialization || defaultDetails.education.specialization,
    institution: data?.education?.institution || defaultDetails.education.institution,
    year: data?.education?.year || defaultDetails.education.year,
    gpa: data?.education?.gpa || defaultDetails.education.gpa,
  },
  experience: {
    totalYears: data?.experience?.totalYears || defaultDetails.experience.totalYears,
    previousCompany: data?.experience?.previousCompany || defaultDetails.experience.previousCompany,
    lastDesignation: data?.experience?.lastDesignation || defaultDetails.experience.lastDesignation,
    keySkills: data?.experience?.keySkills || defaultDetails.experience.keySkills,
  },
  family: {
    fatherName: data?.family?.fatherName || defaultDetails.family.fatherName,
    motherName: data?.family?.motherName || defaultDetails.family.motherName,
    maritalStatus: data?.family?.maritalStatus || defaultDetails.family.maritalStatus,
    spouseName: data?.family?.spouseName || defaultDetails.family.spouseName,
  },
});

export default function StaffProfile() {
  const navigate = useNavigate();
  const staffName = localStorage.getItem("staffName");
  const userEmail = localStorage.getItem("userEmail");
  const [staff, setStaff] = useState(null);
  const [form, setForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        let res;
        if (staffName) {
          res = await fetch(`${API_BASE_URL}/api/staff/profile/${encodeURIComponent(staffName)}`);
        } else if (userEmail) {
          res = await fetch(`${API_BASE_URL}/api/staff/by-email/${encodeURIComponent(userEmail)}`);
        } else {
          throw new Error("Missing staff identity. Please login again.");
        }
        if (!res.ok) throw new Error("Staff profile not found");
        const data = await res.json();
        if (data?.name) localStorage.setItem("staffName", data.name);
        setStaff(data);
        setForm(makeFormFromStaff(data));
      } catch (err) {
        setError(err.message || "Unable to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [staffName, userEmail]);

  const mapped = useMemo(() => {
    if (!staff) return null;
    return {
      name: staff.name || "N/A",
      role: staff.role || "N/A",
      gender: staff.gender || "N/A",
      dob: toDateInput(staff.dateOfBirth) || "N/A",
      age: staff.age ?? "N/A",
      bloodGroup: staff.bloodGroup || "N/A",
      joinDate: staff.joinDate || "N/A",
      duty: staff.role || "N/A",
      address: staff.permanentAddress || "N/A",
      education: {
        ...defaultDetails.education,
        ...(staff.education || {}),
      },
      experience: {
        ...defaultDetails.experience,
        ...(staff.experience || {}),
      },
      family: {
        ...defaultDetails.family,
        ...(staff.family || {}),
      },
      documents: {
        cv: "Uploaded",
        idProof: "Aadhaar (Demo)",
        cvUrl: "/demo/staff-cleaning-cv.html",
        idProofUrl: "/demo/staff-id-proof.html",
      },
    };
  }, [staff]);

  const updateTopLevel = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateNested = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!staff) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        role: form.role,
        phone: form.phone,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth || null,
        age: Number(form.age) || null,
        bloodGroup: form.bloodGroup,
        joinDate: form.joinDate,
        permanentAddress: form.permanentAddress,
        education: form.education,
        experience: form.experience,
        family: form.family,
      };

      const res = await fetch(`${API_BASE_URL}/api/staff/profile/${encodeURIComponent(staff.name)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save profile");
      setStaff(data);
      setMessage("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Unable to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "30px 24px", backgroundColor: "#f4f7fe" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "flex-end" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "8px 12px",
            backgroundColor: "#1e293b",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back
        </button>
        {!isEditing && (
          <button
            onClick={() => {
              setMessage("");
              setError("");
              setIsEditing(true);
            }}
            style={{
              padding: "8px 12px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </button>
        )}
      </div>

      {loading && <p>Loading profile...</p>}
      {error && <p style={{ color: "#dc2626", fontWeight: 600 }}>{error}</p>}
      {message && <p style={{ color: "#166534", fontWeight: 600 }}>{message}</p>}

      {!loading && !error && mapped && form && (
        <>
          {isEditing && (
            <form onSubmit={handleSave} style={editCardStyle}>
              <h2 style={titleStyle}>Edit Profile</h2>
              <div style={editGrid}>
                <Input label="Role" value={form.role} onChange={(v) => updateTopLevel("role", v)} />
                <Input label="Phone" value={form.phone} onChange={(v) => updateTopLevel("phone", v)} />
                <Input label="Gender" value={form.gender} onChange={(v) => updateTopLevel("gender", v)} />
                <Input label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(v) => updateTopLevel("dateOfBirth", v)} />
                <Input label="Age" type="number" value={form.age} onChange={(v) => updateTopLevel("age", v)} />
                <Input label="Blood Group" value={form.bloodGroup} onChange={(v) => updateTopLevel("bloodGroup", v)} />
                <Input label="Joining Date" type="date" value={form.joinDate} onChange={(v) => updateTopLevel("joinDate", v)} />
                <Input label="Address" value={form.permanentAddress} onChange={(v) => updateTopLevel("permanentAddress", v)} />
              </div>

              <h3 style={subTitle}>Education</h3>
              <div style={editGrid}>
                <Input label="Qualification" value={form.education.qualification} onChange={(v) => updateNested("education", "qualification", v)} />
                <Input label="Specialization" value={form.education.specialization} onChange={(v) => updateNested("education", "specialization", v)} />
                <Input label="Institution" value={form.education.institution} onChange={(v) => updateNested("education", "institution", v)} />
                <Input label="Graduation Year" value={form.education.year} onChange={(v) => updateNested("education", "year", v)} />
                <Input label="GPA / Score" value={form.education.gpa} onChange={(v) => updateNested("education", "gpa", v)} />
              </div>

              <h3 style={subTitle}>Experience</h3>
              <div style={editGrid}>
                <Input label="Total Experience" value={form.experience.totalYears} onChange={(v) => updateNested("experience", "totalYears", v)} />
                <Input label="Previous Company" value={form.experience.previousCompany} onChange={(v) => updateNested("experience", "previousCompany", v)} />
                <Input label="Last Designation" value={form.experience.lastDesignation} onChange={(v) => updateNested("experience", "lastDesignation", v)} />
                <Input label="Key Skills" value={form.experience.keySkills} onChange={(v) => updateNested("experience", "keySkills", v)} />
              </div>

              <h3 style={subTitle}>Family</h3>
              <div style={editGrid}>
                <Input label="Father Name" value={form.family.fatherName} onChange={(v) => updateNested("family", "fatherName", v)} />
                <Input label="Mother Name" value={form.family.motherName} onChange={(v) => updateNested("family", "motherName", v)} />
                <Input label="Marital Status" value={form.family.maritalStatus} onChange={(v) => updateNested("family", "maritalStatus", v)} />
                <Input label="Spouse Name" value={form.family.spouseName} onChange={(v) => updateNested("family", "spouseName", v)} />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                <button type="submit" style={saveBtnStyle} disabled={saving}>
                  {saving ? "Saving..." : "Save Profile"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm(makeFormFromStaff(staff));
                    setIsEditing(false);
                  }}
                  style={cancelBtnStyle}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div style={containerStyle}>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Personal Information</h2>
              <div style={profileHeader}>
                <img src={avatar} alt="Profile" style={profileImage} />
                <div>
                  <h3 style={{ margin: 0 }}>{mapped.name}</h3>
                  <p style={{ margin: 0, color: "#6b7280" }}>{mapped.role}</p>
                </div>
              </div>
              <Info label="Gender" value={mapped.gender} />
              <Info label="Date of Birth" value={mapped.dob} />
              <Info label="Age" value={mapped.age} />
              <Info label="Blood Group" value={mapped.bloodGroup} />
              <Info label="Joining Date" value={mapped.joinDate} />
              <Info label="Address" value={mapped.address} />
            </div>

            <div style={cardStyle}>
              <h2 style={titleStyle}>Education Details</h2>
              <Info label="Qualification" value={mapped.education.qualification} />
              <Info label="Specialization" value={mapped.education.specialization} />
              <Info label="Institution" value={mapped.education.institution} />
              <Info label="Graduation Year" value={mapped.education.year} />
              <Info label="GPA / Score" value={mapped.education.gpa} />
            </div>

            <div style={cardStyle}>
              <h2 style={titleStyle}>Duty & Experience</h2>
              <Info label="Current Duty" value={mapped.duty} />
              <Info label="Total Experience" value={mapped.experience.totalYears} />
              <Info label="Previous Company" value={mapped.experience.previousCompany} />
              <Info label="Last Designation" value={mapped.experience.lastDesignation} />
              <Info label="Key Skills" value={mapped.experience.keySkills} />
            </div>

            <div style={cardStyle}>
              <h2 style={titleStyle}>Family Information</h2>
              <Info label="Father Name" value={mapped.family.fatherName} />
              <Info label="Mother Name" value={mapped.family.motherName} />
              <Info label="Marital Status" value={mapped.family.maritalStatus} />
              {mapped.family.maritalStatus === "Married" && (
                <Info label="Spouse Name" value={mapped.family.spouseName} />
              )}
            </div>

            <div style={cardStyle}>
              <h2 style={titleStyle}>Documents</h2>
              <DocumentRow label="CV" value="Uploaded" fileUrl={mapped.documents.cvUrl} />
              <DocumentRow label="ID Proof" value="Aadhaar (Demo)" fileUrl={mapped.documents.idProofUrl} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <label style={inputWrapStyle}>
      <span style={inputLabelStyle}>{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value || "N/A"}</span>
    </div>
  );
}

function DocumentRow({ label, value, fileUrl }) {
  return (
    <div style={docRowStyle}>
      <div style={docInfoWrap}>
        <span style={labelStyle}>{label}</span>
        <span style={valueStyle}>{value || "N/A"}</span>
      </div>
      <button
        type="button"
        style={viewBtnStyle}
        onClick={() => window.open(fileUrl, "_blank", "noopener,noreferrer")}
      >
        View
      </button>
    </div>
  );
}

const editCardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "24px",
  marginRight: "40px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
};

const editGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "12px",
};

const inputWrapStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const inputLabelStyle = {
  fontSize: "13px",
  color: "#64748b",
  fontWeight: 600,
};

const inputStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "8px 10px",
  fontSize: "14px",
};

const saveBtnStyle = {
  border: "none",
  background: "#1e293b",
  color: "#fff",
  borderRadius: "8px",
  padding: "10px 16px",
  fontWeight: "700",
  cursor: "pointer",
};

const cancelBtnStyle = {
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#1e293b",
  borderRadius: "8px",
  padding: "10px 16px",
  fontWeight: "700",
  cursor: "pointer",
};

const subTitle = {
  margin: "16px 0 10px 0",
  fontSize: "16px",
  color: "#1e293b",
};

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "25px",
  paddingRight: "40px",
  paddingTop: "20px",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  width: "320px",
  flex: "1 1 320px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
};

const titleStyle = {
  marginBottom: "20px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1e293b",
  borderBottom: "2px solid #e2e8f0",
  paddingBottom: "10px",
};

const profileHeader = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "20px",
};

const profileImage = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #3b82f6",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "15px",
};

const labelStyle = {
  fontWeight: "600",
  color: "#64748b",
};

const valueStyle = {
  color: "#334155",
  textAlign: "right",
  maxWidth: "200px",
};

const docRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px 0",
  borderBottom: "1px solid #f1f5f9",
};

const docInfoWrap = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  flex: 1,
};

const viewBtnStyle = {
  border: "1px solid #cbd5e1",
  background: "#f8fafc",
  color: "#1e293b",
  borderRadius: "8px",
  padding: "6px 12px",
  fontWeight: "600",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
