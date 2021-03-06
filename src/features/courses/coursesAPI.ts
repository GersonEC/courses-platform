export const createCourse = (name: string, price: number) => {
  return postData("/courses", {
    name,
    price,
  });
};

function postData(url = ``, data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((response) => response.json());
}
