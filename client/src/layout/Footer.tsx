import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { repoLink } from 'src/utils/constants'

export default function Footer (): React.JSX.Element {
  return (
    <footer className="dark:bg-jesdark-900" aria-labelledby="footer-heading">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 JesDb
        </span>
        <ul
          className={`
            flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400
          `}
          aria-label="Footer navigation"
        >
          <li>
            <Link
              to='/about'
              className="hover:underline me-2 md:me-6"
              aria-label="About page"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to='/privacy'
              className="hover:underline me-2 md:me-6"
              aria-label="Privacy policy page"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              to='/tos'
              className="hover:underline me-2 md:me-6"
              aria-label="Terms of service page"
            >
              ToS
            </Link>
          </li>
          <li>
            <a
              href={repoLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Source code on GitHub"
            >
              <FaGithub size={20} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
