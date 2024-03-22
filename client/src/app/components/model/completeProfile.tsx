import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setProfileCompleteModel } from "@/redux/features/model/slice";
import Link from "next/link";

const ProfileCompleteModal = () => {
  const dispatch = useAppDispatch();

  const { profileCompleteModel } = useAppSelector((state) => state.model);
  const handleClose = () => {
    dispatch(setProfileCompleteModel(false));
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      className={`modal-backdrop  fade ${profileCompleteModel ? "show" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal fade ${profileCompleteModel ? "show d-block" : ""}`}
        id="profileCompleteModal"
        tabIndex={-1}
        aria-hidden={!profileCompleteModel}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-centered">
          <div className="container">
            <div className="user-data-form modal-content">
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(setProfileCompleteModel(false))}
              ></button>
              <div className="form-wrapper m-auto ">
                <div className="text-center d-none d-sm-block">
                  <h2 className=" mb-3 py-3">Complete your profile</h2>
                </div>
                <div className="text-center d-sm-none">
                <h3 className=" mb-3 py-3" style={{color:'#244034', fontWeight:'normal'}}>Complete your profile</h3>
                </div>

                <div className="d-flex row  mx-auto mb-3  ">
                  <div className="d-flex align-items-center   gap-3  ">
                    <h1>
                      <i className="bi  bi-person-check"></i>
                    </h1>
                    <span>
                      Please complete your profile to continue using our
                      services. This will help us provide a better experience
                      for you.
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between  justify-content-center mt-3  ">
                  <button className="btn-two" onClick={handleClose}>
                    Cancel
                  </button>
                  <Link
                    href="/dashboard/candidate-dashboard/profile"
                    type="button"
                    className="btn-one"
                  >
                    Complete Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompleteModal;
