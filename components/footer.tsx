import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card text-foreground mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-4">Janine Bicca</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Doces finos artesanais de alta qualidade em Porto Alegre. Transformando momentos especiais em experiências
              inesquecíveis.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalogo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/monte-sua-caixa" className="text-muted-foreground hover:text-foreground transition-colors">
                  Monte sua Caixa
                </Link>
              </li>
              <li>
                <Link href="/monte-seu-ovo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Monte seu Ovo
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-muted-foreground hover:text-foreground transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Porto Alegre, RS</li>
              <li>
                <a
                  href="https://wa.me/5551998116188"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  WhatsApp: (51) 99811-6188
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/janinebiccadoces/?hl=pt-br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/janinebiccadoces?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Janine Bicca Doces Finos. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://www.linkedin.com/in/fabriciorassier/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Fabricio Rassier
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
