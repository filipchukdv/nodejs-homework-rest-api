import ElasticEmail from "@elasticemail/elasticemail-client";
import "dotenv/config";

const { ELACTIC_API_KEY, ELACTIC_EMAIL_FROM, BASE_URL } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELACTIC_API_KEY;

const api = new ElasticEmail.EmailsApi();

const email = (emailTo, verificationCode) =>
  ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(emailTo)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: `<a href="${BASE_URL}/api/users/verify/${verificationCode}">Click here to verify your account</a>`,
        }),
      ],
      Subject: "Verification email",
      From: ELACTIC_EMAIL_FROM,
    },
  });
const callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("Email sent successfully.");
  }
};
export const sendVerificationEmail = (emailTo, verificationCode) =>
  api.emailsPost(email(emailTo, verificationCode), callback);
