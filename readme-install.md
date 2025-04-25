# Fixes to engine_components

## Fork original repo

This only has to be done once:
- Go to https://github.com/ThatOpen/engine_components and create a fork

## Clone fork locally

Clone the fork locally:
```
git clone https://github.com/andy-wrks/engine_components.git
cd engine_components
```

Later we want to be able to install the library from the forked GitHub repo. However, the congfig.json files have no "prepare" script. This would run after the dependencies have been installed and could build the project. Since the project has a lot of dev dependencies that would be required to build the project during installation, it's unreasonable to have such a script.
So we need to make sure the build artefacts are part of the GitHub repo (which they are usually not).
Open the .gitignore file and comment out the following line:
```
# dist/
```

Check status and track the new directories with the build artefacts:
```
git status
git add packages/core/dist
git add packages/front/dist
```

## Install dependencies

Install dependencies. This must be done with yarn, the project uses yarn workspaces:
```
yarn install
```

## Edit library

Check out a branch:
```
git checkout -b efficiency-fixes
```

Make changes. The changes have been made to this file:
```
\engine_components\packages\core\src\fragments\IfcLoader\index.ts
```

Commit changes locally:
```
git add .
git commit -m "Only extract properties if defined in settings"
...
git add .
git commit -m "Don't dispose web-ifc instance"
```

Build project:
```
yarn build-libraries (builds both libraries, safer)
or
yarn build-core (only builds the core library)
```

Commit build artifacts:
```
git add .
git commit -m "Add build artifacts"
```

Merge and Push:
```
git checkout main
git pull origin main
git merge efficiency-fixes
git push origin main
```

Delete local branch:
```
git branch -d efficiency-fixes
```

## Install library in main project

```
npm uninstall @thatopen/components
npm install github:andy-wrks/engine_components#main
```
