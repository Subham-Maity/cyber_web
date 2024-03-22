const JobLetterModal = ({
  candidateName,
  text,
}: {
  candidateName: string;
  text: string;
}) => {
  return (
    <div
      className="modal fade"
      id="jobLetterModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container-fluid ">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h3 className="mb-30">job Letter by {candidateName}</h3>
            </div>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobLetterModal;
