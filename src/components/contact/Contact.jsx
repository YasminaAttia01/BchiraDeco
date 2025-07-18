import image from "../../assets/contact.png";
import avatar from "../../assets/avatar.webp";
import "./contact.scss";
import { useTranslation } from "react-i18next";

function Contact() {
    const { t, i18n } = useTranslation();

  return (
    <div className="contact-container" >
      <div className="contact-form">
        <h2>
          &nbsp;{t("contact_us")}&nbsp;
        </h2>
        <div className="exmple">
          <img src={avatar} alt="" />
        </div>
        <form>
          <label>&nbsp;{t("nom")}&nbsp;</label>
          <input type="text"  placeholder="votre nom ici"/>
          <label >&nbsp;{t("email")}&nbsp;</label>
          <input type="email" placeholder="votre email ici" />
          <label>&nbsp;{t("message")}&nbsp;</label>
          <textarea name="message" cols="30" rows="10" placeholder="votre message ici"></textarea>
          <button type="submit">&nbsp;{t("send")}&nbsp;</button>
        </form>&
      </div>
     <div className="contact-img"> <img src={image} alt="" /></div>
    </div>
  );
}

export default Contact;
