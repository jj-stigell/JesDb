import React, { useEffect } from 'react'

import { feedbackLink } from 'src/utils/constants'
import { scrollToTop } from 'src/utils/helpers'

interface ITos {
  toggleModal?: () => void
}

export default function Tos ({
  toggleModal
}: ITos): React.JSX.Element {
  useEffect(() => {
    scrollToTop()
  }, [])

  const modalButton = (): React.JSX.Element => {
    if (toggleModal !== undefined) {
      return (
        <div className="my-5">
          <button
            className="link"
            onClick={toggleModal}
            aria-label="Close Terms of Service modal"
          >
            Close
          </button>
        </div>
      )
    }
    return <></>
  }

  return (
    <div
      className="mx-auto overflow-y-auto rounded-md w-full items-center px-8"
      role="main"
      aria-labelledby="tos-heading"
    >
      <div className="relative mx-auto max-w-[50rem] my-4">
        {modalButton()}
        <h1 id="tos-heading" className="title text-4xl">Terms Of Service</h1>
        <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-300">
          Last update: 2024-07-14
        </p>
      </div>
      <div className="mx-auto max-w-[50rem] text-gray-500 dark:text-gray-400">
        <p>
          This is a legal agreement between users of this service (&quot;you&quot; or
          &quot;your&quot;) and JesDb. This agreement governs your usage of JesDb.org
          (&quot;the service&quot;). In this document, &quot;we&quot; and &quot;our&quot;
          refers to JesDb, its staff, and trusted third-party contractors.
        </p>
        <h3 className="title" id="legal-age-heading">Legal Age</h3>
        <p>
          If you are not old enough to legally agree to this document,
          please have a parent or guardian agree on your behalf.
        </p>
        <h3 className="title" id="privacy-heading">Privacy</h3>
        <p>
          Please see our privacy policy to understand the information we store
          when you use the service, why we store it, and the limited ways in which we share it.
        </p>
        <h3 className="title" id="account-expiry-heading">Account Expiry</h3>
        <p>
          As JesDb is a free service, we need to periodically delete unused account data to
          keep costs down. Accounts are deleted if they are not accessed for 12 months or longer.
        </p>
        <h3 className="title" id="appropriate-content-heading">Appropriate Content</h3>
        <p className="mb-1">
          When you upload or input any material onto our website,
          you affirm that it does not contain:
        </p>
        <ul className="max-w-xl space-y-1 list-disc list-inside">
          <li>
            Any content that infringes intellectual property rights, including copyright,
            trademark, patent, or other forms of protection. While your local jurisdiction
            may allow the use of protected content under fair use provisions, you are not
            permitted to share this with others.
          </li>
          <li>
            Any content specifically created to disrupt the proper functioning of software
            or hardware, like viruses or code exploits.
          </li>
          <li>
            Any content that is considered illegal in the European Union,
            the United States, or your own country of residence.
          </li>
        </ul>
        <p className="mt-4 mb-1">
          In case you decide to make your material publicly accessible, please ensure:
        </p>
        <ul className="max-w-xl space-y-1 list-disc list-inside">
          <li>
            It does not include content that could be offensive to others,
            such as pornography, hate speech, or defamation.
          </li>
          <li>
            It does not attempt to alter or substitute the functionality,
            content, or branding of our website.
          </li>
        </ul>
        <h3 className="title" id="using-service-heading">Using the Service</h3>
        <p>
          You can use JesDb straight from your browser. This service is currently free
          of charge. However, we hold the right to suspend or terminate your access
          to the service according to our sole discretion.
        </p>
        <h3 className="title" id="breach-heading">Breach of Terms &amp; Legal Consequences</h3>
        <p>
          If you violate these terms of service, we have the right to suspend or delete
          your account at our discretion. If your actions are deemed illegal, we may
          report you to law enforcement agencies. Be aware that we are obligated to
          disclose your information to third parties when mandated by law.
        </p>
        <h3 className="title" id="policy-changes-heading">Policy changes</h3>
        <p>
          If significant changes to this policy are made, we will notify you via
          a message when visiting the website, logging in, or via email.
        </p>
        <h3 className="title" id="contact-heading">Contact</h3>
        <p>
          If you have any questions, please contact us with our
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
        <h3 className="title" id="disclaimer-heading">Disclaimer of Warranties</h3>
        <p className="mb-2">
          Use of the service is at your own risk. While we endeavor to ensure
          the integrity of your data, ultimately the responsibility is in your hands.
        </p>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot;. WHEN ALLOWED BY LOCAL LAW, WE HEREBY
          DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION,
          THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          WE MAKE NO WARRANTY THAT THE SERVICE WILL BE ERROR-FREE OR THAT ACCESS WILL BE CONTINUOUS
          OR UNINTERRUPTED. YOU UNDERSTAND THAT USE OF THE SERVICE IS ENTIRELY AT YOUR DISCRETION
          AND RISK.
        </p>
        <h3 className="title" id="limitation-liability-heading">Limitation of Liability</h3>
        <p className="mb-4">
          TO THE EXTENT NOT PROHIBITED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY GENERAL,
          SPECIAL, CONSEQUENTIAL, INCIDENTAL OR OTHER DAMAGES, INCLUDING, WITHOUT LIMITATION,
          LOSS OF DATA, INCORRECT DATA, BUSINESS INTERRUPTION, OR ANY OTHER DAMAGES OR LOSSES
          INCURRED BY YOUR USE OF, OR INABILITY TO USE THIS SERVICE, EVEN IF WE HAVE BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND REGARDLESS OF THE THEORY OF LIABILITY.
        </p>
        {toggleModal === undefined && (
          <button
            className="link"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            Back to top
          </button>
        )}
        {modalButton()}
      </div>
    </div>
  )
}
