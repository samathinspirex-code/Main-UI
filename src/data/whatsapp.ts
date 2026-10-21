// Shared destination for the floating button and all advisor calls to action.
const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94743762393').replace(/\D/g, '')
const message = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hi Inspire College! I'd like to know more about your programmes."

export const WHATSAPP_BOT_URL = `https://wa.me/${number}?text=${encodeURIComponent(message)}`