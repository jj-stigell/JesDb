## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by the
[JesDb Code of Conduct](https://github.com/jj-stigell/JesDb/blob/main/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.


## I Have a Question

If you want to ask a question, we assume that you have read the available [documentation](https://github.com/jj-stigell/JesDb/blob/main/README.md).

Before you ask a question, it is best to search for existing [issues](https://github.com/jj-stigell/JesDb/issues) that might help you.
In case you have found a suitable issue and still need clarification, you can write your question in this issue.
It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [issue](https://github.com/jj-stigell/JesDb/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

<!-- omit in toc -->
### Legal Notice

When contributing to this project, you must agree that you have authored 100% of the content, that you have
the necessary rights to the content and that the content you contribute may be provided under the project licence.

### Reporting Bugs

<!-- omit in toc -->
#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to
investigate carefully, collect information and describe the issue in detail in your report.
Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](https://github.com/jj-stigell/JesDb/blob/main/README.md). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/jj-stigell/JesDb/issues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

<!-- omit in toc -->
#### How Do I Submit a Good Bug Report?

You must never report security related issues, vulnerabilities or bugs including sensitive information to
the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to.

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [issue](https://github.com/jj-stigell/JesDb/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Select the Bug report template.
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag **will not be addressed until they are reproduced**.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for JesDb, **including completely new features and minor improvements to existing functionality**.
Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

- Open an [issue](https://github.com/jj-stigell/JesDb/issues/new).
- Select the feature request template.
- Fill in the template according to instructions.

<!-- omit in toc -->
#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://github.com/jj-stigell/JesDb/blob/main/README.md) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/jj-stigell/JesDb/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

<!-- omit in toc -->
#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/jj-stigell/JesDb-client/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots or screen recordings** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [LICEcap](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and the built-in [screen recorder in GNOME](https://help.gnome.org/users/gnome-help/stable/screen-shot-record.html.en) or [SimpleScreenRecorder](https://github.com/MaartenBaert/ssr) on Linux.
- **Explain why this enhancement would be useful** to most JesDb users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Improving The Documentation

If you find any typos, inconsistencies, etc. in the documentation of this project, feel free to fix these and create a new PR.
Remember to include clarification/rational why your fix should replace the current one.

## Styleguides
### Commit Messages

A good Git commit message is clear, concise, and informative, providing context about what changes have been made and why.
Here are the key elements and best practices for writing a good Git commit message:

### Structure

1. **Subject Line**:
   - **Short and Descriptive**: Summarize the changes in 70 words or less.
   - **Imperative Mood**: Use imperative verbs (e.g., "Fix", "Add", "Update").

2. **Body** (Optional but recommended for complex changes):
   - **Detailed Description**: Explain what and why, not how.
   - **Wrap at 72 Characters**: Wrap lines at 80 characters to improve readability.
   - **Separate from Subject**: Separate the subject from the body with a blank line.

### Example

```
Add user authentication module

Implement the authentication module using JWT. This module includes 
user registration, login, and token validation endpoints. It will 
enhance security by ensuring that only registered users can access 
restricted resources.

- Add User model and migration
- Implement registration endpoint
- Implement login endpoint
- Add JWT token generation and validation
- Write tests for the authentication module

Fixes #45
```

### Tips

- **Focus on Why**: Explain why the changes were made, rather than how.
- **Reference Issues/PRs**: Mention related issue numbers or pull requests.
- **Use Bullet Points**: For multiple changes, use bullet points for clarity.
- **Consistent Format**: Stick to a consistent format across all commit messages.
- **Review**: Always review your commit message before finalizing.

### Common Mistakes to Avoid

- **Vague Messages**: Avoid non-descriptive messages like "Update", "Fix bugs", or "Changes".
- **Too Long Subject Line**: Keep the subject line brief and to the point.
- **Irrelevant Details**: Focus on the essential information, omitting unnecessary details.
- **Ignoring the Body**: For significant changes, always include a body to provide context.

### Imperative Mood Examples

- `Fix login button alignment`
- `Add error handling for API requests`
- `Remove deprecated methods`
- `Update documentation for new features`
- `Refactor user authentication flow`

By following these guidelines, your commit messages will be more useful to your team and your future self when looking back at the project history.

## Attribution

This guide is based on the **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!