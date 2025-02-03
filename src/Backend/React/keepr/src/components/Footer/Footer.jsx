import '../../App.css';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} Keeper. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
