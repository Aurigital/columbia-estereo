'use client';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ContactForm from '@/components/contact/ContactForm';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contacto | Columbia Estéreo 92.7 FM - Ponte en Contacto con Nosotros';

          const description = 'Contáctanos en Columbia Estéreo 92.7 FM. Envíanos tus comentarios, sugerencias o consultas. Estamos aquí para atenderte y mejorar tu experiencia en nuestra radio.';

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = description;
      document.head.appendChild(metaDescription);
    }

          const keywords = 'columbia estereo contacto, 92.7 fm, formulario contacto, comunicarse columbia estereo, sugerencias radio, consultas radio costa rica';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = keywords;
      document.head.appendChild(metaKeywords);
    }
  }, []);

  return (
    <>
      <div className="">
        <Navbar />
        <ContactForm />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
