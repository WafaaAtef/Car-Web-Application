import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


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

.profile-card {
  background: #0d0d0f;
  border: 1px solid rgba(255,255,255,0.06);
  padding: 30px;
  border-radius: 14px;
  width: 850px;
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


.profile-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #c4a460;
  transition: 0.3s;
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

.input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  outline: none;
  border-radius: 6px;
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
  animation: fade 0.25s ease;
}

.flash.success {
  background: #1f7a3a;
  color: white;
}

.flash.error {
  background: #b3261e;
  color: white;
}

@keyframes fade {
  from { opacity: 0; transform: translate(-50%, -10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
`;

function Profile() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ firstname: "", lastname: "", phone: "" });

    const [email, setEmail] = useState("");
    const [emailPass, setEmailPass] = useState("");

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [deletePass, setDeletePass] = useState("");

    const [profileImage, setProfileImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const navigate = useNavigate();


    const [flash, setFlash] = useState(null);
    const showFlash = (message, type = "success") => {
        setFlash({ message, type });
        setTimeout(() => setFlash(null), 3000);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/user", {
                credentials: "include"
            });

            if (res.status === 401)
                return navigate("/login");

            const data = await res.json();
            setUser(data);

            setProfileImage(data.profileImage);
            setForm({
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
            });
            setEmail(data.email);
        };

        fetchUser();
    }, [navigate]);

    const logout = async () => {
        await fetch("/api/logout", {
            credentials: "include"
        });
        navigate("/login");
    };

    const updateUser = async () => {
        const res = await fetch("/api/user", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(form),
        });

        if (res.status === 401)
            return navigate("/login");

        if (res.status === 400) {
            const data = await res.json();
            return showFlash(data.message, "error");
        }

        const data = await res.json();
        setUser(data);
        showFlash("Updated successfully");
    };

    const updateEmail = async () => {
        const res = await fetch("/api/user/email", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password: emailPass }),
        });

        if (res.status === 401)
            return navigate("/login");

        const data = await res.json().catch(() => ({}));

        if (res.status === 400) {
            return showFlash(data.message, "error");
        }

        setUser((prev) => ({ ...prev, email }));
        setEmailPass("");
        showFlash("Email updated");
    };

    const updatePassword = async () => {
        const res = await fetch("/api/user/password", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                old_password: oldPass,
                new_password: newPass,
                confirm_password: confirmPass,
            }),
        });

        if (res.status === 401)
            return navigate("/login");

        const data = await res.json();

        if (res.status === 400) {
            return showFlash(data.message, "error");
        }

        setOldPass("");
        setNewPass("");
        setConfirmPass("");
        showFlash("Password updated");
    };

    const deleteUser = async () => {
        const res = await fetch("/api/user", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ password: deletePass }),
        });

        if (res.status === 401)
            return navigate("/login");

        const data = await res.json();

        if (res.status === 400) {
            return showFlash(data.message, "error");
        }

        showFlash("Account Deleted");
        navigate("/login");
    };

    const updatephoto = async () => {
        if (!imageFile)
            return showFlash("Select an image first", "error");

        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await fetch("/api/user/profile-image", {
            method: "PATCH",
            credentials: "include",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok)
            return showFlash(data.message, "error");

        setProfileImage(data.image);
        setPreview(null);
        showFlash("Profile image updated");
    };

    const imageSrc =
        preview ||
        (profileImage
            ? `http://localhost:5000${profileImage}`
            : "https://localhost:5000/uploads/profile_photo/images.png");

    return (
        <>
            <style>{styles}</style>

            {flash && (
                <div className={`flash ${flash.type}`}>
                    {flash.message}
                </div>
            )}

            <div className="dashboard">

                <div className="topbar">
                    <h2>PROFILE</h2>

                    <div className="topbar-actions">
                        <button className="btn btn-dark" onClick={() => navigate("/")}>
                            Home
                        </button>
                        <button className="btn btn-danger" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="profile-container">
                    <div className="profile-card">
                        <div className="profile-title">Account Settings</div>

                        {!user ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="profile-card-content">

                                <div className="profile-left">
                                    <img src={imageSrc} className="profile-image" alt="profile" />

                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setImageFile(file);
                                            if (file) setPreview(URL.createObjectURL(file));
                                        }}
                                    />

                                    <button className="btn" onClick={updatephoto}>
                                        Upload
                                    </button>
                                </div>

                                <div>

                                    <div className="section">
                                        <h4>Profile Info</h4>

                                        <input
                                            className="input"
                                            value={form.firstname}
                                            onChange={(e) =>
                                                setForm({ ...form, firstname: e.target.value })
                                            }
                                        />

                                        <input
                                            className="input"
                                            value={form.lastname}
                                            onChange={(e) =>
                                                setForm({ ...form, lastname: e.target.value })
                                            }
                                        />

                                        <PhoneInput
                                            country={'eg'}
                                            value={form.phone}
                                            onChange={(phone) => setForm({ ...form, phone: phone })}
                                            inputClass="input"
                                            inputStyle={{
                                                backgroundColor: '#1a1a1a',
                                                color: 'white',
                                                border: '1px solid #333'
                                            }}
                                            buttonStyle={{
                                                backgroundColor: '#1a1a1a',
                                                border: '1px solid #333'
                                            }}
                                            dropdownStyle={{
                                                backgroundColor: '#1a1a1a',
                                                color: 'white'
                                            }}
                                        />


                                        <button className="btn" onClick={updateUser}>
                                            Save Changes
                                        </button>
                                    </div>

                                    <div className="section">
                                        <h4>Email</h4>

                                        <input
                                            className="input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />

                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="Password"
                                            value={emailPass}
                                            onChange={(e) => setEmailPass(e.target.value)}
                                        />

                                        <button className="btn" onClick={updateEmail}>
                                            Update Email
                                        </button>
                                    </div>
                                    <div className="section">
                                        <h4>Password</h4>

                                        <input type="password" className="input" placeholder="Old Password" />
                                        <input type="password" className="input" placeholder="New Password" />
                                        <input type="password" className="input" placeholder="Confirm Password" />

                                        <button className="btn" onClick={updatePassword}>Update Password</button>
                                    </div>

                                    <div className="section">
                                        <h4>Delete Account</h4>

                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="Enter password"
                                            value={deletePass}
                                            onChange={(e) => setDeletePass(e.target.value)}
                                        />

                                        <button className="btn btn-danger" onClick={deleteUser}>
                                            Delete Account
                                        </button>
                                    </div>

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