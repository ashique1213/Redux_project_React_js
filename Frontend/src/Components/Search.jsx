
const Search = () => {
  return (
    <div className="search flex justify-center mt-10">
      <div className="max-w-[600px] w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Search;
