import { MessageCircle } from "lucide-react";
import { FIRMA } from "@/lib/firma";
export default function FloatingContact() {
  return (
    <a
      className="help-float"
      href={FIRMA.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile teknik destek"
    >
      <MessageCircle className="icon" />
      <span>Bir sorunuz mu var?</span>
    </a>
  );
}
