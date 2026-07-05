import { PageHeroSection } from '@/components/website/page-hero-section'
import { ContactForm } from './components/contact-form'
import { ContactInfo } from './components/contact-info'
import { ContactMap } from './components/contact-map'

export default function ContactPage() {
  return (
    <>
      <PageHeroSection
        eyebrow="Contact Us"
        title="Talk to the WRAPA team"
        subtitle="Have a question, partnership inquiry, or need support? We're here and ready to help."
      />

      {/* Form + Info two-column section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28">
            {/* Left contact info */}
            <ContactInfo />

            {/* Right contact form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactMap />
    </>
  )
}
