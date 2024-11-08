export default function ApiConsole() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <h2> API Console </h2>
    </div>
  );
}

function ApiTable<T>({ apiData, fields }: { apiData: T[]; fields: T[] }) {
  return (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
      <thead>
        <tr>
          {fields.map((item, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {apiData.map((data, index) => (
          <tr key={index}>
            {fields.map((field, index) => (
              <td key={index} className="px-6 py-4 whitespace-nowrap">
                {data[field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
