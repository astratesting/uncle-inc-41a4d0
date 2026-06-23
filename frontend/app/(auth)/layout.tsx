export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#7C3AED]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F97316]/5 blur-3xl pointer-events-none" />
      {children}
    </div>
  );
}
