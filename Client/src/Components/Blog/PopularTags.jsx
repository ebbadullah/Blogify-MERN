const PopularTags = () => {
  const tags = [
    { id: 1, name: "React", count: 24 },
    { id: 2, name: "JavaScript", count: 18 },
    { id: 3, name: "CSS", count: 12 },
    { id: 4, name: "Web Design", count: 9 },
    { id: 5, name: "Tailwind", count: 8 },
    { id: 6, name: "UX/UI", count: 7 },
    { id: 7, name: "Performance", count: 6 },
    { id: 8, name: "TypeScript", count: 5 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-black">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          >
            {tag.name}
            <span className="ml-1 text-xs text-gray-500">({tag.count})</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
