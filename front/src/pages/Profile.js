import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = `
.dashboard {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh;
  background: #080809;
  color: #e8e8e8;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.topbar h2 {
  margin: 0;
  font-size: 18px;
  letter-spacing: 2px;
}

.topbar-actions button {
  margin-left: 10px;
}

.profile-container {
  padding: 50px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .profile-container { padding: 20px; }
  .topbar { padding: 14px 20px; }
}

.profile-card {
  background: #0d0d0f;
  border: 1px solid rgba(255,255,255,0.06);
  padding: 30px;
  border-radius: 14px;
  width: 100%;
  max-width: 850px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.6);
}

.profile-title {
  font-size: 26px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.profile-card-content {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 30px;
}

@media (max-width: 650px) {
  .profile-card-content {
    grid-template-columns: 1fr;
  }
  .profile-left {
    flex-direction: row !important;
    gap: 20px;
    align-items: center;
  }
}

.profile-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.profile-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #c4a460;
  transition: 0.3s;
  flex-shrink: 0;
}

.profile-image:hover {
  transform: scale(1.05);
}

.section {
  background: rgba(255,255,255,0.03);
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  letter-spacing: 1px;
  color: #c4a460;
  text-transform: uppercase;
}

.input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  outline: none;
  border-radius: 6px;
  box-sizing: border-box;
}

.input.error-border {
  border-color: #ff4d4d;
}

.error-msg {
  color: #ff4d4d;
  font-size: 12px;
  margin: 2px 0 6px 2px;
}

.btn {
  padding: 10px 14px;
  border: none;
  cursor: pointer;
  background: #c4a460;
  color: black;
  font-weight: bold;
  border-radius: 6px;
  transition: 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  background: #d6b46b;
}

.btn-danger {
  background: #ff2b2b;
  color: white;
}

.btn-dark {
  background: rgba(255,255,255,0.08);
  color: white;
}

.btn-dark:hover {
  background: rgba(255,255,255,0.15);
}

.flash {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  z-index: 9999;
  animation: fadeIn 0.25s ease;
}

.flash.success { background: #c4a460; color: white; }
.flash.error   { background: #ff2b2b; color: white; }

@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -10px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}
`;


// FLASH MESSAGE COMPONENT

function FlashMessage({ flash }) {
    if (!flash) return null;
    return (
        <div className={`flash ${flash.type}`}>
            {flash.message}
        </div>
    );
}

// TOPBAR COMPONENT

function Topbar({ onHome, onLogout }) {
    return (
        <div className="topbar">
            <h2>PROFILE</h2>
            <div className="topbar-actions">
                <button className="btn btn-dark" onClick={onHome}>Home</button>
                <button className="btn btn-danger" onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
}

// PROFILE IMAGE COMPONENT

function ProfileImage({ imageSrc, onFileChange, onUpload }) {
    return (
        <div className="profile-left">
            <img src={imageSrc} className="profile-image" alt="profile" />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) onFileChange(file);
                }}
            />
            <button className="btn" onClick={onUpload}>Upload</button>
        </div>
    );
}

// PROFILE INFO FORM 

function ProfileInfoForm({ initialValues, onSubmit }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
    });

    return (
        <div className="section">
            <h4>Profile Info</h4>

            <input
                className="input"
                name="firstname"
                placeholder="First Name"
                value={formik.values.firstname}
                onChange={formik.handleChange}
            />


            <input
                className="input"
                name="lastname"
                placeholder="Last Name"
                value={formik.values.lastname}
                onChange={formik.handleChange}
            />


            <PhoneInput
                country="eg"
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                inputClass="input"
                inputStyle={{ backgroundColor: "#1a1a1a", color: "white", border: "1px solid #333" }}
                buttonStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                dropdownStyle={{ backgroundColor: "#1a1a1a", color: "white" }}
            />


            <button className="btn" onClick={formik.handleSubmit} style={{ marginTop: 8 }}>
                Save Changes
            </button>
        </div>
    );
}

// EMAIL FORM 

function EmailForm({ currentEmail, onSubmit }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email: currentEmail, password: "" },
        onSubmit: async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
        }
    });

    return (
        <div className="section">
            <h4>Email</h4>

            <input
                className="input"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}

            />


            <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}

            />


            <button className="btn" onClick={formik.handleSubmit} style={{ marginTop: 8 }}>
                Update Email
            </button>
        </div>
    );
}

// PASSWORD FORM 

function PasswordForm({ onSubmit }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            old_password: "",
            new_password: "",
            confirm_password: "",
        },
        onSubmit: async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
        }
    });

    return (
        <div className="section">
            <h4>Password</h4>

            <input
                type="password"
                className="input"
                name="old_password"
                placeholder="Current Password"
                value={formik.values.old_password}
                onChange={formik.handleChange}
            />

            <input
                type="password"
                className="input"
                name="new_password"
                placeholder="New Password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
            />

            <input
                type="password"
                className="input"
                name="confirm_password"
                placeholder="Confirm New Password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
            />

            <button className="btn" onClick={formik.handleSubmit} style={{ marginTop: 8 }}>
                Update Password
            </button>
        </div>
    );
}


