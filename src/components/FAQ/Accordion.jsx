import React from 'react';
import faqLottie from '../../assets/lottie/FAQ.json';
import Lottie from 'lottie-react';

const Accordion = () => {
  return (
    <div className="px-4 md:px-16 ">
      <h1 className="text-5xl jost mt-14 mb-5 text-black text-center font-semibold">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-500 text-center jost mb-20">
        Get quick answers to the most common questions about our services,
        amenities, and policies. We&apos;ve gathered all the essential
        information to make your stay smooth and hassle-free.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-16">
        <div className="col-span-5 space-y-3.5">
          <div className="collapse collapse-arrow bg-white text-gray-600 shadow-sm px-1">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">
              What are the check-in and check-out times?
            </div>
            <div className="collapse-content text-sm">
              Our standard check-in time is from 3:00 PM onwards, and check-out
              is by 11:00 AM. If you require early check-in or late check-out,
              please inform our front desk in advance — additional charges may
              apply.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white text-gray-600 shadow-sm px-1">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">
              Is breakfast included in the room rate?
            </div>
            <div className="collapse-content text-sm">
              Most of our room packages include complimentary breakfast.
              However, certain special offers may not include it. Please review
              the details when confirming your booking.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white text-gray-600 shadow-sm px-1">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              Do you provide airport shuttle services?
            </div>
            <div className="collapse-content text-sm">
              Yes, we offer a 24/7 airport shuttle service (additional charges
              apply). Simply share your flight details with us, and we will
              arrange timely pick-up and drop-off.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-white text-gray-600 shadow-sm px-1">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              Does the room have Wi-Fi and other amenities?
            </div>
            <div className="collapse-content text-sm">
              Absolutely. All our rooms come with high-speed free Wi-Fi, a smart
              TV, minibar, air conditioning, and an in-room safe. Selected
              premium rooms also feature private balconies and jacuzzis.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-white text-gray-600 shadow-sm px-1">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              Are pets allowed at the property?
            </div>
            <div className="collapse-content text-sm">
              Pets are allowed in specific room types only. Please inform us
              during booking confirmation. Additional cleaning fees may apply.
            </div>
          </div>
        </div>

        <div className="col-span-4 hidden lg:block">
          <div className="place-items-center">
            <Lottie
              className="w-[400px] h-auto hidden lg:block"
              animationData={faqLottie}
              loop={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
