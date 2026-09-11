# sculptura

task- build out this exact app that i have exported from the base44 workspace and remove all base44 dependencies and make sure that while we run this on lovable cloud for now, it's also fully not dependent on lovable whatsoever, is fully portable and can be integrated entirely with a supabase backend. for instructions, feel free to check out port.md and portsb.md in the zip file and for reference of what the app is supposed to be, check out the attached pdf (only for background reference and nothing else). maintain ui, dont rebuild things from scratch that dont need building that has already been done by base44 and make the app fully functional by adding actual auth (supabase google auth and email auth for now) with a demo mode and a proper backend flow for the purchases etc etc

you are building this project under a consistent personal system. follow all instructions strictly. this is not optional styling, it is part of the product.

---

## core philosophy

this project must feel human-made, readable, and intentionally structured. avoid generic ai patterns, vague naming, and unexplained decisions.

every part of the codebase and documentation should feel like it was written by someone who understands why things are built a certain way.

---

## code quality and structure

* refactor all code to use clear, descriptive, human-readable names

  * avoid abbreviations unless standard (id, url, api)

  * avoid single-letter variable names except for simple loops

  * prefer multi-word names that describe purpose

* organize the project into consistent, logical folders

  * group by feature or domain, not by file type alone

  * keep related logic, components, and utilities close together

* add comments that explain **why decisions were made**, not just what the code does

  * highlight tradeoffs, assumptions, and constraints where relevant

* remove unnecessary complexity and avoid over-engineering

---

## backend portability requirement

the project must not be locked into a single platform.

create the following files:

### port.md

a clear, step-by-step guide to running the project locally

* installation steps

* environment setup

* how to start development server

* how to build and deploy

### portsb.md

a concrete migration guide to supabase

* identify all backend dependencies currently used

* map each dependency to a supabase equivalent (auth, database, storage, functions)

* define required database schema in detail

* explain how to migrate authentication

* explain how to migrate any server logic to edge functions

* include any limitations or differences

do not be vague. make this actionable.

---

## ui and visual rules

* do not use emojis anywhere

* use lucide icons for all iconography

* maintain a clean, minimal, readable interface

---

## writing and tone rules

apply these rules to:

* all user-facing text

* all markdown and documentation files

* all internal non-code written content

rules:

* everything must be written in lowercase, including proper nouns

* do not use emojis

* do not use em dashes

* keep language clear, direct, and human

---

## required documentation files

create and maintain the following files in the root of the project:

### underthehood.md

explain how the system is structured internally

* architecture decisions

* data flow

* key abstractions

* why things are organized the way they are

### features.md

list and explain all features

* what each feature does

* how it works at a high level

### techstack.md

explain the technologies used and why

* focus on reasoning and tradeoffs

* do not mention any ai tools

* describe the underlying structure and choices

### roadmap.md

outline future improvements and expansions

* short term

* mid term

* long term

### overview.md

a clear, human-readable overview of the project

* what it is

* who it is for

* what problem it solves

* how it feels to use

this is not the same as a readme. it should read more like a product overview than setup instructions.

---

## consistency requirement

all parts of the project must follow these rules. do not partially apply them.

if a decision conflicts with these instructions, prioritize these instructions.

this system defines the identity of the project.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sculptura.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b8b0b4e6-8990-4204-86c4-3b4114a6dbb5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
