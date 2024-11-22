// src/app/components/SimpleTooltip.js
export default function SimpleTooltip({ children, content }) {
  if (!content) return children;

  return (
    <div className="relative group">
      {children}
      {content && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}
