export const Footer = () => {
  return (
    <footer className="bg-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Alex Chen. All Rights Reserved.</p>
          </div>
          
          <div>
            <p className="text-muted-foreground text-center md:text-right text-sm">
              Designed & Built with <span className="text-primary">❤</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
