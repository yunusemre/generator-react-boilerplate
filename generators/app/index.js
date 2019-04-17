const Generator = require("yeoman-generator");
const path = require("path");
const to = require("to-case");
const yosay = require("yosay");

const projectGenerator = class extends Generator {
  prompting() {
    this.log(
      yosay(
        "Welcome to adesso boilerplate generator. Don't worry! We will make everything for you :)"
      )
    );
    const prompts = [
      {
        name: "projectName",
        type: "input",
        message: "Project name:",
        default: path.basename(this.destinationPath())
      },
      {
        name: "projectDescription",
        type: "input",
        message: "Project description:"
      },
      {
        name: "projectVersion",
        type: "input",
        message: "Project version:",
        default: "0.1.0"
      },
      {
        name: "authorName",
        type: "input",
        message: "Author name:",
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.projectName = props.projectName;
      this.projectDescription = props.projectDescription;
      this.projectVersion = props.projectVersion;
      this.authorName = props.authorName;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("app/index.html"),
      this.destinationPath("app/index.html"),
      {
        projectName: to.title(this.projectName)
      }
    );
    this.fs.copy(
      this.templatePath("app/images/favicon.ico"),
      this.destinationPath("app/images/favicon.ico")
    );
  }

  readme() {
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        projectName: to.title(this.projectName)
      }
    );
  }

  gitignore() {
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
  }

  gitattributes() {
    this.fs.copy(
      this.templatePath("gitattributes"),
      this.destinationPath(".gitattributes")
    );
  }

  editorconfig() {
    this.fs.copy(
      this.templatePath("editorconfig"),
      this.destinationPath(".editorconfig")
    );
  }

  prettierrc() {
    this.fs.copy(
      this.templatePath("prettierrc"),
      this.destinationPath(".prettierrc")
    );
  }

  eslintignore() {
    this.fs.copy(
      this.templatePath("eslintignore"),
      this.destinationPath(".eslintignore")
    );
  }

  eslintrc() {
    this.fs.copy(
      this.templatePath("eslintrc.js"),
      this.destinationPath(".eslintrc.js")
    );
  }

  stylelintrc() {
    this.fs.copy(
      this.templatePath("stylelintrc"),
      this.destinationPath(".stylelintrc")
    );
  }

  theothers() {
    this.fs.copy(
      this.templatePath("appveyor.yml"),
      this.destinationPath("appveyor.yml")
    );
    this.fs.copy(
      this.templatePath("babel.config.js"),
      this.destinationPath("babel.config.js")
    );
    this.fs.copy(
      this.templatePath("jest.config.js"),
      this.destinationPath("jest.config.js")
    );
    this.fs.copy(
      this.templatePath("app/nginx.conf"),
      this.destinationPath("app/.nginx.conf")
    );
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copy(
      this.templatePath("tslint.json"),
      this.destinationPath("tslint.json")
    );
  }

  prettierignore() {
    this.fs.copy(
      this.templatePath("prettierignore"),
      this.destinationPath(".prettierignore")
    );
  }

  intervals() {
    this.fs.copy(
      this.templatePath("internals"),
      this.destinationPath("internals")
    );
  }

  server() {
    this.fs.copy(this.templatePath("server"), this.destinationPath("server"));
  }

  src() {
    this.fs.copy(this.templatePath("app"), this.destinationPath("app"));
  }

  packageJSON() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        projectName: this.projectName,
        projectDescription: this.projectDescription,
        projectVersion: this.projectVersion,
        authorName: this.authorName
      }
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: true
    });
  }
};

module.exports = projectGenerator;
