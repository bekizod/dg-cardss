"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const PaymentMethods = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h2 className="text-2xl font-semibold text-center mb-8" variants={textVariants}>
        The accepted payment methods on the website are as follows:
      </motion.h2>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Mada credit card
        <br />
        Payment via Apple Pay
        <br />
        Payment by installments (Tabby - Tamara)
        <br />
        Cash on delivery (Saudi Arabia only)
        <br />
        Coupons and gift vouchers from Alsaif Gallery
        <br />
        Payment via American Express
      </motion.p>

      <motion.h3 className="text-xl font-semibold mb-4" variants={textVariants}>
        Payment methods:
      </motion.h3>

      <motion.h4 className="text-lg font-semibold mt-6 mb-2" variants={textVariants}>
        Credit Card:
      </motion.h4>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We guarantee the protection of your credit card number with the latest electronic encryption technologies, ensuring a safe shopping experience on our website at Alsaif Gallery. We accept Mastercard and Visa credit cards. No additional fees are added when paying with a credit card.
      </motion.p>

      <motion.h4 className="text-lg font-semibold mt-6 mb-2" variants={textVariants}>
        Apple Pay:
      </motion.h4>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Apple Pay payment system is currently available only in Alsaif Gallery.
        <br />
        <br />
        • Before using Apple Pay, make sure to add your card to the &quot;wallet&quot; in your Apple device.
        <br />
        • Ensure you have a qualified device with the latest operating system version and are logged into iCloud.
        <br />
        • If you face difficulty adding your card, contact your bank, card issuer, or AppleCare for assistance.
        <br />
        • Once your card is added, you can shop on Alsaif Gallery.
        <br />
        • Add your favorite products to your cart, click on the Apple Pay button, verify details on the confirmation page, and complete the payment.
        <br />• After payment, your order will be processed as quickly as possible.
      </motion.p>

      <motion.h4 className="text-lg font-semibold mt-6 mb-2" variants={textVariants}>
        Tamara:
      </motion.h4>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <span style={{ color: "#ba372a" }}>
          <strong>(Discounted products are not returned or exchanged if the payment method is Tamara)</strong>
        </span>
        <br />
        <br />
        How can I purchase using Tamara?
        <br />
        Choose &quot;Tamara&quot; at the payment page and your payments will be divided into 3 installments. Enter your phone number and confirm with a one-time password. Complete the first installment only; the order will be delivered, and the remaining payment will be made through the Tamara application within two months.
        <br />
        Note: Tamara service is available to customers aged 18 and above.
        <br />
        <br />
        Facing a problem with executing your order through Tamara?
        <br />
        We are here to help! Contact the Tamara customer service team.
        <br />
        <br />
        How can I purchase in 3 installments?
        <br />
        Choose Tamara as the payment method and divide the amount into 3 installments without interest or fees. The first installment is paid at the time of order, and the remaining amount is paid in two installments within two months.
        <br />
        <br />
        Can I change the payment card?
        <br />
        Yes, you can change the payment card for the first installment by logging into your Tamara account, going to settings, and choosing payment methods to change the card.
        <br />
        <br />
        How do I know when it&apos;s time to pay the installment?
        <br />
        You will be reminded via email, SMS, and notifications through the Tamara application.
        <br />
        If it&apos;s time to pay, but I havent received my order yet?
        <br />
        Your payment plan starts immediately after the order date, regardless of delivery status. Contact the Tamara customer service team for support.
      </motion.p>

      <motion.h4 className="text-lg font-semibold mt-6 mb-2" variants={textVariants}>
        Tabby:
      </motion.h4>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <span style={{ color: "#ba372a" }}>
          <strong>(Discounted products are not returned or exchanged if the payment method is Tabby)</strong>
        </span>
        <br />
        <br />
        What is the Tabby payment service?
        <br />
        Tabby is a flexible payment method that allows you to purchase products from Alsaif Gallery and pay in installments without additional fees or charges.
        <br />
        <br />
        How does the installment payment work?
        <br />
        Purchase any product from Alsaif Gallery and pay in 4 monthly installments without fees, with the first payment at the time of order.
        <br />
        <br />
        How do I place an order?
        <br />
        Add products to your cart, choose Tabby payment on the payment options page, enter your email and mobile number to receive an activation message, enter the verification code sent to your mobile, and wait for the successful payment completion screen to appear. Your Tabby account will be created!
        <br />
        <br />
        Are there any fees or charges?
        <br />
        Tabby provides services without additional fees or charges throughout your payment commitment.
        <br />
        <br />
        What is the minimum and maximum purchasing limit to complete an order?
        <br />
        The maximum limit depends on various factors including the type of products purchased, the store, and the date of payment for previous Tabby payments.
        <br />
        <br />
        How can I pay you?
        <br />
        Track your purchases and payment due dates through the Tabby app or website after logging into your account.
      </motion.p>

      <motion.h4 className="text-lg font-semibold mt-6 mb-2" variants={textVariants}>
        Cash on Delivery (Saudi Arabia only):
      </motion.h4>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        After choosing cash on delivery, you can pay upon receiving the order. Additional fees of SAR 28 apply, which are non-refundable in case of order returns. Note that cash on delivery orders shipped outside Riyadh will not be processed or shipped until confirmed through WhatsApp.
      </motion.p>

      <motion.h4 className="text-lg font-semibold mt-6 mb-2" variants={textVariants}>
        AlSaif Gallery Coupons and Gift Vouchers:
      </motion.h4>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        With the AlSaif Gallery gift card, you can explore all products offered by the store. Get the latest home appliances, cooking tools, and household necessities with exclusive offers and discounts using the AlSaif Gallery gift card from the Rassal website.
      </motion.p>

      <motion.h4 className="text-lg font-semibold mt-6 mb-2" variants={textVariants}>
        Payment by American Express:
      </motion.h4>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The American Express card is globally accepted and offers various advantages, eliminating the need for cash or checks. It allows cardholders to make purchases or obtain cash through ATMs worldwide and online stores such as AlSaif Gallery. It is available for use in Saudi Arabia, United Arab Emirates, and Kuwait.
      </motion.p>

      <motion.div className="mt-12" variants={textVariants}>
        <h3 className="text-xl font-semibold mb-2">Saudi Arabia</h3>
        <p className="mb-1">Al-Saif Company for Development and Investment</p>
        <p className="mb-1">Establishment Number: 7008415130</p>
        <p className="mb-1">Ministry of Commerce: 1010664452</p>
        <p className="mb-1">Tax Number: 1010111193</p>
      </motion.div>

      <motion.div className="mt-8" variants={textVariants}>
        <h3 className="text-xl font-semibold mb-2">United Arab Emirates</h3>
        <p className="mb-1">ALSAIF GALLERY TRADING - SOLE PROPRIETORSHIP L.L.C.</p>
        <p className="mb-1">License Number: CN-4605329</p>
        <p className="mb-1">Tax Number: 104016709800003</p>
      </motion.div>

      <motion.div className="mt-8" variants={textVariants}>
        <h3 className="text-xl font-semibold mb-2">Kuwait</h3>
        <p className="mb-1">Al-Saif Gallery Kuwait Company for Wholesale</p>
        <p className="mb-1">Commercial Registry: 468654</p>
      </motion.div>
    </motion.div>
  );
};

export default PaymentMethods;
