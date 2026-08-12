import { faqs } from "../../data/faq";
import FAQItem from "./FAQItem";

const FAQ = () => {
  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-violet-50 py-20"
    >
      <div className="mx-auto max-w-4xl px-5">
        {/* Heading */}
        <div className="text-center">
          <h2 className="bg-linear-to-r from-violet-700 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-base text-slate-600 sm:mt-4 sm:text-lg lg:text-xl">
            Find answers to common questions about Spark.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4 lg:mt-14 lg:space-y-5">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;