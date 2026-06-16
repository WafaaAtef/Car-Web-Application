import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';

const loginUser = async (email, password) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });

  return res.json();
};

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validate: (values) => {
      const errors = {};

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

      return errors;
    },

    onSubmit: async (
      values,
      { setSubmitting, setStatus }
    ) => {
      try {
        const data = await loginUser(
          values.email,
          values.password
        );

        if (data.status === 200) {
          try {
            const userRes = await fetch('/api/user', { credentials: 'include' });
            if (userRes.ok) {
              const userData = await userRes.json();
              if (userData.role === 'admin') navigate('/admin');
              else navigate('/');
            } else {
              navigate('/');
            }
          } catch (err) {
            navigate('/');
          }
        } else {
          setStatus({
            error:
              data.msg || 'Invalid credentials.'
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
    <div className="auth-page" style={styles.page}>
      <style>{`
        .auth-left, .auth-right { width: 50%; }
        .auth-right { border-left: 1px solid rgba(201,168,76,0.1); position: sticky; top: 0; height: 100vh; }
        .auth-page h1 { font-size: 52px; }
        @media (max-width: 900px) {
          .auth-left, .auth-right { width: 100% !important; padding: 32px 20px !important; }
          .auth-right { position: static !important; height: auto !important; border-left: none !important; }
          .auth-page { flex-direction: column !important; }
          .auth-page h1 { font-size: 40px !important; }
          .auth-page .quote { font-size: 28px !important; margin-bottom: 30px !important; }
          .auth-page .stats-image { max-width: 100% !important; }
        }
        @media (max-width: 560px) {
          .auth-left, .auth-right { padding: 24px 16px !important; }
          .auth-page .quote { font-size: 24px !important; }
        }
      `}</style>

      <div className="auth-left" style={styles.left}>
        <div style={styles.badge}>Member Access</div>
        <h1 style={styles.title}>
          Welcome
          <br />
          Back.
        </h1>
        <p style={styles.sub}>Enter your credentials to access your account</p>

        <form onSubmit={formik.handleSubmit}>
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
              <div style={styles.fieldError}>{formik.errors.email}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              style={styles.input}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <div style={styles.fieldError}>{formik.errors.password}</div>
            )}
          </div>

          <div style={styles.formMeta}>
            <label style={styles.check}>
              <input type="checkbox" style={{ accentColor: '#C9A84C' }} />&nbsp; Remember for 30 days
            </label>
          </div>

          {formik.status?.error && <div style={styles.error}>{formik.status.error}</div>}

          <button type="submit" style={styles.btn} disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div style={styles.divider}><span>or</span></div>
        <p style={styles.switch}>
          Don't have an account?{' '}
          <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
      </div>

      <div className="auth-right" style={styles.right}>
        <div style={styles.quote}>
          Drive what
          <br />
          <span style={{ color: 'rgba(201,168,76,0.6)' }}>others only</span>
          <br />
          dream of.
        </div>
        <div style={styles.imageBox}>
          <img className="stats-image" src="/allCars.jpg" alt="all cars" style={styles.statsImage} />
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
    padding: '80px'
  },

  right: {
    flex: 1,
    background: '#111',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px',
    borderLeft:
      '1px solid rgba(201,168,76,0.1)'
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
    marginBottom: '48px'
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
    borderBottom:
      '1px solid rgba(201,168,76,0.2)',
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

  formMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '36px'
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
    borderTop:
      '1px solid rgba(255,255,255,0.08)',
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
    border:
      '1px solid rgba(201,168,76,0.1)',
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

