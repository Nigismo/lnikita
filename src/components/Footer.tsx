import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="font-display text-xl font-bold tracking-tight">
              <span className="text-primary">Edu</span>Pro
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Практические курсы по Excel, веб-разработке и цифровому маркетингу для развития ваших навыков.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Навигация
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/courses" className="text-sm text-muted-foreground transition-colors hover:text-primary">Курсы</Link>
              <Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Блог</Link>
              <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">Контакты</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Курсы на Stepik
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="https://stepik.org/a/244450" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">Microsoft Excel</a>
              <a href="https://stepik.org/139723" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">Веб-разработка</a>
              <a href="https://stepik.org/a/231903" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">Telegram SMM</a>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EduPro. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
