import SibApiV3Sdk from "sib-api-v3-sdk";

let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

let apiInstance = new SibApiV3Sdk.ContactsApi();

const addContactAfterCheckingIfExits = (contact) => {
  let identifier = contact.email;
  apiInstance.getContactInfo(identifier).then(
    function (data) {
      console.log("Contact Already exits: " + JSON.stringify(data));
    },
    function (error) {
      if (error.message === "Not Found") {
        addContact(contact);
      } else {
        console.log(error);
      }
    }
  );
};

const addContact = (contact) => {
  let createContact = new SibApiV3Sdk.CreateContact();

  createContact.email = contact.email;

  createContact.attributes = {
    SMS: contact.phoneNumber,
    WHATSAPP: contact.phoneNumber,
    FIRSTNAME: contact.firstName,
    LASTNAME: contact.lastName,
    COUNTRY: contact.country,
    CITY: contact.city,
  };
  createContact.listIds = [7];

  apiInstance.createContact(createContact).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
};

// addContactAfterCheckingIfExits({
//   email: "meda@gmail.com",
//   firstName: "moha",
//   lastName: "naa",
//   country: "mar",
//   city: "laa",
//   phoneNumber: "+212622334455",
// });

export default addContactAfterCheckingIfExits;
