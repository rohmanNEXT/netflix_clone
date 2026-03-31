import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'My Google AI Studio App',
  description: 'My Google AI Studio App',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0f172a] text-white antialiased selection:bg-purple-500/30">
        <div className="relative min-h-screen mx-auto max-w-[1920px]">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
