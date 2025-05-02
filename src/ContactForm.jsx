import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useForm } from "react-hook-form";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const form = useRef();

  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const sendEmail = async (data) => {
    let bodyContent = JSON.stringify({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
    try {
      const request = await fetch("http://localhost:1337/api/contacts", {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    sendEmail(data);
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <section className="contactForm">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} ref={form}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <p>Ce champ est obligatoire</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Ce champ est obligatoire</p>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Sujet</label>
          <input
            type="text"
            id="subject"
            {...register("subject", { required: true })}
          />
          {errors.subject && <p>Ce champ est obligatoire</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" {...register("message", { required: true })} />
          {errors.message && <p>Ce champ est obligatoire</p>}
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}

export default ContactForm;
