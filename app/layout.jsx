// app/layout.jsx
import './globals.css';
import Sidebar from '../components/Sidebar';

export default function RootLayout({ children }) {
    return (
            <html lang="en">
                <body className="min-h-screen bg-gray-100 flex">
                    <Sidebar />
                    <div className="flex-1">
                        <main className="p-4">{children}</main>
                    </div>
                </body>
            </html>
    );
}
