import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import axios from 'axios';
import { personal } from '../data/content.js';

const INITIAL = { name: '', email: '', message: '', honeypot: '' };

/* 
   TRANSMIT BUTTON — physics-driven, magnetic hover, scan-line
*/
function TransmitButton({ status }) {
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const [hovered, setHovered] = useState(false);

  // Magnetic pull — tracks cursor offset relative to button center
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring physics — stiffness/damping give the "snap back" feel
  const springX = useSpring(rawX, { stiffness: 220, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 18 });

  // Glow opacity tied to X displacement
  const glowOpacity = useTransform(springX, [-20, 0, 20], [0.6, 1, 0.6]);

  const handleMouseMove = useCallback((e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.28;   // magnetic pull strength
    const dy = (e.clientY - cy) * 0.28;
    rawX.set(dx);
    rawY.set(dy);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  // Ripple burst on click
  const handleClick = useCallback((e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== id)), 700);
  }, []);

  const isLoading = status === 'loading';
  const isDisabled = isLoading;

  const label = isLoading ? 'TRANSMITTING...' : 'TRANSMIT_DATA';

  return (
    <div className="flex justify-center mt-6">
      <motion.button
        ref={btnRef}
        type="submit"
        disabled={isDisabled}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 20 } }}
        aria-label="Submit contact form"
        className="relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none"
      >
        {/* ── Outer glow ring (animated on hover) ── */}
        <motion.div
          className="absolute -inset-[3px] rounded-sm pointer-events-none"
          animate={hovered ? {
            boxShadow: [
              '0 0 0px 0px rgba(0,219,231,0)',
              '0 0 14px 4px rgba(0,219,231,0.55)',
              '0 0 8px 2px rgba(0,219,231,0.3)',
            ],
          } : { boxShadow: '0 0 0px 0px rgba(0,219,231,0)' }}
          transition={{ duration: 0.8, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
          style={{ opacity: glowOpacity }}
        />

        {/* ── Main button surface ── */}
        <div className="relative px-10 py-3.5 bg-[--color-primary-fixed] border border-[--color-primary-fixed] overflow-hidden">

          {/* Corner brackets — TL */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[--color-on-primary-fixed]/60 group-hover:border-[--color-on-primary-fixed] transition-colors duration-200 pointer-events-none" aria-hidden="true" />
          {/* TR */}
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[--color-on-primary-fixed]/60 group-hover:border-[--color-on-primary-fixed] transition-colors duration-200 pointer-events-none" aria-hidden="true" />
          {/* BL */}
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[--color-on-primary-fixed]/60 group-hover:border-[--color-on-primary-fixed] transition-colors duration-200 pointer-events-none" aria-hidden="true" />
          {/* BR */}
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[--color-on-primary-fixed]/60 group-hover:border-[--color-on-primary-fixed] transition-colors duration-200 pointer-events-none" aria-hidden="true" />

          {/* Scan-line sweep on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            animate={hovered ? { backgroundPosition: ['200% 0', '-100% 0'] } : { backgroundPosition: '200% 0' }}
            transition={hovered ? { duration: 0.55, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 } : {}}
            aria-hidden="true"
          />

          {/* Background colour pulse on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={hovered
              ? { backgroundColor: ['rgba(0,219,231,0)', 'rgba(0,219,231,0.12)', 'rgba(0,219,231,0)'] }
              : { backgroundColor: 'rgba(0,219,231,0)' }}
            transition={{ duration: 1.2, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          {/* Click ripples */}
          {ripples.map(({ id, x, y }) => (
            <motion.span
              key={id}
              className="absolute rounded-full bg-[--color-on-primary-fixed]/25 pointer-events-none"
              style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
              initial={{ width: 0, height: 0, opacity: 0.7 }}
              animate={{ width: 200, height: 200, opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              aria-hidden="true"
            />
          ))}

          {/* Label */}
          <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em] text-[--color-on-primary-fixed] font-bold flex items-center gap-3 select-none">
            {/* Animated prefix dot */}
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[--color-on-primary-fixed] inline-block"
              animate={isLoading
                ? { opacity: [1, 0.2, 1], scale: [1, 0.6, 1] }
                : hovered ? { scale: [1, 1.5, 1], opacity: [1, 0.7, 1] } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, repeat: (isLoading || hovered) ? Infinity : 0, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            {label}
            {/* Arrow that slides in on hover */}
            <motion.span
              className="material-symbols-outlined text-sm overflow-hidden"
              animate={hovered && !isLoading ? { x: [0, 4, 0], opacity: 1 } : { opacity: isLoading ? 0 : 0.5 }}
              transition={{ duration: 0.6, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              send
            </motion.span>
          </span>
        </div>
      </motion.button>
    </div>
  );
}

/* 
   CONTACT SECTION
*/
export default function Contact() {
  const [form, setForm]           = useState(INITIAL);
  const [status, setStatus]       = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg]       = useState('');
  const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', message: '' });

  // Validate all fields, return error map (empty strings = valid)
  const validateForm = (f) => {
    const errors = { name: '', email: '', message: '' };
    if (!f.name.trim())
      errors.name = 'ERR::NAME_NODE_REQUIRED — field cannot be empty';
    if (!f.email.trim())
      errors.email = 'ERR::EMAIL_PROTOCOL_REQUIRED — field cannot be empty';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
      errors.email = 'ERR::INVALID_EMAIL_FORMAT — check your address';
    if (!f.message.trim())
      errors.message = 'ERR::DATA_PAYLOAD_REQUIRED — field cannot be empty';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear individual field error on change
    if (fieldErrors[name])
      setFieldErrors((fe) => ({ ...fe, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.honeypot) return;

    const errors = validateForm(form);
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) {
      setFieldErrors(errors);
      return;
    }

    setStatus('loading');
    setErrMsg('');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        name:    form.name,
        email:   form.email,
        message: form.message,
      });
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.message || 'Transmission failed. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 max-w-3xl mx-auto w-full text-center"
      aria-labelledby="contact-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          id="contact-heading"
          className="font-sora text-3xl font-bold text-[--color-on-background] mb-4"
        >
          <span className="text-[--color-primary-fixed] mr-2">06.</span>Initiate Connection
        </h2>
        <p className="font-inter text-base text-[--color-on-surface-variant] mb-10 leading-relaxed">
          My inbox is open for new opportunities, collaborations, or technical discourse.
          Whether you have a specific inquiry or just want to establish a node connection,
          I'll strive to respond promptly.
        </p>

        <form
          className="glass-panel tech-border p-5 sm:p-8 text-left space-y-6"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs text-[--color-primary-fixed] mb-2 uppercase tracking-widest"
              >
                Name_Node
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-describedby={fieldErrors.name ? 'err-name' : undefined}
                aria-invalid={!!fieldErrors.name}
                className={`w-full bg-[--color-surface-container] border-b border-t-0 border-x-0 focus:outline-none text-[--color-on-background] font-inter text-base py-2 transition-colors placeholder:text-[--color-on-surface-variant]/70 ${
                  fieldErrors.name
                    ? 'border-[--color-error] focus:border-[--color-error]'
                    : 'border-[--color-outline-variant] focus:border-[--color-primary-fixed]'
                }`}
              />
              {fieldErrors.name && (
                <p id="err-name" role="alert" className="font-mono text-[10px] text-[--color-error] mt-1.5 leading-snug">
                  ✗ {fieldErrors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs text-[--color-primary-fixed] mb-2 uppercase tracking-widest"
              >
                Email_Protocol
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                aria-invalid={!!fieldErrors.email}
                className={`w-full bg-[--color-surface-container] border-b border-t-0 border-x-0 focus:outline-none text-[--color-on-background] font-inter text-base py-2 transition-colors placeholder:text-[--color-on-surface-variant]/70 ${
                  fieldErrors.email
                    ? 'border-[--color-error] focus:border-[--color-error]'
                    : 'border-[--color-outline-variant] focus:border-[--color-primary-fixed]'
                }`}
              />
              {fieldErrors.email && (
                <p id="err-email" role="alert" className="font-mono text-[10px] text-[--color-error] mt-1.5 leading-snug">
                  ✗ {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-mono text-xs text-[--color-primary-fixed] mb-2 uppercase tracking-widest"
            >
              Data_Payload
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Your message..."
              aria-describedby={fieldErrors.message ? 'err-message' : undefined}
              aria-invalid={!!fieldErrors.message}
              className={`w-full bg-[--color-surface-container] border-b border-t-0 border-x-0 focus:outline-none text-[--color-on-background] font-inter text-base py-2 transition-colors resize-none placeholder:text-[--color-on-surface-variant]/70 ${
                fieldErrors.message
                  ? 'border-[--color-error] focus:border-[--color-error]'
                  : 'border-[--color-outline-variant] focus:border-[--color-primary-fixed]'
              }`}
            />
            {fieldErrors.message && (
              <p id="err-message" role="alert" className="font-mono text-[10px] text-[--color-error] mt-1.5 leading-snug">
                ✗ {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Feedback messages */}
          {status === 'success' && (
            <p className="font-mono text-xs text-[--color-primary-fixed] text-center py-2" role="status">
              ✓ DATA_TRANSMITTED_SUCCESSFULLY — I'll respond soon!
            </p>
          )}
          {status === 'error' && (
            <p className="font-mono text-xs text-[--color-error] text-center py-2" role="alert">
              ✗ {errMsg}
            </p>
          )}

          {/* ── Physics Button ── */}
          <TransmitButton status={status} />
        </form>

        {/* Contact info */}
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-8 font-mono text-xs text-[--color-on-surface-variant]">
          <a
            href={`mailto:${personal.email}`}
            className="hover:text-[--color-primary-fixed] transition-colors flex items-center gap-2"
            aria-label={`Email ${personal.email}`}
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">mail</span>
            {personal.email}
          </a>
          <a
            href={`tel:${personal.phone}`}
            className="hover:text-[--color-primary-fixed] transition-colors flex items-center gap-2"
            aria-label={`Call ${personal.phone}`}
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>
            {personal.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
