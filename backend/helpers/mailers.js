const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const auth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILIN_ID, MAILING_SECRETS, MAILING_REFRESH } = process.env;
const auth = new OAuth2(MAILIN_ID, MAILING_SECRETS, MAILING_REFRESH, auth_link);

exports.sendverificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILIN_ID,
      clientSecret: MAILING_SECRETS,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    From: EMAIL,
    to: email,
    subject: "Rajis FacebookClone email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:roboto;font-weight:600;color:#3b5998"><img src="./assest/fb.png" alt="" style="width:30px"><span>Action required: activate your clone facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #a8a8a8;border-bottom:1px solid #a8a8a8;color:#141823;font-size:17px"><span>hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">you recently created an account on rajis facebook clone to complete your registration pls confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background-color:#4c649b;color:#fff;text-decoration:none">confirm your account</a><br></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
