import { type BaseSyntheticEvent } from 'react';
import { useNotification } from '../context/NotificationContext';

const Contact = () => {
  const { notify } = useNotification();

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    // simulate sending
    notify({ message: 'Message sent successfully', type: 'success' });

    // reset the form fields
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <main className="py-5 my-5">
      <h1 className="text-center mb-4">Contact</h1>
      <div className="d-flex justify-content-center">
        <form
          onSubmit={handleSubmit}
          className="bg-light p-5 rounded shadow-lg"
        >
          <div className="row g-3">
            {/* <!-- NAME --> */}
            <div className="col-12 col-lg-6">
              <label
                htmlFor="contact-name"
                className="form-label btn-input-form-text"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                className="form-control bg-light border border-dark"
                placeholder="Your name"
                required
              />
            </div>

            {/* <!-- EMAIL --> */}
            <div className="col-12 col-lg-6">
              <label
                htmlFor="contact-email"
                className="form-label btn-input-form-text"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                className="form-control bg-light border border-dark"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* <!-- MESSAGE --> */}
            <div className="col-12">
              <label
                htmlFor="contact-message"
                className="form-label btn-input-form-text"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                className="form-control bg-light border border-dark"
                rows={5}
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 mt-3 btn-input-form-text"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
