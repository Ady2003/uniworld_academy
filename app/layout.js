import "./globals.css";

export const metadata = {
  title: "Uniworld Academy | Premium River Cruises LMS Portal",
  description: "Reconstructed luxury training portal for five-star river cruising crew, providing premium courses, fleet data, and operational materials.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
