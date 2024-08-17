import React, { useEffect } from 'react'

import { feedbackLink } from 'src/utils/constants'
import { scrollToTop } from 'src/utils/helpers'

export default function PrivacyPolicy (): React.JSX.Element {
  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <div
      className="mx-auto overflow-y-auto rounded-md w-full items-center px-8"
      role="main"
      aria-labelledby="privacy-policy-heading"
    >
      <div className="relative mx-auto max-w-[50rem] my-4">
        <h1 id="privacy-policy-heading" className="title text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-300">
          Last update: 2024-07-14
        </p>
      </div>
      <div className="mx-auto max-w-[50rem] text-gray-500 dark:text-gray-400">
        <p>
          This Privacy Policy outlines the information we collect from users of this
          service (&quot;you&quot; or &quot;your&quot;) and how we use, store, and
          protect that information. By using JesDb.org (&quot;the service&quot;),
          you agree to the collection and use of information in accordance with this policy.
        </p>
        <h3 className="title" id="information-collection-heading">Information We Collect</h3>
        <p>
          We collect only your email address. This information is collected solely for
          the purpose of logging in to our service.
        </p>
        <h3 className="title" id="information-use-heading">How We Use Your Information</h3>
        <p>
          The email address we collect is used exclusively for logging you into your account.
          We do not share your email address with anyone.
        </p>
        <h3 className="title" id="data-deletion-heading">Data Deletion</h3>
        <p>
          You have the right to request the immediate deletion of your email address from
          our records. To do so, please navigate to the settings page and fill the deletion form.
        </p>
        <h3 className="title" id="data-security-heading">Data Security</h3>
        <p>
          We take appropriate measures to ensure the security of your email address. However,
          no method of transmission over the Internet or method of electronic storage is 100%
          secure. While we strive to use all means protect to protect your email address, we
          cannot guarantee its absolute security.
        </p>
        <h3 className="title" id="contact-information-heading">Contact Information</h3>
        <p>
          If you have any questions or concerns about
          this Privacy Policy, please contact us using our
          <a
            href={feedbackLink}
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="Feedback form, opens in a new tab"
          >
            feedback form
          </a>
        </p>
        <h3 className="title" id="policy-changes-heading">Policy Changes</h3>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. If we make
          significant changes, we will notify you via a message on the website,
          through email, or through other appropriate means.
        </p>
        <button
          className="link"
          onClick={scrollToTop}
          aria-label="Back to top of page"
        >
          Back to top
        </button>
      </div>
    </div>
  )
}
