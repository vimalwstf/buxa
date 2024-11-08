export default function ApiConsole() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <h2> API Console </h2>

      <div className="w-full max-w-md space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
        <table>
          <thead>
            <tr>
              <th>Url</th>
              <th>API key</th>
              <th className="sr-only">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiConsoleList.map((api) => (
              <tr key={api.id}>
                <td>{api.name}</td>
                <td>{api.description}</td>
                <td>
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ApiTable({ apiData, format }: { apiData: any; format: string[] }) {
  return (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
      <thead>
        <tr>
          {apiData[0]}
          <th>Url</th>
          <th>API key</th>
          <th className="sr-only">Actions</th>
        </tr>
      </thead>
      <tbody>
        {apiData.map((api) => (
          <tr key={api.id}>
            <td>{api.name}</td>
            <td>{api.description}</td>
            <td>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
