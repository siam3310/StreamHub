export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-12">
      <div className="mt-12 border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-400">
          © {currentYear} StreamHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
