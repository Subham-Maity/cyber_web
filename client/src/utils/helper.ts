export function getDate(date: string) {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const createdAtDate = new Date(date);
  let day = createdAtDate.getDate();
  const month = createdAtDate.getMonth(); // Months are zero-based, so we add 1
  const year = createdAtDate.getFullYear();

  return `${day} ${monthArr[month]} ${year} `;
}

export function camelCaseToNormal(str: string) {
  // Use a regular expression to find all occurrences of a lowercase letter
  // followed by an uppercase letter, and replace them with a space and the lowercase letter.
  return (
    str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Capitalize the first letter of the resulting string.
      .replace(/^./, function (char) {
        return char.toUpperCase();
      })
  );
}

export const setAuthToken = (token: any) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const isCookieExist = (name: string) => {
  const cookieString = decodeURIComponent(document.cookie);
  const cookies = cookieString.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name + "=") === 0) {
      return true;
    }
  }
  return false;
};

export const checkValidDateTimeLine = (d1: string, d2: string) => {
  if (new Date(d1) > new Date(d2)) {
    return false;
  } else {
    return true;
  }
};
export const isValidUrl = (url: string) => {
  if (url === "") {
    return true;
  }
  const urlRegex = /^(ftp|http|https):\/\/[^\s]*$|^$/;

  return urlRegex.test(url);
};

export const checkValidDescription = (desc: string, limit: number) => {
  // Remove leading and trailing whitespaces and calculate the length without spaces
  const descLengthWithoutSpaces = desc.trim().replace(/\s+/g, "").length;

  if (descLengthWithoutSpaces >= limit || descLengthWithoutSpaces === 0) {
    return true; // Return true if the condition is met
  } else {
    return false; // Return false otherwise
  }
};

export const isPureString = (s: string) => {
  const isValidString = /^[A-Za-z ]+$/.test(s);

  if (isValidString || s === "") {
    return true;
  } else {
    return false;
  }
};

export const isValidSalaryNumber = (n1: string, n2: string) => {
  let num1 = parseInt(n1);
  let num2 = parseInt(n2);
  if (num1 < 0) {
    return false;
  } else if (num2 < 0) {
    return false;
  } else if (num1 > num2) {
    return false;
  } else {
    return true;
  }
};

export const isFundingAmount = (s: string) => {
  const isValidFund = /^\d+(\.\d+)?[MBT]$/i.test(s);
  if (isValidFund || s === "") {
    return true;
  } else {
    return false;
  }
};

export const isPureNumber = (num: string) => {
  const isNumber = /^\d+(\.\d+)?$/.test(num);
  if (isNumber || num === "") {
    return true;
  } else {
    return false;
  }
};

export const isBetween = (num: string, min: number, max: number) => {
  if ((parseInt(num) >= min && parseInt(num) <= max) || num === "") {
    return true;
  } else {
    return false;
  }
};

export const isValidEmail = (email: string) => {
  // Regular expression for a basic email validation
  const emailRegex = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
};
