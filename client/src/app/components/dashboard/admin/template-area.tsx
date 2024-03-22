import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getTemplates,
  addTemplate as addTemplateAction,
  updateTemplate as updateTemplateAction,
  deleteTemplate as deleteTemplateAction,
} from "@/redux/features/emailTemplate/api";
import {
  setPage,
  addEmailTemplateSuccess,
  deleteEmailTemplateSuccess,
  updateEmailTemplateSuccess,
} from "@/redux/features/emailTemplate/slice";
//setEmailTemplates,
import Image from "next/image";
import icon from "@/assets/images/icon/icon_50.svg";
import icon_2 from "@/assets/images/icon/icon_69.svg";

import Pagination from "@/ui/pagination";

import TextEditor1 from "./template/editor";
import ActionDropdown from "./template/actionDropdown";

import DOMPurify from "dompurify";
import { notifyError, notifySuccess } from "@/utils/toast";
import SelectBeingUsedFor from "./template/BeingUsedFor";
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

type TemplateType = "employer" | "candidate";

interface Template {
  _id?: string;
  id: string;
  templateType: string;
  templateName: string;
  subject: string;
  body: string;
  beingUsedFor?: string;
}

const AdminTemplateArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useAppDispatch();
  const emailTemplates = useAppSelector(
    (state) => state.emailTemplate.templates
  );
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [templateType, setTemplateType] = useState<string>("employer");
  const [employerTemplates, setEmployerTemplates] = useState<Template[]>([]);
  const [candidateTemplates, setCandidateTemplates] = useState<Template[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);

  const [showInputFields, setShowInputFields] = useState(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const [templateIdCounter, setTemplateIdCounter] = useState<number>(1);

  // const [currentPage, setCurrentPage] = useState(1);
  // const templatesPerPage = 4;
  // const pagesToShow = 1;

  const [showModelProperties, setShowModelProperties] = useState(false);

  const stripHtmlTags = (htmlString: string) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const sanitizeHtml = (htmlString: string) => {
    return { __html: DOMPurify.sanitize(htmlString) };
  };

  const { templates, page, totalNumOfPage, totalTemplate } = useAppSelector(
    (state) => state.emailTemplate
  );

  useEffect(() => {
    getTemplates(dispatch, { page: page, limit: 8, templateType });

    // const fetchData = async () => {
    //   try {
    //     const fetchedTemplates = await getTemplates(dispatch,{page:page,limit:4});
    //     if (fetchedTemplates) {
    //       dispatch(setEmailTemplates(fetchedTemplates));
    //       setEmployerTemplates(fetchedTemplates.filter((template: { templateType: string; }) => template.templateType === 'employer'));
    //       setCandidateTemplates(fetchedTemplates.filter((template: { templateType: string; }) => template.templateType === 'candidate'));
    //     }
    //   } catch (error) {
    //     console.error("Error fetching templates: ", error);
    //   }
    // };

    // fetchData();
  }, [dispatch, page, candidateTemplates, employerTemplates, templateType]);
  const itemsPerPage = 8;
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };

  const employerTemplate = templates.filter(
    (template) => template.templateType === "employer"
  );
  const candidateTemplate = templates.filter(
    (template) => template.templateType === "candidate"
  );
  // const {login,signup,paymentSuccess} =  useAppSelector((state) => state.emailTemplate);
  // useEffect(() => {

  // },[templates])
  const handleTemplateNameClick = (template: Template) => {
    // console.log(template);
    setSelectedTemplate((prevTemplate) =>
      prevTemplate === template ? null : template
    );
  };
  const handleTemplateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(e.target.value);
  };

  const handleTemplateClick = () => {
    setShowModelProperties(true);
    setShowInputFields(!showInputFields);
    setSubject("");
    setBody("");
    setTemplateName("");
    setIsEditing(false);
  };

  const handleToggle = (templateType: TemplateType) => {
    setIsCandidate((prev) => !prev);
    setTemplateType(templateType);
    setShowInputFields(false);
    setSubject("");
    setBody("");
    setSelectedTemplate(null);
  };

  const handleAddTemplate = async () => {
    const newTemplate: Template = {
      id: `${templateIdCounter}`,
      templateType,
      templateName,
      subject,
      body,
    };

    setTemplateIdCounter((prevCounter) => prevCounter + 1);

    try {
      const addedTemplate = await addTemplateAction(dispatch, newTemplate);
      if (addedTemplate) {
        //const { _id } = addedTemplate;
        dispatch(addEmailTemplateSuccess(addedTemplate));
        console.log("Templates added successfully");
      }

      if (templateType === "employer") {
        setEmployerTemplates([...employerTemplates, newTemplate]);
      } else if (templateType === "candidate") {
        setCandidateTemplates([...candidateTemplates, newTemplate]);
      }

      setSubject("");
      // console.log(body, "Rituj");
      setBody("");
      setTemplateName("");
      setIsEditing(false);
      // setTemplateType("");
      setShowInputFields(false);
      notifySuccess("Template added Successfully");
    } catch (error) {
      console.error("Error adding template:", error);
      notifyError("Error in adding template");
    }
  };

  const handleEdit = (template: Template) => {
    setShowModelProperties(true);
    // setIsEditing(true);
    // setShowInputFields(true);
    setSubject(template.subject);
    setBody(template.body);
    setTemplateName(template.templateName);
  };

  const handleUpdate = async () => {
    if (!selectedTemplate) {
      // Handle error, no template selected
      return;
    }
    const updatedTemplate: Template = {
      ...selectedTemplate,
      templateType,
      templateName,
      subject,
      body,
    };
    try {
      const updatedEmailTemplate = await updateTemplateAction(
        dispatch,
        selectedTemplate._id,
        updatedTemplate
      );
      console.log(selectedTemplate);
      if (updatedEmailTemplate) {
        dispatch(updateEmailTemplateSuccess(updatedTemplate));
        console.log("Template updated successfully");
      }

      if (templateType === "employer") {
        setEmployerTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template === selectedTemplate ? updatedTemplate : template
          )
        );
      } else if (templateType === "candidate") {
        setCandidateTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template === selectedTemplate ? updatedTemplate : template
          )
        );
      }

      setSubject("");
      setBody("");
      setTemplateName("");
      // setIsEditing(false);
      // setShowInputFields(false);
      setShowModelProperties(false);
      // setSelectedTemplate(null);
      notifySuccess("Template updated successfully");
    } catch (error) {
      console.error("Error updating template:", error);
      notifyError("Error while saving template");
    }
  };

  const handleRemoveTemplate = async () => {
    if (selectedTemplate) {
      try {
        await deleteTemplateAction(dispatch, selectedTemplate._id); //id
        dispatch(deleteEmailTemplateSuccess(selectedTemplate.templateName));
        if (templateType === "employer") {
          setEmployerTemplates((prevTemplates) =>
            prevTemplates.filter((t) => t._id !== selectedTemplate._id)
          );
        } else if (templateType === "candidate") {
          setCandidateTemplates((prevTemplates) =>
            prevTemplates.filter((t) => t._id !== selectedTemplate._id)
          );
        }
        // Clear the selected template
        setSelectedTemplate(null);
      } catch (error) {
        console.error("Error deleting template:", error);
      }
    }
  };

  const selectedTemplates =
    templateType === "employer" ? employerTemplates : candidateTemplates;

  const handleClick = () => {
    setShowModelProperties(true); // Toggle the visibility
  };
  const handleClose = () => {
    setShowModelProperties(false); // Toggle the visibility
  };

  const sortedTemplates = [...templates].sort((a, b) => {
    // Place templates being used first
    if (a.beingUsedFor && !b.beingUsedFor) return -1;
    if (!a.beingUsedFor && b.beingUsedFor) return 1;

    if (a.beingUsedFor && b.beingUsedFor) {
      return a.beingUsedFor.localeCompare(b.beingUsedFor);
    }

    const aId = a._id || "";
    const bId = b._id || "";
    return aId.localeCompare(bId);
  });
  return (
    <div className="dashboard-body ">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        <div className="d-flex-col d-sm-flex justify-content-between align-items-center  ">
          <div className=" d-flex gap-3 py-4">
            <h2 className="main-title mb-0">Templates</h2>
            <button
              className="btn-one justify-content-center"
              type="button"
              onClick={handleTemplateClick}
              data-bs-toggle="modal"
              data-bs-target="#AddModel"
            >
              Add
            </button>
            <div
                          className="modal fade"
                          id="AddModel"
                          tabIndex={-1}
                          aria-labelledby="smtpModelLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-fullscreen modal-dialog-centered">
                            <div className="user-data-form modal-content">
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                              ></button>
                              <div className="container subscription-model">
                                <h2 className="fs-2 text-center mb-3">
                                  Add Template
                                </h2>
                                {showModelProperties && (
                                  <div className="bg-white card-box border-20">
                                                        
                                  <div >
                                    <div className="dash-input-wrapper">
                                      <label htmlFor="templateName">TemplateName:</label>
                                      <input
                                        type="text"
                                        id="templateName"
                                        value={templateName}
                                        onChange={handleTemplateName}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                      />
                                    </div>
                      
                                    <div className="dash-input-wrapper mb-30">
                                      <label htmlFor="subject">Subject:</label>
                                      <input
                                        type="text"
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                      />
                                    </div>
                      
                                    <div className="dash-input-wrapper">
                                      <label htmlFor="body">Body:</label>
                                      <TextEditor1 initialContent="" setContent={setBody} />
                                    </div>
                                  </div>
                                   <div className="pt-4">
                                    <button
                                      className="d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 "
                                      onClick={handleAddTemplate}
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
          </div>

          <div className="subscription-tab justify-content-start align-content-center py-2  d-flex px-2 " style={{width:'fit-content'}}>
            <p
              onClick={() => handleToggle("candidate")}
              className={`p-1 px-2 ${isCandidate && "active"}`}
            >
              Candidate
            </p>
            <p
              onClick={() => handleToggle("employer")}
              className={`p-1 px-2 ${!isCandidate && "active"}`}
            >
              Employer
            </p>
          </div>
        </div>

        <div className="mt-3 row ">
          {sortedTemplates?.map((template, index) => (
            <div key={index} className="mt-3 me-3 bg-white p-3 border-20 row ">
              {template.beingUsedFor && template.beingUsedFor !== "" && (
                <div
                  className="mb-2"
                >
                  <span
                   style={{
                    backgroundColor: "#31795A",
                    color: "white",
                    font: "inherit",
                    fontFamily: "inherit",
                    padding:"5px 6px",
                    borderRadius: "10px",
                    
                    
                  }}
                  >
                  {template.beingUsedFor}

                  </span>
                </div>
              )}
              <div className="col-md-11 d-flex-col d-sm-flex ">
                <div className="col">
                  <button
                    className="  fw-medium  "
                    onClick={() => handleTemplateNameClick(template)}
                  >
                    {template.templateName || `Template ${index}`}
                  </button>
                </div>
                <div
                  className="col cursor-pointer"
                  onClick={() => handleTemplateNameClick(template)}
                >
                  Sub:{template.subject.slice(0, 20) + ".."}
                </div>
                <div
                  className="col cursor-pointer"
                  onClick={() => handleTemplateNameClick(template)}
                >
                  {stripHtmlTags(template.body.slice(0, 20) + "...")}
                </div>
              </div>
              <div className="col-md-1 action-dots justify-content-end d-flex float-end ">
                <button
                  className="action-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                <span>
                  <ActionDropdown
                    Template={template}
                    // templateId={template._id!}
                  />
                </span>
                </button>
              </div>
              {selectedTemplate === template && (
                <div className=" mt-3">
                  <div className=" email-format bg-white p-3 border-20">
                    <div className="d-flex float-end">
                      <div>
                        <button
                          className="btn btn-secondary me-3 "
                          onClick={() => handleEdit(selectedTemplate)}
                          // onClick={handleClick}
                          data-bs-toggle="modal"
                          data-bs-target="#EditModel"
                          type="button"
                        >
                          Edit
                        </button>
                        <div
                          className="modal fade"
                          id="EditModel"
                          tabIndex={-1}
                          aria-labelledby="smtpModelLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-fullscreen modal-dialog-centered">
                            <div className="user-data-form modal-content">
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                              ></button>
                              <div className="container subscription-model">
                                <h2 className="fs-2 text-center mb-3">
                                  Edit Template
                                </h2>
                                {showModelProperties && (
                                  <div className="bg-white card-box border-20">
                                    <div className="dash-input-wrapper input">
                                      <label htmlFor="updatedTemplateName">
                                        Template Name:
                                      </label>
                                      <input
                                        type="text"
                                        id="updatedTemplateName"
                                        value={templateName}
                                        onChange={(e) =>
                                          setTemplateName(e.target.value)
                                        }
                                      />
                                      <br />
                                      <label htmlFor="updatedSubject">
                                        Subject:
                                      </label>
                                      <input
                                        type="text"
                                        id="updatedSubject"
                                        value={subject}
                                        onChange={(e) =>
                                          setSubject(e.target.value)
                                        }
                                      />
                                      <br />
                                      <label htmlFor="updatedBody">Body:</label>
                                      <TextEditor1
                                        initialContent={body}
                                        setContent={setBody}
                                      />
                                      <div className="pt-4">
                                        <button
                                          className="d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 "
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                          onClick={handleUpdate}
                                        >
                                          Update
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          className="btn btn-danger  "
                          data-bs-toggle="modal"
                          data-bs-target="#RemoveModel"
                          type="button"
                        >
                          Delete
                        </button>
                        <div
                          className="modal fade"
                          id="RemoveModel"
                          tabIndex={-1}
                          aria-labelledby="smtpModelLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-fullscreen modal-dialog-centered">
                            <div className="user-data-form modal-content">
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                              ></button>
                              <div className="container subscription-model">
                                <h2 className="fs-2 text-center mb-4">
                                  Remove Template
                                </h2>
                                <p className="mt-3 ms-4">
                                  Do you Want to delete the template...?
                                </p>
                                <div className="mt-3 justify-content-end d-flex float-end">
                                  <button
                                    className="btn btn-danger me-3 "
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleRemoveTemplate}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3>
                      {selectedTemplate?.templateName ||
                        `Template ${selectedTemplates.indexOf(
                          selectedTemplate
                        )}`}
                    </h3>
                    <p>
                      <strong>Subject:</strong> {selectedTemplate?.subject}
                    </p>
                    <p
                      dangerouslySetInnerHTML={sanitizeHtml(
                        selectedTemplate.body
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
            <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
              Showing{" "}
              <span className="text-dark fw-500">
                {(page - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="text-dark fw-500">
                {Math.min(page * itemsPerPage, totalTemplate)}
              </span>{" "}
              of <span className="text-dark fw-500">{totalTemplate}</span>
            </p>

            {totalTemplate > itemsPerPage && (
              <Pagination
                pageCount={totalNumOfPage}
                handlePageClick={handlePageClick}
                currPage={page}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTemplateArea;
