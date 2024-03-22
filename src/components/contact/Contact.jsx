import image from "../../assets/contact.webp";
import avatar from "../../assets/avatar.webp";
import "./contact.scss";
function Contact() {
  return (
    <div className="contact-container" >
      <div className="contact-form">
        <h2>
          Contactez-nous <br />
          pour plus d'informations.
        </h2>
        <div className="exmple">
          <img src={avatar} alt="" />
          <p>
            Salut, je suis Islem. Besoin d'aide ? Utilisez le formulaire
            ci-dessous ou envoyez-moi un email à vente@gmail.com
          </p>
        </div>
        <form>
          <label>Name</label>
          <input type="text"  placeholder="votre nom ici"/>
          <label >Email</label>
          <input type="email" placeholder="votre email ici" />
          <label>Message</label>
          <textarea name="message" cols="30" rows="10" placeholder="votre message ici"></textarea>
          <button type="submit">Envoyer</button>
        </form>
      </div>
     <div className="contact-img"> <img src={image} alt="" /></div>
    </div>
  );
}

export default Contact;
