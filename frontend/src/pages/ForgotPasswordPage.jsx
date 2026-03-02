import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, Shield, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1) // 1=email, 2=otp, 3=newpass, 4=done
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleOtpInput = (val, idx) => {
        const next = [...otp]
        next[idx] = val.slice(-1)
        setOtp(next)
        if (val && idx < 5) document.getElementById(`fp-otp-${idx + 1}`)?.focus()
    }

    const handleOtpKey = (e, idx) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0)
            document.getElementById(`fp-otp-${idx - 1}`)?.focus()
    }

    const next = () => {
        setError('')
        if (step === 1) {
            if (!email.includes('@')) { setError('Enter a valid email address'); return }
            setLoading(true)
            setTimeout(() => { setLoading(false); setStep(2) }, 1200)
        } else if (step === 2) {
            if (!otp.every(c => c)) { setError('Please enter the full 6-digit code'); return }
            setLoading(true)
            setTimeout(() => { setLoading(false); setStep(3) }, 1200)
        } else if (step === 3) {
            if (newPass.length < 8) { setError('Password must be at least 8 characters'); return }
            if (newPass !== confirmPass) { setError('Passwords do not match'); return }
            setLoading(true)
            setTimeout(() => { setLoading(false); setStep(4) }, 1500)
        }
    }

    const STEPS = ['Email', 'Verify OTP', 'New Password', 'Done']

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#060a10', position: 'relative', overflow: 'hidden' }}>
            <div className="cyber-grid" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.3 }} />
            <div style={{ position: 'fixed', top: '20%', right: '15%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '430px' }}>

                <div style={{ background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 60px rgba(167,139,250,0.06)' }}>
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, #a78bfa, #00d4ff, #00ff41)' }} />

                    <div style={{ padding: '2.5rem 2rem' }}>
                        {/* Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
                            <Shield size={22} style={{ color: '#00ff41' }} />
                            <span style={{ fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 700 }}>
                                <span style={{ color: '#00ff41' }}>Digital</span>
                                <span style={{ background: 'linear-gradient(135deg,#00ff41,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>HQ</span>
                            </span>
                        </div>

                        {/* Progress steps */}
                        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '2rem' }}>
                            {STEPS.map((s, i) => (
                                <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                                    <div style={{ width: '100%', height: '3px', borderRadius: '2px', background: i + 1 <= step ? 'linear-gradient(90deg,#a78bfa,#00d4ff)' : 'rgba(255,255,255,0.07)', transition: 'all 0.4s' }} />
                                    <span style={{ fontSize: '0.55rem', color: i + 1 === step ? '#a78bfa' : '#64748b', fontFamily: 'JetBrains Mono' }}>{s}</span>
                                </div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(167,139,250,0.1)', border: '2px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                        <Mail size={28} style={{ color: '#a78bfa' }} />
                                    </div>
                                    <h1 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', fontWeight: 800, color: '#f1f5f9', textAlign: 'center', marginBottom: '0.5rem' }}>Reset Password</h1>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginBottom: '1.5rem' }}>Enter your registered email. We'll send a reset code.</p>
                                    <input className="cyber-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && next()} style={{ marginBottom: '0.5rem' }} />
                                </motion.div>
                            )}
                            {step === 2 && (
                                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <h1 style={{ fontFamily: 'Orbitron', fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', textAlign: 'center', marginBottom: '0.5rem' }}>Enter OTP</h1>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginBottom: '1.5rem' }}>6-digit code sent to <span style={{ color: '#a78bfa' }}>{email}</span></p>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                        {otp.map((c, i) => (
                                            <input key={i} id={`fp-otp-${i}`} value={c} onChange={e => handleOtpInput(e.target.value, i)} onKeyDown={e => handleOtpKey(e, i)} maxLength={1}
                                                style={{ width: '42px', height: '50px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 700, fontFamily: 'Orbitron', background: c ? 'rgba(167,139,250,0.08)' : 'rgba(255,255,255,0.03)', border: c ? '2px solid rgba(167,139,250,0.5)' : '2px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#a78bfa', outline: 'none' }} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            {step === 3 && (
                                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,212,255,0.1)', border: '2px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                        <Lock size={28} style={{ color: '#00d4ff' }} />
                                    </div>
                                    <h1 style={{ fontFamily: 'Orbitron', fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', textAlign: 'center', marginBottom: '1.5rem' }}>New Password</h1>
                                    <div style={{ position: 'relative', marginBottom: '0.8rem' }}>
                                        <input className="cyber-input" type={showPass ? 'text' : 'password'} placeholder="New password (8+ chars)" value={newPass} onChange={e => setNewPass(e.target.value)} style={{ paddingRight: '2.5rem' }} />
                                        <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                    </div>
                                    <input className="cyber-input" type="password" placeholder="Confirm password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} style={{ marginBottom: '0.5rem' }} />
                                    {/* Password strength */}
                                    {newPass && (
                                        <div style={{ display: 'flex', gap: '3px', marginBottom: '0.5rem' }}>
                                            {[...Array(4)].map((_, i) => {
                                                const str = newPass.length >= 8 ? (newPass.match(/[A-Z]/) ? 2 : 1) + (newPass.match(/[0-9]/) ? 1 : 0) + (newPass.match(/[^a-zA-Z0-9]/) ? 1 : 0) : 0
                                                const colors = ['#ef4444', '#f59e0b', '#00d4ff', '#00ff41']
                                                return <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i < str ? colors[str - 1] : 'rgba(255,255,255,0.08)', transition: 'all 0.3s' }} />
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                            {step === 4 && (
                                <motion.div key="s4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '1rem 0' }}>
                                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.6 }}
                                        style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,255,65,0.12)', border: '2px solid rgba(0,255,65,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                        <CheckCircle size={40} style={{ color: '#00ff41' }} />
                                    </motion.div>
                                    <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', fontWeight: 800, color: '#00ff41', marginBottom: '0.5rem' }}>Password Reset!</h2>
                                    <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.5rem' }}>Your password has been updated successfully.</p>
                                    <Link to="/login">
                                        <motion.button whileHover={{ scale: 1.03 }} style={{ padding: '0.75rem 2rem', background: 'linear-gradient(135deg,#00ff41,#00d4ff)', border: 'none', borderRadius: '9px', color: '#060a10', fontFamily: 'Orbitron', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}>
                                            SIGN IN NOW
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem', textAlign: 'center', fontFamily: 'JetBrains Mono' }}>{error}</p>}

                        {step < 4 && (
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={next}
                                disabled={loading}
                                style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg,#a78bfa,#00d4ff)', border: 'none', borderRadius: '10px', color: '#060a10', fontFamily: 'Orbitron', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                {loading ? <><span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid #060a10', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Processing…</> : step === 1 ? 'SEND RESET CODE' : step === 2 ? 'VERIFY CODE' : 'RESET PASSWORD'}
                            </motion.button>
                        )}

                        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.78rem', textDecoration: 'none' }}>
                                <ArrowLeft size={13} /> Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
