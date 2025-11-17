import React from 'react';

const ContactForm = () => {
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

        <div className="w-full px-4 py-4 overflow-hidden">
          <script src="https://static.elfsight.com/platform/platform.js" async></script>
          <div className="elfsight-app-559e10de-b19a-4539-8d48-57e60b699f26" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 