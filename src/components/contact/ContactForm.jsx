'use client';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: '',
    station_name: 'Columbia Estéreo'
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.sendForm(
        'service_ba3ue64',
        'template_xncpj4k',
        formRef.current,
        'MFxAFrK4GqfW_l4gZ'
      );

      setStatus({
        type: 'success',
        message: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.'
      });

      setFormData({
        user_name: '',
        user_email: '',
        user_phone: '',
        message: '',
        station_name: 'Columbia Estéreo'
      });
    } catch (error) {
      console.error('Error:', error);
      setStatus({
        type: 'error',
        message: 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center pt-8">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-between">
        <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0 px-4 sm:px-8">
          <h2 className="text-5xl lg:text-7xl font-bold text-black leading-none">
            Ponte<br />en contacto<br />con <span className="bg-gradient-to-r from-[#D90043] to-[#FF7700] bg-clip-text text-transparent">nosotros</span>
          </h2>
          <p className="text-black/60 text-lg my-6 max-w-lg font-medium">
            Puede comunicarse con nosotros por los diferentes medios disponibles. También puedes llenar el formulario y pronto un asesor se comunicará con tu petición.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 w-full items-center lg:items-start">
            <div className="text-center lg:text-left">
              <p className="font-semibold text-black/80 mb-1">Centro de llamadas</p>
              <p className="text-black/50 text-md">Comunícate en el horario de<br />
                <a href="tel:+50622240707" className="text-[#FF7700] hover:underline font-bold">
                  (506+) 2224 - 0707
                </a>
              </p>
            </div>
            <div className="text-center lg:text-left">
              <p className="font-semibold text-black/80 mb-1">Correo electrónico</p>
              <p className="text-black/50 text-md">Correo especializado:<br />
                <a href="mailto:ventas@grupocolumbia.co.cr" className="text-[#FF7700] hover:underline font-bold">
                  ventas@grupocolumbia.co.cr
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-4">
          <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
            <input type="hidden" name="station_name" value={formData.station_name} />

            <div>
              <label htmlFor="user_name" className="block text-black/80 text-sm mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Ej. John Doe"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-[#FF7700] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="user_email" className="block text-black/80 text-sm mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="Ej. john.doe@example.com"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-[#FF7700] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="user_phone" className="block text-black/80 text-sm mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="user_phone"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                placeholder="Ej. 5555-5555"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-[#FF7700] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-black/80 text-sm mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                required
                rows="5"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-[#FF7700] transition-colors resize-none"
              />
            </div>

            {status.message && (
              <div className={`p-4 rounded-lg ${
                status.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-600'
                  : 'bg-red-500/10 border border-red-500/30 text-red-600'
              }`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 bg-gradient-to-r from-[#D90043] to-[#FF7700] hover:from-[#c00039] hover:to-[#e66d00] text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
