export default function LoadingDocs() {
  return (
    <div className="element flex-1 p-4 text-white overflow-y-scroll w-full rounded-md bg-primary-light">
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center">
        <h4 className="text-white text-xl font-bold">Loading...</h4>
        <p className="text-white">Please wait while we load your documents.</p>
      </div>
    </div>
  );
}
