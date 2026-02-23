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
              Empowering students with practical skills in Excel, Web Development, and Digital Marketing.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/courses" className="text-sm text-muted-foreground transition-colors hover:text-primary">Courses</Link>
              <Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Blog</Link>
              <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Courses on Stepik
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="https://stepik.org/a/244450" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">Microsoft Excel</a>
              <a href="https://stepik.org/139723" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">Web Development</a>
              <a href="https://stepik.org/a/231903" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">Telegram SMM</a>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EduPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
