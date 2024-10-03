const Notification = ({ message, type }) => {
  return (
    <div
      className={`bg-${type}-100 border border-${type}-500 text-${type}-700 px-4 py-2 rounded-md shadow-md`}
    >
      <strong>PESAN:</strong> <span>{message}</span>
    </div>
  );
};

export default Notification;
