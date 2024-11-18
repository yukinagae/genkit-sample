# genkit-sample

`genkit-sample` is your starting point for learning about Firebase Genkit, an open-source framework that helps developers create AI-powered applications.

- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Making Changes](#making-changes)
- [Thanks](#thanks)
- [License](#license)

## Requirements

Before you start, make sure you have these installed:

- **Node.js** version 22 or later
- **npm**
- **Genkit**

For Genkit installation, see the [official guide](https://firebase.google.com/docs/genkit/get-started).

Check your installations by running:

```bash
$ node --version # the below version is on my environment
v22.7.0
$ npm --version # the below version is on my environment
10.8.2
$ genkit --version # the below version is on my environment
0.9.1
```

## Setup

**Install Project Dependencies**: Open your terminal, navigate to this project's folder, and run:

```bash
$ npm install
```

## Usage

1. **Set the `OPENAI_API_KEY` Environment Variable**

Before running the project, you need to provide your OpenAI API key. This key allows your application to communicate with OpenAI's services. Replace `your_api_key` with the actual API key you obtained from OpenAI.

```bash
$ export OPENAI_API_KEY=your_api_key
```

2. **Run the Genkit server locally**

This command starts the project and automatically opens your default web browser to http://localhost:4000.

```bash
$ npm run genkit
```

Now you can play with it!

## Making Changes

### Building the Project

After making changes, you might need to build the project to see your changes in action:

```bash
$ npm run build
```

### Formatting and Linting

To ensure your code follows the project's coding standards, run the formatting and linting tools:

```bash
$ npm run typecheck # type check without modifying files
$ npm run check     # scan without modifying files
$ npm run fix       # modify files
```

## Thanks

Big thanks to:

- [GitHub - tanabee/genkit-summarize-webpage](https://github.com/tanabee/genkit-summarize-webpage)

## License

MIT
