<div align="center">
  <img src="readme-header.png" alt="dotfiles logo" width="700">
</div>

# Setup

- Create accounts for:

  - [GitHub](https://github.com)
  - [n8n](https://n8n.io/)
  - [Airtop](https://www.airtop.ai/)
  - [Vercel](https://vercel.com/)

- Fork repository & Add SCRUM issue:

  - https://github.com/tlolkema/ai-demo-webshop
  - Untick "main branch only"
  - Enable the "Issues" tab for forked repositories (Setting > General > Features > Issues)
  - Write your own scrum issue or copy an example from the repository

- [Connect your Vercel account to the GitHub repository](https://vercel.com/docs/git#deploying-a-git-repository)

  - Within Vercel, top right click "Add New..."
  - Select "Project"
  - Select the forked repository
  - Import
  - Deploy

- Set your preview environments within Vercel to have no authorization.

  - Within Vercel click on "Settings"
  - Go to "Deployment Protection"
  - Switch off protection for the demo repository.

- [Import the workflow from the GitHub repository (within n8n directory) in n8n.](https://docs.n8n.io/courses/level-one/chapter-6/)

  - Create a new workflow.
  - Use the "Import from File..." option.

- Edit the n8n pipeline with all your own credentials to connect with GitHub, Airtop and OpenAI.

  - All steps which need it should show an error icon.
  - Edit the `GitHub Trigger Mock` node with the details of your PR.
  - Edit the `Set Variables` node with your GitHub username.
  - Do NOT use Safari as this will block the pop-up to connect these accounts.

- Activate your workflow within n8n.
  - Switch the toggle at the top right to "Active"

# Workshop

- Vibe code a new feature, make sure to have a related GitHub issue.

- Create a PR to see if the workflow get executed correctly.

  - If you like to skip the above 2 steps you can create a PR for the `line-items-combined` branch.
  - <u>Make sure to create a pull request to your fork, not the original repository. (change base repository)</u>

- Inspect the steps within the workflow execution to see what happened.

- Try to run the pipeline with a manual trigger. First edit the `PR Event Mock` node with the details of your PR.

## Bonus

- Extend the workflow with logic based on the test results.

  - If all tests pass > Approve pull request
  - If any test failed > Request changes on the pull request

- Vibe code another feature of your choice and let it go through the workflow.

  - Create a scrum issue of you new feature
  - Vibe code your new feature
  - Create a pull request and see how the pipeline is used

- Whatever you feel like extending the pipeline or agentic capabilities. 😃

## Common issues

Some common issues/mistakes I've seen in previous workshops:

- Make sure to create a pull request to your fork, not the original repository. (change base repository)
- If you're using Safari, it's likely that the pop-up to connect GitHub to n8n will get blocked.
- Closing and reopening a pull request will not trigger a new preview deployment which is needed to find the preview url. It's best to make a small change to the same pull request or use the manual trigger which mocks the PR event.
- Before running the pipeline make sure you have both your GitHub (Scrum) issue and Pull request created.
- Use the OpenAI API key for the OpenAI nodes, and the Airtop API key for the Airtop nodes.
- Make sure to follow the steps in this README's `Setup` section, every step is important.

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License

By Tim Lolkema
