import React from "react";

function FormatText({ txt }: { txt: string }) {
  // Split the text into sections based on double newlines
  const text =
    "We are looking for a highly skilled Security Operations Specialist to join our team in the Cybersecurity Management job category. The ideal candidate will be experienced in Cybersecurity Knowledge, Security Tools Monitoring and Analysis, Threat Intelligence, Risk Assessment, and possess excellent Communication Skills. The position is full-time and will be based in the beautiful city of London, England. \n\nResponsibilities:\n• Monitor security tools to detect potential threats and security incidents\n• Analyze alerts and incidents to identify the root cause and assess risk\n• Collaborate with other teams to ensure timely resolution of security incidents\n• Conduct regular risk assessments and make recommendations to improve security posture \n• Keep up-to-date with the latest threats and vulnerabilities, and implement necessary mitigation measures\n• Communicate security incidents and recommendations to senior stakeholders in a clear and concise manner\n\nRequirements:\n• A minimum of 2 years of experience in a similar role\n• Strong knowledge of cybersecurity principles and best practices\n• Experience with security tools such as SIEM, IDS/IPS, DLP, and anti-malware\n• Ability to analyze and interpret security data\n• Strong written and verbal communication skills\n• Detail-oriented and able to work well under pressure \n\nIf you are passionate about cybersecurity and possess the required skills and experience, we encourage you to apply for this exciting opportunity. Join our team and help us keep our organization and customers safe and secure.";
  const sections = txt.split("\n\n");

  return (
    <div>
      {sections.map((section, index) => {
        // Split each section into paragraphs
        const paragraphs = section.split("\n");

        return (
          <div key={index} className="post-block border-style mt-40 lg-mt-30">
            {/* The first paragraph of each section is a heading */}
            {/* <h5></h5> */}
            <div className="d-flex align-items-center">
              {paragraphs[0].length > 30 ? (
                <p className="">{paragraphs[0]}</p>
              ) : (
                <h4 className="">{paragraphs[0]}</h4>
              )}
            </div>

            <ul className="list-type-one style-none mb-15">
              {paragraphs.slice(1).map((paragraph, i) => (
                <li key={i}>{paragraph}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default FormatText;
