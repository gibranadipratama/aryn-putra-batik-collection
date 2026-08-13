import "./globals.css";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <div className="grow">{children}</div>
      </body>
    </html>
  );
}