// DELETE ACCOUNT FORM 

function DeleteAccountForm({ onSubmit }) {
    const formik = useFormik({
        initialValues: { password: "" },
        onSubmit,
    });

    return (
        <div className="section">
            <h4>Delete Account</h4>

            <input
                type="password"
                className="input"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
            />

            <button className="btn btn-danger" onClick={formik.handleSubmit} style={{ marginTop: 8 }}>
                Delete Account
            </button>
        </div>
    );
}

// MAIN PROFILE PAGE

function Profile() {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [flash, setFlash] = useState(null);

    const navigate = useNavigate();

    const showFlash = (message, type = "success") => {
        setFlash({ message, type });
        setTimeout(() => setFlash(null), 3000);
    };

    // ── Fetch user ──
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user", {
                    credentials: "include"
                });

                if (res.status === 401)
                    return navigate("/login");
                const data = await res.json();

                setUser(data);

                setProfileImage(data.profileImage);
            }
            catch {

                showFlash("Network error. Please try again.", "error");
            }

        };

        fetchUser();
    }, [navigate]);

    // ── Logout ──

    const logout = async () => {

        await fetch("/api/user/logout", {
            credentials: "include"
        });
        navigate("/login");
    };

    // ── Update profile info ──
    const updateUser = async (values) => {
        try {

            const res = await fetch("/api/user", {

                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });
            if (res.status === 401)
                return navigate("/login");

            const data = await res.json();

            if (res.status === 400)
                return showFlash(data.message, "error");

            setUser(data);

            showFlash("Updated successfully");

        } catch {

            showFlash("Network error. Please try again.", "error");
        }
    };

    // ── Update email ──
    const updateEmail = async ({ email, password }) => {
        try {
            const res = await fetch("/api/user/email", {

                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),

            });
            if (res.status === 401)
                return navigate("/login");
            const data = await res.json().catch(() => ({}));

            if (res.status === 400)
                return showFlash(data.message, "error");
            setUser((prev) => ({ ...prev, email }));
            showFlash("Email updated");
        } catch {
            showFlash("Network error. Please try again.", "error");
        }
    };

    // ── Update password ──
    const updatePassword = async (values) => {
        try {
            const res = await fetch("/api/user/password", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });
            if (res.status === 401)
                return navigate("/login");
            const data = await res.json();

            if (res.status === 400)
                return showFlash(data.message, "error");

            showFlash("Password updated");

        } catch {
            showFlash("Network error. Please try again.", "error");
        }
    };

    // ── Delete account ──
    const deleteUser = async ({ password }) => {
        try {
            const res = await fetch("/api/user", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ password }),
            });
            if (res.status === 401)
                return navigate("/login");

            const data = await res.json();

            if (res.status === 400)
                return showFlash(data.message, "error");
            showFlash("Account deleted");
            navigate("/login");
        } catch {
            showFlash("Network error. Please try again.", "error");
        }
    };

    // ── Upload photo ──
    const updatePhoto = async () => {
        if (!imageFile)
            return showFlash("Select an image first", "error");

        const formData = new FormData();

        formData.append("image", imageFile);

        try {
            const res = await fetch("/api/user/profile-image", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok)
                return showFlash(data.message, "error");
            setProfileImage(data.image);
            setPreview(null);
            setImageFile(null);
            showFlash("Profile image updated");
        } catch {
            showFlash("Network error. Please try again.", "error");
        }
    };

    const imageSrc =
        preview ||
        (profileImage
            ? `http://localhost:5000${profileImage}`
            : "http://localhost:5000/uploads/profile_photo/images.png");

    return (
        <>
            <style>{styles}</style>
            <FlashMessage flash={flash} />

            <div className="dashboard">
                <Topbar onHome={() => navigate("/")} onLogout={logout} />

                <div className="profile-container">
                    <div className="profile-card">
                        <div className="profile-title">Account Settings</div>

                        {!user ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="profile-card-content">

                                <ProfileImage
                                    imageSrc={imageSrc}
                                    onFileChange={(file) => {
                                        setImageFile(file);
                                        setPreview(URL.createObjectURL(file));
                                    }}
                                    onUpload={updatePhoto}
                                />

                                <div>
                                    <ProfileInfoForm
                                        initialValues={{
                                            firstname: user.firstname || "",
                                            lastname: user.lastname || "",
                                            phone: user.phone || "",
                                        }}
                                        onSubmit={updateUser}
                                    />

                                    <EmailForm
                                        currentEmail={user.email || ""}
                                        onSubmit={updateEmail}
                                    />

                                    <PasswordForm onSubmit={updatePassword} />

                                    <DeleteAccountForm onSubmit={deleteUser} />
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;