import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import logo from "./assets/confident.svg";

/**
 * Confident Patient Intake Form — EN/SR language toggle + FreightNeoW03
 * ---------------------------------------------------------------------
 * - Adds a simple language switch (EN / SR) in the header.
 * - All labels, placeholders, section names, buttons, and messages are i18n'd.
 * - Keeps site-matched styling + 'FreightNeoW03 Regular' font.
 */

// ---------- Types ----------
interface PatientData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Emergency Contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;

  // Referral Information
  hearAboutUs: string;
  referralDetails: string;

  // Consent
  hipaaConsent: boolean;
  treatmentConsent: boolean;
}

type Lang = "en" | "sr";

const copy: Record<Lang, any> = {
  en: {
    brand: "ConfiDental",
    headerTitle: "Patient Intake Form",
    subtitle: "Please fill out all required information",
    step: "Step",
    of: "of",
    percent: "Complete",
    sections: [
      "Personal Information",
      "Contact Details",
      "Emergency Contact",
      "How You Found Us",
      "Consent & Review",
    ],
    fields: {
      firstName: "First Name *",
      lastName: "Last Name *",
      dateOfBirth: "Date of Birth *",
      gender: "Gender *",
      genderOpts: {
        empty: "Select Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        prefer: "Prefer not to say",
      },
      phone: "Phone Number *",
      phonePh: "e.g., +381 63 386 382",
      email: "Email Address *",
      address: "Street Address *",
      city: "City *",
      state: "State / Region",
      zip: "ZIP / Postal Code",
      emergencyName: "Full Name *",
      emergencyPhone: "Phone Number *",
      emergencyRel: "Relationship *",
      emergencyRelOpts: {
        empty: "Select Relationship",
        spouse: "Spouse",
        parent: "Parent",
        child: "Child",
        sibling: "Sibling",
        friend: "Friend",
        other: "Other",
      },
      hearQ: "How did you hear about our clinic? *",
      hearOpts: {
        empty: "Select an option",
        fam: "Friend or Family Referral",
        google: "Google Search",
        social: "Social Media",
        insurance: "Insurance Provider",
        yellow: "Yellow Pages",
        newspaper: "Newspaper",
        radio: "Radio",
        drove: "Drove By",
        other: "Other",
      },
      details: "Additional Details (Optional)",
      detailsPh: "Provide any additional details...",
    },
    review: {
      title: "Review Your Information",
      name: "Name",
      dob: "Date of Birth",
      phone: "Phone",
      email: "Email",
      emergency: "Emergency Contact",
      heard: "Heard About Us",
    },
    consent: {
      hipaa:
        "I acknowledge that I have received and understand the HIPAA Privacy Notice and consent to the use and disclosure of my protected health information for treatment, payment, and healthcare operations.",
      treatment:
        "I consent to examination and treatment by the dentist and understand that no guarantee has been made regarding the outcome of treatment.",
    },
    success: {
      title: "Thank You!",
      text: "Your information has been submitted successfully. Please have a seat and we'll call you shortly.",
      newForm: "New form",
    },
    buttons: { prev: "Previous", next: "Next", submit: "Submit Form" },
    langs: { en: "EN", sr: "SR" },
  },
  sr: {
    brand: "ConfiDental",
    headerTitle: "Formular za prijem pacijenta",
    subtitle: "Molimo popunite obavezna polja",
    step: "Korak",
    of: "od",
    percent: "",
    sections: [
      "Lični podaci",
      "Kontakt podaci",
      "Kontakt za hitne slučajeve",
      "Kako ste čuli za nas",
      "Saglasnost i pregled",
    ],
    fields: {
      firstName: "Ime *",
      lastName: "Prezime *",
      dateOfBirth: "Datum rođenja *",
      gender: "Pol *",
      genderOpts: {
        empty: "Izaberite pol",
        male: "Muški",
        female: "Ženski",
        other: "Drugo",
        prefer: "Ne želim da navedem",
      },
      phone: "Broj telefona *",
      phonePh: "npr. +381 63 386 382",
      email: "Email adresa *",
      address: "Ulica i broj *",
      city: "Grad *",
      state: "Država / Region",
      zip: "Poštanski broj",
      emergencyName: "Puno ime *",
      emergencyPhone: "Broj telefona *",
      emergencyRel: "Odnos *",
      emergencyRelOpts: {
        empty: "Izaberite odnos",
        spouse: "Supružnik",
        parent: "Roditelj",
        child: "Dete",
        sibling: "Brat/Sestra",
        friend: "Prijatelj/Prijateljica",
        other: "Drugo",
      },
      hearQ: "Kako ste čuli za našu kliniku? *",
      hearOpts: {
        empty: "Izaberite opciju",
        fam: "Preporuka prijatelja ili porodice",
        google: "Pretraga na Google-u",
        social: "Društvene mreže",
        insurance: "Preko osiguranja",
        yellow: "Žute stranice",
        newspaper: "Novine",
        radio: "Radio",
        drove: "Prolazeći pored ordinacije",
        other: "Drugo",
      },
      details: "Dodatni detalji (opciono)",
      detailsPh: "Unesite dodatne informacije...",
    },
    review: {
      title: "Proverite vaše podatke",
      name: "Ime i prezime",
      dob: "Datum rođenja",
      phone: "Telefon",
      email: "Email",
      emergency: "Kontakt za hitne slučajeve",
      heard: "Kako ste čuli za nas",
    },
    consent: {
      hipaa:
        "Potvrđujem da sam primio/la i razumem HIPAA obaveštenje o privatnosti i dajem saglasnost za upotrebu i otkrivanje mojih zdravstvenih podataka u svrhe lečenja, plaćanja i rada zdravstvene ustanove.",
      treatment:
        "Dajem saglasnost za pregled i lečenje od strane stomatologa i razumem da ne postoji garancija ishoda lečenja.",
    },
    success: {
      title: "Hvala vam!",
      text: "Vaši podaci su uspešno poslati. Molimo vas, sačekajte — pozvaćemo vas uskoro.",
      newForm: "Novi formular",
    },
    buttons: { prev: "Prethodno", next: "Sledeće", submit: "Pošalji formular" },
    langs: { en: "EN", sr: "SR" },
  },
};

