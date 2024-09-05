const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// Flujo para agendar citas
const flowAgendarCita = addKeyword(['2', 'siguiente', 'cita', 'agendar cita']).addAnswer(
    [
        '📅 Para agendar una cita, puedes hacer lo siguiente:',
        '- Llamar al +123456789',
        '- Visitar nuestro sitio web en: https://clinica.com/citas',
        '- Enviar un mensaje a nuestro WhatsApp: +123456789',
        '\nEscribe *menu* para regresar al menú principal.'
    ]
);

// Flujo para servicios médicos
const flowServicios = addKeyword(['servicios', 'especialidades', 'medico', 'médico']).addAnswer(
    [
        '📋 Ofrecemos una variedad de servicios médicos especializados:',
        '- Cardiología',
        '- Pediatría',
        '- Ginecología',
        '- Medicina Interna',
        '- Odontología',
        'Para más información, visita nuestro sitio web.',
        '\nEscribe *2* para agendar una cita o *menu* para regresar al menú principal.'
    ],
    null,
    null,
    [flowAgendarCita]
);

// Flujo para la ubicación de la clínica
const flowUbicacion = addKeyword(['ubicación', 'direccion', 'dónde', 'dirección']).addAnswer(
    [
        '📍 Nos encontramos en:',
        'Calle Principal 123, Ciudad.',
        'Estamos abiertos de Lunes a Viernes de 8:00 a.m. a 6:00 p.m.',
        'Sábados de 8:00 a.m. a 1:00 p.m.',
        '\nEscribe *2* para agendar una cita o *menu* para regresar al menú principal.'
    ],
    null,
    null,
    [flowAgendarCita]
);

// Flujo para contacto y teléfono
const flowContacto = addKeyword(['contacto', 'teléfono', 'llamar', 'número']).addAnswer(
    [
        '📞 Puedes contactarnos al +123456789 o escribirnos a info@clinica.com.',
        'Estamos disponibles para responder tus dudas y agendar citas.',
        '\nEscribe *2* para agendar una cita o *menu* para regresar al menú principal.'
    ],
    null,
    null,
    [flowAgendarCita]
);

// Flujo para emergencias
const flowEmergencias = addKeyword(['emergencia', 'urgencia', 'emergencias', 'urgencias']).addAnswer(
    [
        '🚨 Si tienes una emergencia médica, por favor visita nuestra sala de emergencias en:',
        'Calle Principal 123, Ciudad.',
        'O llama a nuestro número de emergencias: +987654321',
        '\nEscribe *menu* para regresar al menú principal.'
    ]
);

// Flujo para conocer los seguros aceptados
const flowSeguros = addKeyword(['seguros', 'seguro', 'aseguradoras']).addAnswer(
    [
        '🏥 Aceptamos la mayoría de los seguros de salud, incluyendo:',
        '- Seguro A',
        '- Seguro B',
        '- Seguro C',
        'Para más detalles sobre seguros, puedes contactarnos al +123456789.',
        '\nEscribe *2* para agendar una cita o *menu* para regresar al menú principal.'
    ],
    null,
    null,
    [flowAgendarCita]
);

// Flujo principal del chatbot de la clínica
const flowPrincipal = addKeyword(['hola', 'buenos días', 'buenas tardes', 'bienvenido', 'menu']).addAnswer(
    '🙌 Hola, bienvenido a la *SERVISALUD*. ¿En qué podemos ayudarte hoy?'
).addAnswer(
    [
        '👉 Escribe *servicios* para conocer nuestras especialidades',
        '👉 Escribe *ubicación* para saber cómo llegar a nuestra clínica',
        '👉 Escribe *contacto* para obtener información sobre cómo contactarnos o agendar una cita',
        '👉 Escribe *emergencias* para información sobre atención de emergencias',
        '👉 Escribe *seguros* para saber qué seguros aceptamos',
        '👉 Escribe *2* para agendar una cita directamente'
    ],
    null,
    null,
    [flowServicios, flowUbicacion, flowContacto, flowEmergencias, flowSeguros, flowAgendarCita]
);

// Exponer los flujos principales para el chatbot
module.exports = {
    flowPrincipal,
    flowAgendarCita,
    flowServicios,
    flowUbicacion,
    flowContacto,
    flowEmergencias,
    flowSeguros
};


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
