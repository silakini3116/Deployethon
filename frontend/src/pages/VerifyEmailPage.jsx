import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Shield } from 'lucide-react'

export default function VerifyEmailPage() {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(30)
    const [canResend, setCanResend] = useState(false)
    const [resendCount, setResendCount] = useState(0)
    const [verifying, setVerifying] = useState(false)
    const [verified, setVerified] = useState(false)
    const [code, setCode] = useState(['', '', '', '', '', ''])

    useEffect(() => {
        if (countdown > 0 && !canResend) {
            const t = setTimeout(() => setCountdown(c => c - 1), 1000)
            return () => clearTimeout(t)
        } else {
            setCanResend(true)
        }
    }, [countdown, canResend])

    const handleInput = (val, idx) => {
        const next = [...code]
        next[idx] = val.slice(-1)
        setCode(next)
        if (val && idx < 5) {
            document.getElementById(`otp-${idx + 1}`)?.focus()
        }
    }

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace' && !code[idx] && idx > 0) {
            document.getElementById(`otp-${idx - 1}`)?.focus()
        }
    }

    const handleVerify = () => {
        setVerifying(true)
        setTimeout(() => {
            setVerifying(false)
            setVerified(true)
            setTimeout(() => navigate('/events'), 2000)
        }, 1500)
    }

    const handleResend = () => {
        if (!canResend) return
        setResendCount(c => c + 1)
        setCountdown(30)
        setCanResend(false)
        setCode(['', '', '', '', '', ''])
    }

    const filledCode = code.every(c => c !== '')

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#060a10', position: 'relative', overflow: 'hidden' }}>
            {/* Background */}
            <div className="cyber-grid" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.3 }} />
            <div style={{ position: 'fixed', top: '20%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '20%', right: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0,255,65,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px' }}>

                <div style={{ background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 60px rgba(0,212,255,0.08)' }}>
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, #00ff41, #00d4ff, #a78bfa)' }} />

                    <div style={{ padding: '2.5rem 2rem' }}>
                        {/* Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
                            <Shield size={22} style={{ color: '#00ff41' }} />
                            <span style={{ fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 700 }}>
                                <span style={{ color: '#00ff41' }}>Digital</span>
                                <span style={{ background: 'linear-gradient(135deg,#00ff41,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>HQ</span>
                            </span>
                        </div>

                        {!verified ? (
                            <>
                                {/* Icon */}
                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                                    style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(0,212,255,0.1)', border: '2px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                    <Mail size={30} style={{ color: '#00d4ff' }} />
                                </motion.div>

                                <h1 style={{ fontFamily: 'Orbitron', fontSize: '1.3rem', fontWeight: 800, color: '#f1f5f9', textAlign: 'center', marginBottom: '0.5rem' }}>
                                    Verify Your Email
                                </h1>
                                <p style={{ fontSize: '0.82rem', color: '#64748b', textAlign: 'center', marginBottom: '2rem', lineHeight: 1.6 }}>
                                    We sent a 6-digit code to your email.<br />Enter it below to activate your account.
                                </p>

                                {/* OTP boxes */}
                                <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '1.75rem' }}>
                                    {code.map((c, i) => (
                                        <input key={i} id={`otp-${i}`}
                                            value={c}
                                            onChange={e => handleInput(e.target.value, i)}
                                            onKeyDown={e => handleKeyDown(e, i)}
                                            maxLength={1}
                                            style={{
                                                width: '46px', height: '54px',
                                                textAlign: 'center', fontSize: '1.3rem', fontWeight: 700,
                                                fontFamily: 'Orbitron',
                                                background: c ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.03)',
                                                border: c ? '2px solid rgba(0,212,255,0.5)' : '2px solid rgba(255,255,255,0.08)',
                                                borderRadius: '10px', color: '#00d4ff',
                                                outline: 'none', transition: 'all 0.15s',
                                            }}
                                        />
                                    ))}
                                </div>

                                <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,212,255,0.25)' }}
                                    whileTap={{ scale: 0.97 }} onClick={handleVerify}
                                    disabled={!filledCode || verifying}
                                    style={{ width: '100%', padding: '0.9rem', background: filledCode ? 'linear-gradient(135deg,#00d4ff,#00ff41)' : 'rgba(255,255,255,0.04)', border: 'none', borderRadius: '10px', color: filledCode ? '#060a10' : '#64748b', fontFamily: 'Orbitron', fontWeight: 800, fontSize: '0.85rem', cursor: filledCode ? 'pointer' : 'not-allowed', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    {verifying ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Verifying…</> : 'VERIFY & ACTIVATE'}
                                </motion.button>

                                <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#64748b' }}>
                                    Didn't receive it?{' '}
                                    <button onClick={handleResend} disabled={!canResend}
                                        style={{ background: 'none', border: 'none', color: canResend ? '#00d4ff' : '#64748b', cursor: canResend ? 'pointer' : 'not-allowed', fontSize: '0.78rem', fontFamily: 'JetBrains Mono' }}>
                                        {canResend ? 'Resend code' : `Resend in ${countdown}s`}
                                    </button>
                                    {resendCount > 0 && <span style={{ display: 'block', marginTop: '0.3rem', color: '#00ff41', fontSize: '0.7rem' }}>✓ Code resent!</span>}
                                </div>
                            </>
                        ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '1rem 0' }}>
                                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.6 }}
                                    style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,255,65,0.12)', border: '2px solid rgba(0,255,65,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                    <CheckCircle size={40} style={{ color: '#00ff41' }} />
                                </motion.div>
                                <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', fontWeight: 800, color: '#00ff41', marginBottom: '0.5rem' }}>Email Verified!</h2>
                                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Welcome to the HQ. Redirecting you…</p>
                            </motion.div>
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
