import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';

const registerUser = async (data) => {
  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });

  return res.json();
};

export default function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      phone: '',
      terms: false
    },

    validate: (values) => {
      const errors = {};

      if (!values.firstname.trim()) {
        errors.firstname = 'First name is required';
      }

      if (!values.lastname.trim()) {
        errors.lastname = 'Last name is required';
      }

      if (!values.username.trim()) {
        errors.username = 'Username is required';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Min 6 characters';
      }

      if (!values.terms) {
        errors.terms = 'You must agree to the terms';
      }

      return errors;
    },

    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const { terms, ...userData } = values;

        const data = await registerUser({
          ...userData,
          phone: values.phone || undefined
        });

        if (data.status === 201) {
          setStatus({
            success: 'Account created! Redirecting...'
          });

          setTimeout(() => navigate('/login'), 1500);
        } else {
          setStatus({
            error: data.msg || 'Registration failed.'
          });
        }
      } catch {
        setStatus({
          error: 'Cannot connect to server.'
        });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.badge}>New Member</div>

        <h1 style={styles.title}>
          Get Started
          <br />
          Now.
        </h1>

        <p style={styles.sub}>
          Create your account to access exclusive vehicles
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>

              <input
                name="firstname"
                type="text"
                placeholder="John"
                style={styles.input}
                value={formik.values.firstname}
                onChange={formik.handleChange}
              />

              {formik.errors.firstname && (
                <div style={styles.fieldError}>
                  {formik.errors.firstname}
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>

              <input
                name="lastname"
                type="text"
                placeholder="Doe"
                style={styles.input}
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />

              {formik.errors.lastname && (
                <div style={styles.fieldError}>
                  {formik.errors.lastname}
                </div>
              )}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>

            <input
              name="username"
              type="text"
              placeholder="johndoe"
              style={styles.input}
              value={formik.values.username}
              onChange={formik.handleChange}
            />

            {formik.errors.username && (
              <div style={styles.fieldError}>
                {formik.errors.username}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>

            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              style={styles.input}
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            {formik.errors.email && (
              <div style={styles.fieldError}>
                {formik.errors.email}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>

            <input
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              style={styles.input}
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            {formik.errors.password && (
              <div style={styles.fieldError}>
                {formik.errors.password}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Phone &nbsp;
              <span style={{ color: '#888', fontSize: '10px' }}>
                (Optional)
              </span>
            </label>

            <input
              name="phone"
              type="tel"
              placeholder="+20 xxx xxx xxxx"
              style={styles.input}
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={styles.check}>
              <input
                type="checkbox"
                name="terms"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                style={{ accentColor: '#C9A84C' }}
              />

              &nbsp; I agree to the{' '}
              <Link to="#" style={styles.link}>
                terms & policy
              </Link>
            </label>

            {formik.errors.terms && (
              <div style={styles.fieldError}>
                {formik.errors.terms}
              </div>
            )}
          </div>

          {formik.status?.error && (
            <div style={styles.error}>
              {formik.status.error}
            </div>
          )}

          {formik.status?.success && (
            <div style={styles.success}>
              {formik.status.success}
            </div>
          )}

          <button
            type="submit"
            style={styles.btn}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting
              ? 'Creating account...'
              : 'Sign Up'}
          </button>
        </form>

        <div style={styles.divider}>
          <span>or</span>
        </div>

        <p style={styles.switch}>
          Have an account?{' '}
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
        </p>
      </div>

      <div style={styles.right}>
        <div style={styles.quote}>
          Your journey
          <br />
          to{' '}
          <span style={{ color: 'rgba(201,168,76,0.6)' }}>
            luxury
          </span>
          <br />
          starts here.
        </div>
<div style={styles.imageBox}>
<img
  src="/images/allCars.png"
  alt="all cars"
  style={styles.statsImage}
/>
</div>
      </div>
    </div>
  );
}

const styles = {
  imageBox: {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px'
},

statsImage: {
  width: '100%',
  maxWidth: '500px',
  borderRadius: '12px',
  border: '1px solid rgba(201,168,76,0.2)'
},
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: '#080808',
    fontFamily: 'Rajdhani, sans-serif',
    color: '#F5F0E8'
  },

  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px 80px',
    overflowY: 'auto'
  },

  right: {
    flex: 1,
    background: '#111',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px',
    borderLeft: '1px solid rgba(201,168,76,0.1)',
    position: 'sticky',
    top: 0,
    height: '100vh'
  },

  badge: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: '#C9A84C',
    marginBottom: '16px'
  },

  title: {
    fontFamily: 'Georgia, serif',
    fontSize: '52px',
    fontWeight: 300,
    lineHeight: 1.1,
    marginBottom: '8px'
  },

  sub: {
    fontSize: '14px',
    color: '#888',
    letterSpacing: '1px',
    marginBottom: '40px'
  },

  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },

  formGroup: {
    marginBottom: '24px'
  },

  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#8B6914',
    marginBottom: '10px'
  },

  input: {
    width: '100%',
    padding: '14px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(201,168,76,0.2)',
    color: '#F5F0E8',
    fontSize: '16px',
    outline: 'none',
    letterSpacing: '1px'
  },

  fieldError: {
    color: '#dc3232',
    fontSize: '12px',
    marginTop: '6px',
    letterSpacing: '1px'
  },

  check: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: '#888',
    cursor: 'pointer',
    letterSpacing: '1px'
  },

  link: {
    color: '#C9A84C',
    textDecoration: 'none',
    fontSize: '13px',
    letterSpacing: '1px'
  },

  error: {
    background: 'rgba(220,50,50,0.08)',
    borderLeft: '3px solid #dc3232',
    color: '#dc3232',
    padding: '12px 16px',
    fontSize: '13px',
    marginBottom: '16px',
    letterSpacing: '1px'
  },

  success: {
    background: 'rgba(201,168,76,0.08)',
    borderLeft: '3px solid #C9A84C',
    color: '#C9A84C',
    padding: '12px 16px',
    fontSize: '13px',
    marginBottom: '16px',
    letterSpacing: '1px'
  },

  btn: {
    width: '100%',
    padding: '16px',
    background: '#C9A84C',
    color: '#080808',
    border: 'none',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '4px',
    textTransform: 'uppercase',
    cursor: 'pointer'
  },

  divider: {
    textAlign: 'center',
    color: '#888',
    fontSize: '12px',
    letterSpacing: '2px',
    margin: '28px 0',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '28px'
  },

  switch: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#888',
    letterSpacing: '1px'
  },

  quote: {
    fontFamily: 'Georgia, serif',
    fontSize: '36px',
    fontWeight: 300,
    lineHeight: 1.3,
    color: 'rgba(245,240,232,0.15)',
    textAlign: 'center',
    marginBottom: '40px'
  },

  stats: {
    display: 'flex',
    gap: '1px',
    background: 'rgba(201,168,76,0.1)',
    border: '1px solid rgba(201,168,76,0.1)',
    width: '100%'
  },

  statItem: {
    flex: 1,
    background: '#111',
    padding: '24px 16px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column'
  },

  statNum: {
    fontFamily: 'Georgia, serif',
    fontSize: '32px',
    fontWeight: 600,
    color: '#C9A84C'
  },

  statLabel: {
    fontSize: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#888',
    marginTop: '4px'
  }
};

