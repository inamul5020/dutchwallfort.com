import React from 'react';
import { Shield, CreditCard, Users, Cigarette, PawPrint, Clock, AlertCircle, HelpCircle } from 'lucide-react';

const Policies = () => {
  const policies = [
    {
      icon: Shield,
      title: "Cancellation Policy",
      content: "Free cancellation up to 48 hours before check-in. For cancellations within 48 hours, the first night will be charged. No-shows will be charged the full amount. Special rates and group bookings may have different cancellation terms."
    },
    {
      icon: CreditCard,
      title: "Payment Policy",
      content: "We accept cash (LKR/USD), bank transfers, and major credit cards. A deposit may be required to secure your booking. Full payment is due upon check-in unless otherwise arranged. All rates include applicable taxes."
    },
    {
      icon: Users,
      title: "Children & Extra Beds",
      content: "Children of all ages are welcome. Children under 12 stay free when using existing beds. Extra beds are available for LKR 2,500 per night and must be requested in advance. Maximum occupancy per room varies by room type."
    },
    {
      icon: PawPrint,
      title: "Pet Policy",
      content: "Unfortunately, we do not allow pets at Dutch Wall Fort to ensure the comfort of all guests and maintain our historic property. Service animals are welcome with advance notice and proper documentation."
    },
    {
      icon: Cigarette,
      title: "Smoking Policy",
      content: "Dutch Wall Fort is a non-smoking property. Smoking is not permitted inside rooms or common areas. Designated smoking areas are available on the terrace. Violation of this policy may result in cleaning fees."
    },
    {
      icon: Clock,
      title: "Check-in/Check-out",
      content: "Standard check-in: 2:00 PM (14:00). Standard check-out: 11:00 AM. Early check-in and late check-out are subject to availability and may incur additional charges. Please contact us to arrange special timing."
    }
  ];

  const faqs = [
    {
      question: "Is breakfast included in the room rate?",
      answer: "Yes, complimentary Sri Lankan breakfast is included with every stay. We offer traditional Sri Lankan dishes as well as continental options. Vegetarian, vegan, and halal meals are available upon request."
    },
    {
      question: "Do you offer airport transfers?",
      answer: "Yes, we can arrange airport transfers from Bandaranaike International Airport (Colombo) or Koggala Airport for an additional charge. Please contact us at least 24 hours in advance to arrange pickup. Koggala Airport is approximately 35-40 minutes away."
    },
    {
      question: "Is there Wi-Fi available?",
      answer: "Yes, complimentary high-speed Wi-Fi is available throughout the property including all rooms, common areas, and the terrace. The network password will be provided upon check-in."
    },
    {
      question: "Can I check in early or check out late?",
      answer: "Early check-in and late check-out are subject to room availability. If available, early check-in (before 2 PM) and late check-out (after 11 AM) may be provided at no extra charge or for a small fee, depending on timing and occupancy."
    },
    {
      question: "Is parking available?",
      answer: "Due to our location within historic Galle Fort, private parking is not available at the property. However, public parking areas are available nearby within the fort walls. We can provide guidance on the best parking options upon arrival."
    },
    {
      question: "What is included in the room?",
      answer: "All rooms include air conditioning, private bathroom with hot water, complimentary Wi-Fi, daily housekeeping, breakfast, safe, and quality linens. Some rooms also feature balconies, work desks, mini fridges, and private entrances depending on the room type."
    },
    {
      question: "Are there laundry facilities?",
      answer: "Laundry service is available for an additional charge. We can arrange same-day or next-day service depending on the volume and type of items. Prices are reasonable and competitive with local rates."
    },
    {
      question: "How do I get to attractions from the villa?",
      answer: "Our central location in Galle Fort means most attractions are within walking distance. The lighthouse is 5 minutes away, Pedlar Street is 2 minutes, and the fort ramparts are 3 minutes away. For beaches outside the fort, tuk-tuks and taxis are readily available."
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "You can cancel free of charge up to 48 hours before your check-in date. For cancellations within 48 hours, you will be charged for one night. No-shows will be charged the full booking amount. We recommend travel insurance for additional protection."
    },
    {
      question: "Do you provide local tour recommendations?",
      answer: "Absolutely! Our local team is happy to provide recommendations for tours, restaurants, shopping, and attractions. We can help arrange day trips, driver services, and provide insider tips for the best experiences in and around Galle."
    }
  ];

  const importantNotes = [
    "All rates are subject to change without notice",
    "Government taxes and service charges are included in published rates",
    "Identification is required at check-in for all guests",
    "Damage to property will be charged to the guest's account",
    "Quiet hours are from 10 PM to 7 AM to respect all guests",
    "The property reserves the right to refuse service to disruptive guests"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Policies & FAQ</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Everything you need to know about staying at Dutch Wall Fort — 
            our policies, procedures, and answers to common questions
          </p>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hotel Policies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please review our policies to ensure a comfortable stay for all guests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <policy.icon className="text-amber-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{policy.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to the most common questions about Dutch Wall Fort
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                    <HelpCircle className="text-amber-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
            <p className="text-gray-600">
              Please note these additional terms and conditions for your stay
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <AlertCircle className="text-amber-600 mr-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Terms & Conditions</h3>
            </div>
            <ul className="space-y-3">
              {importantNotes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Privacy & Data Protection */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Data Protection</h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How We Handle Your Information</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>Data Collection:</strong> We collect only the information necessary to provide our services, 
                including name, contact details, and booking preferences.
              </p>
              <p>
                <strong>Data Usage:</strong> Your information is used solely for booking management, communication, 
                and improving our services. We do not sell or share your data with third parties.
              </p>
              <p>
                <strong>Data Security:</strong> We implement appropriate security measures to protect your personal 
                information against unauthorized access, alteration, or disclosure.
              </p>
              <p>
                <strong>Your Rights:</strong> You have the right to access, correct, or delete your personal data. 
                Contact us at any time to exercise these rights.
              </p>
              <p>
                <strong>Cookies:</strong> Our website may use cookies to enhance your browsing experience. 
                You can disable cookies in your browser settings if preferred.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Questions */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Our team is here to help with any questions about our policies or your upcoming stay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Send Us a Message
            </a>
            <a
              href="tel:+94765721495"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              Call: +94 76 572 1495
            </a>
          </div>
        </div>
      </section>

      {/* Ready to Book */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Experience Dutch Wall Fort?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Now that you know our policies, we're excited to welcome you to historic Galle Fort
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rooms"
              className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-700 transition-colors duration-200"
            >
              View Our Rooms
            </a>
            <a
              href="/contact"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              Send Booking Inquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policies;