// ---------- Component ----------
export default function ConfidentPatientForm() {
  const [lang, setLang] = useState<Lang>("en");

  const [formData, setFormData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    hearAboutUs: "",
    referralDetails: "",
    hipaaConsent: false,
    treatmentConsent: false,
  });

  const t = copy[lang];

  const sections = t.sections as string[];

  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real submit
    console.log("Patient data submitted:", { lang, ...formData });
    setIsSubmitted(true);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) setCurrentSection((n) => n + 1);
  };
  const prevSection = () => {
    if (currentSection > 0) setCurrentSection((n) => n - 1);
  };

  if (isSubmitted) {
    return (
      <div className="conf-wrapper" data-lang={lang}>
        <div className="conf-container">
          <div className="conf-card conf-center">
            <div className="conf-success-circle">
              <CheckCircle size={40} />
            </div>
            <h2 className="conf-title">{t.success.title}</h2>
            <p className="conf-text">{t.success.text}</p>
            <button
              className="btn btn-primary button primary-btn conf-btn conf-btn-primary"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentSection(0);
                setFormData({
                  firstName: "",
                  lastName: "",
                  dateOfBirth: "",
                  gender: "",
                  phone: "",
                  email: "",
                  address: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  emergencyName: "",
                  emergencyPhone: "",
                  emergencyRelationship: "",
                  hearAboutUs: "",
                  referralDetails: "",
                  hipaaConsent: false,
                  treatmentConsent: false,
                });
              }}
            >
              {t.success.newForm}
            </button>
          </div>
        </div>
        <ConfidentStyles />
      </div>
    );
  }

  const progressPercent = Math.round(((currentSection + 1) / sections.length) * 100);

  return (
    <div className="confident-intake-root">
      <div className="conf-wrapper" data-lang={lang}>
        <div className="conf-container">
          {/* Header */}
          <div className="conf-card conf-header">
            <div>
              <h1 className="conf-title">{t.headerTitle}</h1>
              <p className="conf-subtitle">{t.subtitle}</p>
            </div>
            <div className="conf-header-right">
              <img src={logo} alt="Confident Logo" className="h-8" />
              <div className="conf-lang-switch" role="group" aria-label="Language switch">
                <button
                  type="button"
                  className={`conf-lang-btn ${lang === "en" ? "is-active" : ""}`}
                  aria-pressed={lang === "en"}
                  onClick={() => setLang("en")}
                >
                  {t.langs.en}
                </button>
                <button
                  type="button"
                  className={`conf-lang-btn ${lang === "sr" ? "is-active" : ""}`}
                  aria-pressed={lang === "sr"}
                  onClick={() => setLang("sr")}
                >
                  {t.langs.sr}
                </button>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="conf-card conf-progress-card">
            <div className="conf-progress-meta">
              <span className="conf-meta">
                {t.step} {currentSection + 1} {t.of} {sections.length}
              </span>
              <span className="conf-meta">{progressPercent}% {t.percent}</span>
            </div>
            <div className="conf-progress" aria-hidden>
              <div className="conf-progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="conf-progress-label">{sections[currentSection]}</div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="conf-card conf-form">
            {/* Section: Personal Information */}
            {currentSection === 0 && (
              <div className="conf-section">
                <div className="conf-section-head">
                  <h2 className="conf-section-title">{t.sections[0]}</h2>
                </div>
                <div className="conf-grid">
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.firstName}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.lastName}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.dateOfBirth}</label>
                    <input
                      className="conf-input"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.gender}</label>
                    <select
                      className="conf-input"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">{t.fields.genderOpts.empty}</option>
                      <option value="male">{t.fields.genderOpts.male}</option>
                      <option value="female">{t.fields.genderOpts.female}</option>
                      <option value="other">{t.fields.genderOpts.other}</option>
                      <option value="prefer-not-to-say">{t.fields.genderOpts.prefer}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Section: Contact Details */}
            {currentSection === 1 && (
              <div className="conf-section">
                <div className="conf-section-head">
                  <h2 className="conf-section-title">{t.sections[1]}</h2>
                </div>
                <div className="conf-grid">
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.phone}</label>
                    <input
                      className="conf-input"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder={t.fields.phonePh}
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.email}</label>
                    <input
                      className="conf-input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field conf-span-2">
                    <label className="conf-label">{t.fields.address}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.city}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.state}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.zip}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section: Emergency Contact */}
            {currentSection === 2 && (
              <div className="conf-section">
                <div className="conf-section-head">
                  <h2 className="conf-section-title">{t.sections[2]}</h2>
                </div>
                <div className="conf-grid">
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.emergencyName}</label>
                    <input
                      className="conf-input"
                      type="text"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field">
                    <label className="conf-label">{t.fields.emergencyPhone}</label>
                    <input
                      className="conf-input"
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="conf-field conf-span-2">
                    <label className="conf-label">{t.fields.emergencyRel}</label>
                    <select
                      className="conf-input"
                      name="emergencyRelationship"
                      value={formData.emergencyRelationship}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">{t.fields.emergencyRelOpts.empty}</option>
                      <option value="spouse">{t.fields.emergencyRelOpts.spouse}</option>
                      <option value="parent">{t.fields.emergencyRelOpts.parent}</option>
                      <option value="child">{t.fields.emergencyRelOpts.child}</option>
                      <option value="sibling">{t.fields.emergencyRelOpts.sibling}</option>
                      <option value="friend">{t.fields.emergencyRelOpts.friend}</option>
                      <option value="other">{t.fields.emergencyRelOpts.other}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Section: How You Found Us */}
            {currentSection === 3 && (
              <div className="conf-section">
                <div className="conf-section-head">
                  <h2 className="conf-section-title">{t.sections[3]}</h2>
                </div>
                <div className="conf-grid">
                  <div className="conf-field conf-span-2">
                    <label className="conf-label">{t.fields.hearQ}</label>
                    <select
                      className="conf-input"
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">{t.fields.hearOpts.empty}</option>
                      <option value="friend-family">{t.fields.hearOpts.fam}</option>
                      <option value="google">{t.fields.hearOpts.google}</option>
                      <option value="social-media">{t.fields.hearOpts.social}</option>
                      <option value="insurance">{t.fields.hearOpts.insurance}</option>
                      <option value="yellow-pages">{t.fields.hearOpts.yellow}</option>
                      <option value="newspaper">{t.fields.hearOpts.newspaper}</option>
                      <option value="radio">{t.fields.hearOpts.radio}</option>
                      <option value="drove-by">{t.fields.hearOpts.drove}</option>
                      <option value="other">{t.fields.hearOpts.other}</option>
                    </select>
                  </div>
                  <div className="conf-field conf-span-2">
                    <label className="conf-label">{t.fields.details}</label>
                    <textarea
                      className="conf-input conf-textarea"
                      name="referralDetails"
                      value={formData.referralDetails}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={t.fields.detailsPh}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section: Consent & Review */}
            {currentSection === 4 && (
              <div className="conf-section">
                <div className="conf-section-head">
                  <h2 className="conf-section-title">{t.sections[4]}</h2>
                </div>

                <div className="conf-review">
                  <h3 className="conf-review-title">{t.review.title}</h3>
                  <div className="conf-review-grid">
                    <div>
                      <p><strong>{t.review.name}:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>{t.review.dob}:</strong> {formData.dateOfBirth}</p>
                      <p><strong>{t.review.phone}:</strong> {formData.phone}</p>
                      <p><strong>{t.review.email}:</strong> {formData.email}</p>
                    </div>
                    <div>
                      <p><strong>{t.review.emergency}:</strong> {formData.emergencyName}</p>
                      <p><strong>{t.review.heard}:</strong> {formData.hearAboutUs}</p>
                    </div>
                  </div>
                </div>

                <div className="conf-consent">
                  <label className="conf-checkbox">
                    <input
                      type="checkbox"
                      name="hipaaConsent"
                      checked={formData.hipaaConsent}
                      onChange={handleInputChange}
                      required
                    />
                    <span>{t.consent.hipaa}</span>
                  </label>

                  <label className="conf-checkbox">
                    <input
                      type="checkbox"
                      name="treatmentConsent"
                      checked={formData.treatmentConsent}
                      onChange={handleInputChange}
                      required
                    />
                    <span>{t.consent.treatment}</span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="conf-actions">
              <button
                type="button"
                onClick={prevSection}
                disabled={currentSection === 0}
                className={`btn button conf-btn ${currentSection === 0 ? "conf-btn-disabled" : "conf-btn-dark"}`}
              >
                {t.buttons.prev}
              </button>

              {currentSection < sections.length - 1 ? (
                <button type="button" onClick={nextSection} className="btn btn-primary button primary-btn conf-btn conf-btn-primary">
                  {t.buttons.next}
                </button>
              ) : (
                <button type="submit" className="btn btn-primary button primary-btn conf-btn conf-btn-primary conf-btn-lg">
                  {t.buttons.submit}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Inject site-matching styles */}
        <ConfidentStyles />
      </div>
    </div>
  );
}

// ---------- Styles (FreightNeoW03 Regular + language switch) ----------
function ConfidentStyles() {
  return (
    <style>{`
/* Load the font. Update URLs to your hosted files. */
@font-face {
  font-family: 'FreightNeoW03 Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('FreightNeoW03 Regular'), local('FreightNeoW03-Regular'), local('FreightNeoW03'),
       url('/fonts/FreightNeoW03-Regular.woff2') format('woff2'),
       url('/fonts/FreightNeoW03-Regular.woff') format('woff');
}

:root {
  --conf-primary: var(--color-primary, var(--primary, var(--theme-primary, #736661)));
  --conf-primary-contrast: #F1F0E4;
  --conf-text: var(--body-color, #111827);
  --conf-muted: var(--muted-color, #6b7280);
  --conf-bg: var(--page-bg, #F1F0E4);
  --conf-card: var(--card-bg, #ffffff);
  --conf-border: var(--border-color, #F1F0E4);
  --conf-radius: var(--radius, 14px);
  --conf-shadow: var(--card-shadow, 0 10px 30px rgba(2, 6, 23, 0.06));
  --conf-font: 'FreightNeoW03 Regular', 'FreightNeoW03', 'FreightNeoW03-Regular', -apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji';
}

* html, body { margin: 0; padding: 0; }  
.conf-logo { display:block; height: 36px; }  /* tweak as you like */
.conf-wrapper, .conf-wrapper * { font-family: var(--conf-font); }

.conf-wrapper { background: var(--conf-bg); padding: 40px 16px; }
.conf-container { max-width: 1100px; margin: 0 auto; }

.conf-card { background: var(--conf-card); border: 1px solid var(--conf-border); border-radius: var(--conf-radius); box-shadow: var(--conf-shadow); }

.conf-header { padding: 20px 24px; display:flex; align-items:center; justify-content:space-between; gap: 12px; }
.conf-header-right { display:flex; align-items:center; gap: 12px; }
.conf-brand { color: var(--conf-primary); font-weight: 800; letter-spacing: .2px; }
.conf-title { margin: 0; font-size: 28px; line-height: 1.2; font-weight: 800; color: var(--conf-text); }
.conf-subtitle { margin: 6px 0 0; color: var(--conf-muted); font-size: 14px; }

/* Language segmented control */
.conf-lang-switch { display:inline-flex; background: #f1f5f9; border: 1px solid #e5e7eb; padding: 4px; border-radius: 999px; }
.conf-lang-btn { border: none; background: transparent; padding: 6px 12px; border-radius: 999px; font-weight: 800; color: #475569; cursor:pointer; }
.conf-lang-btn.is-active { background: var(--conf-primary); color: var(--conf-primary-contrast); }

.conf-progress-card { padding: 16px 20px; margin: 16px 0 24px; }
.conf-progress-meta { display:flex; align-items:center; justify-content:space-between; margin-bottom: 10px; }
.conf-meta { font-size: 13px; color: var(--conf-muted); font-weight: 600; }
.conf-progress { height: 6px; background: #eef2f7; border-radius: 999px; overflow: hidden; }
.conf-progress-bar { height: 6px; background: var(--conf-primary); border-radius: 999px; transition: width .3s ease; }
.conf-progress-label { text-align:center; margin-top: 8px; font-weight: 700; color: var(--conf-text); }

.conf-form { padding: 28px; }
.conf-section { display:block; }
.conf-section-head { margin-bottom: 18px; }
.conf-section-title { margin: 0; font-size: 22px; font-weight: 800; color: var(--conf-text); }

.conf-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
@media (max-width: 780px) { .conf-grid { grid-template-columns: 1fr; } }
.conf-span-2 { grid-column: span 2; }

.conf-field { display:block; }
.conf-label { display:block; margin-bottom: 8px; font-weight: 700; font-size: 14px; color: #374151; }

.conf-input { width:100%; padding: 12px 12px; background: #fff; border: 1px solid var(--conf-border); border-radius: 10px; font-size: 16px; outline:none; transition: border-color .2s, box-shadow .2s, background .2s; }
.conf-input:focus { border-color: var(--conf-primary); box-shadow: 0 0 0 4px color-mix(in srgb, var(--conf-primary) 15%, transparent); }
.conf-textarea { min-height: 120px; resize: vertical; }

.conf-review { background: #f8fafc; border: 1px dashed #e5e7eb; border-radius: 12px; padding: 18px; margin-bottom: 16px; }
.conf-review-title { margin: 0 0 10px; font-weight: 800; color: var(--conf-text); }
.conf-review-grid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; font-size: 14px; color: #1f2937; }
@media (max-width: 780px) { .conf-review-grid { grid-template-columns: 1fr; } }

.conf-consent { display:flex; flex-direction: column; gap: 12px; }
.conf-checkbox { display:flex; align-items:flex-start; gap: 10px; font-size: 14px; color: #374151; }
.conf-checkbox input { margin-top: 3px; width: 18px; height: 18px; }

.conf-actions { display:flex; justify-content: space-between; gap: 12px; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--conf-border); }

.conf-btn { border-radius: 10px; font-weight: 800; letter-spacing: .2px; padding: 12px 20px; cursor: pointer; transition: transform .06s ease, filter .15s ease; }
.conf-btn:active { transform: translateY(1px); }
.conf-btn-dark { background: #111827; color: #fff; opacity: .9; }
.conf-btn-dark:hover { opacity: 1; }
.conf-btn-primary { background: var(--conf-primary); color: #fff; }
.conf-btn-primary:hover { filter: brightness(.95); }
.conf-btn-lg { padding: 14px 26px; }
.conf-btn-disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }

/* success state */
.conf-center { text-align:center; padding: 40px 28px; }
.conf-success-circle { width: 84px; height: 84px; margin: 0 auto 16px; border-radius: 50%; background: #ecfdf5; color: #059669; display:flex; align-items:center; justify-content:center; }
.conf-text { color: var(--conf-muted); margin: 6px 0 18px; }

.confident-intake-root {
  margin: 0 !important;
  padding-bottom: 0 !important;
}
    `}</style>
  );
}
