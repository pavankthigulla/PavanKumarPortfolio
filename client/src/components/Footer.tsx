export const Footer = () => {
  return (
    <footer className="bg-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div>
            <p className="text-muted-foreground">© {new Date().getFullYear()} Pavan Kumar. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
