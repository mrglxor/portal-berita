const CardLoading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
      <div className="loader">
        <style jsx>{`
          .loader {
            border: 5px solid rgba(0, 0, 0, 0.1);
            border-left-color: #4f46e5; /* Warna spinner */
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CardLoading;
